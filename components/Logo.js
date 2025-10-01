import { View, Text, Image } from "react-native";

export default function Logo() {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 40, height: 40 }} source={require('../assets/logo.png')} />
            <Text style={{ marginLeft: 7, fontSize: 18, fontWeight: 700 }}>Stepper</Text>
        </View>
    )
}