import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

const URL_API = "https://656de742bcc5618d3c243111.mockapi.io/api/v1/AppDe2";

const Statistic = ({navigation, route}) => {
    const isFocused = useIsFocused();
    const [data, setData] = React.useState([]);
    const [TotalInputmoney, setTotalInputmoney] = React.useState(0);
    const [TotalOutputmoney, setTotalOutputmoney] = React.useState(0);
    const [Balance, setBalance] = React.useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${URL_API}/${route.params.id}`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                });
        
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
        
                setData(data);
        
                const totalInputmoney = data.inputmoney.reduce((acc, item) => acc + item.money, 0);
                setTotalInputmoney(totalInputmoney);
        
                const totalOutputmoney = data.outputmoney.reduce((acc, item) => acc + item.money, 0);
                setTotalOutputmoney(totalOutputmoney);
        
                const balance = totalInputmoney - totalOutputmoney;
                setBalance(balance);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.style1}>
                <Text style={{fontSize: 30}}>Statistic</Text>
            </View>
            <View style={styles.style2}>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-between', height: 80, alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Total Inputmoney: </Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{TotalInputmoney} đ</Text>
                </View>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-between', height: 80, alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Total Outputmoney: </Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{TotalOutputmoney} đ</Text>
                </View>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-between', height: 80, alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Balance: </Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{Balance} đ</Text>
                </View>
            </View>
        </View>
    )
}

export default Statistic

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
    
    }
})