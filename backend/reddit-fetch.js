// const axios = require('axios');
// const qs = require('qs');

import axios from 'axios';
import qs from 'qs';

// Replace with your actual keys
const clientId = 'VRRQtlS_JChPkxQyDP1CGQ';
const clientSecret = 'fwL0r61OK08i9djWUdLV_3q0iJpRzw';
const subreddit = 'blursedimages'; // Change this to any subreddit

// Step 1: Get access token
async function getAccessToken() {
  const tokenResponse = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    qs.stringify({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return tokenResponse.data.access_token;
}

// Step 2: Fetch subreddit posts
// async function fetchRedditPosts(token) {
//   const postsResponse = await axios.get(
//     `https://oauth.reddit.com/r/${subreddit}/hot?limit=5`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'User-Agent': 'reddit-app-script/0.1',
//       },
//     }
//   );

//   const posts = postsResponse.data.data.children;
//   posts.forEach((post, index) => {
//     console.log(`${index + 1}. ${post.data.title}`);
//     console.log(`   👉 https://reddit.com${post.data.permalink}\n`);
//   });
// }

async function fetchRedditPosts(token) {
    const postsResponse = await axios.get(
      `https://oauth.reddit.com/r/${subreddit}/hot?limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'reddit-app-script/0.1',
        },
      }
    );
  
    const posts = postsResponse.data.data.children;
  
    // Extract specific data from each post
    posts.forEach((post, index) => {
      const { title, author, permalink } = post.data;
      console.log(`${index + 1}. Title: ${title}`);
      console.log(`   Author: ${author}`);
      console.log(`   URL: https://reddit.com${permalink}\n`);
    });
  }


// Run the whole process
(async () => {
  try {
    const token = await getAccessToken();
    await fetchRedditPosts(token);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
})();
