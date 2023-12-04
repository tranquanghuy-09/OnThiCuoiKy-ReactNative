import { FlatList, StyleSheet, Text, View} from 'react-native'
import React, { useEffect } from 'react'

import store from '../redux/stores';

const URL_API = 'https://6509669ef6553137159b5c22.mockapi.io/api/v1/app'

const Vocabularies = ({route}) => {
    // console.log(">>User>", route.params.id);
    const [english, setEnglish] = React.useState([]);
    const [vietnamese, setVietnamese] = React.useState([]);
    useEffect(() => {
        fetch(URL_API +`/${route.params.id}`, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            setEnglish(data.english);
            console.log(data.english);
            setVietnamese(data.vietnamese);
            console.log(data.vietnamese);
        }).catch(error => {
            
        })
    }, []);

    // const [english, setEnglish] = React.useState(store.getState().english);
    // console.log(english);
    // const [vietnamese, setVietnamese] = React.useState(store.getState().vietnamese);
    // console.log(vietnamese);
    const data = english.map((item, index) => ({
        id: index.toString(), // Sử dụng index làm id (hoặc sử dụng id nếu có)
        content: item,
        translation: vietnamese[index] // Lấy từ mảng tiếng Việt tương ứng
    }));
    console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.style1}>
                <Text style={{fontSize: 30}}>Vocabularies</Text>
            </View>
            <View style={styles.style2}>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, paddingVertical: 5}}>
                    <Text style={{width: '20%', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>STT</Text>
                    <Text style={{width: '40%', fontSize: 18, fontWeight: 'bold', textAlign: 'justify'}}>English</Text>
                    <Text style={{width: '40%', fontSize: 18, fontWeight: 'bold', textAlign: 'justify'}}>Vietnamese</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item, index}) => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderWidth: 1, paddingVertical: 5}}>
                            <Text style={{width: '20%', fontSize: 18, textAlign: 'center'}}>{index+1}</Text>
                            <Text style={{width: '40%', fontSize: 18, textAlign: 'justify'}}>{item.content.content}</Text>
                            <Text style={{width: '40%', fontSize: 18, textAlign: 'justify'}}>{item.translation.content}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    style={{width: '100%'}}
                />
            </View>
            
        </View>
    )
}

export default Vocabularies

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    },
    style1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    style2: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        width: '90%',
    },  
})