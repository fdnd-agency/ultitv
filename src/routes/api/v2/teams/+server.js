import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET() {
    const query = queryGetTeams()
    const data = await hygraphOnSteroids.request(query)
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetTeams(){
    return gql`
    query getTeams{
        teams{
            name
            country
            seeding
            iso2
            iso3
            olympicCode
            players {
                name
                jerseyNumber
                gender
                height
                pronounced
                pronouns
            }
            facts {
                question {
                    title
                }
                answer
            }
        }
    }
`
}