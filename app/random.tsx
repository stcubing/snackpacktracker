import TextButton from "@/components/TextButton";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

    const [rand, setRand] = useState('');
    const [randomArray, setRandomArray] = useState('');
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

        setRand(() => { // ensure new state of rand is read
            const newRand: string = (Number(Math.random().toPrecision(10)) * Math.pow(10,10)).toString();
            console.log(newRand);

            // convert to array
            for (let i = 0; i < 9; i++) {
                const result: boolean = (Number(newRand[i]) % 2 == 0) ? true : false;
                randArray[i] = result;

            }

            return newRand;
        });
        // console.log(randArray);
        setRandomArray(randArray.toString());

    
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
        setSauce(sauceArray.join(", "))

    }

    return (
        <View>
            <Text>{rand}</Text>
            <Text>{randomArray}</Text>
            <Text>{base}</Text>
            <Text>{meat}</Text>
            <Text>{sauce}</Text>
            <TextButton text="reroll" onPress={reroll} />
        </View>
    )
}