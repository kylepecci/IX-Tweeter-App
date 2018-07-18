import { Context, getUserId } from "../../utils";
import { duplicateArgMessage } from "graphql/validation/rules/UniqueArgumentNames";

export const tweet = {
  async createTweet(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return await ctx.db.mutation.createTweet(
      {
        data: {
          text: args.text,
          author: {
            connect: {
              id: id // make sure you use your created user's email!
            }
          }
        }
      },
      info
    );
  }
};
