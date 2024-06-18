// Profile.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/user";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gravatar } from 'react-native-gravatar';

class Profile extends Component {
    logout = () => {
        this.props.onLogout();
        this.props.navigation.replace('Auth');
    }

    componentDidMount() {
        console.log('Profile component props:', this.props);
    }

    render() {
        const { email, name, endereco, telefonecelular } = this.props;
        const options = { email, secure: true };
        
        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
                <View style={styles.endereco}>
                    <Text>{endereco}</Text>                   
                </View>
                <View style={styles.telefonecelular}>
                    <Text>{telefonecelular}</Text>
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
    name: {
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

const mapStateToProps = (state) => {
    const { email, name, endereco, telefonecelular } = state.user || {};
    return { email, name, endereco, telefonecelular };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
