import Application from "../../../models/Application";
import User from "../../../models/User";
import { getSession } from "next-auth/react";
import queryWithSession from "../../../utils/queryWithSession";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send(await getApplications());
  } else if (req.method === "POST") {
    const session = await getSession({ req });
    if (session) {
      const user = await User.findOne({ email: session.user.email });
      const body = req?.body;
      const application = {
        additionalDetails: body.additionalDetails,
        discordId: user.discordId,
        emailAddress: body.emailAddress,
        evidenceOfExceptionalAbility: body.evidenceOfExceptionalAbility,
        founderBackground: body.founderBackground,
        helpfulLinks: JSON.stringify(body.helpfulLinks),
        productPitch: body.productPitch,
        projectName: body.projectName,
        projectTweet: body.projectTweet,
        referral: body.referral,
        votes: [],
        submittedAt: new Date().toISOString(),
      };

      if (!application) {
        res.status(400).json({ error: "Malformed request", success: false });
      } else {
        const { result, error } = await queryWithSession((session) => Application.create([application], { session }));
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
