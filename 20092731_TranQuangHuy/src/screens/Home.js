import { LogBox, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'

import { setUser, addVocabulary} from '../redux/actions';
import store from '../redux/stores';

const URL_API = 'https://6509669ef6553137159b5c22.mockapi.io/api/v1/app'

const Home = ({ navigation, route }) => {
    const [userLocal, setUserLocal] = useState({});
    useEffect(() => {
        setUserLocal(route.params.user);
    }, []);

    const [english, setEnglish] = useState('');
    const [vietnamese, setVietnamese] = useState('');
    store.dispatch(setUser(route.params.user));

    console.log(">>>>>>>>>>>", store.getState());

    return (
        <View style={styles.container}>
            <View style={styles.style1}>
                <Text style={{ fontSize: 30 }}>Add Vocabulary</Text>
            </View>
            <View style={styles.style2}>
                <View style={{ width: '100%', alignItems: 'center', gap: 5 }}>
                    <Text style={{ alignItems: 'flex-start', width: '80%' }}>English:</Text>
                    <TextInput onChangeText={text => setEnglish(text)} 
                        style={{ borderWidth: 1, width: '80%', fontSize: 16, height: 50, borderRadius: 15, paddingHorizontal: 10 }} />
                </View>
                <View style={{ width: '100%', alignItems: 'center', gap: 5, marginTop: 15 }}>
                    <Text style={{ alignItems: 'flex-start', width: '80%' }}>Vietnamese:</Text>
                    <TextInput onChangeText={text => setVietnamese(text)} 
                        style={{ borderWidth: 1, width: '80%', fontSize: 16, height: 50, borderRadius: 15, paddingHorizontal: 10 }} />
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
                    <TouchableOpacity onPress={()=>{
                        store.dispatch(addVocabulary(english, vietnamese));
                        navigation.navigate("Vocabularies", {id: userLocal.id});
                        console.log(">>>>>>>>>>>", store.getState());
                    }}
                        style={{ width: '80%', height: 50, backgroundColor: '#333', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#FFF' }}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("Vocabularies", {id: userLocal.id})
                    }}
                        style={{ width: '80%', height: 50, backgroundColor: 'orange', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#FFF' }}>Show Vocabularies</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    style1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    style2: {
        flex: 5,
        alignItems: 'center',
        width: '100%',
    }
})
