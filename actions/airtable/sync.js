import Airtable from "airtable";
import { upsertApplications } from "../applications";

// get all records from airtable
export function getAirtableApplicationRecords() {
  return new Promise((r, reject) => {
    const base = Airtable.base(process.env.AIRTABLE_BASE);
    let results = [];
    base("Applications")
      .select({
        view: "Responses",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          const data = records.map((record) => record.fields);
          results = [...results, ...data];
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          } else {
            r(results);
          }
        }
      );
  });
}

// format airtable records into a format that can be inserted into MongoDB
export function formatAirtableRecords(records) {
  return records.map((record) => {
    // map fields from airtable to mongoDB
    const {
      Email: emailAddress,
      "Project Name": projectName,
      "Short Pitch": projectTweet,
      "Pitch us your product": productPitch,
      "Provide some background on each founder": founderBackground,
      "Please state evidence of exceptional ability for each founder": evidenceOfExceptionalAbility,
      "Additional Details": additionalDetails,
      "Helpful links": helpfulLinks,
      Referral: referral,
    } = record;

    const helpfulUploadsCell = record["Helpful uploads"];
    let helpfulUploads = [];
    if (helpfulUploadsCell) {
      helpfulUploads = helpfulUploadsCell.map((helpfulUpload) => {
        const { filename: filename, url: url, size: size } = helpfulUpload;
        return {
          filename,
          url,
          size,
        };
      });
    }
    return {
      emailAddress,
      projectName,
      projectTweet,
      productPitch,
      founderBackground,
      evidenceOfExceptionalAbility,
      additionalDetails,
      helpfulLinks,
      helpfulUploads: helpfulUploads,
      referral,
    };
  });
}

// sync the MongoDB with the AirTable form
export async function syncAirtableData() {
  const records = await getAirtableApplicationRecords();
  const transformedRecords = formatAirtableRecords(records);
  const updates = await upsertApplications(transformedRecords);
  return updates;
}
