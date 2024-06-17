import React, {Component} from "react";
import { StyleSheet,FlatList,  View } from "react-native";
import Header from "../components/Header";
import Post from "../components/Post";


class Imoveis extends Component {

    state = {}
    
    render() {
        return (
            <View style={styles.container}>
                <Header />
                
            </View>
        );
        
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5fcff",
        justifyContent: "center",
        alignContent: "center"
    }
});

export default Imoveis;


