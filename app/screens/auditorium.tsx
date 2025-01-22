// React Core
import React from 'react';

// React Native Core
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

// Iconos
import { Feather } from '@expo/vector-icons';

// Routing
import { Stack, useRouter } from 'expo-router';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';

// Data
import ListingDataAuditorium from '@/data/auditorios.json';

// Components
import ListingAuditorium from '@/components/ListingAuditorium';

// assets
const background = require('@/assets/images/app_fondo_3_blur.jpg');

const auditorium = () => {
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

            <ImageBackground source={background} style={styles.container} resizeMode='cover'>
                <Text style={styles.headerText}>{TextVariables.headers.auditorium}</Text>

                <ListingAuditorium listings={ListingDataAuditorium} />
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
    },
    headerText: {
        paddingTop: 60,
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
});

export default auditorium;
