import { useState } from 'react'
import { getCsrfToken } from 'next-auth/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

export default function SignUpForm({ csrfToken }) {
    const router = useRouter()
    const [error, setError] = useState(null)

    return (
        <div className="flex h-full items-center justify-center">
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirmpassword: '',
                    email: '',
                    content_editor: false,
                    content_manager: false,
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required('Please enter your email   '),
                    username: Yup.string().required(
                        'Please enter a username   '
                    ),
                    password: Yup.string().required(
                        'Please enter a password   '
                    ),
                    confirmpassword: Yup.string().when('password', {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                            [Yup.ref('password')],
                            'Passwords do not match'
                        ),
                    }),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(JSON.stringify(values))
                    const res = await fetch(
                        process.env.HOST_NAME + '/api/user',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                redirect: false,
                                username: values.username,
                                email: values.email,
                                password: values.password,
                                roles: {
                                    viewer: true,
                                    content_editor: values.content_editor,
                                    content_manager: values.content_manager,
                                },
                                callbackUrl: `${window.location.origin}`,
                            }),
                        }
                    )
                    if (res?.error) {
                        setError(res.error)
                    } else {
                        setError(null)
                        router.push(process.env.HOST_NAME + '/api/auth/signin')
                    }
                    setSubmitting(false)
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form flex flex-col items-center justify-center py-2">
                            <div className="mb-4 px-8 pt-6 pb-4">
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />

                                <div className="text-md rounded p-2 text-center text-red-400">
                                    {error}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="form_text"
                                    >
                                        username
                                        <Field
                                            name="username"
                                            aria-label="enter your username"
                                            aria-required="true"
                                            type="text"
                                            className="form_input"
                                        />
                                    </label>

                                    <div className="text-sm text-red-600">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="form_text"
                                    >
                                        email
                                        <Field
                                            name="email"
                                            aria-label="enter your email"
                                            aria-required="true"
                                            type="email"
                                            className="form_input"
                                        />
                                    </label>

                                    <div className="text-sm text-red-600">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="form_text"
                                    >
                                        password
                                        <Field
                                            name="password"
                                            aria-label="enter your password"
                                            aria-required="true"
                                            type="password"
                                            className="form_input"
                                        />
                                    </label>

                                    <div className="text-sm text-red-600">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="confirmpassword"
                                        className="form_text"
                                    >
                                        re-type password
                                        <Field
                                            name="confirmpassword"
                                            aria-label="enter your password"
                                            aria-required="true"
                                            type="password"
                                            className="form_input"
                                        />
                                    </label>

                                    <div className="text-sm text-red-600">
                                        <ErrorMessage name="confirmpassword" />
                                    </div>
                                </div>
                                {process.env.ALLOW_ROLES == 'true' ? (
                                    <>
                                        <div>
                                            <label className="form_text">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <Field
                                                            type="checkbox"
                                                            name="content_editor"
                                                        />
                                                    </div>
                                                    <div>Content Editor</div>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form_text">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <Field
                                                            type="checkbox"
                                                            name="content_manager"
                                                        />
                                                    </div>
                                                    <div>Content Manager</div>
                                                </div>
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="form_button"
                                    >
                                        {formik.isSubmitting
                                            ? 'Please wait...'
                                            : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
