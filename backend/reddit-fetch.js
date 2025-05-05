import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const subreddit = 'PokemonScarletViolet'; // Change this to your desired subreddit

async function getAccessToken() {
    try {
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
    } catch (error) {
        console.error('Error generating access token:', error.message);
        throw new Error('Failed to generate access token');
    }
}



// export async function fetchRedditPosts() {
//     try {
//         const token = await getAccessToken();
//         const postsResponse = await axios.get(
//             `https://oauth.reddit.com/r/${subreddit}/hot?limit=10`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'User-Agent': 'reddit-app-script/0.1',
//                 },
//             }
//         );

//         return postsResponse.data.data.children.map((post) => ({
//             title: post.data.title,
//             preview: post.data.thumbnail,
//             url: post.data.url,
//             source: 'Reddit',
//         }));
//     } catch (error) {
//         console.error('Error fetching Reddit posts:', error.message);
//         throw new Error('Failed to fetch Reddit posts');
//     }
// }


export async function fetchRedditPosts() {
  try {
      const token = await getAccessToken();
      const postsResponse = await axios.get(
          `https://oauth.reddit.com/r/${subreddit}/hot?limit=10`,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'User-Agent': 'reddit-app-script/0.1',
              },
          }
      );

      return postsResponse.data.data.children.map((post) => ({
          title: post.data.title,
          preview: post.data.thumbnail,
          url: post.data.url,
          permalink: post.data.permalink, // Ensure permalink is included
          source: 'Reddit',
      }));
  } catch (error) {
      console.error('Error fetching Reddit posts:', error.message);
      throw new Error('Failed to fetch Reddit posts');
  }
}