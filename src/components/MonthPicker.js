import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text } from "react-native"
import { Picker } from '@react-native-picker/picker';



const MonthPicker = (props) => {

    // const color = "red" ? props.props.expense : 'green';
    // const negative = "-" ? props.props.expense : '+';
    return (
        <View style={{flexDirection: 'row', backgroundColor: 'red'}}>
            <Picker
                selectedValue={"1"}
                onValueChange={(itemValue, itemIndex) => props.setSelectedMonth(itemValue)}
            >
                <Picker.Item label="January" value="1" />
                <Picker.Item label="February" value="2" />
            </Picker>
            
            <Picker
                selectedValue={"2023"}
                onValueChange={(itemValue, itemIndex) => props.setSelectedYear(itemValue)}
            >
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default MonthPicker;