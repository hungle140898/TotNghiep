import React from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from './CustomRowTable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
});


const CustomListviewTable = ({ itemList }) => (
    <View style={styles.container}>
         <FlatList
                data={itemList}
                renderItem={({ item })  => <CustomRow 
                    TenBan={item.TenBan}
                    SoChoNgoi={item.SoChoNgoi}
                    TrangThai={item.TrangThai}
                    // description={item.description}
                    // image_url={item.image_url}
                    onPress={this.props.onItemPress}
                
                    />}
                keyExtractor={item=>item.TenBan}
                
                numColumns={2}
            />

    </View>
);

export default CustomListviewTable;