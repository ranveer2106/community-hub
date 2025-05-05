import { useEffect, useState } from 'react';
import axios from 'axios';
import RedditCard from "../components/RedditCard";

const FeedPage = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/feed"); // Use backend proxy
                setFeeds(response.data.feeds);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feeds:', error.message);
                setLoading(false);
            }
        };

        fetchFeeds();
    }, []);

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