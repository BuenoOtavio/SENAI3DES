import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Login({ onLogin, onGoBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Usuário logado com sucesso');
          onLogin(email);
        })
        .catch((error) => {
          console.error('Erro ao fazer login: ', error);
          alert('Falha no login, verifique suas credenciais.');
        });
    } else {
      alert('Por favor, insira suas credenciais.');
    }
  };

  const handleRegister = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Usuário cadastrado com sucesso');
          alert('Usuário cadastrado com sucesso!');
          setIsRegistering(false);
        })
        .catch((error) => {
          console.error('Erro ao fazer cadastro: ', error);
          alert('Falha no cadastro, verifique suas informações.');
        });
    } else {
      alert('Por favor, insira suas credenciais.');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>{isRegistering ? 'Cadastrar' : 'Login'} no NewTravel</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttons}>
          {isRegistering ? (
            <>
              <Button color='#162040' title="Cadastrar" onPress={handleRegister} />
              <Button color='#162040' title="Voltar para Login" onPress={() => setIsRegistering(false)} />
            </>
          ) : (
            <>
              <Button color='#162040' title="Entrar" onPress={handleLogin} />
              <Button color='#162040' title="Cadastrar" onPress={() => setIsRegistering(true)} />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#badda8',  // Cor de fundo da tela
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#162040',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    borderColor: '#162040',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: '#162040',
    backgroundColor: '#f0f8ff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Login;
