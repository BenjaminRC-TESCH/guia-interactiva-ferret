// React Core
import React from 'react';

// React Native Core
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

// Expo
import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router';

// Iconos
import { Feather } from '@expo/vector-icons';

// Constants
import { Colors } from '@/constants/Colors';
import imageMap from '@/constants/imageMap';

// Data
import listingDataDepartamentos from '@/data/departamentos.json';
import listingDataEdificios from '@/data/edificios.json';
import listingDataLaboratorios from '@/data/laboratorios.json';
import listingDataPtc from '@/data/ptc.json';
import listingDataSalones from '@/data/salones.json';
import listingDataOthers from '@/data/otros.json';

// Dimensions
const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingBuildingDetails = () => {
    const { buildingId } = useLocalSearchParams();

    const router = useRouter();

    const buildingIdNumber = Array.isArray(buildingId) ? parseInt(buildingId[0]) : parseInt(buildingId);

    // Obtener datos del edificio
    const listing = listingDataEdificios.find((item) => item.id === buildingIdNumber);

    // Filtrar datos relacionados con el edificio
    const filteredSalones = listingDataSalones.filter((item) => item.building === buildingIdNumber);
    const filteredDepartamentos = listingDataDepartamentos.filter((item) => item.building === buildingIdNumber);
    const filteredLaboratorios = listingDataLaboratorios.filter((item) => item.building === buildingIdNumber);
    const filteredPtc = listingDataPtc.filter((item) => item.building === buildingIdNumber);
    const filterOthers = listingDataOthers.filter((item) => item.building === buildingIdNumber);

    const combinedResults = [...filteredSalones, ...filteredDepartamentos, ...filteredLaboratorios, ...filteredPtc, ...filterOthers];

    if (!listing) {
        return (
            <View style={styles.center}>
                <Text>No se encontró el departamento.</Text>
            </View>
        );
    }

    const getLinkForUnit = (item: any) => {
        if (item.name === 'Jefaturas de División en Ingeniería') {
            return { pathname: `/screens/jefatura`, params: { jefaturaId: item.id } };
        }

        if (item.name === 'Auditorios') {
            return { pathname: `/screens/auditorium`, params: { AuditoriosId: item.id } };
        }

        switch (item.unit) {
            case 'Departamentos':
                return { pathname: `/listing/department/[departmentId]`, params: { departmentId: item.id } };
            case 'Laboratorios':
                return { pathname: `/listing/laboratory/[laboratoryId]`, params: { laboratoryId: item.id } };
            case 'Salones':
                return { pathname: `/listing/classroom/[classroomId]`, params: { classroomId: item.id } };
            case 'PTC':
                return { pathname: `/listing/ptc/[ptcId]`, params: { ptcId: item.id } };
            case 'Otros':
                return { pathname: `/listing/others/[otherId]`, params: { otherId: item.id } };
            default:
                return { pathname: `/unknown/[id]`, params: { id: item.id } };
        }
    };

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
            <ScrollView>
                {/* IMAGEN DEL EDIFICIO */}
                <Image source={imageMap[listing.image] || imageMap.non} style={styles.image} />
                <View style={styles.container}>
                    {/* NOMBRE DEL EDIFICIO */}
                    <Text style={styles.title}>{listing.name}</Text>

                    {/* DESCRIPCION DEL EDIFICIO */}
                    <Text style={styles.description}>{listing.description}</Text>

                    {/* CARDS */}
                    {combinedResults.map((item, index) => (
                        <Link key={index} href={getLinkForUnit(item) as any} asChild>
                            <TouchableOpacity style={styles.itemCard}>
                                <Image style={styles.itemImage} source={imageMap[item.image] || imageMap.non} />
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default ListingBuildingDetails;

const styles = StyleSheet.create({
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
    container: {
        padding: 20,
        backgroundColor: Colors.background,
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
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginVertical: 20,
        marginBottom: 30,
        color: Colors.black,
        textAlign: 'justify',
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 15,
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 15,
    },
    itemText: {
        fontSize: 16, // Tamaño del texto
        color: Colors.black, // Color del texto
        fontWeight: 'bold', // Texto en negrita
        flex: 1, // Ocupar el espacio restante
        textAlign: 'center', // Alinear el texto a la izquierda
    },
});
