import { getSession } from "next-auth/react";
import { updateVote } from "../../actions/applications";

export default async function vote(req, res) {
  if (req.method !== "POST") {
    // Not found
    res.status(404).end();
    return;
  }

  const session = await getSession({ req });
  const applicationId = req?.body?.id;
  const voterEmail = session?.user?.email;

  if (session) {
    if (!applicationId || !voterEmail) {
      // Bad Request
      console.warn("Bad request to vote", {
        applicationId,
        voterEmail,
      });
      res.status(400);
    } else {
      const result = await updateVote(applicationId, voterEmail, true);
      if (!result) {
        console.error("Failed to update votes", {
          applicationId,
          result,
          voterEmail,
        });
        res.status(501);
      } else {
        console.log("Successfully updated vote", {
          applicationId,
          voterEmail,
        });
      }
    }
  } else {
    // Unauthorized
    console.warn("Unauthorized request to vote", {
      applicationId,
      voterEmail,
    });
    res.status(401);
  }
  res.end();
}
