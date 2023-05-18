import { promises } from 'fs';

export const readFile = async (filePath: string) => {
    try {
      const data = await promises.readFile(filePath, 'utf8');
      return data;
    }
    catch(err) {
      throw err;
    }
}