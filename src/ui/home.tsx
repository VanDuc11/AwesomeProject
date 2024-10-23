import React, { useState } from 'react';
import { Alert} from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from './CustomModal';

function Home() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [productList, setProductList] = useState<Product[]>([]);
    const [productForm, setProductForm] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        disCountPrice: 0,
        soldQuantity: 0,
        image: '',
    });

    const onSaveProduct = () => {
        if (!productForm.name.trim()) {
            Alert.alert('Tên sản phẩm không được để trống.');
            return;
        }

        if (productForm.price <= 0) {
            Alert.alert('Giá sản phẩm phải lớn hơn 0.');
            return;
        }

        if (productForm.disCountPrice < 0) {
            Alert.alert('Giá giảm giá không được âm.');
            return;
        }

        if (productForm.soldQuantity < 0) {
            Alert.alert('Số lượng đã bán không được âm.');
            return;
        }
        const newProduct: Product = {
            id: productList.length + 1,
            name: productForm?.name,
            image: productForm?.image,
            price: productForm?.price || 0,
            disCountPrice: productForm?.disCountPrice,
            soldQuantity: productForm?.soldQuantity,
        };
        setProductForm({
            id: 0,
            name: '',
            price: 0,
            disCountPrice: 0,
            soldQuantity: 0,
            image: '',
        });
        setProductList([...productList, newProduct]);
        setModalVisible(!modalVisible);
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const calculateDiscountedPrice = (price: number, disCountPrice: number): number =>{
        return price - (price * disCountPrice / 100);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sản phẩm yêu thích</Text>
            </View>
            <FlatList
                data={productList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={styles.productItem}>
                        {item.image ? (
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                        ) : (
                            <Image source={require('../../assets/images.png')} style={styles.productImage} />
                        )}

                        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-around' }}>
                            <Text style={styles.productName}>{item.name}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text style={styles.productPrice}>{formatter.format(calculateDiscountedPrice(item.price, item.disCountPrice))}</Text>
                                <Text style={styles.productPriceDis}>{item.disCountPrice}%</Text>
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
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true)
                    }}
                >
                    <Text style={styles.foodterText}> Add Cart</Text>
                </TouchableOpacity>
            </View>
            <CustomModal visible={modalVisible} title='Add Cart'>
                <View >

                    <TextInput placeholder='Nhập tên sản phẩm'
                        style={styles.modalInput}
                        value={productForm?.name}
                        onChangeText={(text) => setProductForm({ ...productForm, name: text })} />

                    <TextInput placeholder='Giá sản phẩm'
                        style={styles.modalInput}
                        keyboardType='numeric'
                        onChangeText={(text) => setProductForm({ ...productForm, price: parseFloat(text) })} />

                    <TextInput placeholder='Giảm giá %'
                        style={styles.modalInput}
                        keyboardType='numeric'
                        onChangeText={(text) => setProductForm({ ...productForm, disCountPrice: parseFloat(text) })} />

                    <TextInput placeholder='Số lượng'
                        style={styles.modalInput}
                        keyboardType='numeric'
                        onChangeText={(text) => setProductForm({ ...productForm, soldQuantity: parseFloat(text) })} />

                    <TextInput placeholder='Link ảnh'
                        style={styles.modalInput}
                        value={productForm.image}
                        onChangeText={(text) => setProductForm({ ...productForm, image: text })} />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.modalButton}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton}
                            onPress={() => onSaveProduct()}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </CustomModal>
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
        padding: 5,
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
    },
    modalHeader: {
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#FFC300',
        height: 50,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20
    },
    modalInput: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        borderRadius: 10,
    },
    modalButton: {
        height: 40,
        width: 120,
        backgroundColor: "#FFC300",
        margin: 10,
        justifyContent: 'center',
        borderRadius: 10,
    },
});



export default Home;
