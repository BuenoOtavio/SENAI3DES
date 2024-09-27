import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image, Animated, Switch, ScrollView } from 'react-native';
import { db, storage } from './firebaseconfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingLivroId, setEditingLivroId] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [isRead, setIsRead] = useState(false);
  const livroIcons = ['book', 'bookmark', 'book-open']; // Definição de ícones

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
    const storageRef = ref(storage, `livro/${filename}`);

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const adicionarOuAtualizarLivro = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      if (editingLivroId) {
        const livroRef = doc(db, 'livros', editingLivroId);
        await updateDoc(livroRef, {
          nome: nomeLivro,
          autor: autor,
          ano: ano,
          editora: editora,
          isRead: isRead,
          imageUrl: imageUrl || null
        });
        alert('livro atualizado com sucesso!');
        setEditingLivroId(null);
      } else {
        await addDoc(collection(db, 'livros'), {
          nome: nomeLivro,
          autor: autor,
          ano: ano,
          editora: editora,
          isRead: isRead,
          icon: livroIcons[Math.floor(Math.random() * livroIcons.length)],
          imageUrl: imageUrl || null
        });
        alert('livro adicionado com sucesso!');
      }

      setNomeLivro('');
      setAutor('');
      setAno('');
      setEditora('');
      setImageUri(null);
      setIsRead(false);
      fetchLivros();
    } catch (e) {
      console.error("Erro ao salvar livro: ", e);
    } finally {
      setLoading(false);
    }
  };


  const fetchLivros = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'livros'));
      const livrosList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setLivros(livrosList);
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
    } catch (e) {
      console.error("Erro ao buscar livros: ", e);
    }
  };

  const editarLivro = (livro) => {
    setNomeLivro(livro.nome);
    setAutor(livro.autor);
    setAno(livro.ano);
    setEditora(livro.editora);
    setImageUri(livro.imageUrl || null);
    setIsRead(livro.isRead); // Update the isRead state
    setEditingLivroId(livro.id);
  };
  const excluirLivro = async (livroId) => {
    try {
      await deleteDoc(doc(db, 'livros', livroId));
      alert('livro excluído com sucesso!');
      fetchLivros();
    } catch (e) {
      console.error("Erro ao excluir livro: ", e);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>LivrosLidos</Text>

      <Text style={styles.label}>Nome do livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        value={nomeLivro}
        onChangeText={setNomeLivro}
      />

      <Text style={styles.label}>Autor do livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o autor do livro"
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={styles.label}>Ano do livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ano do livro"
        value={ano}
        onChangeText={setAno}
      />

      <Text style={styles.label}>Editora do livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a editora do livro"
        value={editora}
        onChangeText={setEditora}
      />

      <Button
        title="Selecionar Imagem"
        onPress={selecionarImagem}
        color="#8a2be2"
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button
        title={loading ? "Salvando..." : editingLivroId ? "Atualizar livro" : "Adicionar livro"}
        onPress={adicionarOuAtualizarLivro}
        color="#9370db"
      />

      <Text style={styles.sectionTitle}>Lista de livros</Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.livroItem}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.livroImage} />
              ) : (
                <Icon name={item.icon || 'book'} size={50} color="#8a2be2" style={styles.livroIcon} />
              )}
              <View style={styles.livroDetails}>
                <Text style={styles.livroName}>{item.nome}</Text>
                <Text style={styles.livroAutor}>{item.autor}</Text>
                <Text style={styles.livroAno}>{item.ano}</Text>
                <Text style={styles.livroEditora}>{item.editora}</Text>
                <Switch
                  value={item.isRead} onValueChange={(valor) => {
                    const livroRef = doc(db, 'livros', item.id);
                    updateDoc(livroRef, { isRead: valor });
                    fetchLivros();
                  }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={item.isRead ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
                <Text style={[styles.livroStatus, { color: item.isRead ? '#4CAF50' : '#F44336' }]}>
                  {item.isRead ? "Lido" : "Não lido"}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => editarLivro(item)} style={styles.actionButton}>
                  <Icon name="edit" size={25} color="#8a2be2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirLivro(item.id)} style={styles.actionButton}>
                  <Icon name="trash" size={25} color="#ff6347" />
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8a2be2',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#4b0082',
    marginBottom: 10,
  },
  input: {
    borderColor: '#8a2be2',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: 10,
  },
  livroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  livroImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  livroIcon: {
    marginRight: 15,
  },
  livroDetails: {
    flex: 1,
  },
  livroName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b0082',
  },
  livroAutor: {
    fontSize: 16,
    color: '#4b0082',
  },
  livroAno: {
    fontSize: 16,
    color: '#4b0082',
  },
  livroEditora: {
    fontSize: 16,
    color: '#4b0082',
  },
  livroStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginHorizontal: 5,
  },
});
