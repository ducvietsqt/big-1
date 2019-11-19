// file serverInit.js
export default async (ctx) => {
  console.log('clientInit', process.browser)
  await ctx.store.dispatch('auth/nuxtServerInit', ctx);
  await ctx.store.dispatch('workspace/loadMembers', ctx);

};
