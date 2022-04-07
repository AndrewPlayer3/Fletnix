import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const { username, email, password, roles } = JSON.parse(req.body);

        try {
            if (username && email && password) {

                const salt_rounds = 10;
                var passwordhash = await bcrypt.hash(password, salt_rounds);
                var user = new User({
                    username: username,
                    email: email,
                    password: passwordhash,
                    role: {
                        viewer: true,
                        content_editor: process.env.ALLOW_ROLES ? roles.content_editor : false,
                        content_manager: process.env.ALLOW_ROLES ? roles.content_manager : false
                    }
                });
                var usercreated = await user.save();
                return res.status(200).send({ usercreated: usercreated });
            } else {
                return res.status(422).send({ error: 'data_incomplete' });
            }

        } catch (error) {
            return res.status(500).send({ error: error.message })
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

                var userInfo = await User.findOne({ email: email });
                if (userInfo) {
                    return res.status(200).send({ username: userInfo.username, email: userInfo.email, role: userInfo.role })
                } else {
                    return res.status(404).send({ error: 'User not found', role: roles });
                }
            } else {
                return res.status(422).send({ error: 'data_incomplete', role: roles });
            }

        } catch (error) {
            return res.status(500).send({ username: "", email: "", role: roles, error: error.message });
        }
    }
};

export default connectDB(handler);
