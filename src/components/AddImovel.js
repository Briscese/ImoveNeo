import React, {Component} from "react";
import {View, Text, StyleSheet,ScrollView, TextInput, TouchableNativeFeedback as TWF, Alert} from "react-native";

import { Picker } from '@react-native-picker/picker';


class AddImovel extends Component {
    state = {
        propertyType: '',
        street: '',
        neighborhood: '',
        location: '',
        propertyNumber: '',
        complement: '',
        saleOrRent: ''
    }

    handleAddProperty = () => {
        Alert.alert('Imóvel adicionado!', this.state.propertyType);
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <Picker
                    selectedValue={this.state.propertyType}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({propertyType: itemValue})
                    }>
                    <Picker.Item label="Casa" value="casa" />
                    <Picker.Item label="Apartamento" value="apartamento" />
                    <Picker.Item label="Casa em Condominio" value="casa_condominio" />
                </Picker>
                <TextInput placeholder='Rua' style={styles.input} value={this.state.street} onChangeText={street => this.setState({street})} />
                <TextInput placeholder='Bairro' style={styles.input} value={this.state.neighborhood} onChangeText={neighborhood => this.setState({neighborhood})} />
                <TextInput placeholder='Localização' style={styles.input} value={this.state.location} onChangeText={location => this.setState({location})} />
                <TextInput placeholder='Número do Imóvel' style={styles.input} value={this.state.propertyNumber} onChangeText={propertyNumber => this.setState({propertyNumber})} />
                <TextInput placeholder='Complemento' style={styles.input} value={this.state.complement} onChangeText={complement => this.setState({complement})} />
                <Picker
                    selectedValue={this.state.saleOrRent}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({saleOrRent: itemValue})
                    }>
                    <Picker.Item label="Aluguel" value="aluguel" />
                    <Picker.Item label="Venda" value="venda" />
                </Picker>
                <TWF onPress={this.handleAddProperty}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar Imóvel</Text>
                    </View>
                </TWF>
                <View style={{ height: 40 }} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    }
});

export default AddImovel;