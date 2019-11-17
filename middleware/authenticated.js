export default function ({ store, redirect, nuxt }) {
  // If the user is not authenticated
  console.log('AUTHENTICATED_1',store)
  if (!store.state.auth.token) {
    return redirect('/auth/signin')
  }
}
