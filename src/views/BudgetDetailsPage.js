import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { Button } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo, AntDesign, Ionicons, Fontisto } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import MonthPicker from "../components/MonthPicker";

const BudgetDetailsPage = ({route}) => {

    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();
    const props = route.params.props.props;
    console.log(props)
    const email = route.params.props.email;
    const isVisible = useIsFocused();

    const [description, setDescription] = useState(props.description);
    const [amount, setAmount] = useState(props.amount);
    // const [monthAmount, setMonthAmount] = useState(0.00);
    const [dateTime, setDateTime] = useState(new Date(props.date));
    const [dateTimePretty, setDateTimePretty] = useState(new Date().toDateString());
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(props.category ?? []);
    const [optionalDetails, setOptionalDetails] = useState(props.optionalDetails);
    const [changed, setChanged] = useState(false);
    const [percentage, setPercentage] = useState(props.isPercentage);
    const [percent, setPercent] = useState(props.isPercentage ? "%" : "$");
    const navigation = useNavigation();
    const isFirstRender = useRef(true);
    const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
    const [showPlus, setShowPlus] = useState(true);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [calendarSelected, setCalendarSelected] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date(props.date).getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date(props.date).getFullYear());
    const [isRecurring, setIsRecurring] = useState(props.isRecurring);



    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure?",
            "Are you sure you want to delete this budget item?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        console.log(props.uuid)
                        firebase.deleteBudget(email, props.date, props.uuid);
                        goBack();
                    },
                },
                {
                    text: "No",
                },
            ]
        )
    }


    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }

        setPercent(percentage ? "%" : "$");

    }, [percentage])

    useEffect(() => {
        if (isFirstRender.current) {
          return;
        }
        if (changed) {
          updateBudget();
        }
    
      }, [isVisible]);


    useEffect(() => {
        if (!isFirstRender.current) {
            setDateTime(new Date(selectedYear, selectedMonth - 1, 1)); // Just set it to the first of the month

            let tempDate = new Date(selectedYear, selectedMonth - 1, 1)
            let month = tempDate.toLocaleString('default', { month: 'long' });
            let year = tempDate.getFullYear();
            setDateTimePretty(`${month} ${year}`);
        }
        return;
    }, [selectedMonth, selectedYear])


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            firebase.getCategories(currentUser, currentGroup, setCategories);

            let date = new Date();
            let month = date.toLocaleString('default', { month: 'long' });
            let year = date.getFullYear();

            setDateTimePretty(`${month} ${year}`);

            // setNumberOfWeeks(weekCount(dateTime.getFullYear(), dateTime.getMonth()));
            return;
        }
        if (!changed) {
            setChanged(true);
        }
    }, [description, amount, optionalDetails, categories])

    const goBack = () => {
        navigation;
    }

    const updateBudget = () => {
        if (amount == 0.0 || description == "") {
            console.log("TODO: Incomplete Error Returning! Return a message to the user")
            return;
        }
        console.log("Updating")
        firebase.updateBudget(amount, description, optionalDetails, dateTime, percentage, isRecurring, selectedCategories, currentGroup, props.uuid)
        goBack();
    }


    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
            {/* Top 3rd will have unallocated budget vs. allocated budget. But that means I need to figure out some way of knowing their income for the month... So maybe a future feature then */}
            {/* <View style={styles.circleBudget}></View> */}
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
                setShowPlus(true);

            }}>
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
                        <View style={{ flex: 4 }} />
                        <Button
                            mode='text'
                            icon="delete"
                            style={{ alignItems: 'center', marginTop: 18 }}
                            labelStyle={{ color: 'black', fontSize: 32, alignItems: 'center' }}
                            contentStyle={{ alignContent: 'center' }}
                            onPress={() => {
                                showConfirmDialog();
                            }}
                        />
                    </View>
                    <View style={{ flex: 8 }}>
                        <TextInput multiline={true} style={[styles.title]} placeholder={"Budget Item"} value={description} onChangeText={description => setDescription(description)} />

                        <TouchableOpacity onPress={() => {
                            setCategoriesModalVisible(false);
                            setDateModalVisible(true);
                        }}>
                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <FontAwesome name="calendar-o" size={20} style={{ marginLeft: 16, marginRight: 16 }} />
                                <Text style={{ textAlignVertical: 'center', fontSize: 16 }}>{dateTimePretty}</Text>
                            </View>
                        </TouchableOpacity>

                        <Modal
                            transparent={true}
                            visible={dateModalVisible}
                            animationType="slide"
                            onRequestClose={() => {
                                setDateModalVisible(!dateModalVisible)
                                setCategoriesModalVisible(false);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                        <View style={{ flex: 2 }}>
                                            <Button
                                                mode="text"
                                                labelStyle={{ color: 'grey' }}
                                                onPress={() => {
                                                    setDateModalVisible(!dateModalVisible);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </View>
                                        <View style={{ flex: 3 }} />
                                        <View style={{ flex: 2 }}>
                                            <Button
                                                mode="text"
                                                labelStyle={{ color: '#3366CC' }}
                                                onPress={() => {
                                                    if (calendarSelected) {
                                                        let newDateTime = new Date(calendarSelected)
                                                        setDateTime(newDateTime);
                                                        setDateTimePretty(newDateTime.toDateString())
                                                    }
                                                    setDateModalVisible(!dateModalVisible);
                                                }}
                                            >
                                                Done
                                            </Button>
                                        </View>
                                    </View>
                                    <MonthPicker selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                                </View>

                            </View>
                        </Modal>

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

                        <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Description</Text>
                        {optionalDetails != "" ?
                            (
                                <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16 }}>
                                    <TextInput
                                        multiline={true}
                                        value={optionalDetails}
                                        onChangeText={
                                            optionalDetails => setOptionalDetails(optionalDetails)
                                        }
                                    />
                                </View>
                            )
                            :
                            (
                                <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16 }}>
                                    {showPlus ? (
                                        <Entypo name="plus" size={20} hidden={true} />
                                    ) : <></>
                                    }

                                    <TextInput
                                        style={{ marginLeft: 8 }}
                                        placeholder="Optional Details"
                                        onFocus={() => {
                                            setShowPlus(false);
                                        }}
                                        onBlur={(text) => {
                                            setOptionalDetails(text.nativeEvent.text)
                                        }}
                                    />
                                </View>
                            )
                        }

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Amount</Text>
                            {/* <Button mode="text" style={{ marginTop: 6, marginLeft: 16 }} labelStyle={{}} onPress={() => {
                                setIsMonthly(!isMonthly);
                                let tempAmount = amount;
                                if (isMonthly) {
                                    for (let i = 1; i < tempAmount.length; i++) {
                                        tempAmount[0] += tempAmount[i];
                                        tempAmount[i] = 0; 
                                    }
                                }
                                else {
                                    for (let i = 1; i < tempAmount.length; i++)
                                    {
                                        tempAmount[i] /= tempAmount[0] / tempAmount.length;
                                    }
                                }
                                setAmount(tempAmount);
                            }}> */}
                            {/* {isMonthly ? (<Text style={{ fontWeight: 'bold' }}> (Monthly)</Text>) : (<Text style={{ fontWeight: 'bold' }}>(Weekly)</Text>)}</Button> */}
                        </View>
                        {/* {isMonthly ? ( */}
                        <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16, backgroundColor: '#c0c0c0', borderRadius: 4, marginRight: 16 }}>
                            <Button
                                mode="text"
                                style={{ marginTop: 4 }}
                                labelStyle={{ fontSize: 16, lineHeight: 18 }}
                                onPress={() => {
                                    setPercentage(!percentage);
                                }}
                            >
                                {percent}
                            </Button>
                            <View style={{ width: 1, backgroundColor: '#909090', marginRight: 8, alignItems: 'center' }} />
                            <TextInput
                                style={[styles.input]}
                                multiline={true}
                                value={`${amount}`}
                                onChangeText={
                                    (amount) => {
                                        // let tempAmount = amount;
                                        // tempAmount[0] = parseInt(newAmount);
                                        setAmount(amount);
                                    }
                                }
                                keyboardType="numeric"
                            ></TextInput>
                        </View>
                        {/* ) : */}

                        {/*} (amount.map((value, index) => {
                            //         <View key={index} style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16, backgroundColor: '#c0c0c0', borderRadius: 4, marginRight: 16 }}>
                            //         <Button
                            //             mode="text"
                            //             style={{ marginTop: 4 }}
                            //             labelStyle={{ fontSize: 16, lineHeight: 18 }}
                            //             onPress={() => {
                            //                 setPercentage(!percentage);
                            //             }}
                            //         >
                            //             {percent}
                            //         </Button>
                            //         <View style={{ width: 1, backgroundColor: '#909090', marginRight: 8, alignItems: 'center' }} />
                            //         <TextInput
                            //             style={[styles.input]}
                            //             multiline={true}
                            //             value={"" + value}
                            //             onChangeText={
                            //                 (newAmount) => {
                            //                     let tempAmount = amount;
                            //                     tempAmount[index] = newAmount;
                            //                     setAmount(tempAmount);
                            //                 }
                            //             }
                            //             keyboardType="numeric"
                            //         ></TextInput>
                            //     </View>
                            //     })
                            // )}
                            */}

                        <View style={{ flexDirection: 'row', marginTop: 8, marginLeft: 8 }}>
                            <Button
                                mode="text"
                                onPress={() => {
                                    setIsRecurring(!isRecurring);
                                }}
                            >
                                {isRecurring ? (<Fontisto name="checkbox-active" size={16} />) : (<Fontisto name="checkbox-passive" size={16} />)}
                                {/* checkbox-active */}


                            </Button>
                            <Text style={{ fontSize: 16, justifyContent: 'center', lineHeight: 39 }}>Recurring</Text>

                        </View>




                        <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Catgeories Associated with this Budget Item</Text>
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

                                    <TouchableOpacity style={[styles.selectedCategories, { borderColor: 'black', flexBasis: '20%', justifyContent: 'center' }]} onPress={() => {
                                        setCategoriesModalVisible(!categoriesModalVisible)
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Entypo name="plus" size={20} hidden={true} style={{ color: 'black' }} />
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
                    {/* <View style={styles.center}>
                        <Button
                            mode="contained"
                            style={styles.saveButton}
                            onPress={() => {
                                updateBudget();
                            }}
                            icon="content-save"
                        >Save Budget Item</Button>
                    </View> */}
                </View>
            </TouchableWithoutFeedback>
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
        marginLeft: 16,
        fontSize: 28,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
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
    },
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 8,
    },
    saveButton: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#71797E'
    },
    input: {
        flex: 3,
        fontSize: 20,
        lineHeight: 28,
    },
    modalView: {
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
        paddingBottom: 64
    },
});


export default BudgetDetailsPage;