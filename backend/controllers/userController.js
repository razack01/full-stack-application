const userRegisterconnection = require( '../config/userRegisterdb');

const constants = require('../constants')
const jwt = require( 'jsonwebtoken');

const bcrypt = require( 'bcryptjs');

// register a User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  try {
    const sqlCheck = "SELECT * FROM users WHERE email = $1";
    const result = await userRegisterconnection.query(sqlCheck, [email]);

    if (result.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Please choose a different email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerQuery = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
    await userRegisterconnection.query(registerQuery, [name, email, hashedPassword]);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

  
 exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory"
    });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = $1';

    userRegisterconnection.query(query, [email.trim().toLowerCase()], async (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      if (results.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const user = results.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      const userdetails = {
        username: user.name,
        userID: user.userid,
        email: user.email
      };

      const accessToken = jwt.sign(userdetails, "abdulsecretkey", { expiresIn: '3h' });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: accessToken,
        user: userdetails
      });
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};




exports.currentUser =(req,res)=>{
    res.json(req.user);
}

exports.allUsers = async (req, res) => {
  try {
    const result = await userRegisterconnection.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to retrieve users." });
  }
};

  

  exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const [result] = await userRegisterconnection
        .promise()
        .query("DELETE FROM users WHERE userid = ?", [userId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user." });
    }
  };
  

  exports.getLoggedUser = async(req,res)=>{

    const userId = req.params.id;


  try {
    const result = await userRegisterconnection.query(
      'SELECT userid, name, email FROM users WHERE userid = $1',
      [userId]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
  }

  exports.updateLoggedUser = async(req,res)=>{

    // PUT /api/users/:id
  const userId = req.params.id;
  const { name, email, password } = req.body;

  try {
    let query = '';
    let params = [];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = `
        UPDATE users
        SET name = $1, email = $2, password = $3
        WHERE userid = $4
      `;
      params = [name, email, hashedPassword, userId];
    } else {
      query = `
        UPDATE users
        SET name = $1, email = $2
        WHERE userid = $3
      `;
      params = [name, email, userId];
    }

    await userRegisterconnection.query(query, params);

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

