import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET() {
    const query = queryGetStats()
    const data = await hygraphOnSteroids.request(query)
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetStats(){
    return gql`
    query getStats{
        stats {
            game {
                gameId
            }
            team1Score
            team2Score 
        }
    }
`
}