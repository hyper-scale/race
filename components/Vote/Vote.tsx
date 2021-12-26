import { Dispatch, SetStateAction, useCallback } from "react";
import cx from "classnames";
import React from "react";
type VoteProps = {
  applicationId: Number;
  voteCount: number;
  isUserAuthenticated: Boolean;
  variant: String;
  setVoteCount: Dispatch<SetStateAction<number>>;
};
// TODO: When transitioning to typescript, variant can be either 'vibrant' or 'simple'
const Vote: React.FunctionComponent<VoteProps> = ({
  applicationId,
  voteCount,
  isUserAuthenticated,
  variant,
  setVoteCount,
}: VoteProps) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const onVote = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: applicationId,
        }),
      });

      if (res.ok) {
        setVoteCount(voteCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [applicationId, voteCount, setLoading, setVoteCount]);
  const ArrowButton = () => (
    <button
      disabled={!isUserAuthenticated || isLoading}
      className={cx("w-full h-full py-2 px-3 cursor-pointer", {
        "cursor-not-allowed": !isUserAuthenticated,
      })}
      onClick={onVote}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.99984 12.8327V1.16602M6.99984 1.16602L1.1665 6.99935M6.99984 1.16602L12.8332 6.99935"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );

  if (variant === "vibrant") {
    const lightGradient = {
      background:
        "linear-gradient(270deg, rgba(228, 241, 252, 0.3) 0%, rgba(218, 223, 252, 0.3) 36.46%, rgba(236, 229, 249, 0.3) 94.27%), #F1F4FF",
    };
    const normalGradient = {
      background:
        "linear-gradient(270deg, rgba(228, 241, 252, 0.5) 0%, rgba(218, 223, 252, 0.5) 36.46%, rgba(236, 229, 249, 0.5) 94.27%)",
    };

    return (
      <div className="flex flex-row rounded-lg text-black hover:text-indigo-500">
        <div className="flex rounded-l-lg py-2 px-4" style={normalGradient}>
          <label className="font-bold">{voteCount}</label>
        </div>
        <div className="rounded-r-lg" style={lightGradient}>
          <ArrowButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row rounded-lg shadow-md">
      <div className="flex bg-gray-100 rounded-l-lg py-2 px-4 border border-gray-300 bg-gray-100">
        <label className="font-bold text-indigo-500">{voteCount}</label>
      </div>
      <div className="rounded-r-lg text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500">
        <ArrowButton />
      </div>
    </div>
  );
};
export default Vote;
