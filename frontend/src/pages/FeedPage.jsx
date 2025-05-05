import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import RedditCard from "../components/RedditCard";
import { StoreContext } from '../context/StoreContext';

const FeedPage = () => {
    const { url } = useContext(StoreContext); // Access the URL from the context
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get(`${url}/api/feed`); // Use the URL from the context
                setFeeds(response.data.feeds);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feeds:', error.message);
                setLoading(false);
            }
        };

        fetchFeeds();
    }, [url]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Community Feed</h1>
            <div>
                {feeds.map((feed, index) => (
                    <RedditCard key={index} post={feed} />
                ))}
            </div>
        </div>
    );
};

export default FeedPage;