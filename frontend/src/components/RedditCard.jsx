import React from 'react';

const RedditCard = ({ post }) => {
  const isValidImage =
    post.url &&
    (post.url.endsWith('.jpg') || post.url.endsWith('.jpeg') || post.url.endsWith('.png') || post.url.endsWith('.gif') || post.url.endsWith('.webp'));

  const isVideo = post.is_video && post.media?.reddit_video?.fallback_url;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
        {post.title}
      </h2>
      <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
        Posted by <span style={{ fontWeight: 'bold' }}>u/{post.author}</span>
      </p>
      {isVideo ? (
        <video
          controls
          style={{
            maxWidth: '100%',
            borderRadius: '4px',
            marginBottom: '0.5rem',
          }}
        >
          <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : isValidImage ? (
        <img
          src={post.url}
          alt="Post content"
          style={{
            maxWidth: '100%',
            borderRadius: '4px',
            marginBottom: '0.5rem',
          }}
        />
      ) : (
        <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '0.5rem' }}>
          No image or video available
        </p>
      )}
      <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.5rem' }}>
        {post.selftext ? post.selftext.slice(0, 100) + '...' : 'No description available.'}
      </p>
      <a
        href={`https://reddit.com${post.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0079d3',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '0.8rem',
          textAlign: 'center',
        }}
      >
        View on Reddit
      </a>
    </div>
  );
};

export default RedditCard;