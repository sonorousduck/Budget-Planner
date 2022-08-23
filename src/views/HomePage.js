import React from "react";
import { View, Text} from "react-native"
import useFirebase from "../hooks/Firebase"

const HomePage = () => {
    
    const firebase = useFirebase();

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default HomePage;