import TextButton from "@/components/TextButton";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function random() {

    // each digit represents a different possible component of the snack pack
    // if the digit is odd, return false, if even, return true

    // e.g. 0.1234 will be false true false true
    //      which could translate to rice (false, as opposed to a true chips),
    //      yes chicken, no beef, yes lamb, etc

    // number of components:
    // - 1 bool between base
    // - 3 for meat
    // - 7 for sauces
    // = 10 decimal points

    const [rand, setRand] = useState('');
    // const [randArray, setRandArray] = useState([]);
    const randArray: any[] = [];
    
    // initial
    useEffect(() => {
        reroll();
    }, []);

    function reroll() {
        console.log("--------------");

        setRand(() => { // ensure new state of rand is read
            const newRand: string = Math.random().toPrecision(10);
            console.log(newRand);

            for (let i = 0; i < 10; i++) {
                const digit: number = Number(newRand[i+2]);
                const result: boolean = (digit % 2 == 0) ? true : false;
                randArray[i] = result;

                // console.log(newRand[i+2], result);
            }

            return newRand;
        });
        console.log(randArray);

    }

    return (
        <View>
            <Text>{rand}</Text>
            <Text>{randArray}</Text>
            <TextButton text="reroll" onPress={reroll} />
        </View>
    )
}