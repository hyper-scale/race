import Application from "../../../models/Application";
import queryWithSession from "../../../utils/queryWithSession";
import { Types } from "mongoose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { result: application, error } = await queryWithSession((session) =>
      Application.find({ _id: Types.ObjectId(req.param.applicationId) }, null, { session })
    );

    if (error) {
      // TODO: Setup logging and log the real error, but don't expose it transparently to the client
      return res.status(503);
    }

    return res.status(200).send(application);
  } else {
    res.status(405);
  }
}
