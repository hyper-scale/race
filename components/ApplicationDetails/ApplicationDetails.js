import Vote from "../Vote";
import Voter from "../Voter";
import Breadcrumbs from "../Breadcrumbs";
import { useSession } from "next-auth/react";

const titles = {
  name: "Project name",
  submittedBy: "Submitted by",
  pitch: '"Pitch us your project in a tweet"',
  description: "Full pitch",
  founderBackground: "Background of each founder",
  evidenceOfExceptionalAbility: "Evidence of exceptional ability for each founder",
  additionalDetails: "Is there anything else we should know about?",
  helpfulLink: "Links",
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
    <div className="divide-y divide-gray-300 py-4 px-4 mdpx-0">
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
        <div className="flex justify-between mb-5">
          <div className="flex flex-row items-center text-gray-600 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-6  font-semibold hover:bg-gray-300 cursor-pointer">
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
          <div className="flex">
            <div className="h-[fit-content]">
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
              {session && <Vote initialCount={data.voteCount} applicationId={data._id} />}
            </div>
            <div className="flex flex-row">
              <div className="shadow-md flex border border-gray-300 bg-gray-100 rounded-l-lg">
                <label className="font-semibold m-2 text-redrose font-bold text-indigo-500">{data.voteCount}</label>
              </div>
              <button className="rounded-r-lg shadow-md rounded-r-lg   text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 p-2  cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21V3M12 3L5 10M12 3L19 10" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-col basis-1/2">
            <dl>
              <dt className="font-semibold">{titles.submittedBy}</dt>
              <dd className="mb-5">{(data.discordId ?? data.userName) || "N.A."}</dd>
              <dt className="font-semibold">{titles.name}</dt>
              <dd className="mb-5">{data.projectName || "N.A."}</dd>
              <dt className="font-semibold">{titles.pitch}</dt>
              <dd className="mb-5">{data.projectTweet || "N.A."}</dd>
            </dl>
          </div>
          <div className="flex-col basis-1/2">
            <dl>
              <dt className="font-semibold">{titles.description}</dt>
              <dd className="mb-5">{data.productPitch || "N.A."}</dd>
              <dt className="font-semibold">{titles.founderBackground}</dt>
              <dd className="mb-5">{data.founderBackground || "N.A"}</dd>
              <dt className="font-semibold">{titles.evidenceOfExceptionalAbility}</dt>
              <dd className="mb-5">{data.evidenceOfExceptionalAbility || "N.A"}</dd>
              <dt className="font-semibold">{titles.additionalDetails}</dt>
              <dd className="mb-5">{data.additionalDetails || "N.A"}</dd>
              <dt className="font-semibold mb-3">{titles.helpfulLink}</dt>
              <dd className="mb-5">
                <ul className="link-list list-disc pl-5">
                  {/* {data.helpfulLinks.split(",").map((link, i) => (
                <li key={`link-${i}`}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                </li>
              ))} */}
                </ul>
              </dd>
              <dt className="font-semibold mb-3">{titles.uploads}</dt>
              <dd className="mb-5">
                <ul className="link-list list-disc pl-5">
                  {data.helpfulUploads != null ??
                    data.helpfulUploads.map((upload, i) => (
                      <li key={`upload-${i}`}>
                        <a href={upload.url} target="_blank" rel="noreferrer">
                          {upload.filename}
                        </a>
                      </li>
                    ))}
                </ul>
              </dd>
            </dl>
          </div>
        </div>

        <div className="mb-5">
          {/* this is just an if statement that checks if a user session exists */}
          {session && <Vote voteCount={data.voteCount} applicationId={data._id} />}
          <div className="flex justify-between mb-5">
            <div className="flex flex-row items-center text-gray-600 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-lg py-2 px-6  font-semibold hover:bg-gray-300 cursor-pointer">
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
            <div className="flex">
              <div className="h-[fit-content]">
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
                {session && <Vote initialCount={data.voteCount} applicationId={data._id} />}
              </div>
              <div className="flex flex-row">
                <div className="shadow-md flex border border-gray-300 bg-gray-100 rounded-l-lg">
                  <label className="font-semibold m-2 text-redrose font-bold text-indigo-500">{data.voteCount}</label>
                </div>
                <button className="rounded-r-lg shadow-md rounded-r-lg   text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 p-2  cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21V3M12 3L5 10M12 3L19 10" stroke="currentColor" strokeWidth="2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-5">
          <div className="uppercase font-bold mb-3">{titles.voteFor}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-2/3">
            {data.votes.map((voter, i) => (
              <Voter
                voter={voter.username}
                key={i}
                //power={voter.power} image={voter.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
