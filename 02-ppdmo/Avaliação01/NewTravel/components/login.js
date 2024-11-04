import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('Viagens');
        })
        .catch((error) => alert('Falha no login, verifique suas credenciais.'));
    } else {
      alert('Por favor, insira suas credenciais.');
    }
  };

  const handleRegister = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Usuário cadastrado com sucesso!');
          setIsRegistering(false);
        })
        .catch((error) => alert('Falha no cadastro, verifique suas informações.'));
    } else {
      alert('Por favor, insira suas credenciais.');
    }
  };

  return (
    <Animated.View style={[styles.loginContainer, { opacity: fadeAnim }]}>
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
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOutline} onPress={() => setIsRegistering(false)}>
                <Text style={styles.buttonTextOutline}>Voltar para Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOutline} onPress={() => setIsRegistering(true)}>
                <Text style={styles.buttonTextOutline}>Cadastrar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    borderColor: '#004d40',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    color: '#004d40',
    backgroundColor: '#f1f8e9',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#004d40',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonOutline: {
    flex: 1,
    borderColor: '#004d40',
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  buttonTextOutline: {
    color: '#004d40',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
