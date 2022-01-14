import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const deleteDirFilesUsingPattern = (pattern) => {
  // default directory is the current directory

  // get all file names in directory
  fs.readdir(path.resolve(__dirname, '../build/'), (err, fileNames) => {
    if (err) throw err;

    // iterate through the found file names
    for (const name of fileNames) {
      // if file name matches the pattern
      if (pattern.test(name)) {
        // try to remove the file and log the result
        fs.unlink(path.resolve(__dirname, '../build/', name), (err) => {
          if (err) throw err;
        });
      }
    }

    console.log(`Deleted all spec files`);
  });
};

deleteDirFilesUsingPattern(/.*?(?=\.spec).*?\.js/);
