import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { router, useFocusEffect } from 'expo-router';
import IconButton from "@/components/IconButton";
import { loadEntries } from "@/lib/storage";
import { Entry } from "@/types/entry";
import StatBox from "@/components/StatBox";
import StarRatingDisplay from "react-native-star-rating-widget";


export default function stats() {

    const [partStats, setPartStats] = useState({
        rice: 0, chips: 0,

        chicken: 0, beef: 0, lamb: 0, 
        
        bbq: 0, chilli: 0, garlic: 0, mayo: 0,
        hummus: 0, tomato: 0, sweetchilli: 0,
    });
    const [percStats, setPercStats] = useState({
        rice: 0, chips: 0,

        chicken: 0, beef: 0, lamb: 0, 
        
        bbq: 0, chilli: 0, garlic: 0, mayo: 0,
        hummus: 0, tomato: 0, sweetchilli: 0,
    });
    
    const [miscStats, setMiscStats] = useState({
        count: 0, avgRating: 0, ytdCount: 0,
    });

    
    const sauces = []; // for later mapping

    let count = 0;

    useFocusEffect(
        useCallback(() => {
    
            const fetchData = async () => {
                try {
                    let data: Entry[] = await loadEntries();

                    count = data.length; // used for averaging, %s, etc

                    const currentYear = (new Date()).getFullYear();

                    // get total of star ratings to average later
                    let totalRating: number = 0;
                    let avgRating: number = 0;
                    let ytdCount: number = 0;
                    for (const entry in data) {
                        totalRating += Number(data[entry]["rating"]);
                        if (Number(data[entry]["date"].split("/")[2]) == currentYear) {
                            // console.log("same year found")
                            ytdCount++;
                        }
                    }
                    // console.log("total rating", totalRating)
                    if (totalRating !== 0) {
                        avgRating = Math.round(totalRating / count*100) / 100
                    } else {
                        avgRating = 0;
                    }

                    // maybe switch to using the function? doesnt seem needed atm
                    setMiscStats({
                        "count": count,
                        "avgRating": avgRating,
                        "ytdCount": ytdCount,
                    }) 

                    // loop thru each ingredient and populate each statistic
                    for (const key in partStats) {
                        updateStats(key, getTotalOf(key, data));
                    }
                    
                    
                    
                } catch (error) {
                    console.log("error fetching data", error);
                }
                
            };
            
            
            fetchData();
            
        }, [])
    );        

    const updateStats = (key: string, value: any) => {
        setPartStats(prevData => ({
            ...prevData,
            [key]: value
        }))
        if (value !== 0) {
            setPercStats(prevData => ({
                ...prevData,
                [key]: Math.round(value*100 / count*10) / 10
            }))
        } else {
            setPercStats(prevData => ({
                ...prevData,
                [key]: 0
            }))
        }
    }
    const updateMiscStats = (key: string, value: any) => {
        setMiscStats(prevData => ({
            ...prevData,
            [key]: value
        }))
    }

    // map sauces to array of objects to be mapped later
    sauces.push({sauceName: "bbq", sauceValue: partStats["bbq"], saucePerc: percStats["bbq"]});
    sauces.push({sauceName: "chilli", sauceValue: partStats["chilli"], saucePerc: percStats["chilli"]});
    sauces.push({sauceName: "garlic", sauceValue: partStats["garlic"], saucePerc: percStats["garlic"]});
    sauces.push({sauceName: "mayo", sauceValue: partStats["mayo"], saucePerc: percStats["mayo"]});
    sauces.push({sauceName: "hummus", sauceValue: partStats["hummus"], saucePerc: percStats["hummus"]});
    sauces.push({sauceName: "tomato", sauceValue: partStats["tomato"], saucePerc: percStats["tomato"]});
    sauces.push({sauceName: "sweet chilli", sauceValue: partStats["sweetchilli"], saucePerc: percStats["sweetchilli"]});


    // gets total number of times item shows up in data
    const getTotalOf = (item: string, data: Entry[]) => {
        // console.log("getting total of", item);
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


    return (
        <View style={styles.background}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.top} >
                    <IconButton onPress={router.back} icon="arrow-back" size="small" />
                    <Text style={styles.heading}>statistics</Text>
                </View>

                <View style={styles.statsContainer}>

                    <View style={styles.row}>
                        <StatBox size="small" stat="total" value={miscStats["count"]} />
                        <StatBox size="small" stat="ytd" value={miscStats["ytdCount"]} />
                    </View>

                    <View style={styles.row}>
                        <StatBox size="large" stat="chips" value={partStats["chips"]} perc={percStats["chips"]} width={percStats["chips"]} />
                        <StatBox size="large" stat="rice" value={partStats["rice"]} perc={percStats["rice"]} width={percStats["rice"]} />
                    </View>
                    <View style={styles.row}>
                        <StatBox size="large" stat="chicken" value={partStats["chicken"]} perc={percStats["chicken"]} width={percStats["chicken"]} />
                        <StatBox size="large" stat="beef" value={partStats["beef"]} perc={percStats["beef"]} width={percStats["beef"]} />
                        <StatBox size="large" stat="lamb" value={partStats["lamb"]} perc={percStats["lamb"]} width={percStats["lamb"]} />
                    </View>

                    <View style={styles.sauces}>

                        { sauces.map((sauce) => (
                            <View style={styles.sauceRow} key={sauce.sauceName}>
                                <Text style={styles.sauceStatText}>{sauce.sauceName}</Text>
                                <View style={styles.sauceStats}>
                                    <Text style={styles.saucePercText}>{sauce.saucePerc}%</Text>
                                    <Text style={styles.sauceValueText}>{sauce.sauceValue}</Text>
                                </View>
                            </View>
                        ))}
                        
                    </View>

                     <View style={styles.rating}>
                        <StarRatingDisplay
                            style={styles.rating}
                            rating={miscStats["avgRating"]}
                            onChange={() => {}}
                            color='white'
                            starSize={50}
                            step="quarter"
                            enableSwiping={false}
                            emptyColor='rgba(255,255,255,0.3)'
                            starStyle={{
                                margin: -2,
                            }}
                        />
                    </View>
                    <StatBox size="small" stat="average rating" value={miscStats["avgRating"]} />

                </View>

            </ScrollView>
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
        paddingTop: -50,
        height: '90%',
        width: '90%',
        marginTop: 50,
    },

    results: {
        display: 'flex',
        gap: 10,
        marginVertical: 50
    },


    text: {
        color: 'white',
        fontSize: 25
    },


    top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginVertical: 50,
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10
     
    },

    statsContainer: {
        gap: 10,
        marginBottom: 80,
    },

    sauces: {
        flexBasis: 100,
        backgroundColor: '#141414', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        

        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,

        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 10,
    },
    sauceRow: {
        margin: -2,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sauceStats: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 50,
    },
    sauceStatText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        fontSize: 20,
    },
    saucePercText: {
        fontFamily: 'FiraCode_400Regular',
        color: 'white',
        opacity: 0.5,
        fontSize: 15,
    },
    sauceValueText: {
        fontFamily: 'FiraCode_600SemiBold',
        color: 'white',
        fontSize: 20,
    },


    rating: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        paddingVertical: 10,
    },



})
