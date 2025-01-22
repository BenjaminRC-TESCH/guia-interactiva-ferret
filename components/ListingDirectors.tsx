// React Core
import React, { useRef, useState } from 'react';

// React Native Core
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';

// Types
import { ListingTypeDirector } from '@/types/types';

// Constants
import imageMap from '@/constants/imageMap';

// Props del componente
type Props = {
    listings: ListingTypeDirector[];
};

const ListingDirectors = ({ listings }: Props) => {
    const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
    const flipAnimation = useRef(new Animated.Value(0)).current;

    // front card rotation
    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const flipToFrontStyle = {
        transform: [{ rotateY: frontInterpolate }],
    };

    // back card rotation
    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    const flipToBackStyle = {
        transform: [{ rotateY: backInterpolate }],
    };

    // card flip animation
    const flipCard = (index: number) => {
        // Verifica si la tarjeta ya está volteada o no
        setFlippedIndexes((prevState) => {
            if (prevState.includes(index)) {
                return prevState.filter((item) => item !== index); // Si está volteada, la desvolteamos
            } else {
                return [...prevState, index]; // Si no está volteada, la volteamos
            }
        });
    };

    return (
        <View style={styles.container}>
            {listings.map((director, index) => {
                const isFlipped = flippedIndexes.includes(index); // Verifica si la tarjeta actual está volteada

                const flipAnimation = useRef(new Animated.Value(0)).current;

                // front card rotation
                const frontInterpolate = flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                });

                const flipToFrontStyle = {
                    transform: [{ rotateY: frontInterpolate }],
                };

                // back card rotation
                const backInterpolate = flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '360deg'],
                });

                const flipToBackStyle = {
                    transform: [{ rotateY: backInterpolate }],
                };

                // card flip animation
                React.useEffect(() => {
                    if (isFlipped) {
                        Animated.spring(flipAnimation, {
                            toValue: 180,
                            friction: 8,
                            tension: 10,
                            useNativeDriver: true,
                        }).start();
                    } else {
                        Animated.spring(flipAnimation, {
                            toValue: 0,
                            friction: 8,
                            tension: 10,
                            useNativeDriver: true,
                        }).start();
                    }
                }, [isFlipped]);

                // Usar el imageMap para obtener la imagen
                const directorImage = imageMap[director.image];

                return (
                    <TouchableWithoutFeedback key={index} onPress={() => flipCard(index)}>
                        <View style={styles.cardContainer}>
                            {/* Front of the card */}
                            <Animated.View style={[styles.front, styles.card, flipToFrontStyle]}>
                                {directorImage && <Image style={styles.cardImage} source={directorImage} />}
                            </Animated.View>

                            {/* Back of the card */}
                            <Animated.View style={[styles.back, styles.card, flipToBackStyle]}>
                                <Text style={styles.text}>{director.name}</Text>
                                <Text style={styles.text}>{director.period}</Text>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 0, // Elimina los bordes redondeados
        resizeMode: 'cover', // Ajusta la imagen para cubrir todo el espacio
    },
    cardContainer: {
        width: width - 50,
        height: 300,
        marginBottom: 20,
        overflow: 'hidden', // Asegura que la imagen no se salga del contenedor
        borderRadius: 20, // Mantiene el borde redondeado del contenedor
    },
    front: {
        backgroundColor: '#092635',
    },
    back: {
        backgroundColor: '#5C8374',
    },
    card: {
        width: width - 50,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        position: 'absolute',
        backfaceVisibility: 'hidden',
    },
    text: {
        color: '#FFFFDD',
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
    },
    textBack: {
        color: '#FFFFDD',
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    },
});

export default ListingDirectors;
