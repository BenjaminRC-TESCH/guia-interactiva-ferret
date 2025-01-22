// React Core
import React, { useState } from 'react';

// React Native Core
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image, Dimensions, Modal } from 'react-native';

// Iconos
import { Feather, Entypo } from '@expo/vector-icons';

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

const tag = () => {
    const router = useRouter();
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
                    <Text style={styles.title}>{TextVariables.headers.marbete}</Text>
                    <Text style={styles.warning}>¡¡Atención!!</Text>
                    <Text style={styles.description}>
                        Para entrar al tecnológico con tu moto o automóvil, debes mostrar tu marbete en la entrada y salida al personal de
                        vigilancia.
                    </Text>
                    <Text style={styles.description}>
                        Acude al Departamento de Subdirección de Administración, en el edificio Nezahualcóyotl, planta alta, en el área de
                        oficinas.
                    </Text>
                    <Text style={styles.secondary}>Trámite de marbete para automóvil o motocicleta.</Text>
                    <Text style={styles.description}>
                        Documentos necesarios para tramitar tu marbete en 1 copia y original para cotejo de:
                    </Text>
                    <View style={styles.containerFunctions}>
                        <View style={styles.item}>
                            <Entypo name='dot-single' size={24} color='black' />
                            <Text style={styles.requirements}>Tarjeta de circulación</Text>
                        </View>
                        <View style={styles.item}>
                            <Entypo name='dot-single' size={24} color='black' />
                            <Text style={styles.requirements}>INE</Text>
                        </View>
                        <View style={styles.item}>
                            <Entypo name='dot-single' size={24} color='black' />
                            <Text style={styles.requirements}>Credencial institucional</Text>
                        </View>
                        <View style={styles.item}>
                            <Entypo name='dot-single' size={24} color='black' />
                            <Text style={styles.requirements}>2 fotografías tamaño infantil (a color o en blanco y negro)</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.sheduleTittle}>Horario de atención</Text>
                        <Text style={styles.sheduleDescription}>Lunes a viernes</Text>
                        <Text style={styles.sheduleDescription}>De 10:00 a 14:00 hrs y de 16:00 a 18:00 hrs.</Text>
                    </View>
                </ScrollView>
            </ImageBackground>
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
    backIcon: {
        backgroundColor: Colors.white,
        padding: 6,
        borderRadius: 10,
    },
    warning: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.warning,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'justify',
        marginBottom: 10,
    },
    secondary: {
        fontSize: 16,
        color: Colors.secondary,
        textAlign: 'justify',
        marginBottom: 10,
    },
    containerFunctions: {},
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        color: '#000',
        marginRight: 8,
    },
    requirements: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'justify',
        marginBottom: 10,
    },
    sheduleTittle: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 10,
    },
    sheduleDescription: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
    },
});

export default tag;
