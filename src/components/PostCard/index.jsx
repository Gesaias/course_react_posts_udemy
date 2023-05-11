import P from 'prop-types';
import './styles.css';

export const PostCard = ({ title, body, cover }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>Title: {title}</h2>
      <p>Body: {body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  title: P.string.isRequired,
  body: P.string.isRequired,
  cover: P.string.isRequired,
};
