import { Query } from "./Query";
import { tweet } from "./Mutation/CreateTweet";
import { auth } from "./Mutation/auth";
import { AuthPayload } from "./AuthPayload";
import { addUsername } from "./Mutation/updateUser";

export default {
  Query,
  Mutation: {
    ...auth,
    ...tweet,
    ...addUsername
  },
  AuthPayload
};
