import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';

export default function AddImoveis() {
    const [photo, setPhoto] = useState(null);
    const [tipoImovel, setTipoImovel] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [numeroImovel, setNumeroImovel] = useState('');
    const [complemento, setComplemento] = useState('');
    const [tipoTransacao, setTipoTransacao] = useState('');
    const [valor, setValor] = useState('');

    const selectPhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setPhoto(response.assets[0].uri);
            }
        });
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setPhoto(response.assets[0].uri);
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Foto do Imóvel</Text>
            <View style={styles.photoContainer}>
                {photo && <Image source={{ uri: photo }} style={styles.photo} />}
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={selectPhoto}>
                        <Text>Selecionar da Galeria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text>Tirar Foto</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.label}>Tipo de Imóvel</Text>
            <RNPickerSelect
                onValueChange={(value) => setTipoTransacao(value)}
                items={[
                    { label: 'Casa', value: 'casa' },
                    { label: 'Apartemento', value: 'apartamento' },
                    { label: 'Sala Comercial', value: 'sala_comercial'},
                    { label: 'Terreno', value: 'terreno'}
                ]}
                style={pickerSelectStyles}
            />
            <Text style={styles.label}>Rua</Text>
            <TextInput 
                style={styles.input} 
                value={rua} 
                onChangeText={setRua} 
            />
            <Text style={styles.label}>Bairro</Text>
            <TextInput 
                style={styles.input} 
                value={bairro} 
                onChangeText={setBairro} 
            />
            <Text style={styles.label}>Localização</Text>
            <TextInput 
                style={styles.input} 
                value={localizacao} 
                onChangeText={setLocalizacao} 
            />
            <Text style={styles.label}>Número do Imóvel</Text>
            <TextInput 
                style={styles.input} 
                value={numeroImovel} 
                onChangeText={setNumeroImovel} 
            />
            <Text style={styles.label}>Complemento</Text>
            <TextInput 
                style={styles.input} 
                value={complemento} 
                onChangeText={setComplemento} 
            />
            <Text style={styles.label}>Tipo de Negociação</Text>
            <RNPickerSelect
                onValueChange={(value) => setTipoTransacao(value)}
                items={[
                    { label: 'Aluguel', value: 'aluguel' },
                    { label: 'Venda', value: 'venda' },
                ]}
                style={pickerSelectStyles}
            />
            <Text style={styles.label}>Valor ({tipoTransacao === 'aluguel' ? 'Aluguel' : 'Venda'})</Text>
            <TextInput 
                style={styles.input} 
                value={valor} 
                onChangeText={setValor} 
                keyboardType="numeric"
            />
            <Button title="Cadastrar Imóvel" onPress={() => { /* Lógica para salvar imóvel */ }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#ddd',
        alignItems: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 20,
    },
});
