// React Core
import React from 'react';

// React Native Core
import { View, Text, FlatList, ListRenderItem, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

// Expo
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

// Constants
import { Colors } from '@/constants/Colors';
import imageMap from '@/constants/imageMap';

// Types
import { ListingTypeAuditorium } from '@/types/types';

// Props del componente
type Props = {
    listings: ListingTypeAuditorium[];
};

// Función para obtener el link
const getLinkForJef = (item: any) => {
    return { pathname: `/listing/auditorium/[auditoriumId]`, params: { auditoriumId: item.id } };
};

const ListingAuditorium = ({ listings }: Props) => {
    const renderItems: ListRenderItem<ListingTypeAuditorium> = ({ item }) => {
        const imageSource = imageMap[item.image] || null;

        return (
            <Link href={getLinkForJef(item) as any} asChild>
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
                data={listings}
                renderItem={renderItems}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ListingAuditorium;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
    },
    item: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        width: CARD_WIDTH,
        borderWidth: 1,
        borderColor: Colors.gray,
        marginBottom: 20,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
});
