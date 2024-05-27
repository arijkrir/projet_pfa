const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const password1 = 'moniteur';
const password2 = 'admin';
const salt = bcrypt.genSaltSync(10);
const hashedPassword1 = bcrypt.hashSync(password1, salt);
const hashedPassword2 = bcrypt.hashSync(password2, salt);

const users = [
  {
    username: 'moniteur',
    password: hashedPassword1,
    role: 'Moniteur',
  },
  {
    username: 'admin',
    password: hashedPassword2, 
    role: 'Administrateur',
  }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;

    if (isMatch) {
      const token = jwt.sign({ username: user.username, role: user.role }, 'your_jwt_secret');
      return res.json({ token, role: user.role });
    } else {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
  });
});

module.exports = router;