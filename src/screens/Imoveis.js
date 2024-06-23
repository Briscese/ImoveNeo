import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/Header';

class Imoveis extends Component {
  state = {
    imoveis: [],
  };

  componentDidMount() {
    this.carregarImoveis();
  }

  carregarImoveis = () => {
    database()
      .ref('imoveis')
      .on('value', snapshot => {
        const imoveis = [];
        snapshot.forEach(childSnapshot => {
          const imovel = childSnapshot.val();
          if (imovel.tipoTransacao === 'Venda' || imovel.tipoTransacao === 'Aluguel') {
            imoveis.push({ ...imovel, id: childSnapshot.key });
          }
        });
        this.setState({ imoveis });
      });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('DetalhesImovel', { imovel: item });
      }}
    >
      <View style={styles.imovelContainer}>
        {item.photos && item.photos.length > 0 ? (
          <Image source={{ uri: item.photos[0] }} style={styles.imagem} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={styles.textoContainer}>
          <Text style={styles.texto}>{item.tipoTransacao}</Text>
          <Text style={styles.texto}>Tipo de Imovel: {item.tipoImovel}</Text>
          <Text style={styles.texto}>Rua: {item.rua}</Text>
          <Text style={styles.texto}>Numero do Imovel: {item.numeroImovel}</Text>
          <Text style={styles.texto}>R$ {item.valor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { imoveis } = this.state;

    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={imoveis}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  imovelContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imagem: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  placeholder: {
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  textoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  texto: {
    color:'#000000',
    fontSize: 16,
  },
  
});

export default Imoveis;
