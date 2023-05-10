import { HYGRAPH_KEY, HYGRAPH_URL, HYGRAPH_URL_HIGH_PERFORMANCE, HYGRAPH_KEY2, HYGRAPH_URL2, HYGRAPH_URL_HIGH_PERFORMANCE2 } from '$env/static/private'
import { GraphQLClient } from 'graphql-request'

const headers = {
  headers: {
    Authorization: `Bearer ${HYGRAPH_KEY}`,
  },
}

// V2 headers
const headers2 = {
  headers: {
    Authorization: `Bearer ${HYGRAPH_KEY2}`,
  }
}

export const hygraph = new GraphQLClient(HYGRAPH_URL, headers)
export const hygraphOnSteroids = new GraphQLClient(HYGRAPH_URL_HIGH_PERFORMANCE, headers)

// V2 clients
export const hygraph2 = new GraphQLClient(HYGRAPH_URL2, headers2)
export const hygraphOnSteroids2 = new GraphQLClient(HYGRAPH_URL_HIGH_PERFORMANCE2, headers2)