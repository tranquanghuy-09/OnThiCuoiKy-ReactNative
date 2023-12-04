import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

import { setUser, addInput, addOutput} from '../redux/actions';
import store from '../redux/stores';

const URL_API = "https://656de742bcc5618d3c243111.mockapi.io/api/v1/AppDe2";

const Home = ({navigation, route}) => {
    const isFocused = useIsFocused();
    const [userLocal, setUserLocal] = React.useState({});
    useEffect(() => {
        setInputmoney("");
        setOutputmoney("");
        setUserLocal(route.params.user);
    }, [isFocused]);
    
    const [inputmoney, setInputmoney] = React.useState(0);
    console.log(inputmoney);
    const [outputmoney, setOutputmoney] = React.useState(0);
    console.log(outputmoney);

    const handleAddInputAndOutput = () => {
        if ((inputmoney === '' && outputmoney === '') || (inputmoney === 0 && outputmoney === 0) ) {
            // Alert.alert('Invalid Credentials', 'Please check your inputmoney and outputmoney.');
            return;
        }else if(inputmoney > 0 && outputmoney > 0){
            store.dispatch(addInput(inputmoney));
            store.dispatch(addOutput(outputmoney));
        }else if((inputmoney > 0 && outputmoney === '') || (inputmoney > 0 && outputmoney === 0)){
            store.dispatch(addInput(inputmoney));
        }else if((inputmoney === '' && outputmoney > 0) || (inputmoney === 0 && outputmoney > 0)){
            store.dispatch(addOutput(outputmoney));
        }
    }

    const handleUpdateUser = async () => {
        try {
            console.log(">>>>>>>>>>>", store.getState());
            const updatedUser = store.getState();
            await fetch(URL_API + `/${userLocal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
                });
        
            console.log('User updated successfully');
        
            // Proceed to navigation only after the update is complete
            navigation.navigate({
                name: 'Statistic',
                params: { id: userLocal.id },
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.style1}>
                <Text style={{fontSize: 30}}>Home</Text>
            </View>
            <View style={styles.style2}>
                <View style={{width: '100%', alignItems: 'center', gap: 5}}>
                    <Text style={{fontSize: 18, width: '80%'}}>Inputmoney:</Text>
                    <TextInput onChangeText={(text)=>{
                            setInputmoney(text);
                        }}
                        // onFocus={()=>{setInputmoney('');}}
                        value={inputmoney}
                        style={{borderWidth: 1, backgroundColor: '#FFF', fontSize: 18, width: '80%', height: 50, borderRadius: 15, paddingHorizontal: 15}}/>    
                </View>
                <View style={{width: '100%', alignItems: 'center', gap: 5}}>
                    <Text style={{fontSize: 18, width: '80%'}}>Outputmoney:</Text>
                    <TextInput onChangeText={(text)=>{
                            setOutputmoney(text);
                        }}
                        value={outputmoney}
                        style={{borderWidth: 1, backgroundColor: '#FFF', fontSize: 18, width: '80%', height: 50, borderRadius: 15, paddingHorizontal: 15}}/>    
                </View>
                <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                    <TouchableOpacity onPress={()=>{
                            handleAddInputAndOutput();
                            handleUpdateUser();
                            // navigation.navigate({
                            //     name: 'Statistic',
                            //     params: { id: userLocal.id }
                            // })
                    }}
                        style={{width: '80%', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: "green", borderRadius: 5}}>
                        <Text style={{fontSize: 20, fontWeight: 500}}>CACL</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
                    <TouchableOpacity onPress={()=>{
                            navigation.navigate({
                                name: 'Statistic',
                                params: { id: userLocal.id }
                            })
                    }}
                        style={{width: '80%', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: "orange", borderRadius: 5}}>
                        <Text style={{fontSize: 20, fontWeight: 500}}>Show Statistic</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(253, 246, 216)"
    },
    style1:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    style2:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        gap: 20,
    }
})