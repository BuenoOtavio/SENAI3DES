import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image, Animated, Switch, ScrollView } from 'react-native';
import { db, storage } from '../firebaseconfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Viagens() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Bold': Poppins_700Bold,
  });

  if (!fontsLoaded) return null;
  
  const [tituloViagem, settituloViagem] = useState('');
  const [descricao, setDesc] = useState('');
  const [data, setData] = useState('');
  const [localizacao, setLocal] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [Viagems, setViagems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingViagemId, setEditingViagemId] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const ViagemIcons = ['plane']; // Definição de ícones

  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) return null;

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `Viagem/${filename}`);

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const adicionarOuAtualizarViagem = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      if (editingViagemId) {
        const ViagemRef = doc(db, 'Viagems', editingViagemId);
        await updateDoc(ViagemRef, {
          titulo: tituloViagem,
          descricao: descricao,
          data: data,
          localizacao: localizacao,
          imageUrl: imageUrl || null
        });
        alert('Viagem atualizado com sucesso!');
        setEditingViagemId(null);
      } else {
        await addDoc(collection(db, 'Viagems'), {
          titulo: tituloViagem,
          descricao: descricao,
          data: data,
          localizacao: localizacao,
          icon: ViagemIcons[Math.floor(Math.random() * ViagemIcons.length)],
          imageUrl: imageUrl || null
        });
        alert('Viagem adicionado com sucesso!');
      }

      settituloViagem('');
      setDesc('');
      setData('');
      setLocal('');
      setImageUri(null);
      fetchViagems();
    } catch (e) {
      console.error("Erro ao salvar Viagem: ", e);
    } finally {
      setLoading(false);
    }
  };


  const fetchViagems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Viagems'));
      const ViagemsList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setViagems(ViagemsList);
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
    } catch (e) {
      console.error("Erro ao buscar Viagems: ", e);
    }
  };

  const editarViagem = (Viagem) => {
    settituloViagem(Viagem.titulo);
    setDesc(Viagem.descricao)
    setData(Viagem.data)
    setLocal(Viagem.localizacao)
    setImageUri(Viagem.imageUrl || null);
    setEditingViagemId(Viagem.id);
  };
  const excluirViagem = async (ViagemId) => {
    try {
      await deleteDoc(doc(db, 'Viagems', ViagemId));
      alert('Viagem excluído com sucesso!');
      fetchViagems();
    } catch (e) {
      console.error("Erro ao excluir Viagem: ", e);
    }
  };

  useEffect(() => {
    fetchViagems();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>NewTravel</Text>

      <Text style={styles.label}>Titulo da Viagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o Titulo da Viagem"
        value={tituloViagem}
        onChangeText={settituloViagem}
      />

      <Text style={styles.label}>Descrição do Viagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a Descrição da Viagem"
        value={descricao}
        onChangeText={setDesc}
      />

      <Text style={styles.label}>Data da Viagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a data da Viagem"
        value={data}
        onChangeText={setData}
      />

      <Text style={styles.label}>Localização da Viagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a localização da Viagem"
        value={localizacao}
        onChangeText={setLocal}
      />

      <Button
        title="Selecionar Imagem"
        onPress={selecionarImagem}
        color="#004d40"
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button
        title={loading ? "Salvando..." : editingViagemId ? "Atualizar Viagem" : "Adicionar Viagem"}
        onPress={adicionarOuAtualizarViagem}
        color="#8ac66d"
      />

      <Text style={styles.sectionTitle}>Lista de Viagens</Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          data={Viagems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ViagemItem}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.ViagemImage} />
              ) : (
                <Icon name={item.icon || 'plane'} size={50} color="#8a2be2" style={styles.ViagemIcon} />
              )}
              <View style={styles.ViagemDetails}>
                <Text style={styles.ViagemTitulo}>{item.titulo}</Text>
                <Text style={styles.ViagemDescricao}>{item.descricao}</Text>
                <Text style={styles.ViagemData}>{item.data}</Text>
                <Text style={styles.ViagemLocalizacao}>{item.localizacao}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => editarViagem(item)} style={styles.actionButton}>
                  <Icon name="edit" size={25} color="#004d40" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirViagem(item.id)} style={styles.actionButton}>
                  <Icon name="trash" size={25} color="#8ac66d" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',  // Cor de fundo sutil
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d40',  // Cor do título para consistência
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#004d40',
    marginBottom: 8,
  },
  input: {
    borderColor: '#004d40',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    color: '#004d40',
    backgroundColor: '#ffffff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 15,
    borderRadius: 12,
    borderColor: '#8ac66d',
    borderWidth: 1.5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginVertical: 15,
  },
  ViagemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  ViagemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
  },
  ViagemIcon: {
    fontSize: 40,
    color: '#8ac66d',
    marginRight: 15,
  },
  ViagemDetails: {
    flex: 1,
  },
  ViagemTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40',
  },
  ViagemDescricao: {
    fontSize: 14,
    color: '#004d40',
  },
  ViagemData: {
    fontSize: 12,
    color: '#547699',
  },
  ViagemLocalizacao: {
    fontSize: 12,
    color: '#547699',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    marginHorizontal: 8,
  },
});
