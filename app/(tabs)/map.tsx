// React Core
import React from 'react';

// React Native Core
import { View, Image, StyleSheet, TouchableOpacity, Text, ImageBackground, Alert, ScrollView } from 'react-native';

// Expo
import { Stack, useRouter } from 'expo-router';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';

// Assets
const mapaTescha = require('@/assets/images/tescha_mapa.png');
const backgroundImage = require('@/assets/images/app_fondo_3_blur.jpg');

const map = () => {
    const router = useRouter();

    const edificios = [
        { id: 1, name: 'Nezahualcóyotl' },
        { id: 2, name: 'José María Morelos y Pavón' },
        { id: 3, name: 'Bicentenario de la Independencia' },
        { id: 4, name: 'Centenario de la Revolución' },
        { id: 5, name: 'Sor Juana Inés de la Cruz' },
        { id: 6, name: 'Entre Ejes' },
        { id: 7, name: 'Biblioteca' },
        { id: 8, name: 'Salones cancha de basquetbol' },
        { id: 9, name: 'Auditorio' },
        { id: 10, name: 'Estacionamiento' },
        { id: 15, name: 'Cafetería' },
    ];

    const markers = [
        { id: 1, xPercent: 75, yPercent: 38 },
        { id: 2, xPercent: 71, yPercent: 83 },
        { id: 3, xPercent: 47, yPercent: 70 },
        { id: 4, xPercent: 43, yPercent: 28 },
        { id: 5, xPercent: 25, yPercent: 70 },
        { id: 6, xPercent: 83, yPercent: 69 },
        { id: 7, xPercent: 8, yPercent: 64 },
        { id: 8, xPercent: 87, yPercent: 25 },
        { id: 9, xPercent: 29, yPercent: 49 },
        { id: 10, xPercent: 73, yPercent: 20 },
        { id: 15, xPercent: 45, yPercent: 49 },
    ];

    const handleMarkerPress = (markerId: number) => {
        // Condiciones específicas para ciertos marcadores
        if (markerId === 10) {
            router.push({
                pathname: `/screens/parking`,
            });
        } else if (markerId === 9) {
            router.push({
                pathname: `/screens/auditorium`,
            });
        } else if (markerId === 15) {
            router.push({
                pathname: `/listing/others/[otherId]`,
                params: { otherId: markerId },
            });
        } else {
            // Navegar para otros marcadores
            router.push({
                pathname: `/listing/building/[buildingId]`,
                params: { buildingId: markerId },
            });
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
            <ImageBackground source={backgroundImage} style={styles.container}>
                <Text style={styles.headerText}>{TextVariables.headers.map}</Text>

                <ScrollView>
                    <View style={styles.containerInfo}>
                        <Text style={[styles.textCenter, { fontSize: 20, color: 'black', fontWeight: 'bold' }]}>LOCALIZA TU SERVICIO</Text>
                        <Text style={[styles.textCenter, { fontSize: 16, color: 'black' }]}>
                            Descubre cada rincón del Tecnológico con nuestro Mapa, diseñado para facilitar tu recorrido por las
                            instalaciones. Con un simple clic en cualquier área, podrás acceder a información detallada sobre cada lugar,
                            desde auditorios hasta laboratorios.
                        </Text>
                        <Text style={[styles.textCenter, { fontSize: 16, color: 'black', marginTop: 10 }]}>
                            ¡Explora, conoce y encuentra todo lo que necesitas!
                        </Text>
                    </View>

                    {/* Contenedor de la Imagen */}
                    <View style={styles.imageContainer}>
                        <Image source={mapaTescha} style={styles.mapImage} />
                        {markers.map((marker) => (
                            <TouchableOpacity
                                key={marker.id}
                                style={[
                                    styles.marker,
                                    {
                                        top: `${marker.yPercent}%`,
                                        left: `${marker.xPercent}%`,
                                    },
                                ]}
                                onPress={() => handleMarkerPress(marker.id)}>
                                <View style={styles.markerIcon}>
                                    <Text style={styles.markerText}>{marker.id}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Contenedor de la Tabla */}
                    <View style={styles.edificiosContainer}>
                        <Text style={styles.tableTitle}>Listado de Edificios</Text>

                        {edificios.map((edificio) => (
                            <TouchableOpacity key={edificio.id} onPress={() => handleMarkerPress(edificio.id)}>
                                <View key={edificio.id} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{edificio.id}</Text>
                                    <Text style={styles.tableCell}>{edificio.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        marginTop: 20,
        backgroundColor: Colors.white,
        margin: 10,
        padding: 10,
    },
    textCenter: {
        textAlign: 'center',
    },
    headerText: {
        paddingTop: 40,
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        textAlign: 'center',
    },
    imageContainer: {
        height: 300, // Tamaño fijo para evitar que se expanda
        marginVertical: 10,
    },
    mapImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    marker: {
        position: 'absolute',
    },
    markerIcon: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    edificiosContainer: {
        flex: 1, // Permitir que este contenedor ocupe el resto del espacio
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    scrollContainer: {
        maxHeight: 200, // Límite para el scroll de la tabla
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        fontSize: 16,
        color: 'black',
    },
});

export default map;
