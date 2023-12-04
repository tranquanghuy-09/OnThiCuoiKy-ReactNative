import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Alert } from 'react-native';


import { setUser, addInput, addOutput} from '../redux/actions';
import store from '../redux/stores';

const URL_API = "https://656de742bcc5618d3c243111.mockapi.io/api/v1/AppDe2";

const Login = ({navigation}) => {
    const [data, setData] = React.useState([]);
    const [username, setUsername] = React.useState('')
    console.log(username);
    const [password, setPassword] = React.useState('')
    console.log(password);
    const [loginFail, setLoginFail] = React.useState(false);

    useEffect(() => {
        fetch(URL_API, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            console.log(data);
            setData(data);
        }).catch(error => {
            
        })
    }, []);

    const handleLogin = () => {
        const user = data.find((user) => user.username === username && user.password === password);
        if (user) {
            console.log('Login successful');
            navigation.navigate({
                name: 'Home',
                params:{
                    user: user,
                }
            })
            store.dispatch(setUser(user));
        } else {
            Alert.alert('Invalid Credentials', 'Please check your username and password.');
            setLoginFail(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.style1}>
                <Text style={{fontSize: 30}}>Login</Text>
            </View>
            <View style={styles.style2}>
                <View style={{width: '100%', alignItems: 'center', gap: 5}}>
                    <Text style={{fontSize: 18, width: '80%'}}>Username: </Text>
                    <TextInput onChangeText={(text)=>{
                        setUsername(text)
                        setLoginFail(false);
                    }}
                        style={{borderWidth: 1, fontSize: 18, width: '80%', height: 50, borderRadius: 15, paddingHorizontal: 15}}/>
                </View>
                <View style={{width: '100%', alignItems: 'center', gap: 5}}>
                    <Text style={{fontSize: 18, width: '80%'}}>Password: </Text>
                    <TextInput onChangeText={(text)=>{
                        setPassword(text)
                        setLoginFail(false);
                    }} 
                        style={{borderWidth: 1, fontSize: 18, width: '80%', height: 50, borderRadius: 15, paddingHorizontal: 15}}/>
                </View>
                {loginFail &&
                <View style={{width: '100%', alignItems: 'center', gap: 5, marginTop: 15}}>
                    <Text style={{fontSize: 18, width: '80%', color: 'red'}}>Invalid Credentials, Please check your username and password.</Text>
                </View>
                }
                <View style={{width: '100%', alignItems: 'center', gap: 5, marginTop: 50}}>
                    <TouchableOpacity onPress={handleLogin}
                        style={{borderWidth: 1, fontSize: 18, width: '80%', height: 50, borderRadius: 15, 
                                            backgroundColor: '#555', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 500}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    }

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
    },
    style1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    style2: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        gap: 20,
    },

});