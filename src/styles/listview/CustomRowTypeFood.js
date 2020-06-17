import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomRowFoodOrder from './CustomRowFoodOrder';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        margin : 1,
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderRadius : 10,
        padding:20,
        borderColor:'#FFCC66',
        borderWidth:1,
        marginTop:20
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

const CustomRowTypeFood = ({ TenLoai}) =>{
            return(<View style={styles.container}>
                {/* {<Image source={{ uri: image_url }} style={styles.photo} />} */}
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.TenBan}>
                        {TenLoai}
                    </Text>
                </View>
            </View>)
    } 

export default CustomRowTypeFood;
