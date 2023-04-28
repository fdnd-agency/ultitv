import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET() {
    const query = queryGetPlayers()
    const data = await hygraphOnSteroids.request(query)
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetPlayers(){
    return gql`
    query getPlayers{
        players {
            id
            name
            jerseyNumber
            gender
            team {
                name
            }
            height
            pronounced
            pronouns
            facts {
                question{
                    title
                }
                answer
            }
        }
    }
`
}