import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>MDC.NET</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>MDC.NET Home Page</h1>
      <p>Sample SEO Website</p>
      <p>-Batman024</p>
      <Link href="/posts">
        <a>Go to Posts</a>
      </Link>
    </div>
  );
};

export default HomePage;
