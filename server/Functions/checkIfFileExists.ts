import fs from 'fs';

export default function checkIfFileExists(filePath: string)
{
    fs.stat(filePath, (err, stat) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File does not exist: ${filePath}`);
                return false;
            }
            console.error(`Error checking if file exists: ${err}`);
            return false;
        }
        console.log(`File exists: ${filePath}`);

        return true;
    });
}