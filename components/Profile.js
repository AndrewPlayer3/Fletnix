import LoginForm from '../components/LoginForm'

{
    /* Get info from login session */
}
export default function profile({ user }) {
    //const { data: session } = useSession();
    if (user.username !== '') {
        const { username, email, role } = user

        var roles = ''
        if (role.viewer) roles += 'Viewer '
        if (role.content_editor) roles += 'Content_Editor '
        if (role.content_manager) roles += 'Content_Manager '

        return (
            <div className="flex items-center justify-center">
                <div className="rounded-md bg-stone-100 pb-1 shadow-2xl drop-shadow-2xl">
                    <div className="whitespace-nowrap px-4 py-5 sm:px-6">
                        <h3 className="form_text text-2xl font-medium leading-6">
                            Your profile
                        </h3>
                        <p className="text-md form_text mt-1 max-w-2xl">
                            Personal details.
                        </p>
                    </div>
                    <div className="w-full whitespace-nowrap border-t border-gray-200">
                        <dl className="rounded-b-md">
                            <div className="bg-[#13013A] bg-opacity-10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md form_text font-medium">
                                    Username
                                </dt>
                                <dd className="text-md form_text mt-1 sm:col-span-2 sm:mt-0">
                                    {username}
                                </dd>
                            </div>
                            <div className="bg-stone-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md form_text font-medium">
                                    Email address
                                </dt>
                                <dd className="text-md form_text mt-1 sm:col-span-2 sm:mt-0">
                                    {email}
                                </dd>
                            </div>
                            <div className="bg-[#13013A] bg-opacity-10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md form_text font-medium">
                                    Role
                                </dt>
                                <dd className="text-md form_text mt-1 sm:col-span-2 sm:mt-0">
                                    {roles}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="item-center mt-10 flex h-auto w-auto justify-center">
            <LoginForm />
        </div>
    )
}
