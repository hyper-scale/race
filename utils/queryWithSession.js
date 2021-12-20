import establishDatabaseConnection from "./dbConnect";

/**
 * Establishes a client for a given mongo database.
 *
 * @param executor: (session: MongoDBSession) => MongooseQueryResult - A function with one parameter `session`, returning the query that is to be executed
 *
 * @returns an object with two parameters `error` and `result`, error being populated when an error occurs and result to be populated otherwise
 *
 * ## Examples
 *
 * const { result: application } = await queryWithSession((session) => Application.find({}, null, { session }));
 *
 */
export default async function queryWithSession(executor) {
  let connection;
  try {
    connection = await establishDatabaseConnection();
  } catch (error) {
    // TODO: Log the error
    return { result: null, error: "Establishing connection to database failed" };
  }

  let session;
  try {
    session = await connection.startSession();
  } catch (error) {
    // TODO: Log the error
    return { result: null, error: "Starting database session failed" };
  }

  let result;
  try {
    result = await executor(session);
  } catch (error) {
    // TODO: Log the error
    return {
      result: null,
      error: {
        mongoDBError: error,
        message: "Database query failed",
      },
    };
  }

  return { result, error: null };
}
