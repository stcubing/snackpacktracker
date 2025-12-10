import { getRandomValues } from "expo-crypto";
import { v4 as uuidv4 } from "uuid";

export const generateUUID = (): string => {
    const randomBytes = new Uint8Array(16);
    getRandomValues(randomBytes);
    return uuidv4({ random: randomBytes });
};