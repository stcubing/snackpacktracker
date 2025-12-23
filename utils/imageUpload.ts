import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';


export const pickImageAsync = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri;
        const lastMod = result.assets[0].file?.lastModified;

        console.log(lastMod);

        let rawDate = new Date();

        if (lastMod) {
            rawDate = new Date(lastMod);
        }
        // else {
        //     date = null; // maybe replace with date the photo was uploaded idk
        // }

        let splitDate = rawDate.toString().split(" "); //['Thu', 'Dec', '11', '2025', '15:54:18', 'GMT+1100', '(Australian', 'Eastern', 'Daylight', 'Time)']

        // convert word month into number
        let month;
        switch (splitDate[1]) {
            case "Jan": month = 1; break;
            case "Feb": month = 2; break;
            case "Mar": month = 3; break;
            case "Apr": month = 4; break;
            case "May": month = 5; break;
            case "Jun": month = 6; break;
            case "Jul": month = 7; break;
            case "Aug": month = 8; break;
            case "Sep": month = 9; break;
            case "Oct": month = 10; break;
            case "Nov": month = 11; break;
            case "Dec": month = 12; break;
        }

        const date = splitDate[2] + "/" + month + "/" + splitDate[3]
        const time = splitDate[4];

        // console.log(uri);
        console.log(date);
        console.log(time);


        // setSelectedImage(uri);

        router.push({
            pathname: "/media",
            params: { media: uri, type: "upload", date: date, time: time, ms: lastMod }
        })

    } else {
        // alert("no images selected");
    }

};