import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Viagem from './components/viagens';
import Login from './components/login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Bem vindo ' }} />
            
        <Stack.Screen
            name="Viagens"
            component={Viagem}
            options={{ title: 'Tela de Viagens' }} // Nome corrigido
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
