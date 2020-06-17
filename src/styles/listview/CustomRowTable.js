import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderWidth:0.5,
        borderColor:'#FFCC66',
        borderRadius:15,
        backgroundColor: '#FFF',
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TenBan: {
        fontSize: 18,
        color: '#000',
        alignItems: 'center',
        fontWeight:'bold'
    },
    TrangThai: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 13,
    },
    SoChoNgoi: {
        fontSize: 13,
    },
    photo: {
        height: 15,
        width: 15,
        paddingBottom : 5
    },
});

const CustomRow = ({ TenBan, SoChoNgoi, TrangThai }) =>{
    
    if(TrangThai == 1){
        return (
            <View style={styles.container}>
                {/* {<Image source={{ uri: image_url }} style={styles.photo} />} */}
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.TenBan}>
                        {TenBan}
                    </Text>
                    <Text style={styles.SoChoNgoi}>
                        SL Khách:<Text style={styles.SoChoNgoi}>
                    {SoChoNgoi}  <Image source={require('../../img/guest.png') } style={styles.photo}/>
                    </Text>
                    </Text>
                    <Text style={styles.TrangThai}>
                        Trạng Thái: <Text style={{color:'#FF3333',fontWeight:'bold'}}>Có Khách</Text>
                    </Text>
                </View>
            </View>
        )
    } 
    else if(TrangThai == 0) {
        return (
            <View style={styles.container}>
                {/* {<Image source={{ uri: image_url }} style={styles.photo} />} */}
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.TenBan}>
                        {TenBan}
                    </Text>
                    <Text style={styles.SoChoNgoi}>
                        SL Khách:<Text style={styles.SoChoNgoi}>
                    {SoChoNgoi}  <Image source={require('../../img/guest.png') } style={styles.photo}/>
                    </Text>
                    </Text>
                    <Text style={styles.TrangThai}>
                        Trạng Thái: <Text style={{color:'#009966',fontWeight:'bold'}}>Còn Trống</Text>
                    </Text>
                </View>
            </View>
        )
    }
    else{
        return (
            <View style={styles.container}>
                {/* {<Image source={{ uri: image_url }} style={styles.photo} />} */}
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.TenBan}>
                        {TenBan}
                    </Text>
                    <Text style={styles.SoChoNgoi}>
                        Số Lượng Khách:{SoChoNgoi}
                    </Text>
                    <Text style={styles.TrangThai}>
                        Trạng Thái: <Text style={{color:'blue',fontWeight:'bold'}}>Đã Đặt</Text>
                    </Text>
                </View>
            </View>
        )
    }
};

export default CustomRow;
