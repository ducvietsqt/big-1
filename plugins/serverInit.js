// file serverInit.js
import {SESSION} from "~/utils";

export default async (ctx) => {
  let token = ctx.store.state.auth.token || ctx.app.context.app.$cookiz.get(SESSION.TOKEN)
  if(!token) return
  await ctx.store.dispatch("auth/nuxtServerInit", ctx)

  // console.log('clientInit', process.browser)
  // // todo: get me
  // await ctx.store.dispatch('auth/nuxtServerInit', ctx);
  // // todo: get members workspace
  await ctx.store.dispatch('workspace/loadMembers', ctx);
  // // todo: get courts workspace
  await ctx.store.dispatch('courts/load', ctx);
  // // todo: get clients workspace
  await ctx.store.dispatch('clients/load', ctx);
  // // todo: get matter types workspace
  await ctx.store.dispatch('types/load', ctx);
}
