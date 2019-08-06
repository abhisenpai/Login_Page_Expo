import React from "react";
import { View, Text,TextInput,Button,Alert} from "react-native";
import styles from './styles'

class Home extends React.Component {
	state={username:'',password:''}
	static navigationOptions = {
		header:null
	}

	checkLogin(){
		const{username,password}=this.state
		if(username=='admin' || password == 'admin'){
			// redirect to dashboard
			this.props.navigation.navigate('dashboard')
		}
		else{
			//alert something is wrong
			Alert.alert('Error','Username/Password mismatch',[{
				text:'okay'
			}])
		}
	}  	
	render() {
		const{heading,input,parent}=styles

		return (
			<View style={parent}>
			<Text style={heading}>Login into the application</Text>
			<TextInput style={input} placeholder="Username" onChangeText={text=>this.setState({username:text})}/>
			<TextInput style={input} secureTextEntry={true} placeholder="Password" onChangeText={text=>this.setState({password:text})}/>	
			<Button title={"Login"} onPress={_=>this.checkLogin()}/>
				</View>
		);
	}
}
export default Home
