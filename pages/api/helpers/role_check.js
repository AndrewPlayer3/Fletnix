import { getSession } from 'next-auth/react'

export default async function roleGuard(context) {
    const { data: session, status } = getSession()

    const user_res = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            cookie: context.req.headers.cookie,
        },
    });

    const user_data = await user_res.json();

    if(user_data.username === ''){
        return {
            redirect_login: true
          }
    }
    
    {/* Role Guard */}
    if(!(user_data.role.content_editor || user_data.role.content_manager)){
        return {
            redirect_profile: true    
        }
    }
    
    const user = {
        username: user_data.username,
        email: user_data.email,
        role: user_data.role
    }
    
    return user;
}