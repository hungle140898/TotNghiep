import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from './CustomRowFood';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const CustomListviewFood = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    TenMon={item.TenMon}
                    DVT={item.DVT}
                    DonGia={item.DonGia}
                    HinhAnh={item.HinhAnh}
                    // description={item.description}
                    // image_url={item.image_url}
                />}
                keyExtractor={item => item.MaMon}
                
                numColumns={1}
            />

    </View>
);

export default CustomListviewFood;