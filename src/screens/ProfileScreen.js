import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { getUser } from '../services/api/User';
import { getBranches, getBranch } from '../services/api/Branch';
import { getCompany } from '../services/api/Company';
import Branch from '../modals/Branch';
import Company from '../modals/Company';
import NavigationBar from '../components/NavigationBar';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const userId = await AsyncStorage.getItem('userId');
        console.log("user id:>>"+ userId);
        if (userId) {
          const userResponse = await getUser(userId);
          console.log('response ->>'+JSON.stringify(userResponse,null,2));
          if (userResponse.ok) {
            const userData = userResponse.data;
            setUser(userData);
            console.log('@id-',userData.branch)
            // Kullanıcının şube bilgisini alıyoruz
            if (userData.branch) {
              const branchResponse = await getBranch(userData.branch.id);
              console.log('deneme'+JSON.stringify(userData.branch));
              if (branchResponse.ok) {
                const branchData = branchResponse.data;
                console.log('branch data'+ JSON.stringify(branchData));
                const branch = new Branch()
                  .setId(branchData.id)
                  .setName(branchData.name)
                  .setAdress(branchData.address);
  
                // Şirket bilgisini direkt branch'ten alıyoruz
                if (branchData.company) {
                  console.log(branchData.company)
                  const companyData = branchData.company;
                  const company = new Company()
                    .setId(companyData.id)
                    .setName(companyData.name);
                  
                  setCompany(company);
  
                  // Şirketin tüm şubelerini çekelim
                  const branchesResponse = await getBranches(); // Tüm şubeleri çek
                  console.log(branchesResponse.ok);
                  if (branchesResponse.ok) {
                    console.log(JSON.stringify(branchesResponse.data));
                    const branchDataArray = Array.isArray(branchesResponse.data) ? branchesResponse.data : [branchesResponse.data];

                    const branchList = branchDataArray
                      .filter(branch => branch.company && branch.company.id === companyData.id)
                      .map(branch => new Branch()
                        .setId(branch.id)
                        .setName(branch.name)
                        .setAdress(branch.address)
                        .setIsOpen(true)
                        .setUsers(branch.users)
                      );
                    
                    setBranches(branchList);
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const getRequiredStaffCount = (branch) => {
    // Bu fonksiyon backend'den gelen veriye göre düzenlenebilir
    return branch.users ? 10 - branch.users.length : 0;
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {user && company ? (
          <>
            <View style={styles.userInfoCard}>
              <View style={styles.userHeader}>
                <View style={styles.userIconContainer}>
                  <MaterialIcons name="person" size={40} color="#666" />
                </View>
                <View style={styles.userHeaderInfo}>
                  <Text style={styles.userName}>{user.username}</Text>
                  <Text style={styles.userPosition}>Kullanıcı Pozisyonu</Text>
                </View>
              </View>
              
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{company.getName()}</Text>
                <Text style={styles.companyAddress}>Şirket Adresi</Text>
              </View>
            </View>

            <View style={styles.branchesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Firma Şubeleri</Text>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => navigation.navigate('SelectBranch')}
                >
                  <Text style={styles.addButtonText}>Talep Oluştur</Text>
                </TouchableOpacity>
              </View>

              {branches.map((branch) => {
                const staffNeeded = getRequiredStaffCount(branch);
                return (
                  <TouchableOpacity 
                    key={branch.getId()}
                    style={styles.branchCard}
                    onPress={() => navigation.navigate('Product', { branchId: branch.getId() })}
                  >
                    <View style={styles.branchHeader}>
                      <Text style={styles.branchName}>{branch.getName()}</Text>
                      {staffNeeded > 0 && (
                        <View style={styles.staffAlert}>
                          <Text style={styles.staffAlertText}>-{staffNeeded} Eksik</Text>
                        </View>
                      )}
                      {user.branch && user.branch.id === branch.getId() && (
                        <View style={styles.activeTag}>
                          <Text style={styles.activeTagText}>Aktif</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.branchDetails}>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="people" size={16} color="#666" />
                        <Text style={styles.branchDetailText}>
                          {branch.users ? branch.users.length : 0} Çalışan
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <MaterialIcons name="location-on" size={16} color="#666" />
                        <Text style={styles.branchDetailText}>{branch.getAdress()}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </View>
        )}
      </ScrollView>
      <NavigationBar navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 60,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  userInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userHeaderInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userPosition: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  companyInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    marginBottom: 16,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  companyAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  userDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  branchesSection: {
    marginBottom: 80, // Navbar için boşluk
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00E676',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  branchCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  branchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  branchName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  staffAlert: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  staffAlertText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTag: {
    backgroundColor: '#FDD835',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  activeTagText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
  },
  branchDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  branchDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});


export default ProfileScreen;

/*

 */