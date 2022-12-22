import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, ScrollView} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

const Transaction = () => {
    return (
        <TouchableOpacity style={styles.overallCard} onPress={() => {
            console.log("Touched!")
        }}>
            <Text numberOfLines={1} style={{flex: 3, lineHeight: 32, alignItems: 'center', fontSize: 16}}>Transaction</Text>
            <View style={{flex: 2, lineHeight: 32, alignItems: 'center'}}></View>
            <Text numberOfLines={1} style={{lineHeight: 32, flex: 2, justifyContent: 'center', alignItems: 'center', fontSize: 16, color: 'red'}}>- $1700.31</Text>
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