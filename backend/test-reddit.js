import { fetchRedditPosts } from './reddit-fetch.js';

(async () => {
    try {
        const posts = await fetchRedditPosts();
        console.log('Fetched Reddit Posts:', posts);
    } catch (error) {
        console.error('Error fetching Reddit posts:', error.message);
    }
})();