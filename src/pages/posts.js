import { Typography } from "@material-ui/core";
import Link from "next/link";
import { useEffect, useState } from "react";

const Post = ({ posts }) => {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        API Call Example
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        I only support server side rendering
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Navigate Here &darr;
      </Typography>
      {posts.map((x, i) => (
        <div key={i}>
          <Link as={`/${x.id}/${x.title}`} href="/[postId]/[title]">
            <a>
              Navigate to Post Id {x.id} {x.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Post;

Post.getInitialProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return { posts };
};
