// React Core
import React, { useState } from 'react';

// React Native Core
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image, Dimensions, Modal } from 'react-native';

// Iconos
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

// Routing
import { Stack, useRouter } from 'expo-router';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';

// Data
import infoDirectors from '@/data/director.json';

// Components
import ListingDirectors from '@/components/ListingDirectors';

// Gesture Handling
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Asset
const backgroundImage = require('@/assets/images/app_fondo_3_blur.jpg');
const diagramaGeneral = require('@/assets/images/organigrama_general.jpg');

const scheduleAppointment = () => {
    const router = useRouter();

    const [isModalVisible, setModalVisible] = useState(false); // Estado para el modal

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
            <ImageBackground source={backgroundImage} style={styles.container} resizeMode='cover'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>{TextVariables.headers.organigramaGeneral}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={diagramaGeneral} style={styles.imageDiagramaGeneral} />
                    </TouchableOpacity>

                    <Text style={styles.subTitle}>{TextVariables.headers.galery}</Text>
                    <ListingDirectors listings={infoDirectors} />
                </ScrollView>
            </ImageBackground>

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
                                source={diagramaGeneral || require('../../assets/images/non.jpg')}
                                style={[styles.modalImage, estiloAnimado]}
                            />
                        </GestureDetector>
                    </Animated.View>
                </GestureHandlerRootView>
            </Modal>
        </>
    );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
    },
    title: {
        paddingTop: 80,
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        marginBottom: 20,
        textAlign: 'center',
    },
    subTitle: {
        paddingTop: 20,
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        textAlign: 'center',
    },
    backIcon: {
        backgroundColor: Colors.white,
        padding: 6,
        borderRadius: 10,
    },
    imageDiagramaGeneral: {
        width: width - 50,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
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

export default scheduleAppointment;
