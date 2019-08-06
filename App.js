import React from 'react';
import { AppLoading } from 'expo';
import { Container, Item, Form, Input, Button, Label,Text } from "native-base";
import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from "firebase";
import Dashboard from './app/components/Dashboard';

const firebaseConfig = {
  apiKey: "AIzaSyC21xzutaPSCKV4uxNTyJzXzvsDOambKkY",
  authDomain: "expoapp-e7d8e.firebaseapp.com",
  databaseURL: "https://expoapp-e7d8e.firebaseio.com",
  projectId: "expoapp-e7d8e",
  storageBucket: "",
  messagingSenderId: "41395826580",
  appId: "1:41395826580:web:a91b642f019a235c"
};

firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center"
    },

  input:{
    marginTop:10,
    marginBottom:10
  }
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:''
    };
  }
  SignUp=(email,password)=>{
    try{
      firebase.auth().createUserWithEmailAndPassword(email, password);
    }catch(error){
      console.log(error.toString(error));
    }
  };

  SignIn=(email,password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email,password);
      firebase.auth().onAuthStateChanged(user=>{
        this.props.navigation.navigate('dashboard');
      })
    }catch(error){
      console.log(error.toString(error));
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCapitalize="none" 
                   autoCorrect={false} 
                   style={styles.input}
                   onChangeText={email=>this.setState({email})} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password=>this.setState({password})}
            />
          </Item>
          <Button full rounded
                  onPress={()=>this.SignIn(this.state.email,this.state.password)}>
            <Text>SignIn</Text>
          </Button>
          <Button full rounded success 
                  style={{ marginTop: 20 }}
                  onPress={()=>this.SignUp(this.state.email,this.state.password)}> 
          <Text>Signup</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}


const  AppNavigator = createStackNavigator({
  app:App,
  dashboard:Dashboard
});

export default createAppContainer(AppNavigator);