// React Core
import React, { useState } from 'react';

// React Native Core
import { View, Text, Image, StyleSheet, ScrollView, TextInput, FlatList, ImageBackground } from 'react-native';

// Expo
import { Stack } from 'expo-router';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';
import imageMap from '@/constants/imageMap';

// Assets
const backgroundImage = require('@/assets/images/app_fondo_3_blur.jpg');
const profile = require('../../assets/images/non.jpg');

// Data
import departamentos from '@/data/departamentos.json';
import jefaturas from '@/data/jefaturas.json';
import laboratorios from '@/data/laboratorios.json';
import otros from '@/data/otros.json';
import contacto from '@/data/contacto.json';

// Combinamos los datos de todas las fuentes
const data = [...departamentos, ...jefaturas, ...laboratorios, ...otros, ...contacto];

const contact = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data.filter((item) => item.contact === 1));

    // Filtrar por nombre y contact (contact = 1)
    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text === '') {
            // Si no hay texto de búsqueda, mantener solo los elementos con contact = 1
            setFilteredData(data.filter((item) => item.contact === 1));
        } else {
            // Filtrar tanto por nombre como por contact = 1
            setFilteredData(data.filter((item) => item.contact === 1 && item.name.toLowerCase().includes(text.toLowerCase())));
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />

            <ImageBackground source={backgroundImage} style={styles.container} resizeMode='cover'>
                <Text style={styles.headerText}>{TextVariables.headers.contact}</Text>

                <View style={styles.searchSectionWrapper}>
                    {/* Buscador */}
                    <View style={styles.searchBar}>
                        <Ionicons name='search' size={20} color={Colors.textSecondary} style={styles.searchIcon} />
                        <TextInput style={styles.searchBar} placeholder='Buscar...' value={searchText} onChangeText={handleSearch} />
                    </View>
                    {/* Buscador */}
                </View>

                {/* Listado de elementos filtrados */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => `${item.name}-${item.schedule}`} // Combinando propiedades para formar una clave única
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={imageMap[item.image] || require('@/assets/images/non.jpg')} style={styles.image} />
                            <View>
                                <Text style={styles.title}>{item.name}</Text>
                                {item.schedule && <Text style={styles.description}>{item.schedule}</Text>}
                                {item.phone && <Text style={styles.description}>{item.phone}</Text>}
                                {item.mail && <Text style={styles.description}>{item.mail}</Text>}
                            </View>
                        </View>
                    )}
                />
            </ImageBackground>
        </>
    );
};

export default contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
    },
    headerText: {
        paddingTop: 40,
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        marginBottom: 20,
        textAlign: 'center',
    },
    searchSectionWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        borderRadius: 8,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.black,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 10,
        alignSelf: 'center',
    },
    item: {
        backgroundColor: Colors.white,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 5,
    },
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 6,
        borderColor: 'purple',
    },
    leftSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E0E0E0',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    rightSection: {
        flex: 2,
        justifyContent: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
    },
    name: {
        fontSize: 14,
        color: Colors.black,
    },
});
