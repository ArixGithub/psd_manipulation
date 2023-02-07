import express, { Request, Response } from 'express';
import * as fs from 'fs';
import checkIfFileExists from './Functions/checkIfFileExists';

const psd = require('psd');
const multer = require('multer');

const upload = multer();

const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get('/getpsd', async (req: Request, res: Response) => {
  const filePath = '/Users/ariklerner/Downloads/rx_golden.psd';
  const outputPath = '/Users/ariklerner/Downloads/rx_golden_copy.png';

  checkIfFileExists(filePath);
  
  try {
    const psdFile = await psd.open(filePath);
    await psdFile.image.saveAsPng(outputPath);

    fs.readFile(outputPath, (error, data) => {
      if (error) {
        console.error(`Error reading PNG file: ${error}`);
      } else {
        res.send(data);
      }
    });
  } catch (error : unknown) {
    console.log(error)

    res.status(500).send({ error});
  }
});

app.post("/getpsd", upload.single("file"), async (req, res) => {
  const file = (req as any).file;
  if (!file) {
    return res.status(400).send("No file was uploaded.");
  }
  try {
      const tempFilePath = '/Users/ariklerner/Downloads/rx_golden_copy_11.psd';
      const tempImagePath = '/Users/ariklerner/Downloads/rx_golden_copy_111.png';
      const psdBuffer = file.buffer;
      fs.writeFileSync(tempFilePath, psdBuffer);

      const psdFile = await psd.open(tempFilePath);
      await psdFile.image.saveAsPng(tempImagePath);
      
      fs.readFile(tempImagePath, (error, data) => {
        if (error) {
          console.error(`Error reading PNG file: ${error}`);
        } else {
          res.set("Content-Type", "image/png");
          res.send(data);
        }
      });

      fs.unlinkSync(tempFilePath);
    } catch (error : unknown) {
      console.error(error)
      res.status(500).send({ error});
  }
});

app.listen(5001, () => {
  console.log("server started on 5001");
});
