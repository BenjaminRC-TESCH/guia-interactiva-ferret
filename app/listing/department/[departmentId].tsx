// React Core
import React, { useRef } from 'react';

// React Native Core
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';

// Expo
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

// Iconos
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import imageMap from '@/constants/imageMap';

// Types
import { ListingTypeDepartment } from '@/types/types';

// Data
import listingData from '@/data/departamentos.json';
import otrosData from '@/data/otros.json';

// Dimensions
const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingDepartmentsDetails = () => {
    const { departmentId } = useLocalSearchParams();

    const departmentIdNumber = Array.isArray(departmentId) ? parseInt(departmentId[0]) : parseInt(departmentId);

    const listing = (listingData as ListingTypeDepartment[]).find((item) => item.id === departmentIdNumber);

    if (!listing) {
        return (
            <View style={styles.center}>
                <Text>No se encontró el departamento.</Text>
            </View>
        );
    }

    const router = useRouter();

    const handleLinkPress = (link: string) => {
        // Verificar si es una URL válida
        const isValidUrl = (url: string) => {
            try {
                new URL(url); // Si no es válido, lanzará un error
                return true;
            } catch (e) {
                return false;
            }
        };

        if (isValidUrl(link)) {
            Linking.openURL(link).catch(() => {
                Alert.alert('Error', 'No se pudo abrir la URL.');
            });
            return;
        }

        if (link === 'Jefaturas de División en Ingeniería') {
            return router.push({
                pathname: `/screens/jefatura`,
                params: { jefaturaId: 123 },
            });
        }
        // Buscar en departamentos
        const departmentMatch = listingData.find((item) => item.name === link);
        if (departmentMatch) {
            router.push(`/listing/department/${departmentMatch.id}`);
            return;
        }

        // Buscar en otros
        const otherMatch = otrosData.find((item) => item.name === link);
        if (otherMatch) {
            router.push(`/listing/others/${otherMatch.id}`);
            return;
        }

        // Si no hay coincidencias
        Alert.alert('No encontrado', 'No se encontró un departamento o elemento relacionado con este enlace.');
    };

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
                        {/* DATOS */}
                        <View>
                            {listing.phone && (
                                <View style={styles.listItem}>
                                    <Ionicons name='call' size={18} color={Colors.primary} />
                                    <Text style={styles.itemText}>{listing.phone}</Text>
                                </View>
                            )}
                            {listing.mail && (
                                <View style={styles.listItem}>
                                    <Ionicons name='mail' size={18} color={Colors.primary} />
                                    <Text style={styles.itemText}>{listing.mail}</Text>
                                </View>
                            )}
                            {listing.schedule && (
                                <View style={styles.listItem}>
                                    <Ionicons name='time' size={18} color={Colors.primary} />
                                    <Text style={styles.itemText}>{listing.schedule}</Text>
                                </View>
                            )}
                        </View>

                        {/* DESCRIPCION */}
                        <View>
                            <Text style={styles.descriptionText}>
                                {listing.description.split('\n').map((line, index) => {
                                    const match = line.match(/([A-Z][^:]*):/); // Encuentra la mayúscula y los ":"

                                    if (match) {
                                        const boldPart = match[0];
                                        const normalPart = line.replace(boldPart, '');

                                        return (
                                            <Text key={index}>
                                                <Text style={{ fontWeight: 'bold' }}>{boldPart}</Text>
                                                {normalPart}
                                                {''}
                                            </Text>
                                        );
                                    }

                                    return (
                                        <Text key={index}>
                                            {line}
                                            {'\n'}
                                        </Text>
                                    );
                                })}
                            </Text>
                        </View>
                        {/* FUNCIONES */}
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
                        {/* LINKS */}
                        <View>
                            {listing.links?.map((link, index) => (
                                <TouchableOpacity key={index} style={styles.functionItem} onPress={() => handleLinkPress(link)}>
                                    <Octicons style={styles.icon} name='dot-fill' size={12} color='black' />
                                    <Text style={styles.linksText}>{link}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* POSTDESCRIPTION */}

                        {listing.postdescription && (
                            <View>
                                <Text style={styles.postDescription}>{listing.postdescription}</Text>
                            </View>
                        )}

                        <View>
                            {listing.sub?.map((item, index) => (
                                <View key={index} style={styles.subItem}>
                                    {item.name && <Text style={styles.subItemTitle}>{item.name}</Text>}
                                    {/* DESCRIPTION */}
                                    {item.description && <Text style={styles.subItemDescription}>{item.description}</Text>}

                                    {/* FUNCIONES */}
                                    {item.functions?.map((func, index) => {
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

                                    {/* IMAGEN */}
                                    {item.image && <Image source={imageMap[item.image] || imageMap.non} style={styles.subimage} />}

                                    {/* POSTDESCRIPTION */}
                                    {item.postdescription && <Text style={styles.postDescription}>{item.postdescription}</Text>}

                                    {/*  */}
                                    {item.links?.map((link, index) => (
                                        <TouchableOpacity key={index} style={styles.functionItem} onPress={() => handleLinkPress(link)}>
                                            <Octicons style={styles.icon} name='dot-fill' size={12} color='black' />
                                            <Text style={styles.linksText}>{link}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default ListingDepartmentsDetails;

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
        marginHorizontal: 20, // Asegura márgenes horizontales
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
        flex: 1, // Permite que el texto se ajuste dentro de la fila
        flexWrap: 'wrap', // Ajusta texto largo a la siguiente línea
        textAlign: 'justify',
    },
    descriptionText: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'justify',
    },
    functionsTextTitle: {
        fontSize: 16,
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
    linksText: {
        fontSize: 16,
        color: Colors.blue,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'justify',
        marginLeft: 2,
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
    subItem: {
        marginBottom: 20,
    },
    subItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subItemDescription: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'justify',
    },
    subItemFunctions: {
        fontSize: 16,
        textAlign: 'justify',
    },
    subimage: {
        width: 200,
        height: 150,
        marginVertical: 10,
        alignSelf: 'center',
    },
    postDescription: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'justify',
    },
});
