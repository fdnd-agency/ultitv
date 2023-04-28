import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET() {
    const query = queryGetQuestions()
    const data = await hygraphOnSteroids.request(query)
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetQuestions(){
    return gql`
    query getQuestions{
        questions{
            title
            type
        }
    }
`
}