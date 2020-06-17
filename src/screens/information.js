import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import CustomRow from '../styles/listview/CustomRowBill';
import CustomRowFoodOrder from '../styles/listview/CustomRowFoodOrder';
import CustomRowTypeFood from '../styles/listview/CustomRowTypeFood';

export default class Information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countMaHD: [],
            apiData: [],
            apiFood: [],
            apiTypeOfFood: [],
            checkdata: [],
            checkNL: [],
            apiMaHD: [],
            showOrder: true,
            showCancel: false,
            trangthai: [],
            txtMaMon: ''
        }
    }
    componentDidMount() {
        this.getCountMaHD();
        this.intervalCountMaHD = setInterval(() => this.getCountMaHD(), 1000);

        this.getBill();
        this.intervalBill = setInterval(() => this.getBill(), 1000);

        this.getAllFood();
        this.getTypeOfFood();
        this.CheckNL(this.state.txtMaMon);
        this.intervalFood = setInterval(() => this.CheckNL(this.state.txtMaMon), 1000);
        this.getMaHD();
        this.intervalMaHD = setInterval(() => this.getMaHD(), 1000);

        this.checkButton();

        // this.intervalCheckButton = setInterval(() => this.checkButton(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalBill);
        clearInterval(this.intervalMaHD);
        //clearInterval(this.intervalCheckButton);
        clearInterval(this.intervalCountMaHD);
        clearInterval(this.intervalFood);
    };
    checkNguyenLieu = () => {
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/checknguyenlieu', {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            //console.log(jsonData)
            this.setState({ checknguyenlieu: jsonData })
            // console.log(this.state.apiData)
        }).done();
    }
    //------------Lấy SL Mã Hóa Đơn-------------------------
    getCountMaHD = () => {
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/getcount', {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            this.setState({ countMaHD: jsonData })
        }).done();
    }
    //------------Lấy Danh Sách Toàn Bộ Thực Đơn-------------------------
    getAllFood = () => {
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/users', {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            //console.log(jsonData)
            this.setState({ apiFood: jsonData })
            // console.log(this.state.apiData)
        }).done();
    }

    //--------------Lấy Danh Sách Thực Đơn Theo Loại Món -------------------------
    getFood = (MaLoai) => {
        try {
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/food/?MaLoai=' + MaLoai, {
                method: 'GET'
            }).then((responseData) => {
                return responseData.json();
            }).then((jsonData) => {
                //console.log(jsonData)
                this.setState({ apiFood: jsonData })
                // console.log(this.state.apiData)
            }).done();
        }
        catch (error) {
            console.log(error);
        }
    }

    //---------------------Lấy Loại Món Thực Đơn------------------------------
    getTypeOfFood = () => {
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/typefood', {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            //console.log(jsonData)
            this.setState({ apiTypeOfFood: jsonData })
            // console.log(this.state.apiData)
        }).done();
    };

    //---------------------Kiếm Tra Trạng Thái Bàn Và Thêm Hóa Đơn------------------------------
    checkStatus = () => {
        const MaBan = this.props.navigation.getParam('MaBan');
        if (this.state.apiData.length == 0) {
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/changestatus/?MaBan=' + MaBan, {
                method: 'PUT'
            }).done();
            this.state.countMaHD.forEach((item) => {
                if (item.SL == 0) {
                    fetch('http://' + this.props.navigation.getParam('IP') + ':8080/addbillnull/?MaBan=' + MaBan, {
                        method: 'PUT'
                    }).done();
                }
                else {
                    fetch('http://' + this.props.navigation.getParam('IP') + ':8080/addbill/?MaBan=' + MaBan, {
                        method: 'PUT'
                    }).done();
                }
            })

            this.setState({ showOrder: false });
            this.setState({ showCancel: true });
        }
        else {
            this.setState({ showOrder: false });
            this.setState({ showCancel: true });
        }
    };

    //---------------------Kiếm Tra Trạng Thái Nút Đặt Món Hủy Món------------------------------    
    checkButton = () => {
        if (this.props.navigation.getParam('TrangThai') == 1) {
            this.setState({ showOrder: false });
            this.setState({ showCancel: true });
        }
        else {
            this.setState({ showOrder: true });
            this.setState({ showCancel: false });
        }
    }

