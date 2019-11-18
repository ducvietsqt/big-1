// file clientInit.js
export default async (ctx) => {
  await ctx.store.dispatch('auth/nuxtServerInit', ctx);
};
