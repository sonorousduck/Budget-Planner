import React, {useEffect, useState, useRef} from "react";
import { View, StyleSheet, Text } from "react-native"
import { Picker } from '@react-native-picker/picker';



const MonthPicker = (props) => {

    // const color = "red" ? props.props.expense : 'green';
    // const negative = "-" ? props.props.expense : '+';
    const [years, setYears] = useState([])
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            let tempYears = [];
            let currentYear = new Date().getFullYear();
            // Only going to let them go 10 years into the future. I don't think that past makes sense to have though... Maybe a single year

            // Past
            tempYears.push(currentYear - 1);
           
            // Current + Future
            for (let i = 0; i < 10; i++) {
                tempYears.push(currentYear + i);
            }
            setYears(tempYears)
            isFirstRender.current = false;
        }
    });


    return (
        <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 18, textDecorationLine: 'underline' }}>Month</Text>
                <Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 18, textDecorationLine: 'underline' }}>Year</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Picker
                    selectedValue={props.selectedMonth}
                    onValueChange={(itemValue, itemIndex) => props.setSelectedMonth(itemValue)}
                    style={{width: "50%"}}
                >
                    <Picker.Item label="January" value="1" />
                    <Picker.Item label="February" value="2" />
                    <Picker.Item label="March" value="3" />
                    <Picker.Item label="April" value="4" />
                    <Picker.Item label="May" value="5" />
                    <Picker.Item label="June" value="6" />
                    <Picker.Item label="July" value="7" />
                    <Picker.Item label="August" value="8" />
                    <Picker.Item label="September" value="9" />
                    <Picker.Item label="October" value="10" />
                    <Picker.Item label="November" value="11" />
                    <Picker.Item label="December" value="12" />

                </Picker>
                <Picker
                    selectedValue={props.selectedYear}
                    onValueChange={(itemValue, itemIndex) => props.setSelectedYear(itemValue)}
                    style={{width: "50%"}}
                >
                    {years.map((year, index) => 
                        <Picker.Item key={index} label={year.toString()} value={year} />
                    )}
                </Picker>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

});

export default MonthPicker;