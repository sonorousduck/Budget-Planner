import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, ScrollView} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

const Transaction = (props) => {
    let color = "green";
    let negative = "+";
    if (props.props.expense)
    {
        color = "red";
        negative = "-";
    }
    // const color = "red" ? props.props.expense : 'green';
    // const negative = "-" ? props.props.expense : '+';
    return (
        <TouchableOpacity style={styles.overallCard} onPress={() => {
            console.log("Touched!")
            console.log(color);
            console.log(negative);

        }}>
            <Text numberOfLines={1} style={{flex: 10, lineHeight: 32, alignItems: 'center', fontSize: 16}}>{props.props.description}</Text>
            <View style={{flex: 1, lineHeight: 32, alignItems: 'center'}}></View>
            <Text numberOfLines={1} style={{lineHeight: 32, flex: 4, justifyContent: 'center', alignItems: 'center', fontSize: 16, color: color}}>{negative} ${props.props.amount}</Text>
            <Button 
                style={{lineHeight: 32, flex: 1}} 
                labelStyle={{color: '#8b8b8b', fontSize: 24}} 
                contentStyle={{flexDirection: 'row-reverse'}}
                icon="chevron-right" 
                mode='text'
                disabled />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    overallCard: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingLeft: 16,
        paddingVertical: 16,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 6,
        marginBottom: 4,
        marginTop: 4,
    }
});

export default Transaction;