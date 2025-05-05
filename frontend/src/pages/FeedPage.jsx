import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const FeedPage = () => {
    const { token, url } = useContext(StoreContext);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get(`${url}/api/feed`, {
                    headers: { token },
                });
                if (response.data.success) {
                    setFeeds(response.data.feeds);
                } else {
                    console.error("Failed to fetch feeds:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching feeds:", error.message);
            }
        };

        fetchFeeds();
    }, [token, url]);

    return (
        <div>
            <h1>Community Feed</h1>
            {feeds.map((feed, index) => (
                <div key={index}>
                    <h2>{feed.title}</h2>
                    <p>{feed.preview}</p>
                    <p>Source: {feed.source}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedPage;