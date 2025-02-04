import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`/post/${post?.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.date}</p>
      </Link>
      <p className="postBody">
        {post.description.length <= 25
          ? post.description
          : `${post.description.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
