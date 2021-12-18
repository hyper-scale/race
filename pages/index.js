import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Explanation from "../components/Explanation";
import Leaderboard from "../components/Leaderboard";
import { getApplications } from "../actions/applications";
import Button from "../components/atoms/Button";
import { useRouter } from "next/router";

// components
import Footer from "../components/Footer";

const numRows = 5;

export default function Home({ projects }) {
  const router = useRouter();

  function LeaderboardButton() {
    return (
      <Button size="large" color="dark" responsive="true" onClick={() => router.push({ pathname: "/dao-race" })}>
        Leaderboard
      </Button>
    );
  }

  return (
    <>
      <Head>
        <title>Hyperscale</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div
        style={{
          backgroundImage: "url('/img/top-fold-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center">
          <div
            className="w-full flex justify-center"
            style={{
              backgroundImage: "url('/img/top-fold-lines-left.png'), url('img/top-fold-lines-right.png')",
              backgroundSize: "contain, contain",
              backgroundPosition: "left bottom, right bottom",
              backgroundRepeat: "no-repeat",
              maxWidth: "calc(80rem + 200px)",
            }}
          >
            <div className="w-full max-w-7xl px-4 xl:px-0">
              <Header />
              <div className="my-16 md:max-w-md text-center md:text-left">
                <Explanation />
                <div className="mt-8">
                  <LeaderboardButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-0 md:px-4 xl:px-0">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mt-12">Trending DAOs</h2>
          <Leaderboard data={projects} numRows={numRows} />
          <div className="mt-4 text-center px-4">
            <LeaderboardButton />
          </div>
        </div>
      </div>
      <div
        className="mt-14"
        style={{ background: "linear-gradient(180deg, rgba(251,251,255,1) 0%, rgba(255,255,255,1) 100%)" }}
      >
        <div className="flex justify-center">
          <div
            className="flex justify-center"
            style={{
              backgroundImage: "url('/img/top-fold-lines-left.png'), url('img/top-fold-lines-right.png')",
              backgroundSize: "contain, contain",
              backgroundPosition: "left bottom, right bottom",
              backgroundRepeat: "no-repeat",
              maxWidth: "calc(80rem + 200px)",
            }}
          >
            <div className="w-full text-center max-w-7xl px-4 xl:px-0 py-16">
              <div className="text-indigo-500 uppercase mb-2">Join the race!</div>
              <Image src="/img/jointherace.svg" alt="" width={134} height={134} />
              <div className="flex justify-center">
                <h2 className="text-4xl w-full max-w-3xl">
                  HyperscaleDAO has a strong community of contributors and advisors.
                </h2>
              </div>
              <div className="flex justify-center my-8">
                <div className="w-full max-w-2xl">
                  Communities are a DAO’s most valuable asset. The winning DAO gets funding and joins the HyperscaleDAO.
                  Recieve $200k for 5% by filling out a simple application. You’ll recieve a decision within 1 week.{" "}
                  {/* <a href="#">Learn More</a> */}
                </div>
              </div>
              <div className="flex justify-center">
                <Button responsive="true" color="primary" el="a" href="https://airtable.com/shrLFCXD7BQXUg97K">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const projects = JSON.parse(JSON.stringify(await getApplications(numRows)));
  return {
    props: {
      projects,
    },
  };
}
