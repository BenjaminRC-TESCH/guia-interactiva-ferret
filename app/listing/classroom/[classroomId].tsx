// React Core
import React, { useRef } from 'react';

// React Native Core
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

// Expo
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

// Iconos
import { Feather, Octicons } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import imageMap from '@/constants/imageMap';

// Types
import { ListingTypeClassroom } from '@/types/types';

// Data
import listingData from '@/data/salones.json';

// Dimensions
const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingClassroomDetails = () => {
    const { classroomId } = useLocalSearchParams();

    const classroomIdNumber = Array.isArray(classroomId) ? parseInt(classroomId[0]) : parseInt(classroomId);

    const listing = (listingData as ListingTypeClassroom[]).find((item) => item.id === classroomIdNumber);

    if (!listing) {
        return (
            <View style={styles.center}>
                <Text>No se encontró el departamento.</Text>
            </View>
        );
    }

    const router = useRouter();

    const scrollViewRef = useRef<ScrollView | null>(null);

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back();
                            }}>
                            <View style={styles.backIcon}>
                                <Feather name='arrow-left' color={Colors.black} size={20} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView>
                <View>
                    {listing.galery && listing.galery.length > 0 ? (
                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ width, height: IMG_HEIGHT }}>
                            {listing.galery.map((imageKey, index) => (
                                <Image key={index} source={imageMap[imageKey] || imageMap.non} style={styles.image} />
                            ))}
                        </ScrollView>
                    ) : (
                        <Image source={imageMap[listing.image] || imageMap.non} style={styles.image} />
                    )}
                </View>
                <View>
                    <Text style={styles.title}>{listing.name}</Text>
                    <View style={styles.contentWrapper}>
                        <View>
                            <View>
                                <Text style={styles.descriptionText}>{listing.description}</Text>
                            </View>

                            <View>
                                {listing.functions?.map((func, index) => {
                                    const [boldPart, normalPart] = func.includes(':') ? func.split(/:(.+)/) : [null, func];

                                    return (
                                        <View style={styles.functionItem} key={index}>
                                            <Octicons style={styles.icon} name='dot-fill' size={12} color='black' />
                                            <Text style={styles.functionsText}>
                                                {boldPart && <Text style={{ fontWeight: 'bold' }}>{boldPart}:</Text>}
                                                {normalPart}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>

                            <View>
                                <Text style={styles.descriptionText}>{listing.postdescription}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: IMG_HEIGHT,
        resizeMode: 'cover',
    },
    title: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    contentWrapper: {
        marginHorizontal: 20,
        marginVertical: 10,
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemText: {
        marginLeft: 5,
        marginRight: 10,
        fontSize: 16,
        color: Colors.black,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'justify',
    },
    descriptionText: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'justify',
    },
    functionsTextTitle: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    functionsText: {
        fontSize: 16,
        color: Colors.black,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'justify',
        marginLeft: 2,
    },
    functionItem: {
        flexDirection: 'row',

        marginBottom: 8,
    },
    icon: {
        marginTop: 5,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        backgroundColor: Colors.white,
        padding: 6,
        borderRadius: 10,
    },
});

export default ListingClassroomDetails;
