import fs from 'fs';
// foldero - will load files from the folder you specify and construct an object
// with properties corresponding to each loaded file
import foldero from 'foldero';

const getJsonData = obj => {
  if (fs.existsSync(obj.dataPath)) {
    // Convert directory to a JavaScript Object
    return foldero(obj.dataPath, {
      recurse: true,
      whitelist: '(.*/)*.json$',
      loader: file => {
        let json = {};
        try {
          json = JSON.parse(fs.readFileSync(file, 'utf8'));
        }
        catch (e) {
          console.log(`Error parsing data file: ${file}`);
          console.log(e);
        }

        return json;
      }
    });
  }

};

export {
  getJsonData
};