//----------------Kiểm Tra View Khi Thao Tác Nút-------------------------
    checkView=()=>{
        if(this.state.showOrder==true){

        }
        else{

        }
    }

//------------------Lấy Mã Hóa Đơn Từ Mã Bàn-------------------------
    getMaHD = () => {
        const MaBan = this.props.navigation.getParam('MaBan');
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/getMaHD?MaBan=' + MaBan, {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            this.setState({ apiMaHD: jsonData })
            //console.log(this.state.apiMaHD)
        }).done();
    }

//-------------------------Xử Lí Sự Kiện Hủy Bàn-------------------------    
    cancelTable = (MaBan, MaHoaDon) => {
        this.state.apiData.forEach((item) => {
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updateNLSub/?MaMon=' + item.MaMon + '&SoLuong=' + item.SoLuong, {
                method: 'PUT',
            });
            console.log(item.MaMon, item.SoLuong);
        })
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/canceltable/?MaHoaDon=' + MaHoaDon, {
            method: 'PUT',
        }).done();
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/resettable/?MaBan=' + MaBan, {
            method: 'PUT'
        }).done();
        this.props.navigation.goBack();
    }

    //----------------------------Xử Lí Sự Kiện Thêm Món Ăn Từ Danh Sách Món-----------------------
    addFood = (MaMon, MaHoaDon, DonGia) => {
        this.setState({ txtMaMon: MaMon });
        const index = this.state.apiData.findIndex(item => item.MaMon == MaMon);
        const index2 = this.state.checkNL.findIndex(item => item.SLMin == 0);
        // alert(index2)
        this.state.checkNL.forEach((item) => {
            //alert(item.SLMin);
            if (item.SLMin == null) {
                //  alert("Món Chọn Đã Hết !")
                return;
            }
            else if (item.SLMin == 0) {
                alert("Món Chọn Đã Hết !")
                return;
            }
            else {
                if (index > -1) {
                    this.AddSL(MaHoaDon, MaMon);
                }
                else {
                    fetch('http://' + this.props.navigation.getParam('IP') + ':8080/addfoodtobill/?MaMon=' + MaMon + '&MaHoaDon=' + MaHoaDon + '&DonGia=' + DonGia, {
                        method: 'PUT'
                    }).done();
                    fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updateNLAdd/?MaMon=' + MaMon, {
                        method: 'PUT',
                    });
                }
            }
        })
    }

    //-------------------------Lấy Toàn Bộ Thông Tin Hóa Đơn Bàn----------------------------
    getBill = () => {
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/bill/?MaBan=' + this.props.navigation.getParam('MaBan'), {
            method: 'GET',
            'Content-Type': 'application/json'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            //console.log(jsonData)
            this.setState({ apiData: jsonData })
            // console.log(this.state.apiData)
        }).catch((error) => {
            this.setState({ apiData: [] });
        });
    };

    //-----------------------------Kiểm Tra Số Lượng Nguyên Liệu Hiện Còn--------------------------------
    CheckNL = (MaMon) => {
        fetch('http://' + this.props.navigation.getParam('IP') + ':8080/checknl/?MaMon=' + MaMon, {
            method: 'GET',
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            this.setState({ checkNL: jsonData })
        }).done();
    }

    //----------------------------Xử Lí Sự Kiện Thêm Món Ăn Bằng Phím + -----------------------
    AddSL = (MaHD, MaMon, SoLuong) => {
        var MinSL = 1;
        this.CheckNL(MaMon);
        this.state.checkNL.forEach((item) => {
          
       
        if (item.SLMin == null) {
            //  alert("Món Chọn Đã Hết !")
            return;
        }
        else if (item.SLMin == 0) {
            alert("Món Chọn Đã Hết !")
            return;
        }
        else {
            //alert(MinSL)
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updatebilladd/?MaHoaDon=' + MaHD + '&MaMon=' + MaMon, {
                method: 'PUT',
            });
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updateNLAdd/?MaMon=' + MaMon, {
                method: 'PUT',
            });

        }
    })
    }

    //----------------------------Xử Lí Sự Kiện Xóa Món Ăn Bằng Phím - -----------------------
    SubSL = (MaHD, MaMon, SoLuong) => {
        if (SoLuong == 1) {
            Alert.alert(
                'Thông Báo',
                'Bạn muốn xóa thông tin món ?',
                [
                    {
                        text: 'Yes', onPress: () => {
                            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/removefood/?MaHoaDon=' + MaHD + '&MaMon=' + MaMon, {
                                method: 'PUT',
                            })
                            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updateNLSub/?MaMon=' + MaMon + '&SoLuong=1', {
                                method: 'PUT',
                            });
                        }

                    },
                    { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
            );
            this.getBill();
        }
        else {
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updatebillsub/?MaHoaDon=' + MaHD + '&MaMon=' + MaMon, {
                method: 'PUT',
            });
            fetch('http://' + this.props.navigation.getParam('IP') + ':8080/updateNLSub/?MaMon=' + MaMon + '&SoLuong=1', {
                method: 'PUT',
            });
        }

    }
    getTM = (data) => {
        //console.log(data);
    }
    render() {
        let totalQuantity = 0;
        let totalPrice = 0;
        let mahoadon = 0;
        const { apiData } = this.state;
        this.state.apiData.forEach((item) => {
            totalQuantity += item.SoLuong;
            totalPrice += item.SoLuong * (item.ThanhTien / item.SoLuong);
        });
        this.state.apiMaHD.forEach((item) => {
            mahoadon = item.MaHoaDon;
        });
        const data = this.state.apiData;
        //console.log(apiData);
        return (
            <View style={styles.container}>
                <View style={styles.containertitle}>
                    <View style={styles.containertitletop} >

                    </View>
                    <View style={styles.containertitlebot} >
                        <Text style={styles.titleTenMon}>Tên Món</Text>
                        <Text style={styles.titleSL}>Số Lượng</Text>
                        <Text style={styles.titleGia}>Thành Tiền</Text>
                    </View>
                </View>
                <View style={styles.topcontainer}>
                    <View style={styles.flview}>
                        <FlatList style={{ width: '100%', padding: 1 }}
                            data={this.state.apiData}
                            extraData={this.state}
                            renderItem={({ item, index }) =>
                                <View style={styles.container1}>
                                    <Text style={styles.TenMon}>
                                        {item.TenMon}
                                    </Text>
                                    <View style={styles.SubAdd}>
                                        <View style={styles.Sub}>
                                            <TouchableOpacity onPress={() => this.SubSL(item.MaHoaDon, item.MaMon, item.SoLuong)}>
                                                <Image style={styles.icon} source={require('../img/delete.png')} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.Text}>
                                            <Text >
                                                {item.SoLuong}
                                            </Text>
                                        </View>
                                        <View style={styles.Add} >
                                            <TouchableOpacity onPress={() => this.AddSL(item.MaHoaDon, item.MaMon, item.SoLuong)} >
                                                <Image style={styles.icon} source={require('../img/add.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={styles.Gia}>
                                        {item.ThanhTien}
                                    </Text>
                                </View>}

                            keyExtractor={item => item.MaMon}

                            numColumns={1}
                        />

                    </View>

                    <View style={styles.totalview}>
                        <View style={styles.infoview}>
                            <View style={styles.rightinfo} >
                                <View style={styles.tenban}>
                                    <Image style={styles.icon} source={require('../img/food-and-restaurant.png')} />
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{this.props.navigation.getParam('TenBan')}</Text>
                                </View>
                                <View style={styles.mahoadon}>
                                    <Image style={styles.icon} source={require('../img/business.png')} />
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Mã HĐ :{mahoadon}</Text>
                                </View>
                            </View>
                            <View style={styles.leftinfo} >
                                <Image style={styles.icon} source={require('../img/business-and-finance.png')} />
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Tổng Tiền :</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}>{totalPrice} vnd</Text>
                            </View>
                        </View>
                        <View style={styles.btnview}>

                            {this.state.showOrder ? <TouchableOpacity style={styles.btnThanhToan} onPress={() => this.checkStatus()}>
                                <Text style={styles.txtThanhToan}>Đặt Món</Text>
                            </TouchableOpacity> : null}

                            {this.state.showCancel ? <TouchableOpacity style={styles.btnHuy} onPress={() => this.cancelTable(this.props.navigation.getParam('MaBan'), mahoadon)}>
                                <Text style={styles.txtThanhToan}>Hủy Bàn</Text>
                            </TouchableOpacity> : null}
                        </View>
                    </View>
                </View>
                <View style={styles.bottomcontainer}>
                    <View style={styles.rightorder}>
                        <FlatList style={{ width: '100%', padding: 1 }}
                            data={this.state.apiFood}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity disabled={this.state.showOrder} style={{ alignItems: 'center' }} onPress={() => this.addFood(item.MaMon, mahoadon, item.DonGia)}>
                                    <CustomRowFoodOrder
                                        TenMon={item.TenMon}
                                        Gia={item.DonGia}
                                    // description={item.description}
                                    // image_url={item.image_url}
                                    />
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.TenMon}

                            numColumns={2}
                        />
                    </View>
                    <View style={styles.leftorder}>
                        <FlatList style={{ width: '100%', padding: 1 }}
                            data={this.state.apiTypeOfFood}
                            renderItem={({ item }) =>
                                <TouchableOpacity  disabled={this.state.showOrder} style={{ alignItems: 'center' }} onPress={() => this.getFood(item.MaLoai)}>
                                    <CustomRowTypeFood
                                        TenLoai={item.TenLoai}

                                    // description={item.description}
                                    // image_url={item.image_url}
                                    />
                                </TouchableOpacity>}
                            keyExtractor={item => item.TenLoai}

                            numColumns={1}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rightorder: {
        flex: 2,
        backgroundColor: '#FFF',
        height: '100%',
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5
    },
    container1: {
        padding: 2,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        borderBottomColor: '#FFCC66',
        borderBottomWidth: 0.5,
        width: '100%',
        marginTop: 2
    },
    leftorder: {
        flex: 1,
        backgroundColor: '#FFF',
        height: '100%',
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    topcontainer: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 10
    },
    bottomcontainer: {
        flex: 6,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        width: '100%',
        alignItems: 'center'
    },
    containertitle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        width: '100%',
        alignItems: 'center',
    },
    containertitletop: {
        flex: 3,
        width: '100%',
        backgroundColor: '#FFF'
    },
    containertitlebot: {
        width: '100%',
        flexDirection: 'row',
        flex: 3,
    },
    titleTenMon: {
        width: '100%',
        flex: 3,
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold',
        padding: 2
    },
    titleSL: {
        width: '100%',
        flex: 2,
        fontSize: 15,
        textAlign: 'center',
        margin: 1,
        fontWeight: 'bold',
        padding: 2
    },
    titleGia: {
        width: '100%',
        flex: 2,
        textAlign: 'center',
        fontSize: 15,
        margin: 1,
        fontWeight: 'bold',
        padding: 2
    },
    totalview: {
        flex: 4,
        backgroundColor: '#FFF',
        width: '100%',
        alignItems: 'center',
        padding: 3
    },
    infoview: {
        flex: 3,
        backgroundColor: '#FFF',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3
    },
    btnview: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFF',
        width: '100%',
        alignItems: 'center',
    },
    flview: {
        flex: 6,
        backgroundColor: '#FFFF',
        width: '100%',
    },
    btnThanhToan: {
        backgroundColor: '#3377FF',
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 12,
        marginLeft: 10,
    },
    btnHuy: {
        backgroundColor: '#DD0000',
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 12,
        marginLeft: 10,
    },
    txtThanhToan: {
        color: '#FFF',
        fontSize: 15
    },
    rightinfo: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        height: '100%',
        alignItems: 'flex-start',
        padding: 10
    },
    leftinfo: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: '100%',
        alignItems: 'flex-start',
        padding: 10
    },
    tenban: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
    },
    mahoadon: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
    },
    TenMon: {
        flex: 3,
        fontSize: 16,
        color: '#000',

    },
    SubAdd: {
        flex: 2,
        color: '#3377FF',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    Gia: {
        fontSize: 15,
        flex: 2,
        color: 'red',
        textAlign: 'right'

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
        marginRight: 3,
        width: 15,
        height: 15
    }
})
