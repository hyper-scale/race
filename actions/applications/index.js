import Application from "../../models/Application";
import User from "../../models/User";
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
export async function getApplications(options = {}) {
  const { email, limit, order, query } = options;

  const appDetails = limit && limit == 1;

  const pipeline = [
    {
      $match: {
        emailAddress: { $exists: true, $ne: null },
        projectName: { $exists: true, $ne: null },
        projectTweet: { $exists: true, $ne: null },
        productPitch: { $exists: true, $ne: null },
        founderBackground: { $exists: true, $ne: null },
        evidenceOfExceptionalAbility: { $exists: true, $ne: null },
        $expr: {
          $and: [
            { $gt: [{ $strLenCP: "$emailAddress" }, 0] },
            { $gt: [{ $strLenCP: "$projectName" }, 0] },
            { $gt: [{ $strLenCP: "$projectTweet" }, 0] },
            { $gt: [{ $strLenCP: "$productPitch" }, 0] },
            { $gt: [{ $strLenCP: "$founderBackground" }, 0] },
            { $gt: [{ $strLenCP: "$evidenceOfExceptionalAbility" }, 0] },
          ],
        },
      },
    },

    {
      $addFields: {
        // Add the vote count to the application
        voteCount: { $size: "$votes" },

        // Indicate if user has alredy voted based on email
        //hasUserUpvoted: email ? { $in: [email, "$votes"] } : false,
        userName: {
          $cond: {
            if: { $eq: [{ $ifNull: ["$emailAddress", 0] }, 0] },
            then: null,
            else: { $substr: ["$emailAddress", 0, { $indexOfBytes: ["$emailAddress", "@"] }] },
          },
        },
      },
    },

    // Don't make emails
    { $unset: ["emailAddress"] },
  ];

  if (!appDetails) {
    pipeline.push({ $unset: ["votes"] });
  }

  if (order === "date") {
    pipeline.push({ $sort: { submittedAt: -1 } });
  } else {
    // Sort by most votes by default
    pipeline.push({ $sort: { voteCount: -1 } });
  }

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
    if (appDetails) {
      const { result: users, error } = await queryWithSession((session) =>
        User.find({ _id: { $in: aggregate[0].votes } }, { discordId: 1, _id: 0 }, { session: session })
      );
      if (users) {
        aggregate[0].votes = [];
        users.forEach((user) => {
          aggregate[0].votes.push({ username: user.discordId.substr(0, user.discordId.indexOf("#")) });
        });
      }
    }
    var lastVoteCount = aggregate[0].voteCount;
    var lastRank = 1;
    aggregate.forEach(function (application, index) {
      if (application.voteCount != lastVoteCount) {
        lastVoteCount = application.voteCount;
        lastRank = lastRank + 1;
      }
      application.rank = lastRank;
      application._id = application._id.toString();
    });
  }
  return aggregate ?? [];
}

// query selected applications
export async function getSelectedApplications(applicationId, email) {
  return getApplications({
    limit: 1,
    query: { _id: Types.ObjectId(applicationId) },
    email,
  });
}

export async function updateVote(applicationId, voterEmail, upsert) {
  var { result: user, error: user_err } = await queryWithSession((session) =>
    User.findOne({ email: voterEmail }, null, { session })
  );
  if (!user) {
    // TODO: Handle error
    console.error(`Failed to find user ${voterEmail}`, user_err);
    return;
  }
  const operation = upsert ? { $addToSet: { votes: user._id } } : { $pull: { votes: user._id } };
  let { result: app, error: app_err } = await queryWithSession((session) =>
    Application.findOneAndUpdate(
      // Find application by Id
      { _id: applicationId },
      operation
    )
  );
  if (app_err) {
    // TODO: Handle error
    console.error("Failed to add vote to application", app_err);
    return;
  }

  return app;
}
