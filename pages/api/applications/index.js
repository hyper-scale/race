import Application from "../../../models/Application";
import User from "../../../models/User";
import { getSession } from "next-auth/react";
import queryWithSession from "../../../utils/queryWithSession";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send(await getApplications());
  } else if (req.method === "POST") {
    const userSession = await getSession({ req });
    if (userSession) {
      const { result: user, error: user_err } = await queryWithSession((dbSession) =>
        User.findOne({ email: userSession.user.email }, null, { session: dbSession })
      );
      if (user_err) {
        console.error(`User ${userSession.user.email} not found`, user_err);
        res.status(501);
        return;
      }
      const body = req?.body;
      const application = {
        discordId: user.discordId,
        emailAddress: body.emailAddress,
        projectName: body.projectName,
        projectTweet: body.projectTweet,
        productPitch: body.productPitch,
        founderBackground: body.founderBackground,
        evidenceOfExceptionalAbility: body.evidenceOfExceptionalAbility,
        additionalDetails: body.additionalDetails,
        helpfulLinks: body.helpfulLinks,
        helpfulUploads: body.helpfulUploads,
        referral: body.referral,
        submittedAt: new Date().toISOString(),
      };

      if (!application) {
        res.status(400).json({ error: "Malformed request", success: false });
      } else {
        const { result, error } = await queryWithSession((dbSession) =>
          Application.create([application], { session: dbSession })
        );
        if (error) {
          res.status(400).json({ error: error, success: false });
        } else {
          // might need data for email sending
          res.status(201).json({ success: true, data: result });
        }
      }
    } else {
      res.status(401).json({ error: "Unauthorized", success: false });
    }
    res.end();
  } else {
    res.status(405);
  }
}
