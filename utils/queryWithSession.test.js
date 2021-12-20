import establishDatabaseConnection from "./dbConnect";
import Application from "../models/Application";
import queryWithSession from "./queryWithSession";

jest.mock("./dbConnect", () => jest.fn());

beforeEach(() => {
  establishDatabaseConnection.mockClear();
});

describe("queryWithSession", () => {
  it("handles failing database connections", async () => {
    establishDatabaseConnection.mockRejectedValueOnce("Simulated db failure");

    const { error, result } = await queryWithSession((session) => Promise.resolve("result"));

    expect(result).toBe(null);
    expect(error).toBe("Establishing connection to database failed");
  });

  it("handles failing database session", async () => {
    establishDatabaseConnection.mockResolvedValueOnce({
      startSession: () => Promise.reject("Simulated session failed"),
    });

    const { error, result } = await queryWithSession((session) => Promise.resolve("result"));

    expect(result).toBe(null);
    expect(error).toBe("Starting database session failed");
  });

  it("handles failing database query", async () => {
    establishDatabaseConnection.mockResolvedValueOnce({
      startSession: () => Promise.resolve({}),
    });

    const { error, result } = await queryWithSession((session) => Promise.reject("query failure"));

    expect(result).toBe(null);
    expect(error?.message).toBe("Database query failed");
  });

  it("handles successful database query", async () => {
    establishDatabaseConnection.mockResolvedValueOnce({
      startSession: () => Promise.resolve({}),
    });

    const { error, result } = await queryWithSession((session) => Promise.resolve("result"));

    expect(result).toBe("result");
    expect(error).toBe(null);
  });
});
