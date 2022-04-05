import { useState } from 'react';
import { getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export default function SignUpForm({ csrfToken }) {
    const router = useRouter();
    const [error, setError] = useState(null);

    return (
        <div className="flex h-full items-center justify-center">
            <Formik
                initialValues={{ username: '', password: '', confirmpassword: '', email: '', content_editor: false, content_manager: false}}
                validationSchema={Yup.object({
                    email: Yup.string().required('Please enter your email   '),
                    username: Yup.string().required('Please enter a username   '),
                    password: Yup.string().required('Please enter a password   '),
                    confirmpassword: Yup.string().when("password", {
                        is: val => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Passwords do not match"
                        )
                    })
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(JSON.stringify(values));
                    const res = await fetch('https://fletnix.vercel.app/api/user', {
                        method: 'POST',
                        body: JSON.stringify({
                            redirect: false,
                            username: values.username,
                            email: values.email,
                            password: values.password,
                            roles: {
                                viewer: true,
                                content_editor: values.content_editor,
                                content_manager: values.content_manager
                            },
                            callbackUrl: `${window.location.origin}`,
                        })
                    });
                    if (res?.error) {
                        setError(res.error);
                    } else {
                        setError(null);
                        router.push('https://fletnix.vercel.app/api/auth/signin');
                    }
                    setSubmitting(false);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col items-center justify-center py-2 rounded-lg bg-[#EFF1F3] shadow-xl">
                            <div className="px-8 pt-6 pb-8 mb-4">
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />

                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        username
                                        <Field
                                            name="username"
                                            aria-label="enter your username"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        email
                                        <Field
                                            name="email"
                                            aria-label="enter your email"
                                            aria-required="true"
                                            type="email"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="email" />
                                    </div>
                               </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        password
                                        <Field
                                            name="password"
                                            aria-label="enter your password"
                                            aria-required="true"
                                            type="password"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="confirmpassword"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        re-type password
                                        <Field
                                        name="confirmpassword"
                                        aria-label="enter your password"
                                        aria-required="true"
                                        type="password"
                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="confirmpassword" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="uppercase text-sm font-bold tracking-wide bg-slate-800 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
                                    >
                                        {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
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

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}