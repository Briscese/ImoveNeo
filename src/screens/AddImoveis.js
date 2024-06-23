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
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import { GOOGLE_MAPS_API_KEY } from './config';

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
  const [photos, setPhotos] = useState([]);
  const [tipoImovel, setTipoImovel] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [numeroImovel, setNumeroImovel] = useState('');
  const [complemento, setComplemento] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState('');
  const [valor, setValor] = useState('');
  const [markerPosition, setMarkerPosition] = useState({
    latitude: -23.55052,
    longitude: -46.633309,
  });

  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633309,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

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
        getCurrentLocation();
      } else {
        console.log('Permissão de localização negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition({ latitude, longitude });
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

  const handleMarkerDragEnd = e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    setRegion({ ...region, latitude, longitude });
    Geocoder.from(latitude, longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setLocalizacao(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const handleMapPress = e => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    setRegion({ ...region, latitude, longitude });
    Geocoder.from(latitude, longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setLocalizacao(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permissão para usar a câmera',
          message: 'O aplicativo precisa de permissão para usar sua câmera',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Você pode usar a câmera');
      } else {
        console.log('Permissão de câmera negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, response => {
      if (response.assets && response.assets.length > 0) {
        const newPhotos = response.assets.map(asset => asset.uri);
        setPhotos([...photos, ...newPhotos]);
      }
    });
  };

  const takePhoto = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    const result = await launchCamera(options);

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      const newPhotos = result.assets.map(asset => asset.uri);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const save = async () => {
    try {
      console.log('Salvando imóvel no Realtime Database e Storage');

      const photoURLs = [];

      for (const photo of photos) {
        const uploadUri = photo;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const task = storage().ref(filename).putFile(uploadUri);

        task.on('state_changed', snapshot => {
          console.log(
            'Progresso do upload: ',
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
        });

        await task;

        const photoURL = await storage().ref(filename).getDownloadURL();
        photoURLs.push(photoURL);
      }

      await database().ref('imoveis').push({
        tipoImovel,
        rua,
        bairro,
        localizacao,
        numeroImovel,
        complemento,
        tipoTransacao,
        valor,
        photos: photoURLs,
        region,
      });

      // Limpar os campos após salvar com sucesso
      setTipoImovel('');
      setRua('');
      setBairro('');
      setLocalizacao('');
      setNumeroImovel('');
      setComplemento('');
      setTipoTransacao('');
      setValor('');
      setPhotos([]);

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
        {photos.map((photo, index) => (
          <Image key={index} source={{uri: photo}} style={styles.photo} />
        ))}
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
          {label: 'Apartamento', value: 'Apartamento'},
          {label: 'Casa', value: 'Casa'},
          {label: 'Comercial', value: 'Comercial'},
        ]}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000000'}
        placeholder="Rua"
        value={rua}
        onChangeText={text => setRua(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        placeholderTextColor={'#000000'}
        value={bairro}
        onChangeText={text => setBairro(text)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000000'}
        placeholder="Número"
        value={numeroImovel}
        onChangeText={text => setNumeroImovel(text)}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000000'}
        placeholder="Complemento"
        value={complemento}
        onChangeText={text => setComplemento(text)}
      />

      <Text style={styles.label}>Tipo de Transação</Text>
      <RNPickerSelect
        onValueChange={value => setTipoTransacao(value)}
        items={[
          {label: 'Venda', value: 'Venda'},
          {label: 'Aluguel', value: 'Aluguel'},
        ]}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000000'}
        placeholder="Valor"
        value={valor}
        onChangeText={text => setValor(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Localização no Mapa</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
        onPress={handleMapPress} // Adicione esta linha
      >
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </MapView>

      <Button title="Adicionar Imovel" onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    color: '#000000',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  text: {
    color: '#000000', // Cor preta para texto global
    fontSize: 16,
  },
});

export default AddImoveis;
