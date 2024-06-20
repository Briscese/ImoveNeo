import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from './config';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

Geocoder.init(GOOGLE_MAPS_API_KEY);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});

function AddImoveis() {
  const [photo, setPhoto] = useState(null);
  const [tipoImovel, setTipoImovel] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [numeroImovel, setNumeroImovel] = useState('');
  const [complemento, setComplemento] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState('');
  const [valor, setValor] = useState('');
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633309,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({ ...region, latitude, longitude });
        Geocoder.from(latitude, longitude)
          .then(json => {
            const addressComponent = json.results[0].formatted_address;
            setLocalizacao(addressComponent);
          })
          .catch(error => console.warn(error));
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização do Imovelneo App',
          message:
            'O Imovelneo App precisa de acesso à sua localização para encontrar a localização do seu imóvel.',
          buttonNeutral: 'Perguntar Mais Tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de localização concedida');
        getCurrentLocation(); // Chama a função para obter a localização atual
      } else {
        console.log('Permissão de localização negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const save = async () => {
    try {
      console.log('Salvando imóvel no Realtime Database e Storage');
      
      // Upload da foto para o Firebase Storage
      const uploadUri = photo;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const task = storage().ref(filename).putFile(uploadUri);
      
      // Monitorar o progresso do upload
      task.on('state_changed', snapshot => {
        console.log('Progresso do upload: ', (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      });

      // Esperar o upload completar
      await task;

      // Obter a URL da foto salva no Storage
      const photoURL = await storage().ref(filename).getDownloadURL();

      // Salvar os dados no Realtime Database
      await database().ref('imoveis').push({
        tipoImovel,
        rua,
        bairro,
        localizacao,
        numeroImovel,
        complemento,
        tipoTransacao,
        valor,
        photo: photoURL,
        region
      });

      Alert.alert('Sucesso', 'Imóvel cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o imóvel.');
      console.error('Erro ao salvar imóvel: ', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Foto do Imóvel</Text>
      <View style={styles.photoContainer}>
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={selectPhoto}>
            <Text>Selecionar da Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.label}>Tipo de Imóvel</Text>
      <RNPickerSelect
        onValueChange={value => setTipoImovel(value)}
        items={[
          { label: 'Casa', value: 'casa' },
          { label: 'Apartamento', value: 'apartamento' },
          { label: 'Sala Comercial', value: 'sala_comercial' },
          { label: 'Terreno', value: 'terreno' },
        ]}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>Rua</Text>
      <TextInput style={styles.input} value={rua} onChangeText={setRua} />
      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />
      <Text style={styles.label}>Localização</Text>
      <View style={styles.locationContainer}>
        <TextInput
          style={styles.input}
          value={localizacao}
          onChangeText={setLocalizacao}
        />
        <Button title="Usar localização atual" onPress={getCurrentLocation} />
      </View>
      <Text style={styles.label}>Número do Imóvel</Text>
      <TextInput
        style={styles.input}
        value={numeroImovel}
        onChangeText={setNumeroImovel}
      />
      <Text style={styles.label}>Complemento</Text>
      <TextInput
        style={styles.input}
        value={complemento}
        onChangeText={setComplemento}
      />
      <Text style={styles.label}>Tipo de Negociação</Text>
      <RNPickerSelect
        onValueChange={value => setTipoTransacao(value)}
        items={[
          { label: 'Aluguel', value: 'aluguel' },
          { label: 'Venda', value: 'venda' },
        ]}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>
        Valor ({tipoTransacao === 'aluguel' ? 'Aluguel' : 'Venda'})
      </Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <Button title="Cadastrar Imóvel" onPress={save} />
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}>
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  map: {
    height: 200,
    marginTop: 20,
  },
});

export default AddImoveis;
