// React Core
import React from 'react';

// React Native Core
import { Text, StyleSheet, ImageBackground } from 'react-native';

// Expo
import { Stack } from 'expo-router';

// Constants
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';

// Components
import ListingBuild from '@/components/ListingBuild';

// Data
import ListingData from '@/data/edificios.json';

// Assets
const backgroundImage = require('@/assets/images/app_fondo_3_blur.jpg');

const builds = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />

            <ImageBackground source={backgroundImage} style={styles.container} resizeMode='cover'>
                <Text style={styles.headerText}>{TextVariables.headers.building}</Text>

                {/* <ListingDepartment listings={ListingData} category={category} /> */}

                <ListingBuild listings={ListingData} />
            </ImageBackground>
        </>
    );
};

export default builds;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
    },
    headerText: {
        paddingTop: 40,
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        marginBottom: 20,
        textAlign: 'center',
    },
    searchSectionWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        borderRadius: 8,

        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.black,
    },
});
