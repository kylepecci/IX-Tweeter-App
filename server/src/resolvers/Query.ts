import { getUserId, Context } from "../utils";

export const Query = {
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },

  myFeed(parent, args, ctx: Context, info) {
    return ctx.db.query.tweets(
      { orderBy: args.orderBy, where: { author: { email: args.email } } },
      info
    );
  },

  feed(parent, args, ctx: Context, info) {
    return ctx.db.query.tweets({ orderBy: args.orderBy }, info);
  },

  tweet(parent, args, ctx: Context, info) {
    return ctx.db.query.tweet({ where: { id: args.id } }, info);
  },

  findUser(parent, args, ctx: Context, info) {
    return ctx.db.query.user({ where: { username: args.username } }, info);
  },

  feedForUser(parent, args, ctx: Context, info) {
    return ctx.db.query.tweets(
      { orderBy: args.orderBy, where: { author: { username: args.username } } },
      info
    );
  }

  // userExists(parent, args, ctx: Context, info) {
  //   return ctx.db.exists.User({ username: args.username });
  // }
};
