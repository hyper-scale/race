import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";
import { getApplications } from "../actions/applications";
import Button from "../components/atoms/Button";
import { useRouter } from "next/router";
import { MapIcon, LightningBoltIcon, UserGroupIcon } from "@heroicons/react/outline";
import Footer from "../components/Footer";

const airtableUrl = "/join";

const features = [
  {
    name: "Problem solving",
    icon: LightningBoltIcon,
    desc: "Access top experts in our community through our Bounty Market. Effortlessly solve problems.",
  },
  {
    name: "Strong community",
    icon: UserGroupIcon,
    desc: "Hyperscale investments are plugged into our community of developers, experts & fellow founders.",
  },
  {
    name: "Guidance",
    icon: MapIcon,
    desc: "Our network of advisors are here to support and guide your project. We work as one to further each other.",
  },
];

const numRows = 5;

type Props = {
  projects: any;
};

const Home: React.FunctionComponent<Props> = ({ projects }) => {
  const router = useRouter();

  function LeaderboardButton() {
    return (
      <Button size="large" color="dark" responsive onClick={() => router.push({ pathname: "/dao-race" })}>
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
        className="relative bg-white overflow-hidden"
        style={{
          background:
            "url('/bg-patterns.svg') left top no-repeat, linear-gradient(244.75deg, #D1D5FC -10.92%, #F3F3FA 30.96%, #FFFFFF 110.9%) center center",
        }}
      >
        <div className="pointer-events-none">
          <div
            className="absolute top-[-667px] left-[626px] w-[1185px] h-[1186px] opacity-20"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, #4FFEFE 0%, rgba(93, 186, 239, 0) 100%)",
            }}
          />
          <div
            className="absolute top-[-463px] left-[-682px] w-[931px] h-[931px] opacity-20"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, #ED008E 0%, rgba(239, 93, 146, 0) 100%)",
            }}
          />
          <div
            className="absolute top-[-779px] left-[-82px] w-[1287px] h-[1287px] opacity-30"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, #5D5FEF 0%, rgba(93, 95, 239, 0) 100%)",
            }}
          />
        </div>
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <nav className="relative max-w-7xl mx-auto items-center justify-between px-4 sm:px-6" aria-label="Global">
            <Header />
          </nav>
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6">
                <h1>
                  <span className="mt-1 block text-gray-900 text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="text-highlight">Fast</span> funding for web3 projects
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  <span>Receive up to $1M by competing in the DAO Race.</span>{" "}
                  <span>Join in 5 min and be voted on by the DAO.</span>
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto">
                  <a
                    href={airtableUrl}
                    className="inline-flex items-center px-8 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Join
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="flex justify-center relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="w-full max-w-7xl px-0 md:px-4 xl:px-0">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-indigo-500 uppercase">THE DAO RACE</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Stay ahead and get funded fast
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              Every week, DAOs with the highest score get funded.
            </p>{" "}
          </div>
          <Leaderboard data={projects} numRows={numRows} />
          <div className="mt-4 text-center px-4">
            <LeaderboardButton />
          </div>
        </div>
      </div>

      <div className="relative bg-[#FAFAFE] py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-indigo-500 uppercase">BENEFITS</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            We provide more than just funding
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            After funding your project, Hyperscale DAO helps you build and grow.
          </p>
          <div className="mt-12 mx-12 md:mx-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span
                          className="inline-flex items-center justify-center p-3 bg-white shadow rounded-md transform"
                          style={{ boxShadow: "0px 4px 16px 0px #3447AE26" }}
                        >
                          <feature.icon className="h-6 w-6 text-indigo-500" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-indigo-500 tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 lg:py-20 lg:px-8 bg-white">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-indigo-500 uppercase">ZERO TO FUNDED</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Get going in days instead of months
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            We get to a decision fast so you can focus on execution.
          </p>{" "}
        </div>
        <div className="flex items-center justify-center pt-4 sm:pt-12 lg:pt-20">
          <img src="/timeline-sm.svg" className="md:hidden" alt="" />
          <img src="/timeline-lg.svg" className="hidden md:block" alt="" />
        </div>
        <div className="flex justify-center column mt-4">
          <div className="mt-8 sm:max-w-lg sm:mx-auto">
            <a
              href={airtableUrl}
              className="inline-flex items-center px-8 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join the DAO Race
            </a>
          </div>
        </div>{" "}
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  const projects = await getApplications({ limit: numRows });
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
};

export default Home;
