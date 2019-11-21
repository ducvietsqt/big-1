export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      redirect("/auth/signin")
    }
    if (error.response.status === 500) {
      redirect("/sorry")
    }
  })
}
