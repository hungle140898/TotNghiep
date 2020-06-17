import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 2,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        borderBottomColor: '#3399FF',
        borderBottomWidth: 0.5,
        width: '100%',
        marginTop: 2
    },
    TenMon: {
        flex: 3,
        fontSize: 16,
        color: '#000',

    },
    SubAdd: {
        flex: 2,
        color: '#3399FF',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    Gia: {
        fontSize: 15,
        flex: 2,
        color: 'red',
        textAlign: 'center'
    },
    Add: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
    },
    Sub: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
    },
    Text: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        borderRadius:100,
        width:15,
        height:15
    }

});

const CustomRow = ({ TenMon, SoLuong, Gia }) => (
    <View style={styles.container} >
        <Text style={styles.TenMon}>
            {TenMon}
        </Text>
        <View style={styles.SubAdd}>
            <View style={styles.Sub}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../img/delete.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.Text}>
                <Text >
                    {SoLuong}
                </Text>
            </View>
            <View style={styles.Add} >
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../img/add.png')}/>
                </TouchableOpacity>
            </View>

        </View>
        <Text style={styles.Gia}>
            {Gia}
        </Text>
    </View>
);

export default CustomRow;
