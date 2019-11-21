// file serverInit.js
export default async (ctx) => {
  console.log('clientInit', process.browser)
  // todo: get me
  await ctx.store.dispatch('auth/nuxtServerInit', ctx);
  // todo: get members workspace
  await ctx.store.dispatch('workspace/loadMembers', ctx);
  // todo: get courts workspace
  await ctx.store.dispatch('courts/load', ctx);
  // todo: get clients workspace
  await ctx.store.dispatch('clients/load', ctx);
  // todo: get matter types workspace
  await ctx.store.dispatch('types/load', ctx);

};
