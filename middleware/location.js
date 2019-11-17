import { getSubdomain, isValidSubdomain } from '../utils'

export default function (context) {
  // Server-side
  if (process.server) {
    const { req, res, beforeNuxtRender } = context
    let _domain = req.headers.host.split(":")[0];
    let subdomain = getSubdomain(_domain);
    let isValid = isValidSubdomain(subdomain);
    console.log('LOCATION',subdomain, isValid);
    if (!isValid) {
      // context.redirect
      // console.log(location)
      return context.redirect('')

    }
  }
  // Client-side
  if (process.client) {
    const { from, nuxtState } = context
  }
}
