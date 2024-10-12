import { insertOne } from "../util/mongoClient.js";

const createUser = async ({ userName }) => {
    return insertOne({ collectionName: "users", params: { userName }})
}

export default createUser;