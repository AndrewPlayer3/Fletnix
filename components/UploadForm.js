import { useState } from 'react';
import { signUp, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}

export default function SignUpForm({ csrfToken }) {
    const router = useRouter();
    const [error, setError] = useState(null);
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

    const uploadThumbnailToServer = async (event) => {
        const body = new FormData();
        body.append("file", thumbnail);
        const response = await fetch("/api/upload", {
            method: "POST",
            body
        });
        const data = await response.json();
        return data.location;
    };

    const uploadVideoToServer = async (event) => {
        const body = new FormData();
        body.append("file", video);
        const response = await fetch("/api/upload", {
            method: "POST",
            body
        });
        const data = await response.json();
        return data.location;
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
                    const video_location = await uploadVideoToServer();
                    const thumbnail_location = await uploadThumbnailToServer();
                    if (!(video_location || thumbnail_location)) {
                        alert("There was an error uploading the video.");
                        return;
                    }
                    const res = await fetch('https://fletnix.vercel.app/api/video', {
                        method: 'POST',
                        body: JSON.stringify({
                            redirect: false,
                            title: values.title,
                            description: values.description,
                            storage_location: video_location,
                            thumbnail_location: '/' + thumbnail_location, 
                            tags: values.tags.split(",").map(function(item){return item.trim()}), 
                            length: values.video_length,
                            callbackUrl: `${window.location.origin}`,
                        })
                    });
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