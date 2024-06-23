import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import { Gravatar } from 'react-native-gravatar';

import icon from '../../assets/img/icon.png';

class Header extends Component {
  render() {
    const name = this.props.name || 'Anonimo';
    const photoURL = this.props.photoURL;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image source={icon} style={styles.image} />
          <Text style={styles.title}>Imovel Neo</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.user}>{name}</Text>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.avatar} />
          ) : (
            this.props.email && (
              <Gravatar
                options={{ email: this.props.email, secure: true }}
                style={styles.avatar}
              />
            )
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    color: '#000',
    height: 30,
    fontSize: 28,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontSize: 10,
    color: '#888',
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 15, // Para tornar a imagem circular
  },
});

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
    photoURL: user.photoURL, // Adicione esta linha para obter a URL da foto do perfil
  };
};

export default connect(mapStateToProps)(Header);
