import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Button from "../atoms/Button";
import Vote from "../Vote";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// A super simple expandable component.{JSON.stringify(data, null, 2)}

const ExpandedComponent = ({ data }: any) => {
  const router = useRouter();
  const links = data?.helpfulLinks ?? [];
  return (
    <div className="p-6 top-border row-child">
      <div className="flex-row md:flex gap-x-12 mb-2">
        <div className="basis-1/3">
          <dl>
            <dt className="font-semibold">Pitch us your project in a tweet</dt>
            <dd className="mb-5">{data.projectTweet || "N.A."}</dd>
          </dl>
        </div>
        <div className="basis-2/3">
          <dl>
            <dt className="font-semibold">Background of each founder</dt>
            <dd className="mb-5">{data.founderBackground || "N.A"}</dd>
          </dl>
        </div>
      </div>
      <div className="md:flex gap-x-12 mb-2">
        <div className="basis-1/3 mb-5 md:mb-2">
          {links && (
            <ul>
              {links.map((link: any, i: any) => (
                <li key={`link-${i}`}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="basis-2/3">
          <Button
            responsive
            color="primary-outline"
            onClick={() => router.push({ pathname: "/dao-race/[id]", query: { id: data._id } })}
          >
            View Full Application
          </Button>
        </div>
      </div>
    </div>
  );
};

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  table: {
    style: {
      color: "white",
      marginTop: "3.5rem",
      marginBottom: "0.95rem",
    },
  },
  headRow: {
    style: {
      minHeight: "72px",
      background: "#00000005",
      border: "0 !important",
      borderRadius: "0.5rem",
      width: "calc(100% - 25px)",
      margin: "0.45rem 0.75rem",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: "#6b7280",
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      background: "#FFFFFF",
      border: "0 !important",
      boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
      position: "relative",
      width: "calc(100% - 25px)",
      margin: "0.45rem 0.75rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
    },
  },

  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: "#000000",
      fontSize: "1rem",
    },
  },
};

const placeholderDiv = (
  <div
    className="h-3 w-3/5 animate-pulse"
    style={{
      background: "linear-gradient(90deg, #E5E5E5 0%, rgba(255,255,255,1) 100%)",
    }}
  ></div>
);

type votesRowProps = {
  isUserAuthenticated: boolean;
  row: any;
};
const VotesRow = ({ isUserAuthenticated, row }: votesRowProps) => {
  const [voteCount, setVoteCount] = useState(row.voteCount);

  return (
    <Vote
      voteCount={voteCount}
      setVoteCount={setVoteCount}
      applicationId={row._id}
      isUserAuthenticated={isUserAuthenticated}
      variant="vibrant"
    />
  );
};
type LeaderboardProps = {
  data: any;
  numRows: number;
};
const Leaderboard: React.FunctionComponent<LeaderboardProps> = ({ data, numRows }: LeaderboardProps) => {
  const { status: sessionStatus } = useSession();
  const isUserAuthenticated = sessionStatus === "authenticated";

  let rows: any = JSON.parse(JSON.stringify(data));
  if (numRows) {
    rows = rows.slice(0, numRows);
  }

  const columns: any = [
    {
      id: "colRank",
      name: "Rank",
      selector: (row: any) => row.rank,
    },
    {
      id: "colLdVotes",
      name: "Votes",
      selector: (row: any) => <VotesRow row={row} isUserAuthenticated={isUserAuthenticated} />,
    },
    {
      id: "colName",
      name: "Name",
      selector: (row: any) => row.projectName ?? placeholderDiv,
    },
    {
      id: "colSdVotes",
      name: "Votes",
      selector: (row: any) => <VotesRow row={row} isUserAuthenticated={isUserAuthenticated} />,
    },
    {
      id: "colSubmittedBy",
      name: "Submitted by",
      hide: "md",
      selector: (row: any) => row.discordId ?? row.userName ?? placeholderDiv,
    },
    // {
    //   name: "Date submitted",
    //   selector: (row) => row.submittedAt,
    // },
  ];

  return (
    <div className="leaderboard-list">
      <div className="dtable">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={rows}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
