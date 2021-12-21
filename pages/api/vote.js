import { getSession } from "next-auth/react";
import { updateVote } from "../../actions/applications";

export default async function vote(req, res) {
  if (req.method !== "POST") {
    // Not found
    res.status(404).end();
    return;
  }

  const session = await getSession({ req });
  if (session) {
    const applicationId = req?.body?.id;
    const voterEmail = session?.user?.email;
    if (!applicationId || !voterEmail) {
      // Bad Request
      res.status(400);
    } else {
      const result = await updateVote(applicationId, voterEmail, true);
      if (!result) {
        res.status(501);
      }
    }
  } else {
    // Unauthorized
    res.status(401);
  }
  res.end();
}
