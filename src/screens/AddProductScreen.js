import React, { useState, useEffect } from 'react';
import {  View, Text, TextInput, TouchableOpacity, StyleSheet,  ScrollView,  Modal,  Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCategories, createCategory } from '../services/api/Category';
import { postProduct } from '../services/api/Product';
import { createBranchProduct } from '../services/api/BranchProduct';
import Category from '../modals/Category';
import Product from '../modals/Product';

const AddProductScreen = ({ route, navigation }) => {
  const { branchId } = route.params; // Şube ID'sini route'tan al

  // State tanımlamaları
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stockQuantity, setStockQuantity] = useState('');
  const [price, setPrice] = useState('');

  // Kategori yönetimi state'leri
  const [categories, setCategories] = useState([]);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Kategorileri çekme
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Tüm kategorileri çek
        if (response.ok && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Kategoriler çekilirken hata:', error);
      }
    };

    fetchCategories();
  }, []);

  // Yeni kategori ekleme
  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Hata', 'Kategori adı boş olamaz');
      return;
    }

    try {
      const response = await createCategory({ 
        name: newCategoryName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      if (response.ok) {
        setCategories([...categories, response.data]);
        setNewCategoryName('');
        setIsNewCategoryModalVisible(false);
        Alert.alert('Başarılı', 'Yeni kategori eklendi');
      }
    } catch (error) {
      console.error('Kategori eklenirken hata:', error);
      Alert.alert('Hata', 'Kategori eklenirken bir sorun oluştu');
    }
  };

  // Ürün ekleme
  const handleAddProduct = async () => {
    // Validasyonlar
    if (!productName.trim()) {
      Alert.alert('Hata', 'Ürün adı gerekli');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Hata', 'Kategori seçiniz');
      return;
    }
    if (!stockQuantity.trim() || isNaN(stockQuantity)) {
      Alert.alert('Hata', 'Geçerli bir stok miktarı giriniz');
      return;
    }
    if (!price.trim() || isNaN(price)) {
      Alert.alert('Hata', 'Geçerli bir fiyat giriniz');
      return;
    }

    try {
      // 1. Ürün oluşturma
      const product = new Product()
      .setName(productName)
      .setDescription(productDescription)
      .setCreateAt()
      .setUpdateAt()
      product.category = `/api/categories/${selectedCategory.id.toString()}`;    
      
      console.log(selectedCategory.id)
      const productResponse = await postProduct(product);
      console.log(productResponse);
      if (!productResponse.ok) {
        throw new Error('Ürün oluşturulamadı');
      }

      // 2. Branch Product oluşturma
      const branchProductResponse = await createBranchProduct({
        branch: `/api/branches/${branchId}`, // Dynamic branch URL
        product: `/api/products/${productResponse.data.id}`, // Yeni oluşturulan ürünün API linki
        stockQuantity: parseInt(stockQuantity),
        price: price
      });

      if (!branchProductResponse.ok) {
        throw new Error('Branch Product oluşturulamadı');
      }

      Alert.alert('Başarılı', 'Ürün başarıyla eklendi');
      navigation.goBack(); // Önceki ekrana dön

    } catch (error) {
      console.error('Ürün eklerken hata:', error);
      Alert.alert('Hata', 'Ürün eklenirken bir sorun oluştu');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Yeni Ürün Ekle</Text>
      
      {/* Ürün Adı */}
      <TextInput
        style={styles.input}
        placeholder="Ürün Adı"
        value={productName}
        onChangeText={setProductName}
      />

      {/* Ürün Açıklaması */}
      <TextInput
        style={styles.input}
        placeholder="Ürün Açıklaması"
        value={productDescription}
        onChangeText={setProductDescription}
        multiline
      />

      {/* Kategori Seçimi */}
      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Kategori Seç</Text>
        <View style={styles.categoryRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryButton, 
                  selectedCategory?.id === category.id && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory?.id === category.id && styles.selectedCategoryButtonText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity 
            style={styles.addCategoryButton}
            onPress={() => setIsNewCategoryModalVisible(true)}
          >
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stok Miktarı */}
      <TextInput
        style={styles.input}
        placeholder="Stok Miktarı"
        value={stockQuantity}
        onChangeText={setStockQuantity}
        keyboardType="numeric"
      />

      {/* Fiyat */}
      <TextInput
        style={styles.input}
        placeholder="Fiyat (TL)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Ürün Ekleme Butonu */}
      <TouchableOpacity 
        style={styles.addProductButton}
        onPress={handleAddProduct}
      >
        <Text style={styles.addProductButtonText}>Ürün Ekle</Text>
      </TouchableOpacity>

      {/* Yeni Kategori Ekleme Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNewCategoryModalVisible}
        onRequestClose={() => setIsNewCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Kategori Ekle</Text>
            <TextInput
              style={styles.input}
              placeholder="Kategori Adı"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setIsNewCategoryModalVisible(false)}
              >
                <Text>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalAddButton}
                onPress={handleAddNewCategory}
              >
                <Text style={styles.modalAddButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8
  },
  categoryContainer: {
    marginBottom: 16
  },
  label: {
    marginBottom: 8,
    fontWeight: '500'
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 8
  },
  selectedCategoryButton: {
    backgroundColor: '#333',
  },
  categoryButtonText: {
    color: '#333'
  },
  selectedCategoryButtonText: {
    color: 'white'
  },
  addCategoryButton: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 20
  },
  addProductButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  addProductButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8
  },
  modalAddButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 8
  },
  modalAddButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AddProductScreen;