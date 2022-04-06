import { promises as fs } from 'fs'
import { IncomingForm } from 'formidable'

async function uploadFileToGoogleCloud(
    { 
        bucketName = process.env.GOOGLE_BUCKET_NAME,
        filePath,
        destFileName 
    }
) {

  // Imports the Google Cloud client library
  const { Storage} = require('@google-cloud/storage');

  let uploaded = false;

  // Creates a client
  const storage = new Storage({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY
      }
  });

  // Function that uploads to the storage bucket
  async function uploadFile() {
    try {
        await storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
        });
        console.log(`${filePath} uploaded to ${bucketName}`);
        uploaded = true;
    } catch (error) {
        uploaded = false;
    }
  }

  // Do the upload.
  await uploadFile();
  return uploaded;
}

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req, res) => {
    
    const { vid } = req.query;
    
    if (req.method == "POST") {
        try {
            const user_res = await fetch('https://fletnix.vercel.app/api/user', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    cookie: req.headers.cookie,
                },
            });
            const user_data = await user_res.json();
            console.log('USER DATA: ', user_data);
            if (!user_data.role.content_editor) {
                return res.status(403).send('Only Content Editors can Upload Videos.');  
            }

            const data = await new Promise((resolve, reject) => {
                const form = new IncomingForm()
                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err)
                    resolve({ fields, files })
                })
            })

            const destFileName = data?.fields.type + '/' + vid + "." + data?.files.file.mimetype.split('/')[1];

            const uploaded = await uploadFileToGoogleCloud({filePath: data?.files.file.filepath, destFileName: destFileName});

            return res.status(200).send({"uploaded": true, location: destFileName, id: vid});
        } catch (error) {
            return res.status(500).send({ "uploaded": false, location: "", error: error.message, id: vid});
        }
    }
}