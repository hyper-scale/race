import Leaderboard from "../Leaderboard/Leaderboard";

const Explanation = () => {
  return (
    <>
      <div className="pt-24 font-bold text-4xl">DAO Race</div>
      <div className=""></div>
      <div className="pt-8"></div>
      <div className="pt-2 font-normal text-s">Mirror DAO created a write race where writers who can</div>
      <div className="pt-2 font-normal text-s">{"assemble strong audiences win. We've build a DAO race"}</div>
      <div className="pt-2 font-normal text-s">where DAOs who can assemble strong communities win</div>
      <div className="pt-8">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={Leaderboard}
        >
          Leader Board
        </button>
      </div>
      <div className="pt-8 bg-white"></div>

      <div className="pt-36 font-bold text-2xl text-center">Trending DAOs</div>

      <Leaderboard />

      <div className="pt-32 font-bold text-2xl text-center">Join the Race!</div>
      <div className="pt-6 font-medium text-m text-center">
        HyperscaleDAO has a strong community of contributors & advisors
      </div>
      <div className="pt-4 font-medium text-m text-center">
        The winning DAO gets funding and joins the HyperscaleDAO
      </div>
      <div className="pt-6 font-medium text-xs text-center text-gray-400">
        Receive $200k for 5% by filling out a simple application.
      </div>
      <div className="flex justify-center">
        <div className="pt-2 font-medium text-xs text-center text-gray-400">
          {"You'll receive a decision within 1 week."}
        </div>
        <div className="ml-1 pt-2 cursor-pointer underline font-medium text-xs text-center text-gray-400 hover:text-gray-600 onClick={#}">
          Learn more.
        </div>
      </div>

      <div className="pt-12 flex justify-center">
        <button
          className="items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={Leaderboard}
        >
          Apply
        </button>
      </div>
      <div className="pt-16"></div>
      <div className="w-full  bg-indigo-50 py-8 px-4">
        <div className="pl-2 pt-4 space-x-5 flex">
          <a
            className="font-medium"
            href="https://twitter.com/HyperscaleFund"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a className="">{"//"}</a>
          <a
            className="ml-6 font-medium"
            href="https://twitter.com/HyperscaleFund"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </div>
      </div>
    </>
  );
};

export default Explanation;
