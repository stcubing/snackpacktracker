import TextButton from "@/components/TextButton";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { FiraCode_400Regular, useFonts } from '@expo-google-fonts/fira-code';
import { router } from 'expo-router';
import IconButton from "@/components/IconButton";
import TextBox from "@/components/TextBox";

export default function random() {

    // each digit represents a different possible component of the snack pack
    // if the digit is odd, return false, if even, return true

    // e.g. 0.1234 will be false true false true
    //      which could translate to rice (false, as opposed to a true chips),
    //      true-false = chicken or whatever, and yes chilli sauce

    // number of components:
    // - 1 bool between base
    // - 4 meats (can be determined with 2 bits)
    // - 7 for sauces
    // = 10 decimal points

    const [fontsLoaded] = useFonts({ FiraCode_400Regular });

    let rand;
    const randArray: any[] = [];

    const [base, setBase] = useState('');
    const [meat, setMeat] = useState('');
    const [sauce, setSauce] = useState('');
    
    // initial
    useEffect(() => {
        reroll();
    }, []);

    function reroll() {
        console.log("--------------");

        rand = (Math.random() * Math.pow(10,10)).toPrecision(10); // set seed
        console.log("seed:", rand);

        // convert to array
        for (let i = 0; i < 9; i++) {
            const result: boolean = (Number(rand[i]) % 2 == 0) ? true : false;
            randArray[i] = result;
        }
    
        // turn random results into hsp
        setBase((randArray[0]) ? "rice" : "chips");

        if (randArray[1]) {
            if (randArray[2]) setMeat("chicken"); // truetrue
            else setMeat("beef"); // truefalse
        } else {
            if (randArray[2]) setMeat("lamb"); // falsetrue
            else setMeat("mixed"); // falsefalse
        }

        const sauceArray = [];
        if (randArray[3]) sauceArray.push("bbq");
        if (randArray[4]) sauceArray.push("chilli");
        if (randArray[5]) sauceArray.push("garlic");
        if (randArray[6]) sauceArray.push("mayo");
        if (randArray[7]) sauceArray.push("hummus");
        if (randArray[8]) sauceArray.push("tomato");
        if (randArray[9]) sauceArray.push("sweet chilli");

        if (sauceArray.length == 0) {
            setSauce("no sauce")
        } else {
            setSauce(sauceArray.join(", "))
        }

        console.log(randArray);
    }

    function back() {
        router.back()
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.top} >
                    <IconButton onPress={back} icon="arrow-back" size="small" />
                    <Text style={styles.heading}>randomiser</Text>
                </View>

                <View style={styles.results} >
                    <TextBox text={base} />
                    <TextBox text={meat} />
                    <TextBox text={sauce} />
                </View>

                <View style={styles.button}>
                    <TextButton text="reroll" onPress={reroll} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    heading: {
        fontFamily: 'FiraCode_400Regular',
        color: "#ffffff",
        fontSize: 30,
        lineHeight: 40,
    },
  
    background: {
        backgroundColor: '#070707',
        height: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    container: {
        // backgroundColor: 'green',
        height: '90%',
        width: '90%',
        paddingBottom: 50
    },

    results: {
        display: 'flex',
        gap: 10,
        marginVertical: 50
    },


    text: {
        color: 'white',
        fontSize: 40
    },


    top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginVertical: 50,
    },

    button: {
        marginTop: 'auto',
    },
    subtext: {
        fontFamily: 'FiraCode_400Regular',
        color: '#ffffff',
        opacity: 0.5,
        fontSize: 15,
    },


})