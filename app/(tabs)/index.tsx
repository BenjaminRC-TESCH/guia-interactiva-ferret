import React, { useCallback, useState } from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { TextVariables } from '@/constants/Texts';

const assetId = require('@/assets/video/tescha.mp4');

// Definir tipos para las props del modal
interface TermsAndConditionsModalProps {
    visible: boolean;
    onClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ visible, onClose }) => (
    <Modal visible={visible} animationType='fade' transparent>
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Términos y Condiciones</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.modalText}>
                        1. Aceptación de los términos{`\n`}
                        Al descargar, instalar y utilizar la aplicación interactiva del Tecnológico de Estudios Superiores de Chalco (en
                        adelante "la App"), aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con estos términos, no
                        descargues ni utilices la App.{`\n\n`}
                        2. Descripción de la App{`\n`}
                        La App es una herramienta informativa diseñada exclusivamente para los estudiantes y personal del TESCHA. Ofrece
                        datos sobre los servicios, horarios de atención, laboratorios, y otros recursos disponibles en la institución. La
                        App no recopila ni procesa datos personales de los usuarios.{`\n\n`}
                        3. Uso permitido{`\n`}• La App debe utilizarse únicamente con fines educativos e informativos relacionados con el
                        TESCHA.{`\n`}• Se prohíbe la modificación, descompilación, ingeniería inversa o distribución no autorizada de la
                        App.{`\n\n`}
                        4. Propiedad intelectual{`\n`}
                        Todos los derechos, títulos e intereses relacionados con la App, incluyendo diseño, código fuente y contenido, son
                        propiedad exclusiva del TESCHA. Queda estrictamente prohibido reproducir o usar cualquier parte de la App sin la
                        autorización previa y por escrito del TESCHA.{`\n\n`}
                        5. Limitación de responsabilidad{`\n`}
                        El TESCHA no se responsabiliza por:{`\n`}• Daños o perjuicios derivados del uso o imposibilidad de uso de la App.
                        {`\n`}• Errores en la información proporcionada.{`\n`}• Descargas de versiones no oficiales o alteradas de la App.
                        {`\n\n`}
                        6. Distribución de la App{`\n`}• La App se distribuye únicamente a través de la página oficial del TESCHA.{`\n`}•
                        Los usuarios son responsables de descargar el archivo APK desde esta fuente oficial para garantizar la autenticidad
                        y seguridad de la App.{`\n\n`}
                        7. Actualizaciones{`\n`}
                        El TESCHA puede realizar mejoras y actualizaciones en la App periódicamente. Se recomienda a los usuarios estar
                        atentos a la página oficial para obtener las versiones más recientes.{`\n\n`}
                        8. Uso indebido{`\n`}
                        El usuario se compromete a no utilizar la App de manera que:{`\n`}• Vulnere leyes locales, nacionales o
                        internacionales.{`\n`}• Afecte el funcionamiento adecuado de la App o comprometa su seguridad.{`\n\n`}
                        9. Terminación del acceso{`\n`}
                        El TESCHA se reserva el derecho de limitar o restringir el acceso a la App en caso de incumplimiento de estos
                        términos y condiciones.{`\n\n`}
                        10. Modificaciones{`\n`}
                        El TESCHA puede modificar estos términos en cualquier momento. Se notificará a los usuarios a través de la página
                        oficial de cualquier cambio significativo en los términos y condiciones.{`\n\n`}
                        Política de Privacidad{`\n`}
                        1. Introducción{`\n`}
                        Esta aplicación, desarrollada para el Tecnológico de Estudios Superiores de Chalco (TESCHA), tiene como objetivo
                        proporcionar información institucional relevante a los estudiantes, tales como números telefónicos, correos
                        electrónicos, horarios de atención y descripciones de servicios. Nos comprometemos a proteger la información
                        publicada y garantizar su uso adecuado conforme a las normativas vigentes.{`\n\n`}
                        2. Información que Recopilamos{`\n`}
                        La aplicación no recopila, almacena ni procesa datos personales de los usuarios que la utilizan. Toda la información
                        presentada es de carácter público y exclusivamente informativa.{`\n\n`}
                        3. Finalidad de la Información{`\n`}
                        Los datos publicados en la aplicación tienen las siguientes finalidades:{`\n`}• Facilitar el acceso de los
                        estudiantes a los servicios y departamentos del TESCHA.{`\n`}• Ofrecer información actualizada sobre horarios,
                        laboratorios y actividades académicas.{`\n`}• Mejorar la experiencia de los estudiantes mediante una herramienta
                        interactiva y accesible.{`\n\n`}
                        4. Derechos de los Usuarios{`\n`}
                        Los usuarios tienen derecho a:{`\n`}• Acceder a la información publicada en la aplicación de manera gratuita.{`\n`}•
                        Reportar cualquier anomalía o error en los datos mediante los canales oficiales del TESCHA.
                    </Text>
                </ScrollView>
                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                    <Text style={styles.buttonTermsText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

const Page = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(true);

    // Initialize video player
    const player = useVideoPlayer(assetId, (playerInstance) => {
        playerInstance.loop = true;
    });

    useFocusEffect(
        useCallback(() => {
            if (player && player.play) {
                player.replay();
                player.play();
            }

            return () => {
                if (player && player.pause) {
                    player.pause();
                }
            };
        }, [player])
    );

    const handleButtonGalery = () => {
        router.push({
            pathname: `/screens/galery`,
            params: { jefaturaId: 123 },
        });
    };

    const handleButtonTag = () => {
        router.push({
            pathname: `/screens/tag`,
            params: { jefaturaId: 123 },
        });
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                }}
            />
            <StatusBar translucent backgroundColor='transparent' />
            {/* Fondo de video */}
            <VideoView style={styles.backgroundVideo} player={player} allowsFullscreen nativeControls={false} contentFit='cover' />
            <View style={styles.content}>
                <View style={styles.bg}>
                    <Text style={styles.title}>{TextVariables.headers.home}</Text>
                    <Text style={styles.text}>{TextVariables.headers.homeDescription}</Text>
                    <TouchableOpacity style={styles.buttonGalery} onPress={handleButtonGalery}>
                        <Text style={styles.buttonText}>Galería histórica</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTag} onPress={handleButtonTag}>
                        <Text style={styles.buttonText}>Tramita tu marbete</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Modal */}
            <TermsAndConditionsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </>
    );
};

export default Page;

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    bg: {
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonGalery: {
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonTag: {
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.black,
    },
    buttonTermsText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.white,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '50%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        color: Colors.black,
        textAlign: 'justify',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: Colors.black,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});
