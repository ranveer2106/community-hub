import PropTypes from 'prop-types';

const RedditCard = ({ post }) => {
  const isValidImage =
    post.url &&
    (post.url.endsWith('.jpg') ||
      post.url.endsWith('.jpeg') ||
      post.url.endsWith('.png') ||
      post.url.endsWith('.gif') ||
      post.url.endsWith('.webp'));

  const isVideo = post.is_video && post.media?.reddit_video?.fallback_url;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2>{post.title}</h2>
      <p>From: Reddit</p>

      {/* Render video if available */}
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
        // Render image if available
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
        // Fallback if no media is available
        <p>No media available</p>
      )}

      {/* Render description or selftext */}
      <p>{post.selftext ? post.selftext.slice(0, 100) + '...' : 'No description available.'}</p>

      {/* Link to the full post */}
      <a
        href={`https://reddit.com${post.permalink}`} // Use permalink to construct the link
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
        }}
      >
        View Full Post
      </a>
    </div>
  );
};

RedditCard.propTypes = {
  post: PropTypes.shape({
    url: PropTypes.string,
    is_video: PropTypes.bool,
    media: PropTypes.shape({
      reddit_video: PropTypes.shape({
        fallback_url: PropTypes.string,
      }),
    }),
    title: PropTypes.string.isRequired,
    selftext: PropTypes.string,
    permalink: PropTypes.string.isRequired, // Ensure permalink is required
  }).isRequired,
};

export default RedditCard;