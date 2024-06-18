import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

class Registro extends Component {
    state = {
        name: '',
        nickname: '',
        rua: '',
        bairro: '',
        localizacao: '',
        telefonecelular: '',
        email: '',
        password: ''
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Nome"
                    style={styles.input}
                    autoFocus={true}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput
                    placeholder="Apelido"
                    style={styles.input}
                    value={this.state.nickname}
                    onChangeText={nickname => this.setState({ nickname })}
                />
                <TextInput
                    placeholder="Rua"
                    style={styles.input}
                    value={this.state.rua}
                    onChangeText={rua => this.setState({ rua })}
                />
                <TextInput
                    placeholder="Bairro"
                    style={styles.input}
                    value={this.state.bairro}
                    onChangeText={bairro => this.setState({ bairro })}
                />
                <TextInput
                    placeholder="Localização"
                    style={styles.input}
                    value={this.state.localizacao}
                    onChangeText={localizacao => this.setState({ localizacao })}
                />
                <TextInput
                    placeholder="Telefone Celular"
                    style={styles.input}
                    value={this.state.telefonecelular}
                    onChangeText={telefonecelular => this.setState({ telefonecelular })}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    placeholder="Senha"
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15,
    },
});

export default Registro;
