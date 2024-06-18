import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from "react-redux";
import { login } from "../store/actions/user";

class Login extends Component {
    state = {
        name:'Temporario',
        email: '',
        password: '',
        endereco: 'Rua do teste, 123',
        telefonecelular: '123456789'
    };

    login = () => {
        console.log("Login Data:", { ...this.state });
        this.props.onLogin({ ...this.state });
        this.props.navigation.replace('ProfileScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input}
                    autoFocus={true} keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                <TextInput placeholder="Senha" style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState({ password })} />
                <TouchableOpacity onPress={this.login} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Registro')
                }} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Criar nova conta.
                    </Text>
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
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: "#333"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    };
};

export default connect(null, mapDispatchToProps)(Login);
