import { readFile } from "./read-file";

export const readJSONFile = async (filePath: string) => {
    const data = await readFile(filePath);

    try {
        if (typeof data === 'string') {
            return JSON.parse(data);
        }
        throw Error('Error while reading from db');
    } catch (err) {
        console.error(err);
        throw err;
    }
}