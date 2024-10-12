import { insertOne } from "../util/mongoClient.js";

const createSession = async ({ userId }) => {
    return insertOne({ collectionName: "sessions", params: { users: [userId] } })
}

export default createSession;