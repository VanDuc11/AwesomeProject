import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
function Home() {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../../assets/back.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sản phẩm yêu thích</Text>
            </View>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <View style={styles.productItem}>
                        <Image source={item.image} style={styles.productImage} />
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-around' }}>
                            <Text style={styles.productName}>{item.name}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text style={styles.productPrice}>{formatter.format(item.discountPrice)}</Text>
                                <Text style={styles.productPriceDis}>{formatter.format(item.price)}</Text>
                            </View>

                            <Text style={{ color: 'black', marginTop: 10 }}>đã bán {item.soldQuantity}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/favourite.png')} />
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/shopping_cart.png')} />
                        </View>
                    </View>
                }
            />
            <View style={styles.foodter}>
                <TouchableOpacity>
                    <Text style={styles.foodterText}> Về Trang chủ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1
    },
    header: {
        backgroundColor: '#FFC300',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    headerTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },
    productItem: {
        flexDirection: 'row',
        margin: 5,
        padding:5,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 3,
    },
    productName: {
        fontWeight: 'bold',
        color: 'black',
    },
    productPrice: {
        color: 'red',
        fontSize: 15
    },
    productPriceDis: {
        color: 'grey',
        fontSize: 12,
        marginLeft: 5,
        alignSelf: 'center',
        textDecorationLine: 'line-through'
    },
    foodter: {
        height: 80,
        width: '100%',
        borderTopWidth: 0.5,
        borderColor: 'grey',
        justifyContent: 'center',
    },
    foodterText: {
        height: 40,
        fontSize: 16,
        margin: 20,
        backgroundColor: '#FFC300',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
const products = [
    {
        id: '1',
        name: 'Cáp Type C – Lightning Xmobile LPDC-05',
        image: require('../../assets/adapter-sac.jpg'),
        price: 100000,
        discountPrice: 80000,
        soldQuantity: 10,
    },
    {
        id: '2',
        name: 'Pin sạc dự phòng Polymer 10.000 mAh Hydrus PJ JP196',
        image: require('../../assets/sac-du-phong.jpg'),
        price: 150000,
        discountPrice: 120000,
        soldQuantity: 5,
    },
    {
        id: '3',
        name: 'Thẻ nhớ chuyên Camera Sandisk MicroSD 64GB class 10_U3',
        image: require('../../assets/the-nho.jpg'),
        price: 200000,
        discountPrice: 180000,
        soldQuantity: 20,
    },
];

export default Home;
