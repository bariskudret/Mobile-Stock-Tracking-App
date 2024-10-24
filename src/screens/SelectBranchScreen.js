import React , {useEffect, useState} from 'react';
import { View , Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {getCompanies} from '../services/api/Company';
import {getBranches} from '../services/api/Branch';
import Company from '../modals/Company';
import Branch from '../modals/Branch';

const selectBrnachScreen = ({navigation})=>{
    const [companies , setCompanies] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [filteredCompanies, setFilteredCompanies] = useState([]); // Filtrelenmiş liste
    const [searchTerm, setSearchTerm] = useState(''); // Arama terimi

    useEffect(()=>{
        // API'den companies ve branches'ları ayrı ayrı alıp modals ile işliyoruz
        const fetchCompaniesAndBranches = async()=>{

            const companiesResponse = await getCompanies();
            const branchesResponse = await getBranches();

            if(companiesResponse.ok && branchesResponse.ok){
                // modals ile verileri işleyip states e atıyoruz
                const processedCompanies = companiesResponse.data.map(companiesData =>{
                    const company = new Company()
                    .setId(companiesData.id)
                    .setName(companiesData.name);

                    //şirkete bağlı şubeleri branches tan eşleştiriyoruz
                    const relatedBranches = branchesResponse.data
                    .filter(branch => branch.company_id === company.getId())
                    .map(branchData => {
                        const branch = new Branch()
                            .setId(branchData.id)
                            .setName(branchData.name);
                        return branch;
                    });
                    company.setBranches(relatedBranches);
                    return company;
                });

                setCompanies(processedCompanies);
                setFilteredCompanies(processedCompanies);// Başlangıçta tüm firmalar gösterilsin
            }else{
                console.log('firma veya şube biglileri alınamadı');
            }
        }
        fetchCompaniesAndBranches();

    },[]);

     // Arama terimine göre firmaları ve şubeleri filtreleme
     useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCompanies(companies); // Arama terimi boşsa tüm firmaları göster
        } else {
            const filtered = companies.filter(company => {
                const companyMatches = company.getName().toLowerCase().includes(searchTerm.toLowerCase());
                const branchMatches = company.getBranches().some(branch =>
                    branch.getName().toLowerCase().includes(searchTerm.toLowerCase())
                );

                return companyMatches || branchMatches;
            });

            setFilteredCompanies(filtered);
        }
    }, [searchTerm, companies]);

    const handleStartJob = () => {
        if (selectedBranch) {
            console.log('Seçilen şube ID:', selectedBranch);
            navigation.navigate('Profile');
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bir Şube Seç ve İşe Başla</Text>

              {/* Arama Kutusu */}
              <TextInput
                style={styles.searchInput}
                placeholder="Firma veya Şube adı ara"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            
            {/* firma ve şubelerin listelenmesi*/}
            <FlatList
                data={filteredCompanies}
                keyExtractor={item => item.getId().toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.companyTitle}>{item.getName()}</Text>
                        {item.getBranches().map(branch => (
                            <TouchableOpacity
                                key={branch.getId()}
                                style={[
                                    styles.branchItem,
                                    selectedBranch === branch.getId() && styles.selectedBranch
                                ]}
                                onPress={() => setSelectedBranch(branch.getId())}
                            >
                                <Text>{branch.getName()}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />
            <TouchableOpacity style={styles.startButton} onPress={handleStartJob}>
                <Text style={styles.startButtonText}>İşe Başla</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    searchInput: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    companyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    branchItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedBranch: {
        backgroundColor: '#cce5ff',
    },
    startButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SelectBranchScreen;