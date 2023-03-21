import { gql } from 'graphql-request'
import { hygraphOnSteroids } from '$lib/server/hygraph'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
  const first = Number(url.searchParams.get('first') ?? 5)
  const skip = Number(url.searchParams.get('skip') ?? 0)
  const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
  const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
  const query = queryGetPlayers()
  const data = await hygraphOnSteroids.request(query, { first, skip, orderBy })
  
  return new Response(JSON.stringify(data), responseInit)
}

function queryGetPlayers () {
  return gql`
    query getPlayers($first: Int, $skip: Int, $orderBy: PlayerOrderByInput) {
      players(first: $first, skip: $skip, orderBy: $orderBy) {
        id
        name
        gender
        jerseyNumber
        team {
          name
        }
        answers {
          question {
            title
          }
          content
        }
        
      }
      playersConnection {
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `
}
