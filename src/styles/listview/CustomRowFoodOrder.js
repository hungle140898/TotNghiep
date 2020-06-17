import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        margin:5,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        padding:15,
        borderColor:'#FFCC66',
        borderWidth:1,
        width:110,
        height:70
    },
    TenBan: {
        fontSize: 12,
        color: '#000',
        alignItems: 'center',
        fontWeight:'bold',
    },
    SoChoNgoi: {
        fontSize: 11,
        alignItems: 'center',
    
    },
    photo: {
        height: 10,
        width: 10,
    },
});

const CustomRowFoodOrder = ({ TenMon, Gia }) =>{
            return(<View style={styles.container}>
                {/* {<Image source={{ uri: image_url }} style={styles.photo} />} */}
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.TenBan}>
                        {TenMon}
                    </Text>
                    <Text style={styles.SoChoNgoi}>
                       Giá : <Text style={{fontSize: 11,alignItems: 'center',color:'red'}}>{Gia}</Text>
                    </Text>
                </View>
            </View>)
    } 

export default CustomRowFoodOrder;
