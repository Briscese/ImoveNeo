import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { connect } from "react-redux";
import { login, logout } from "../store/actions/user";

GoogleSignin.configure({
  webClientId: '503567233419-vi2e7ic4j3ece78hcbjnc0hjl1os96ot.apps.googleusercontent.com',
  offlineAccess: true,
});

class Profile extends Component {
  state = {
    userInfo: null,
  };

  componentDidMount() {
    this._isSignedIn();
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      this._getCurrentUserInfo();
    }
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
      this.props.onLogin(userInfo.user);
    } catch (error) {
      console.log("Error fetching user info:", error);
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // Usuário ainda não está logado
      } else {
        Alert.alert('Erro ao buscar informações do usuário');
      }
    }
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      this.props.onLogin(userInfo.user);
    } catch (error) {
      console.log("Error signing in:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // Login cancelado pelo usuário
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Login em andamento
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services não disponível');
      } else {
        Alert.alert('Erro ao fazer login');
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null });
      this.props.onLogout();
    } catch (error) {
      Alert.alert('Erro ao sair');
    }
  };

  render() {
    const { userInfo } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {userInfo ? (
          <>
            <Image source={{ uri: userInfo.user.photo }} style={styles.avatar} />
            <Text style={styles.name}>{userInfo.user.name}</Text>
            <Text style={styles.email}>{userInfo.user.email}</Text>
            <TouchableOpacity onPress={this._signOut} style={styles.button}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </>
        ) : (
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
          />
        )}
      </ScrollView>
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
    borderRadius: 75,
    marginBottom: 20,
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userInfo => dispatch(login(userInfo)),
    onLogout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Profile);
