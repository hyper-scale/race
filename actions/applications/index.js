import Application from "../../models/Application";
import queryWithSession from "../../utils/queryWithSession";
import { Types } from "mongoose";

// this function upsert a list of records, used for syncing data
export async function upsertApplications(records) {
  const results = [];
  for (const record of records) {
    const { projectName } = record;

    const { result, error } = await queryWithSession((session) =>
      Application.findOneAndUpdate({ projectName }, record, {
        upsert: true,
      })
    );

    if (error) {
      // TODO: Handle error
      console.error("Failed to upsertApplications", error);
    }

    results.push(result);
  }
  return results;
}

// query all applications
export async function getApplications(limit, query, email) {
  const pipeline = [
    {
      $addFields: {
        // Add the vote count to the application
        voteCount: { $size: "$votes" },

        // Indicate if user has alredy voted based on email
        hasUserUpvoted: email ? { $in: [email, "$votes"] } : false,
        userName: {
          $cond: {
            if: { $eq: [{ $ifNull: ["$emailAddress", 0] }, 0] },
            then: null,
            else: { $substr: ["$emailAddress", 0, { $indexOfBytes: ["$emailAddress", "@"] }] },
          },
        },
      },
    },

    // Don't make emails of voters public
    { $unset: ["votes", "emailAddress"] },

    // Sort by most votes first
    { $sort: { voteCount: -1 } },
  ];

  if (limit) {
    pipeline.push({ $limit: limit });
  }

  if (query) {
    pipeline.unshift({ $match: query });
  }

  const { result: aggregate, error } = await queryWithSession((session) => Application.aggregate(pipeline));

  if (error) {
    // TODO: Handle error
    console.error("Failed to get applications", error);
  }

  if (aggregate && aggregate.length > 0) {
    var lastVoteCount = aggregate[0].voteCount;
    var lastRank = 1;
    aggregate.forEach(function (application, index) {
      if (application.voteCount != lastVoteCount) {
        lastVoteCount = application.voteCount;
        lastRank = lastRank + 1;
      }
      application.rank = lastRank;
    });
  }
  return aggregate ?? [];
}

// query selected applications
export async function getSelectedApplications(applicationId, email) {
  return getApplications(1, { _id: Types.ObjectId(applicationId) }, email);
}

export async function addVote(applicationId, voterEmail) {
  const { result, error } = await queryWithSession((session) =>
    Application.findOneAndUpdate(
      // Find application by Id
      { _id: applicationId },

      // Add to set so the same email will not be added twice
      { $addToSet: { votes: voterEmail } }
    )
  );

  if (error) {
    // TODO: Handle error
    console.error("Failed to add vote to application", error);
  }

  return result;
}
