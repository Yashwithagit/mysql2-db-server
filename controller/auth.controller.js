const jwt = require('jsonwebtoken');
const pool = require('../connectDb');
const bcrypt = require('bcrypt');

const authController = {
    registerUser: async (req, res) => {
        try {
            const { user_name, email, password } = req.body
            const hashed = await bcrypt.hash(password, 10)
            const [existingUserRows, existingUserFields] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
            if (existingUserRows.length > 0) {
                res.json({
                    status: 'error',
                    message: 'user Already exists'
                })
            } else {
                const insertQuery = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';
                await pool.query(insertQuery, [user_name, email, hashed]);

                res.json({
                    status: 'success',
                });
            }
        } catch (error) {
            res.json({
                status: 'error',
                message: 'Failed to insert the user data'
            })
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const [userRows, userColumns] = await pool.query(
                `SELECT * FROM users WHERE email = ?`,
                [email]
            );

            if (userRows.length === 0) {
                return res.json({
                    status: 'error',
                    message: 'Invalid Credentials'
                });
            }

            const user = userRows[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.json({
                    status: 'error',
                    message: 'Invalid Password'
                });
            }

            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET_KEY);
            res.json({
                status: 'success',
                data: token
            });
        } catch (error) {
            return res.json({
                status: 'error',
                message: 'Failed to login user'
            });
        }
    },
    userInfo:async(req,res)=>{
        try{
            const userId=req.user.userId
            const [rows,fields]=await pool.query('SELECT * FROM users where user_id = ?',[userId])
            if(rows.length===0){
                return res.json({
                    status: 'error',
                    message: 'User Not Found'
                });
            }
            return res.json({
                status: 'success',
                data: rows[0]
            });

        }catch(error){
            return res.json({
                status: 'error',
                message: 'Invalid Token'
            });
        }
    }


}

module.exports = authController