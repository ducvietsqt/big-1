export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    console.log('500',error.response)
    if(error.response.status === 401) {
      // redirect('/auth/signin')
    }
    if(error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
