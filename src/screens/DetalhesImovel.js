import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

const DetalhesImovel = ({route}) => {
  const {imovel} = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(0);

  const handlePhotoPress = index => {
    setSelectedPhotoIndex(index);
    setModalVisible(true);
  };

  const renderImovelPhotos = () => {
    if (imovel && imovel.photos && imovel.photos.length > 0) {
      return imovel.photos.map((photo, index) => (
        <TouchableOpacity key={index} onPress={() => handlePhotoPress(index)}>
          <Image source={{uri: photo}} style={styles.imovelPhoto} />
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
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
          <Image
            source={{uri: imovel.photos[selectedPhotoIndex]}}
            style={styles.modalImage}
          />
        </View>
      </Modal>
      <Text style={styles.text}>Tipo de Imóvel: {imovel.tipoImovel}</Text>
      <Text style={styles.text}>Rua: {imovel.rua}</Text>
      <Text style={styles.text}>Bairro: {imovel.bairro}</Text>
      <Text style={styles.text}>Número: {imovel.numeroImovel}</Text>
      <Text style={styles.text}>Complemento: {imovel.complemento}</Text>
      <Text style={styles.text}>Tipo de Transação: {imovel.tipoTransacao}</Text>
      <Text style={styles.text}>Valor: R$ {imovel.valor}</Text>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default DetalhesImovel;
