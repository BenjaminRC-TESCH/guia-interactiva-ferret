// React Core
import React, { useEffect, useState } from 'react';

// React Native Core
import { View, Text, FlatList, ListRenderItem, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

// Expo
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '../constants/Texts';
import imageMap from '@/constants/imageMap';

// Types
import { ListingTypeDepartment } from '@/types/types';

// Props del componente
type Props = {
    listings: any[];
    category: string;
    searchText: string; // Nueva prop
};

const ListingDepartment = ({ listings, category, searchText }: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    }, [category, searchText]);

    // Filtrar las listas por categoría y texto de búsqueda
    const filteredListings = listings.filter(
        (item) =>
            (category === TextVariables.categories.all || item.category === category) &&
            item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItems: ListRenderItem<ListingTypeDepartment> = ({ item }) => {
        const imageSource = imageMap[item.image] || null;

        const getLinkForDepartment = (item: any) => {
            if (item.name === 'Jefaturas de División en Ingeniería') {
                return { pathname: `/screens/jefatura`, params: { jefaturaId: item.id } };
            }

            return { pathname: `/listing/department/[departmentId]`, params: { departmentId: item.id } };
        };

        return (
            <Link href={getLinkForDepartment(item) as any} asChild>
                <TouchableOpacity>
                    <View style={styles.item}>
                        {imageSource && (
                            <View>
                                <Image source={imageSource} style={styles.image} />
                            </View>
                        )}
                        <Text style={styles.itemText} numberOfLines={3} ellipsizeMode='tail'>
                            {item.name}
                        </Text>
                        <View style={styles.descriptionItem}>
                            <Text style={{ flex: 1 }}>{item.category}</Text>
                            <Ionicons name='eye' size={18} color={Colors.black} style={styles.eyeIcon} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={loading ? [] : filteredListings}
                renderItem={renderItems}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ListingDepartment;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    item: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        width: CARD_WIDTH,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',
        marginVertical: 5,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    descriptionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
});
