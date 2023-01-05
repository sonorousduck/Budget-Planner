import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';


const CreateNewBudgetPage = () => {

    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0.00)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [optionalDetails, setOptionalDetails] = useState("")
    const navigation = useNavigation();
    const [changed, setChanged] = useState(false);
    const isFirstRender = useRef(true);
    const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            firebase.getCategories(currentUser, currentGroup, setCategories);
            return;
        }
        if (!changed) {
            setChanged(true);
        }
    }, [description, amount, optionalDetails, categories])



    const goBack = () => {
        navigation.goBack();
    }

    addBudgetItem = () => {
        if (amount == 0.0 || description == "") {
            console.log("TODO: Incomplete Error Returning! Return a message to the user")
            return;
        }
        // firebase.addBudgetItem(amount, description, optionalDetails, expense, dateTime, selectedCategories, currentGroup)
        goBack();
    }


    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
            {/* Top 3rd will have unallocated budget vs. allocated budget. But that means I need to figure out some way of knowing their income for the month... So maybe a future feature then */}
            {/* <View style={styles.circleBudget}></View> */}

            <View style={styles.remaining}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Button
                            style={{ marginTop: 16 }}
                            labelStyle={{ color: 'black', fontSize: 32 }}
                            icon="chevron-left"
                            mode='text'
                            onPress={() => {
                                goBack();
                            }}
                        ><Text style={{ fontSize: 16 }}>Back</Text></Button>
                </View>

                <TextInput multiline={true} style={[styles.title]} placeholder={"Budget Item"} value={description} onChangeText={description => setDescription(description)} />
                
                <Modal
                        transparent={true}
                        visible={categoriesModalVisible}
                        animationType="slide"
                        onRequestClose={() => {
                            setCategoriesModalVisible(!categoriesModalVisible)
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalCategoryView}>
                                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    <View style={{ flex: 2 }}>
                                        {/* <Button
                                            mode="text"
                                            labelStyle={{ color: 'grey' }}
                                            onPress={() => {
                                                setCategoriesModalVisible(!categoriesModalVisible);
                                            }}
                                        >
                                            Cancel
                                        </Button> */}
                                    </View>
                                    <View style={{ flex: 3 }} />
                                    <View style={{ flex: 2 }}>
                                        <Button
                                            mode="text"
                                            labelStyle={{ color: '#3366CC' }}
                                            onPress={() => {

                                                setCategoriesModalVisible(!categoriesModalVisible);
                                            }}
                                        >
                                            Done
                                        </Button>
                                    </View>
                                </View>
                                <ScrollView style={{ width: '95%' }}>

                                    {categories.map((category, index) => (
                                        <TouchableOpacity key={index} style={styles.categorySelection} onPress={() => {
                                            let currentSelectedCategories = selectedCategories;

                                            if (selectedCategories.includes(category)) {
                                                currentSelectedCategories = currentSelectedCategories.filter(checked => checked !== category)
                                                setSelectedCategories(currentSelectedCategories)

                                            } else {
                                                currentSelectedCategories.push(category);
                                                currentSelectedCategories = currentSelectedCategories.filter(checked => checked !== category || checked === category)
                                                setSelectedCategories(currentSelectedCategories);
                                            }
                                        }}>
                                            {selectedCategories.includes(category) ? (
                                                <Ionicons name="checkmark" size={20} style={{ color: 'green', marginRight: 8 }} />
                                            ) :
                                                <></>
                                            }
                                            <Text style={{ fontSize: 16 }}>{category}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity style={[styles.categorySelection, { borderBottomWidth: 0, justifyContent: 'center' }]} onPress={() => {
                                        console.log("Implement this")
                                    }}>
                                        <Entypo name="plus" size={20} style={{ color: '#A9A9A9', marginRight: 8 }}></Entypo>
                                        <Text style={{ color: '#A9A9A9', fontSize: 16 }}>Create New Category</Text>
                                    </TouchableOpacity>

                                </ScrollView>

                            </View>
                        </View>

                </Modal>

                <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Categories</Text>
                        {selectedCategories.length ? (
                            <ScrollView >
                                <View style={styles.category}>
                                    {selectedCategories.map((category, index) => (
                                        <TouchableOpacity key={index} style={styles.selectedCategories} onPress={() => {
                                            let currentSelectedCategories = selectedCategories;
                                            currentSelectedCategories = currentSelectedCategories.filter(checked => checked !== category)
                                            setSelectedCategories(currentSelectedCategories)
                                        }}>
                                            <AntDesign name="close" size={20} style={{ marginRight: 8 }} />
                                            <Text style={{ fontSize: 16 }}>{category}</Text>
                                        </TouchableOpacity>
                                    ))}

                                    <TouchableOpacity style={[styles.selectedCategories, { borderColor: '#A9A9A9', flexBasis: '20%', justifyContent: 'center' }]} onPress={() => {
                                        setCategoriesModalVisible(!categoriesModalVisible)
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Entypo name="plus" size={20} hidden={true} style={{ color: '#A9A9A9' }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        )
                            :
                            (
                                <TouchableOpacity style={{}} onPress={() => {
                                    setCategoriesModalVisible(!categoriesModalVisible)
                                }}>
                                    <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16 }}>
                                        <Entypo name="plus" size={20} hidden={true} />
                                        <Text style={{ fontSize: 16, color: 'black', marginLeft: 8 }}>Categories</Text>
                                    </View>
                                </TouchableOpacity>
                            )}




            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    circleBudget: {
        flex: 1,
        backgroundColor: 'darkgrey'
    },
    remaining: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'rgba(99, 138, 126, 0.7)',
        height: '95%',
        marginTop: 8,
        borderRadius: 10,
    },
    title: {
        // alignSelf: 'center',
        // textAlign: 'center',
        marginLeft: 16,
        fontSize: 28,
        fontWeight: 'bold'
    },
    modalCategoryView: {
        margin: 2,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingBottom: 64,
        width: '100%',
        height: 400
    },
    categorySelection: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        width: '100%',
        flex: 1,
        // justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    selectedCategories: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 8,
        marginHorizontal: 4,
        flexDirection: 'row',
        flexBasis: '45%',
        marginVertical: 8
    },
    category: {
        marginLeft: 24,
        marginTop: 16,
        borderRadius: 16,
        padding: 4,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    addCategories: {
        borderWidth: 1,
        padding: 4,
        flexDirection: 'row',
        flex: 1
    }
});


export default CreateNewBudgetPage;