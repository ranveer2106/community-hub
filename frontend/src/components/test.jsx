// // === backend/config/db.js ===
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


// // === backend/models/User.js ===
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: 'user' },
//   credits: { type: Number, default: 0 },
//   savedContent: [String]
// });

// module.exports = mongoose.model('User', UserSchema);


// // === backend/models/Transaction.js ===
// const mongoose = require('mongoose');

// const TransactionSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   type: String,
//   amount: Number,
//   purpose: String,
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Transaction', TransactionSchema);


// // === backend/models/Content.js ===
// const mongoose = require('mongoose');

// const ContentSchema = new mongoose.Schema({
//   title: String,
//   preview: String,
//   source: String,
//   url: String,
//   reported: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('Content', ContentSchema);


// // === backend/middlewares/authMiddleware.js ===
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;


// // === backend/controllers/authController.js ===
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashed });
//   res.status(201).json({ message: 'Registered' });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !await bcrypt.compare(password, user.password))
//     return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//   res.json({ token });
// };


// // === backend/controllers/feedController.js ===
// const Content = require('../models/Content');

// exports.getFeed = async (req, res) => {
//   const content = await Content.find();
//   res.json(content);
// };

// exports.saveContent = async (req, res) => {
//   // Add content ID to user’s savedContent
//   res.json({ message: 'Saved' });
// };

// exports.reportContent = async (req, res) => {
//   await Content.findByIdAndUpdate(req.params.id, { reported: true });
//   res.json({ message: 'Reported' });
// };


// // === backend/routes/auth.js ===
// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;


// // === backend/routes/feed.js ===
// const express = require('express');
// const { getFeed, saveContent, reportContent } = require('../controllers/feedController');
// const auth = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.get('/', auth, getFeed);
// router.post('/save/:id', auth, saveContent);
// router.post('/report/:id', auth, reportContent);

// module.exports = router;


// // === backend/server.js ===
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/feed', require('./routes/feed'));
// // More routes: credits, admin...

// app.listen(5000, () => console.log('Server running on port 5000'));


// // === frontend/src/App.js ===
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// // === frontend/src/pages/Login.js ===
// import React, { useState } from 'react';
// import { loginUser } from '../services/api';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await loginUser({ email, password });
//     localStorage.setItem('token', res.token);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type='email' onChange={e => setEmail(e.target.value)} />
//       <input type='password' onChange={e => setPassword(e.target.value)} />
//       <button type='submit'>Login</button>
//     </form>
//   );
// }

// export default Login;


// // === frontend/src/services/api.js ===
// const API = 'http://localhost:5000/api';

// export const loginUser = async (data) => {
//   const res = await fetch(`${API}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };
