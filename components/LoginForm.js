import { useState } from 'react'
import { signIn, getCsrfToken } from 'next-auth/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

export default function LoginForm({ csrfToken, pushHome, login, setLogin }) {
    const router = useRouter()
    const [error, setError] = useState(null)

    const doPush = pushHome ?? false

    return (
        <div className="flex items-center justify-center">
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object({
                    username: Yup.string().required(
                        'Please enter your username'
                    ),
                    password: Yup.string().required(
                        'Please enter your password'
                    ),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    const res = await signIn('credentials', {
                        redirect: false,
                        username: values.username,
                        password: values.password,
                        callbackUrl: `${window.location.origin}`,
                    })
                    if (res?.error) {
                        setError('Invalid Username or Password')
                    } else {
                        setError(null)
                        if (doPush) {
                            router.push('/')
                        }
                    }
                    setSubmitting(false)
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form flex flex-col items-center justify-center border-t-4 border-stone-200 py-2">
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
                                <div className="mb-6">
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
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="form_button"
                                    >
                                        {formik.isSubmitting
                                            ? 'Please wait...'
                                            : 'Sign In'}
                                    </button>
                                    <button
                                        onClick={() => router.push('/signup')}
                                        name="signup"
                                        type="button"
                                        className="form_button_alt"
                                    >
                                        sign up
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
