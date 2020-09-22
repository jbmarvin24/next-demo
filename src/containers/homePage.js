import { Link, Typography } from "@material-ui/core";
import Head from "next/head";
import NLink from "next/link";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Next JS Demo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Typography variant="h2" gutterBottom>
        Next JS Demo
      </Typography>

      <Typography variant="h4" gutterBottom>
        Sample SEO Website
      </Typography>
      <Typography variant="h5" gutterBottom>
        -Batman024
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        This Demo Includes
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        1. Server Side Rendering with Material UI
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. API Calls on Posts
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        3. Dynamic Routes on Post
      </Typography>
      <NLink href="/posts">
        <Link href="#">Go to Posts</Link>
      </NLink>
      <Typography variant="subtitle2" gutterBottom>
        4. Global CSS Example
      </Typography>
      <NLink href="/customcss">
        <Link href="#" color="inherit">
          5. Custom CSS per Element/Module
        </Link>
      </NLink>
    </div>
  );
};

export default HomePage;
