// React Native Core
import { View, Text, StyleSheet, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react';

// Expo
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';

// Components
import CategoryButtons from '@/components/CategoryButtons';
import ListingDepartment from '@/components/ListingDepartments';

// Data
import ListingData from '@/data/departamentos.json';

// Assets
const backgroundImage = require('@/assets/images/app_fondo_3_blur.jpg');

const Department = () => {
    const [category, setCategory] = useState(TextVariables.categories.all);
    const [searchText, setSearchText] = useState('');

    const onCatChanged = (category: string) => {
        setCategory(category);
    };

    const handleSearchChange = (text: string) => {
        setSearchText(text);
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
                <Text style={styles.headerText}>{TextVariables.headers.department}</Text>

                <View style={styles.searchSectionWrapper}>
                    {/* Buscador */}
                    <View style={styles.searchBar}>
                        <Ionicons name='search' size={20} color={Colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={TextVariables.search.placeholder}
                            placeholderTextColor={Colors.textSecondary}
                            value={searchText}
                            onChangeText={handleSearchChange}
                        />
                    </View>
                    {/* Buscador */}
                </View>

                {/* Ocultar las categorías si hay texto en el buscador */}
                {!searchText && <CategoryButtons onCategoryChanged={onCatChanged} />}

                <ListingDepartment listings={ListingData} category={category} searchText={searchText} />
            </ImageBackground>
        </>
    );
};

export default Department;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
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
});
