
async function getSignedURLForUpload(fileName, fileType) {

    // The ID of your GCS bucket
    const bucketName = process.env.GOOGLE_BUCKET_NAME;

    // Imports the Google Cloud client library
    const { Storage } = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage({
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        }
    });

    async function generateV4UploadSignedUrl() {
        // These options will allow temporary uploading of the file with outgoing
        // Content-Type: application/octet-stream header.
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: fileType,
        };

        // Get a v4 signed URL for uploading file
        const [url] = await storage
            .bucket(bucketName)
            .file(fileName)
            .getSignedUrl(options);

        return url;
    }

    return await generateV4UploadSignedUrl()
}


async function deleteFromCloud(fileName) {

    // The ID of your GCS bucket
    const bucketName = process.env.GOOGLE_BUCKET_NAME;

    // Imports the Google Cloud client library
    const { Storage } = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage({
        projectId: process.env.GOOGLE_PROJECT_ID,
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        }
    });

    async function deleteFile() {
        await storage.bucket(bucketName).file(fileName).delete();
        console.log(`gs://${bucketName}/${fileName} deleted`);
    }

    await deleteFile();
}


export default async (req, res) => {

    const { vid } = req.query;

    if (req.method == "POST") {

        const user_res = await fetch(process.env.HOSTNAME + '/api/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                cookie: req.headers.cookie,
            },
        });
        const user_data = await user_res.json();

        if (!user_data.role.content_editor) {
            return res.status(403).send({ error: 'Only Content Editors can Upload Videos.' });
        }

        const { filetype, is_video } = JSON.parse(req.body);

        const folder = is_video ? "videos/" : "thumbnails/";
        const filename = folder + vid + '.' + filetype.split('/')[1];

        console.log('File Name: ', filename);

        try {
            const url = await getSignedURLForUpload(filename, filetype);
            return res.status(200).send({ success: true, upload_url: url, filename: filename});
        } catch (error) {
            return res.status(500).send({ success: false, upload_url: "", filename: filename, error: error.message });
        }


    } else if (req.method == "DELETE") {

        const user_res = await fetch(process.env.HOSTNAME + '/api/user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                cookie: req.headers.cookie,
            },
        });
        const user_data = await user_res.json();

        if (!user_data.role.content_editor) {
            return res.status(403).send({ error: 'Only Content Editors can Delete Videos.' });
        }

        const { filename, thumbnail } = JSON.parse(req.body);

        try {
            await deleteFromCloud(thumbnail);
            await deleteFromCloud(filename);
            return res.status(200).send({ success: true, filename: filename, thumbnail: thumbnail });
        } catch (error) {
            return res.status(500).send({ success: false, filename: filename, thumbnail: thumbnail, error: error.message });
        }
    }
}