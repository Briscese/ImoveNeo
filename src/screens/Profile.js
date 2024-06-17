import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gravatar } from 'react-native-gravatar';

class Profile extends Component {
    logout = () => {
        this.props.navigation.replace('Auth');
    }
    

    render() {
        const options = { email: 'gabriel@gmail.com', secure: true };
        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.nickname}>Briscese</Text>
                <Text style={styles.email}>gabriel@gmail.com</Text>
                <View style={styles.endereco}>
                    <Text>Rua: Rua do Desenvolvedor</Text>
                    <Text>Bairro: Centro</Text>
                    <Text>Localização: São Paulo</Text>
                </View>
                <View style={styles.telefonecelular}>
                    <Text>Telefone: (12) 9999-9999</Text>
                    <Text>Celular: (12) 9999-9999</Text>
                </View>
                <TouchableOpacity onPress={this.logout} style={styles.button}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    nickname: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    email: {
        marginTop: 20,
        fontSize: 25
    },
    endereco: {
        marginTop: 30,
        padding: 10,
    },
    telefonecelular: {
        marginTop: 30,
        padding: 10,
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    }
});

export default Profile;
