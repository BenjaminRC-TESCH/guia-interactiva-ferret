// React Core
import React, { useState } from 'react';

// React Native Core
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native';

// Expo
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

// Iconos
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import imageMap from '@/constants/imageMap';

// Types
import { ListingTypeJefatura } from '@/types/types';

// Data
import listingData from '@/data/jefaturas.json';

// Gesture Handling
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Dimensions
const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingJefaturaOneDetail = () => {
    const { jefaturaId } = useLocalSearchParams();
    const jefaturaIdNumber = Array.isArray(jefaturaId) ? parseInt(jefaturaId[0]) : parseInt(jefaturaId);

    const listing = (listingData as ListingTypeJefatura[]).find((item) => item.id === jefaturaIdNumber);

    const [isModalVisible, setModalVisible] = useState(false); // Estado para el modal

    const router = useRouter();

    const width = Dimensions.get('window').width;
    const ANCHO_IMAGEN = width;
    const ALTO_IMAGEN = width;

    const escalaImg = useSharedValue(1);
    const focoX = useSharedValue(0);
    const focoY = useSharedValue(0);

    const pinchazoPantalla = Gesture.Pinch()
        .onStart((e) => {
            focoX.value = e.focalX;
            focoY.value = e.focalY;
        })
        .onUpdate((e) => {
            escalaImg.value = e.scale;
        })
        .onEnd(() => {
            escalaImg.value = withTiming(1, { duration: 500 });
        });

    const centroImagen = {
        x: ANCHO_IMAGEN / 2,
        y: ALTO_IMAGEN / 2,
    };

    const estiloAnimado = useAnimatedStyle(() => ({
        transform: [
            { translateX: focoX.value },
            { translateY: focoY.value },
            { translateX: -centroImagen.x },
            { translateY: -centroImagen.y },
            { scale: escalaImg.value },
            { translateX: -focoX.value },
            { translateY: -focoY.value },
            { translateX: centroImagen.x },
            { translateY: centroImagen.y },
        ],
    }));

    if (!listing) {
        return (
            <View style={styles.center}>
                <Text>No se encontró la jefatura.</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <View style={styles.backIcon}>
                                <Feather name='arrow-left' color={Colors.black} size={20} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />

            <View style={styles.container}>
                <ScrollView>
                    <Image source={imageMap[listing.image] || imageMap.non} style={styles.image} />
                    <View>
                        <Text style={styles.title}>{listing.name}</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)} // Abre el modal al presionar
                            style={styles.organigramaContainer}>
                            <Text style={styles.organigramaText}>Organigrama</Text>
                            <Ionicons name='eye' size={24} color={Colors.black} style={styles.iconOrganigrama} />
                        </TouchableOpacity>
                        <View style={styles.contentWrapper}>
                            {/* DATOS */}
                            <View>
                                {listing.phone && (
                                    <View style={styles.listItem}>
                                        <Ionicons name='call' size={24} color={Colors.primary} />
                                        <Text style={styles.itemText}>{listing.phone}</Text>
                                    </View>
                                )}
                                {listing.mail && (
                                    <View style={styles.listItem}>
                                        <Ionicons name='mail' size={24} color={Colors.primary} />
                                        <Text style={styles.itemText}>{listing.mail}</Text>
                                    </View>
                                )}
                                {listing.web && (
                                    <View style={styles.listItem}>
                                        <Ionicons name='logo-web-component' size={24} color={Colors.primary} />
                                        <Text style={styles.itemText}>{listing.web}</Text>
                                    </View>
                                )}
                                {listing.facebook && (
                                    <View style={styles.listItem}>
                                        <Ionicons name='logo-facebook' size={24} color={Colors.primary} />
                                        <Text style={styles.itemText}>{listing.facebook}</Text>
                                    </View>
                                )}
                                {listing.schedule && (
                                    <View style={styles.listItem}>
                                        <Ionicons name='time' size={24} color={Colors.primary} />
                                        <Text style={styles.itemText}>{listing.schedule}</Text>
                                    </View>
                                )}
                            </View>

                            {/* DESCRIPCION */}
                            <View>
                                <Text style={styles.descriptionText}>{listing.description}</Text>
                            </View>
                            {/* FUNCIONES */}
                            <View>
                                {/* <Text style={styles.functionsTextTitle}>Funciones</Text> */}
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
                        </View>
                    </View>
                </ScrollView>
                {/* Lightbox Modal */}
                <Modal visible={isModalVisible} transparent={true} animationType='fade'>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {/* Modal Background */}
                        <Animated.View style={styles.modalContainer}>
                            {/* Botón para cerrar el modal */}
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modalClose}
                                activeOpacity={0.7} // Opcional: para agregar retroalimentación visual
                            >
                                <Ionicons name='close-circle' size={30} color={Colors.white} />
                            </TouchableOpacity>

                            {/* Contenido del modal (Zoom y Pan) */}
                            <GestureDetector gesture={pinchazoPantalla}>
                                <Animated.Image
                                    source={imageMap[listing.organigramaImage] || imageMap.non}
                                    style={[styles.modalImage, estiloAnimado]}
                                />
                            </GestureDetector>
                        </Animated.View>
                    </GestureHandlerRootView>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    organigramaContainer: {
        marginVertical: 10,
        flexDirection: 'column', // Cambia la dirección de los elementos a columna
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
    },
    organigramaText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Asegura que el texto está centrado dentro de su contenedor
    },
    iconOrganigrama: {
        textAlign: 'center',
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
        flex: 1, // Ocupa el espacio restante
        flexWrap: 'wrap', // Ajusta texto largo
        textAlign: 'justify',
    },
    functionItem: {
        flexDirection: 'row',
        alignItems: 'center',
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: width * 0.9,
        height: width * 0.9,
        resizeMode: 'contain',
    },
    modalClose: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
});

export default ListingJefaturaOneDetail;
