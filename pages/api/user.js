import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // Check if name, email or password is provided
        const { username, email, password, roles } = JSON.parse(req.body);
        if (username && email && password) {
            try {
                // Hash password to store it in DB
                const salt_rounds = 10;
                var passwordhash = await bcrypt.hash(password, salt_rounds);
                var user = new User({
                    username: username,
                    email: email,
                    password: passwordhash,
                    role: {
                        viewer: true,
                        content_editor: roles.content_editor,
                        content_manager: roles.content_manager
                    }
                });
                // Create new user
                var usercreated = await user.save();
                return res.status(200).send(usercreated);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else if (req.method === 'GET') {

        const session = await getSession({ req });

        const roles = {
            viewer: false,
            content_editor: false,
            content_manager: false
        }

        try {    
            const { user } = session;
        
            const email = user.email;

            if (user) {
                try {
                    var userInfo = await User.findOne({ email: email });

                    console.log('userinfo: ', userInfo);

                    if (userInfo) {
                        return res.status(200).send({ username: userInfo.username, email: userInfo.email, role: userInfo.role })
                    } else {
                        return res.status(404).send({ message: 'User not found', role: roles });
                    }
                } catch (error) {
                    return res.status(500).send({message: error.message, role: roles });
                }
            } else {
                res.status(500).send({message: 'data_incomplete', role: roles });
            }
        } catch (error) {
            return res.status(200).send({ username: "", email: "", role: roles });
        }
    }
};

export default connectDB(handler);
