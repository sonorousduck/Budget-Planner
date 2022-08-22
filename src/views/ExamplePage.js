import { View } from "react-native"
import useFirebase from "../hooks/Firebase"

const ExamplePage = () => {
    
    const firebase = useFirebase()

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}