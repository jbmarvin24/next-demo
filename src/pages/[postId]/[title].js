import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Title = ({ post }) => {
  //console.log(post);
  const router = useRouter();
  const [fetchedpost, setFetchedPost] = useState(post);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + router.query.postId
      );
      const post = await response.json();
      setFetchedPost(post);
    }

    // console.log(!post);
    // console.log(router.query);
    if (post === null) {
      loadData();
    }
  }, []);

  //console.log(post);
  if (!fetchedpost) {
    return <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      <h1>Hi Im a dynamic route with API call.</h1>
      <h2>Im also supports server side and client side rendering.</h2>
      <h1>
        {fetchedpost.id} - {fetchedpost.title}
      </h1>
    </React.Fragment>
  );
};

export default Title;

Title.getInitialProps = async (ctx) => {
  if (!ctx.req) {
    return { post: null };
  }
  const { query } = ctx;
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + query.postId
  );
  const post = await response.json();
  return { post };
};
