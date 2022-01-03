import React, { useCallback } from "react";
import Layout from "../../components/Layout";
import Leaderboard from "../../components/Leaderboard";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getApplications } from "../../actions/applications";
import { useRouter } from "next/router";
import cx from "classnames";

// components
import Spinner from "../../components/Spinner";
import DaoRaceCountdown from "../../components/Countdown";

const breadcrumbs = [
  { url: "/", text: "Home" },
  { url: "", text: "DAO Race" },
];

export default function DaoRace({ order, projects }) {
  const router = useRouter();
  const setOrder = useCallback(
    (order) => {
      router.push({ pathname: router.pathname, query: { order } });
    },
    [router]
  );
  const setOrderByDate = useCallback(() => setOrder("date"), [setOrder]);
  const setOrderByVotes = useCallback(() => setOrder("votes"), [setOrder]);

  const activeButtonClasses =
    "active bg-indigo-500 focus:ring-indigo-500 hover:bg-indigo-600 text-white hover:text-white-500 focus:outline-none";
  const inactiveButtonClasses = "border-gray bg-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none";

  return (
    <>
      <Layout title="Leaderboard">
        <div className="hidden md:block">
          <Breadcrumbs list={breadcrumbs} />
        </div>

        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex-col basis-1/2 text-center md:text-left mt-10 md:mt-0">
            <h2 className="text-4xl font-extrabold text-gray-900">Trending DAOs</h2>
            <p className="text-gray-500 text-sm ">The top DAO applications, ranked by votes</p>
          </div>
          <div className="flex-col basis-1/2 px-4 md:px-0 pt-5 md:pt-0 pb-10 md:pb-0 text-center md:text-left bg-white-grey md:bg-white  w-screen md:w-full">
            <DaoRaceCountdown />
          </div>
        </div>
        <div className="basis-1/4 flex tab-filter mt-4 px-4 md:px-0">
          <button
            className={cx("py-3 px-12 items-center shadow-md rounded-l-lg", {
              [activeButtonClasses]: order === "votes",
              [inactiveButtonClasses]: order !== "votes",
            })}
            onClick={setOrderByVotes}
          >
            Most voted
          </button>
          <button
            className={cx("py-3 px-12 items-center shadow-md rounded-r-lg", {
              [activeButtonClasses]: order === "date",
              [inactiveButtonClasses]: order !== "date",
            })}
            onClick={setOrderByDate}
          >
            Most recent
          </button>
        </div>
        <Leaderboard data={projects} key={order} />

        {/* <Spinner /> */}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let order = context.query?.order === "date" ? "date" : "votes";

  const projects = JSON.parse(JSON.stringify(await getApplications({ order })));
  return {
    props: {
      order,
      projects,
    },
  };
}
