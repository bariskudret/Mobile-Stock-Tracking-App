import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { useNavigation } from '../context/NavigationContext';
import { getCategories } from '../services/api/Category';
import { handledApplyFilters } from '../screens/ProductScreen';
const FilterDrawer = () => {
  const { setIsFilterVisible, applyFiltersFunction } = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minStock, setMinStock] = useState('');
  const [maxStock, setMaxStock] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    // Kategorileri API'den çek
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      console.log('gelen',categories)
    } catch (error) {
      console.error('Kategori çekme hatası:', error);
    }
  };

  const toggleCategory = (category) => {
    console.log('category',category)
    console.log(selectedCategories);
    if (selectedCategories.includes(category.name)) {
      setSelectedCategories(selectedCategories.filter(name => name !== category.name));
    } else {
      setSelectedCategories([...selectedCategories, category.name]);
    }
  };

  const handleApplyFilters = async() => {
    let filters = []
    
    // Kategoriler için çoklu seçim desteği
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        filters.push(`product.category.name[]=${category}`);
        console.log('içeride',filters)
      });
    }
  
    // Stok ve fiyat filtreleri
    if (minStock) filters.push(`stockQuantity[gte]=${minStock}`)
    else filters.push(`stockQuantity[gte]=`)
    if (maxStock) filters.push(`stockQuantity[lte]=${maxStock}`)
    else filters.push('stockQuantity[lte]=')
    if (minPrice) filters.push(`price[gte]=${minPrice}`)
    else filters.push('price[gte]=')
    if (maxPrice) filters.push(`price[lte]=${maxPrice}`)
      else filters.push('price[lte]=')
  
    
    const filtersQuery = filters.length > 0 ? filters.join('&') : '';
    
    console.log(selectedCategories.length);
    console.log('filiter',filters)
    console.log('girdimD')
    console.log(filtersQuery);
    
  // Context üzerinden gelen fonksiyonu çağır
  if (applyFiltersFunction) {
    console.log('if ieçrsinde')
    await applyFiltersFunction(filtersQuery);
  }
 else  await console.log('ife girmedi',applyFiltersFunction)
    // Modal'ı kapat
    setIsFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategories.length === 0 && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategories([])}
        >
          <Text style={styles.categoryText}>Tümü</Text>
        </TouchableOpacity>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategories.includes(item.id) && styles.selectedCategory
              ]}
              onPress={() => toggleCategory(item)}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.rangeContainer}>
        <View style={styles.rangeRow}>
          <Text style={styles.rangeLabel}>Stok Miktarı:</Text>
          <TextInput
            style={styles.rangeInput}
            value={minStock}
            onChangeText={setMinStock}
            placeholder="Min"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.rangeInput}
            value={maxStock}
            onChangeText={setMaxStock}
            placeholder="Max"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.rangeRow}>
          <Text style={styles.rangeLabel}>Fiyat:</Text>
          <TextInput
            style={styles.rangeInput}
            value={minPrice}
            onChangeText={setMinPrice}
            placeholder="Min"
            keyboardType="decimal-pad"
          />
          <TextInput
            style={styles.rangeInput}
            value={maxPrice}
            onChangeText={setMaxPrice}
            placeholder="Max"
            keyboardType="decimal-pad"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
        <Text style={styles.applyButtonText}>Uygula</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#007aff',
  },
  categoryText: {
    color: '#333',
  },
  rangeContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rangeLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  rangeInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    padding: 8,
    marginLeft: 8,
  },
  applyButton: {
    backgroundColor: '#007aff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterDrawer;