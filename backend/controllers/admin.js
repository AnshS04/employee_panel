const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const createAdmin = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    if(username.length < 4) {
        return res.status(400).send("Username should be at least 4 characters.");
    }

    if(password.length < 4) {
        return res.status(400).send("Password should be at least 4 characters.");
    }

    try {
        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        await newAdmin.save();

        res.status(201).json({"message":'Admin registered successfully!', admin: newAdmin});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).send('Invalid username or password.');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password.');
        }
        
        const token = jwt.sign(
            { adminId: admin._id, username: admin.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ message: 'Login successful!', token, admin:admin.username });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
};

module.exports = {createAdmin, loginAdmin}