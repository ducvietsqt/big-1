export default function (context) {
  const { store, redirect, nuxt } = context
  // If the user is not authenticated
  if (!store.state.auth.token) {
    return redirect('/auth/signin')
  }
}
