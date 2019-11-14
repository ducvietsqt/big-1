export default function ({ store, redirect }) {
  // If the user is not authenticated
  console.log('authenticated',store)
  if (!store.state.auth) {
    return redirect('/auth/signin')
  }
}
