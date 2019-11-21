import { SESSION } from '~/utils'

export default function (context) {
  const { store, redirect } = context
  // If the user is not authenticated
  let token = store.state.auth.token || context.app.context.app.$cookiz.get(SESSION.TOKEN)

  if (!token) {
    return redirect('/auth/signin')
  }
}
