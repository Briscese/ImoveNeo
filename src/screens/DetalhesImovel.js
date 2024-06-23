import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

const DetalhesImovel = ({ route, navigation }) => {
  const { imovel } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(0);

  const handlePhotoPress = index => {
    setSelectedPhotoIndex(index);
    setModalVisible(true);
  };

  const handleTransaction = () => {
    const newTipoTransacao = 'Indisponível';
    database()
      .ref(`imoveis/${imovel.id}`)
      .update({ tipoTransacao: newTipoTransacao })
      .then(() => {
        Alert.alert('Negócio Feito!', 'A propriedade foi marcada como indisponível.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Imoveis'),
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar a propriedade.');
        console.error('Erro ao atualizar a propriedade:', error);
      });
  };

  const renderImovelPhotos = () => {
    if (imovel && imovel.photos && imovel.photos.length > 0) {
      return imovel.photos.map((photo, index) => (
        <TouchableOpacity key={index} onPress={() => handlePhotoPress(index)}>
          <Image source={{ uri: photo }} style={styles.imovelPhoto} />
        </TouchableOpacity>
      ));
    } else {
      return <Text style={styles.noPhotoText}>Sem Fotos Disponíveis</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderImovelPhotos()}

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: imovel.photos[selectedPhotoIndex] }}
            style={styles.modalImage}
          />
        </View>
      </Modal>

      <Text style={styles.text}>Tipo de Imóvel:</Text>
      <Text style={styles.textValue}>{imovel.tipoImovel}</Text>

      <Text style={styles.text}>Rua:</Text>
      <Text style={styles.textValue}>{imovel.rua}</Text>

      <Text style={styles.text}>Bairro:</Text>
      <Text style={styles.textValue}>{imovel.bairro}</Text>

      <Text style={styles.text}>Número:</Text>
      <Text style={styles.textValue}>{imovel.numeroImovel}</Text>

      <Text style={styles.text}>Complemento:</Text>
      <Text style={styles.textValue}>{imovel.complemento}</Text>

      <Text style={styles.text}>Tipo de Transação:</Text>
      <Text style={styles.textValue}>{imovel.tipoTransacao}</Text>

      <Text style={styles.text}>Valor:</Text>
      <Text style={styles.textValue}>R$ {imovel.valor}</Text>

      {(imovel.tipoTransacao === 'Venda' || imovel.tipoTransacao === 'Aluguel') && (
        <TouchableOpacity style={styles.transactionButton} onPress={handleTransaction}>
          <Text style={styles.transactionButtonText}>
            {imovel.tipoTransacao === 'Venda' ? 'Comprar' : 'Alugar'}
          </Text>
        </TouchableOpacity>
      )}

      
      <Text style={styles.label}>Localização no Mapa:</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: imovel.region.latitude,
            longitude: imovel.region.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: imovel.region.latitude,
              longitude: imovel.region.longitude,
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imovelPhoto: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  noPhotoText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
  },
  text: {
    fontSize: 18,
    color: '#4286f4',
    marginBottom: 5,
  },
  textValue: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },
  transactionButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4286f4',
    borderRadius: 5,
  },
  transactionButtonText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default DetalhesImovel;
