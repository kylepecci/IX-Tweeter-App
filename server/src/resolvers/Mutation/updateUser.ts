import { Context } from "../../utils";

export const addUsername = {
  async addUserName(parent, args, ctx: Context, info) {
    const user = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: {
        username: args.username
      }
    });
    return user;
  }
};
