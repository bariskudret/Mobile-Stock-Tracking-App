import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getBranch } from '../services/api/Branch';
import { getProduct } from '../services/api/Product';
import Product from '../modals/Product';
import { getBranchProducts } from '../services/api/BranchProduct';
import { getCategory } from '../services/api/Category';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2; // 2 sütunlu görünüm için genişlik hesaplama

const ProductScreen = ({ route, navigation }) => {
  const { branchId } = route.params;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        
        // 1. Önce şube ürünlerini çekelim
        const branchProductResponse = await getBranchProducts(branchId);
        console.log('Şube Ürünleri Yanıtı:', branchProductResponse);

        if (!branchProductResponse.ok) {
          throw new Error(`Şube ürünleri çekilemedi: ${branchProductResponse.status}`);
        }

        if (!branchProductResponse.data || !Array.isArray(branchProductResponse.data)) {
          console.log('Gelen Veri:', branchProductResponse.data);
          throw new Error('Geçersiz veri formatı');
        }

        // Her bir ürün için detaylı bilgi çektik
        const productPromises = branchProductResponse.data.map(async (branchProduct) => {
          try {
            let productId;
            
            // Product ID çıkarma kontrolü
            if (typeof branchProduct.product === 'string') {
              productId = branchProduct.product.split('/').pop();
            } else if (branchProduct.product && branchProduct.product.id) {
              productId = branchProduct.product.id;
            } else {
              console.log('Geçersiz product yapısı:', branchProduct.product);
              return null;
            }

            // Ürün bilgilerini çekelim
            const productResponse = await getProduct(productId);
            console.log(`Ürün Yanıtı (${productId}):`, productResponse);

            if (!productResponse.ok || !productResponse.data) {
              console.log(`Ürün bilgisi alınamadı: ${productId}`);
              return null;
            }

            // Kategori ID çıkarma kontrolü
            let categoryId;
            if (typeof productResponse.data.categoryId === 'string') {
              categoryId = productResponse.data.categoryId.split('/').pop();
            } else if (productResponse.data.categoryId && productResponse.data.categoryId.id) {
              categoryId = productResponse.data.categoryId.id;
            } else {
              console.log('Geçersiz kategori yapısı:', productResponse.data.categoryId);
              return null;
            }

            // Kategori bilgilerini çekelim
            const categoryResponse = await getCategory(categoryId);
            console.log(`Kategori Yanıtı (${categoryId}):`, categoryResponse);

            if (!categoryResponse.ok || !categoryResponse.data) {
              console.log(`Kategori bilgisi alınamadı: ${categoryId}`);
              return null;
            }

            const productData = productResponse.data;
           
            // Yeni ürün objesi oluşturalım
            return new Product()
              .setName(productData.name || 'İsimsiz Ürün')
              .setPrice(branchProduct.price || 0)
              .setDescription(productData.description || '')
              .setStockQuantity(branchProduct.stockQuantity || 0)
              .setCategory(categoryResponse.data.name || 'Kategorisiz');

          } catch (error) {
            console.error('Ürün işleme hatası:', error);
            return null;
          }
        });

        // Tüm promise'ları çözümleyelim
        const productList = (await Promise.all(productPromises)).filter(product => product !== null);
        console.log('İşlenmiş Ürün Listesi:', productList);

        if (productList.length > 0) {
          setProducts(productList);
          
          // Benzersiz kategorileri ayıklayalım
          const uniqueCategories = [...new Set(productList.map(product => product.getCategory()))];
          setCategories(uniqueCategories);
          
          // İlk kategoriyi seçelim
          if (uniqueCategories.length > 0 && !selectedCategory) {
            setSelectedCategory(uniqueCategories[0]);
          }
        } else {
          setError('Hiç ürün bulunamadı');
        }

      } catch (error) {
        console.error('Veri çekme ana hatası:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branchId]);

  

  const filteredProducts = products.filter(product => 
    (!selectedCategory || product.getCategory() === selectedCategory) &&
    (searchText === '' || product.getName().toLowerCase().includes(searchText.toLowerCase()))
  );

  const ProductCard = ({ product }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        {/* Ürün görseli kontrolü */}
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons name="image" size={40} color="#999" />
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{product.getName()}</Text>
        <Text style={styles.productStock}>Stok: {product.getStockQuantity()}</Text>
        <Text style={styles.productPrice}>{product.getPrice()} TL</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Arama Başlığı */}
      <View style={styles.searchSection}>
        <MaterialIcons name="menu" size={24} color="black" style={styles.menuIcon} />
        <Text style={styles.stockText}>Stok</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons name="search" size={24} color="gray" />
        </View>
      </View>

      {/* Şube Bilgisi ve İşlem Butonları */}
      <View style={styles.branchSection}>
        <Text style={styles.branchId}>Şube ID: {branchId}</Text>
        <View style={styles.buttonContainer}>
        <Text>Ürün</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.buttonText}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Kategoriler */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Ürün Listesi */}
      <ScrollView 
        style={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productsGrid}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  menuIcon: {
    marginRight: 16,
  },
  stockText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  branchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  branchId: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  categoryContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#333',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productsContainer: {
    flex: 1,
    padding: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: PRODUCT_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: PRODUCT_WIDTH,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productStock: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
});

export default ProductScreen;


/*   */