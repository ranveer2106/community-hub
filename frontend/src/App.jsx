import {
  // React,
  useState,
  useContext
} from 'react'
// import { assets } from './assets/assets'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import ContactUs from './pages/ContactUs/ContactUs'
import { StoreContext } from './context/StoreContext'
import Loader from './components/Loader/Loader'

import PersonalPage from './pages/PersonalPage';
import FeedPage from './pages/FeedPage';
import AdminPage from './pages/AdminPage';


const App = () => {



  const [showLogin, setshowLogin] = useState(false)

  const { isLoading } = useContext(StoreContext)

  if (isLoading) {
    return <>
      <div className='flex justify-center h-screen items-center'>
        <Loader />
      </div>
    </>


  }

  return (
    <>

      {
        showLogin ? <LoginPopup setshowLogin={setshowLogin} /> : <></>
      }
      <div className='App'>
        <Navbar setshowLogin={setshowLogin} />


        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/contactus' element={<ContactUs />} />
        </Routes>
        <Footer />



      </div>

    </>
  )
}

export default App


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import RedditCard from './components/RedditCard';

// const App = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Your Reddit API credentials (⚠️ not safe to expose in production!)
//   const clientId = 'S0JLj9BmyT5_WVSB1jpkrw';
//   const clientSecret = 'mU7hNn9nEP6fxkYJSl4anpwTmzJBlQ';
//   const subreddit = 'AskIndianMen';

//   useEffect(() => {
//     const fetchTokenAndPosts = async () => {
//       try {
//         // Step 1: Get OAuth token
//         const tokenResponse = await axios.post(
//           'https://www.reddit.com/api/v1/access_token',
//           new URLSearchParams({ grant_type: 'client_credentials' }),
//           {
//             headers: {
//               Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           }
//         );

//         const accessToken = tokenResponse.data.access_token;

//         // Step 2: Use token to fetch subreddit posts
//         const postsResponse = await axios.get(
//           `https://oauth.reddit.com/r/${subreddit}/hot?limit=10`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               'User-Agent': 'reddit-react-client/1.0',
//             },
//           }
//         );

//         setPosts(postsResponse.data.data.children);
//       } catch (error) {
//         console.error('Error fetching data:', error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTokenAndPosts();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Top Posts from r/{subreddit}</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//         {posts.map((postObj, index) => {
//           const post = postObj.data;
//           return <RedditCard key={index} post={post} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;