import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default function UploadForm() {

    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const uploadThumbnailToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setThumbnail(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadVideoToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setVideo(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (id, type) => {

        const is_video = type == "video";
        const file = type == is_video ? video : thumbnail;

        const signedurl_res = await fetch(process.env.HOSTNAME + "/api/videos/" + id + "/upload", {
            method: "POST",
            body: JSON.stringify({
                filetype: file.type,
                is_video: is_video 
            })
        });

        const signedurl_data = await signedurl_res.json();
        const signedurl = signedurl_data.upload_url;

        const upload = await fetch(signedurl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file 
        });
    
        return signedurl_data.filename 
    };

    return (
        <div className="flex h-full items-center justify-center">
            <Formik
                initialValues={{ title: '', description: '', tags: '', video_length: '' }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Please enter a title'),
                    description: Yup.string().required('Please enter a description'),
                    tags: Yup.string().required('Please add some tags.'),
                    video_length: Yup.number().required('Please enter the length of the video in seconds.'),
                })}
                onSubmit={async (values, { setSubmitting }) => {

                    console.log(JSON.stringify(values));

                    const res = await fetch(process.env.HOSTNAME + '/api/videos', {
                        method: 'POST',
                        body: JSON.stringify({
                            redirect: false,
                            title: values.title,
                            description: values.description,
                            tags: values.tags.split(",").map(function (item) { return item.trim() }),
                            length: values.video_length,
                            callbackUrl: `${window.location.origin}`,
                        })
                    });
                    const data = await res.json();
                    const video_info = data.videocreated;

                    const video_loc = await uploadToServer(video_info._id, "video");
                    const thumbnail_loc = await uploadToServer(video_info._id, "thumbnail");

                    console.log("Thumbnail URL: ", thumbnail_loc);
                    console.log("Video URL: ", video_loc);

                    if (!video_loc || !thumbnail_loc) {
                        
                        alert("There was an error uploading the video.");
                        
                        const del_res = await fetch(process.env.HOSTNAME + '/api/videos/' + video_info._id, {
                            method: 'DELETE',
                        });
                        return;
                    } else {
                        
                        const add_filenames = await fetch(process.env.HOSTNAME + '/api/videos/' + video_info._id, {
                            method: 'PATCH',
                            body: JSON.stringify({
                                filename: video_loc,
                                thumbnail: thumbnail_loc
                            })
                        })
                    }

                    alert(values.title + ' has been uploaded.');
                    setSubmitting(false);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col items-center justify-center py-2 bg-slate-200 rounded-b-lg ">
                            <div className="px-8 pt-6 pb-8">
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        title
                                        <Field
                                            name="title"
                                            aria-label="enter the title"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="title" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        description
                                        <Field
                                            name="description"
                                            aria-label="enter a description for the video"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="description" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="tags"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        tags [comma seperated list]
                                        <Field
                                            name="tags"
                                            aria-label="enter a comma seperated list of tags for the video"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="tags" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="video_length"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        length of the video in seconds
                                        <Field
                                            name="video_length"
                                            aria-label="enter the length of the video in seconds"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="video_length" />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <label className="cursor-pointer hover:shadow-lg hover:border-b hover:border-b-solid hover:border-b-slate-800" htmlFor='video_location'>
                                        <Field type="file" className='hidden' id="video_location" name="video_location" onChange={uploadVideoToClient} />
                                        Select the Video File {video ? '✅ ' : ''}
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <label className="cursor-pointer hover:shadow-lg hover:border-b hover:border-b-solid hover:border-b-slate-800" htmlFor='thumbnail_location'>
                                        <Field type="file" className='hidden' id='thumbnail_location' name="thumbnail_location" onChange={uploadThumbnailToClient} />
                                        Select the Thumbnail File {thumbnail ? '✅' : ''}
                                    </label>
                                </div>
                                <div className="flex items-center justify-center mt-8">
                                    <button
                                        type="submit"
                                        className="uppercase text-sm font-bold tracking-wide bg-slate-800 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
                                    >
                                        {formik.isSubmitting ? 'Please wait...' : 'Upload'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}