import LoginForm from "../components/LoginForm";

{/* Get info from login session */ }
export default function profile({ user }) {

    //const { data: session } = useSession();
    if (user.username !== '') {

        const { username, email, role } = user;

        var roles = "";
        if (role.viewer) roles += "Viewer ";
        if (role.content_editor) roles += "Content_Editor ";
        if (role.content_manager) roles += "Content_Manager ";

        return (
            <div className='flex items-center justify-center'>
                <div className="bg-stone-100 shadow-2xl drop-shadow-2xl pb-1 rounded-md">
                    <div className="whitespace-nowrap px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-medium form_text">Your profile</h3>
                        <p className="mt-1 max-w-2xl text-md form_text">Personal details.</p>
                    </div>
                    <div className="border-t whitespace-nowrap w-full border-gray-200">
                        <dl className='rounded-b-md'>
                            <div className="bg-[#13013A] bg-opacity-10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md font-medium form_text">Username</dt>
                                <dd className="mt-1 text-md form_text sm:mt-0 sm:col-span-2">{username}</dd>
                            </div>
                            <div className="bg-stone-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md font-medium form_text">Email address</dt>
                                <dd className="mt-1 text-md form_text sm:mt-0 sm:col-span-2">{email}</dd>
                            </div>
                            <div className="bg-[#13013A] bg-opacity-10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-md font-medium form_text">Role</dt>
                                <dd className="mt-1 text-md form_text sm:mt-0 sm:col-span-2">{roles}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-auto w-auto mt-10 flex item-center justify-center">
            <LoginForm />
        </div>
    )
}
