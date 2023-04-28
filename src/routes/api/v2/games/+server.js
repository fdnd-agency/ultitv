import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET() {
    const query = queryGetGames()
    const data = await hygraphOnSteroids.request(query)
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetGames(){
    return gql`
    query getGames{
        games{
            gameId
            field
            broadcaster
            division
            gameStatus
            team1 {
                name
                seeding
                country
                iso2
                iso3
            }
            team2 {
                name
                seeding
                country
                iso2
                iso3
            }
        }
    }
`
}