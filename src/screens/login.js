import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { Input, Card, Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtName: 'kimhungcv',
            txtPass: 'kimhungcv',
            apiData: [],
            txtIP: '172.31.98.185',
        }
    }
    componentDidUpdate() {
        if (this.state.apiData.length != 0) {
            this.props.navigation.navigate('TabNavigator', {
                Username: this.state.txtName, Password: this.state.txtPass, IP: this.state.txtIP
            })
        }
    }
    getInfo = () => {
        fetch('http://' + this.state.txtIP + ':8080/login/?TenDN=' + this.state.txtName + '&MatKhau=' + this.state.txtPass, {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            this.setState({ apiData: jsonData })
        }).done();

    }
    checklogin = () => {
        this.getInfo();
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../img/bg1.jpg")} style={styles.image} >
                    <Card containerStyle={styles.card_logo}>
                        <Image
                            source={require("../img/logo.png")}
                            style={{ width: "100%", height: 200 }}
                        />
                    </Card>
                    <Card containerStyle={styles.card_login}>
                        <Input
                            placeholder='IP kết nối'
                            leftIcon={
                                <Icon
                                    name='location-arrow'
                                    size={20}
                                    color='#FFCC66'
                                    margin={10}
                                />
                            }
                            //onChangeText={value => this.setState({ txtIP: value })}
                            value="172.31.98.185"
                        />
                        <Input
                            placeholder='Tài khoản'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={20}
                                    color='#FFCC66'
                                    margin={10}
                                />
                            }
                            onChangeText={value => this.setState({ txtName: value })}
                        />
                        <Input
                            placeholder='Mật khẩu'
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={20}
                                    color='#FFCC66'
                                    margin={10}
                                />
                            }
                            onChangeText={value => this.setState({ txtPass: value })}
                            secureTextEntry={true}
                        />

                        <Button buttonStyle={styles.button} onPress={() => this.checklogin()}
                            title="Đăng Nhập"
                        />
                    </Card>
                </ImageBackground>
            </View>



        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    logo: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        margin: 39
    },
    login: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#FFCC66",
        marginTop: 10,
    },
    card_login: {
        borderRadius: 20,
        borderWidth: 0.5,
        height: 'auto',
        margin: 20,
        width: '80%',
        borderColor: '#FFCC66',

    },
    card_logo: {
        width: '95%',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#FFCC66",
        margin: 20,
        padding: 20
    },
    button: {
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: "#FFCC66",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
        alignItems: 'center'
    },
})