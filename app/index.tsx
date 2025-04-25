import {Text, View} from "react-native";
// custom modules
import {LoginScreen} from "../modules/main/main";


export default function App() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/*<Text>Hello crusades mobile app.</Text>*/}
            <LoginScreen/>
        </View>
    );
}
