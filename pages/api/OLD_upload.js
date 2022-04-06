import { promises as fs } from 'fs'
import { IncomingForm } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  }
};

const save_file = async (file) => {
    try {
        const location    = `public/${file.originalFilename}`;
        const data        = await fs.readFile(file.filepath);
        const file_write  = await fs.writeFile(location, data, { flag: 'w+' });
        const unlink_file = await fs.unlink(file.filepath);
        return `${file.originalFilename}`;
    } catch(error) {
        console.log("Error: ", error.message);
        return "";
    }
};

export default async (req, res) => {
    if (req.method == "POST") {

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

        const location = await save_file(data?.files.file)

        if (location !== "") {
            return res.status(200).send({"uploaded": true, location: location});
        } else {
            return res.status(500).send({"uploaded": false, location: ""});
        }
    }
}