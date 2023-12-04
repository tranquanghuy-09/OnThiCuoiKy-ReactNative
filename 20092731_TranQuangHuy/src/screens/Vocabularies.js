import { FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'

import store from '../redux/stores';

const URL_API = 'https://6509669ef6553137159b5c22.mockapi.io/api/v1/app'

const Vocabularies = ({navigation,route}) => {
    // console.log(">>User>", route.params.id);

    // Get Data from API
    // const [english, setEnglish] = React.useState([]);
    // const [vietnamese, setVietnamese] = React.useState([]);
    // useEffect(() => {
    //     fetch(URL_API +`/${route.params.id}`, {
    //         method: 'GET',
    //         headers: {'content-type':'application/json'},
    //     }).then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     }).then(data => {
    //         setEnglish(data.english);
    //         console.log(data.english);
    //         setVietnamese(data.vietnamese);
    //         console.log(data.vietnamese);
    //     }).catch(error => {
            
    //     })
    // }, []);



    const handleUpdateUser = () => {
        console.log(">>>>>>>>>>>", store.getState());
        const updatedUser = store.getState();
            fetch(URL_API + `/${store.getState().id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(updatedUser => {
                console.log('User updated:', updatedUser);
                alert("Đồng bộ dữ liệu lên API thành công");
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    // Get Data from Redux
        const [english, setEnglish] = React.useState(store.getState().english);
        console.log(english);
        const [vietnamese, setVietnamese] = React.useState(store.getState().vietnamese);
        console.log(vietnamese);
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
                <View style={{ width: '100%', alignItems: 'center', marginTop: 25, bottom: 15}}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate({name: 'HomeScreen', params: {user: store.getState()}})
                    }}
                        style={{ width: '80%', height: 50, backgroundColor: 'orange', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#FFF' }}>Tiếp tục thêm</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 25, bottom: 15}}>
                    <TouchableOpacity onPress={()=>{
                        handleUpdateUser();
                        
                    }}
                        style={{ width: '80%', height: 50, backgroundColor: 'green', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#FFF' }}>ĐỒNG BỘ DỮ LIỆU LÊN API</Text>
                    </TouchableOpacity>
                </View>
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
        width: '90%',
    },  
})