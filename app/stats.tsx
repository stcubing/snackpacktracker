import TextButton from "@/components/TextButton";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { FiraCode_400Regular, useFonts } from '@expo-google-fonts/fira-code';
import { router, useFocusEffect } from 'expo-router';
import IconButton from "@/components/IconButton";
import TextBox from "@/components/TextBox";
import { loadEntries } from "@/lib/storage";
import { Entry } from "@/types/entry";


export default function stats() {

    const [partStats, setPartStats] = useState({
        rice: 0, chips: 0,

        chicken: 0, beef: 0, lamb: 0, 
        
        bbq: 0, chilli: 0, garlic: 0, mayo: 0,
        hummus: 0, tomato: 0, sweetchilli: 0,
    });
    
    const [miscStats, setMiscStats] = useState({
        count: 0
    })


    useFocusEffect(
        useCallback(() => {
    
            const fetchData = async () => {
                try {
                    let data: Entry[] = await loadEntries();
                    console.log(data);

                    for (const key in partStats) {
                        updatePartStats(key, getTotalOf(key, data))
                    }
                    
                    setMiscStats({"count": data.length}) // maybe switch to using the function? doesnt seem needed atm
                    
                    
                } catch (error) {
                    console.log("error fetching data", error);
                }
                
            };
            
            
            fetchData();
            
        }, [])
    );        

    const updatePartStats = (key: string, value: any) => {
        setPartStats(prevData => ({
            ...prevData,
            [key]: value
        }))
    }
    const updateMiscStats = (key: string, value: any) => {
        setMiscStats(prevData => ({
            ...prevData,
            [key]: value
        }))
    }


    // gets total number of times item shows up in data
    const getTotalOf = (item: string, data: Entry[]) => {
        console.log("getting total of", item);
        let count = 0;
        
        for (let entry in data) {
            if (item === "rice" || item === "chips") {
                if (data[entry]["base"].includes(item)) count++;
            } else if (item === "chicken" || item === "beef" || item === "lamb") {
                if (data[entry]["meat"].includes(item)) count++;
            } else {
                if (data[entry]["sauce"].includes(item)) count++;
            }
        }
        return count;
    }


    function back() {
        router.back()
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.top} >
                    <IconButton onPress={back} icon="arrow-back" size="small" />
                    <Text style={styles.heading}>statistics</Text>
                </View>

                {/* <TextBox text="bleh" /> */}
                <Text style={styles.text}>total: {miscStats["count"]}</Text>
                <Text style={styles.text}>rice: {partStats["rice"]}</Text>
                <Text style={styles.text}>chips: {partStats["chips"]}</Text>
                <Text style={styles.text}>chicken: {partStats["chicken"]}</Text>
                <Text style={styles.text}>bbq: {partStats["bbq"]}</Text>

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
