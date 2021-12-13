import Vote from "../Vote";
import Breadcrumbs from "../Breadcrumbs";
import { useSession } from "next-auth/react";

const titles = {
  name: "Project name",
  submittedBy: "Submitted by",
  pitch: '"Pitch us your project in a tweet"',
  description: "Full pitch",
  background: "Background of each founder",
  evidence: "Evidence of exceptional ability for each founder",
  misc: "Is there anything else we should know about?",
  links: "Links",
  uploads: "Uploads",
  voteFor: "Votes for",
  flag: "Flag",
}; // for future translations

const ApplicationDetails = ({ data }) => {
  const { data: session, status } = useSession();

  const breadcrumbs = [
    { url: "/", text: "Home" },
    { url: "/dao-race", text: "DAO Race" },
    { url: "", text: data.projectName },
  ];
  return (
    <div className="divide-y divide-gray-300 py-4">
      <div>
        <div className="hidden sm:block">
          <Breadcrumbs list={breadcrumbs} />
        </div>
        <div className="block sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-5xl sm:truncate sm:leading-normal mb-8">
          {data.projectName}
        </h1>
        <div className="block sm:flex sm:flex-row sm:space-x-8 mb-12">
          <div className="sm:basis-1/3">
            <div className="bg-gray-300 sm:h-full sm:w-full mb-4 sm:mb-0 h-48 rounded-lg"></div>
          </div>
          <div className="sm:basis-2/3">
            <div className="flex flex-row content-center mb-5">
              <div className="flex-1">
                <dt className="font-semibold">{titles.submittedBy}</dt>
                <dd>{data.submittedBy}</dd>
              </div>
              <div className="flex flex-row h-[fit-content]">
                <div
                  className="text-indigo-500 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg p-2 mx-2 cursor-pointer"
                  onClick={(e) => window.open(data.projectUrl, "_blank")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                {/* this is just an if statement that checks if a user session exists */}
                {session && <Vote voteCount={data.voteCount} applicationId={data.applicationId} />}
              </div>
            </div>
            <dl>
              <dt className="font-semibold">{titles.name}</dt>
              <dd className="mb-5">
                {data.projectName} ({data.shortName})
              </dd>
              <dt className="font-semibold">{titles.pitch}</dt>
              <dd className="mb-5">{data.pitch || "N.A"}</dd>
            </dl>
          </div>
        </div>
        <dl>
          <dt className="font-semibold">{titles.fullDesc}</dt>
          <dd className="mb-5">{data.fullDesc || "N.A"}</dd>
          <dt className="font-semibold">{titles.background}</dt>
          <dd className="mb-5">{data.background || "N.A"}</dd>
          <dt className="font-semibold">{titles.evidence}</dt>
          <dd className="mb-5">{data.evidence || "N.A"}</dd>
          <dt className="font-semibold">{titles.misc}</dt>
          <dd className="mb-5">{data.misc || "N.A"}</dd>
          <dt className="font-semibold mb-3">{titles.links}</dt>
          <dd className="mb-5">
            <ul className="link-list list-disc pl-5">
              {/* {data.links.map((link, i) => (
                <li key={`link-${i}`}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.text}
                  </a>
                </li>
              ))} */}
            </ul>
          </dd>
          <dt className="font-semibold mb-3">{titles.uploads}</dt>
          <dd className="mb-5">
            <ul className="link-list list-disc pl-5">
              {/* {data.uploads.map((upload, i) => (
                <li key={`upload-${i}`}>
                  <a href={upload.url} target="_blank" rel="noreferrer">
                    {upload.text}
                  </a>
                </li>
              ))} */}
            </ul>
          </dd>
        </dl>
        <div className="mb-5 flex flex-row">
          {/* this is just an if statement that checks if a user session exists */}
          {session && <Vote voteCount={data.voteCount} applicationId={data.applicationId} />}
          <div className="flex flex-row items-center text-gray-600 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-6 mx-2 font-semibold hover:bg-gray-300 cursor-pointer">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <div className="ml-2">Flag</div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-5">
          <div className="uppercase font-bold mb-3">{titles.voteFor}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-2/3">
            {/* {data.voters.map((voter, i) => (
              <Voter voter={voter.username} power={voter.power} image={voter.image} key={i} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
