import { useState } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

export default function LoginForm({ csrfToken, pushHome, login, setLogin }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  const doPush = pushHome ?? false

  return (
    <div className="flex items-center justify-center">
      <Formik
        initialValues={{ username: '', password: '', }}
        validationSchema={Yup.object({
          username: Yup.string().required('Please enter your username'),
          password: Yup.string().required('Please enter your password'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          });
          if (res?.error) {
            setError('Invalid Username or Password');
          } else {
            setError(null);
            if (doPush) {
              router.push('/');
            }
          }
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center justify-center py-2 rounded-b-lg bg-slate-200 shadow-xl drop-shadow-xl border border-solid border-slate-900">
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
                <div className="mb-6">
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
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="uppercase text-sm font-bold tracking-wide bg-slate-600 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl hover:border hover:border-opacity-0 transition duration-150"
                  >
                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                  </button>
                  <button
                    onClick={() => router.push('/signup')}
                    name="signup"
                    type="button"
                    className="uppercase text-sm font-bold mx-2 tracking-wide bg-slate-800 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl hover:shadow-xl hover:border hover:border-opacity-0 transition duration-150"
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