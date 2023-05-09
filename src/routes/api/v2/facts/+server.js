import { hygraph, hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
    const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
    
    const query = queryGetFacts()
    const data = await hygraphOnSteroids.request(query, { first, skip, orderBy })
    
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetFacts(){
    return gql`
        query getFacts($first: Int, $skip: Int, $orderBy: FactOrderByInput){
            facts(first: $first, skip: $skip, orderBy: $orderBy){
                id
                question{
                    title
                }
                answer
            }
        }
    `
}

export async function POST({ request }){
    const requestData = await request.json()
    const errors = []

    // Check request data
    if (!requestData.answer || typeof requestData.answer !== 'string') {
        errors.push({ field: 'answer', message: 'answer should exist and have a string value' })
    }

    if (errors.length > 0){
        return new Response(
            JSON.stringify({
                errors: errors,
            }),
            { status: 400 }
        )
    }

    // Mutation for adding fact
    const mutation = gql`
        mutation createFact($answer: String!, $question: ID!, $reference: ID){
            createFact(
                data: {
                    answer: $answer,
                    question: {
                        connect: {
                            id: $question
                        }
                    },
                    reference: {
                        connect: {
                            Player: {
                                id: $reference
                            }
                        }
                    }
                }
            ){
                id
            }
        }
    `

    // Mutation for publication
    const publication = gql`
        mutation publishFact($id: ID!){
            publishFact(where: { id: $id }, to: PUBLISHED){
                id
            }
            publishManyPlayersConnection(to: PUBLISHED){
                edges{
                    node{
                        id
                    }
                }
            }
        }
    `

    // Execute mutation
    const data = await hygraph
        .request(mutation, {...requestData})
        .then((data) => {
            return (
                // Execute publication
                hygraph.request(publication, { id: data.createFact.id ?? null })
                // Catch error if publication fails
                .catch((error) => {
                    errors.push({ field: 'HyGraph', message: error})
                })
            )
        })
        // Catch error if mutation fails
        .catch((error) => {
            errors.push({ field: 'HyGraph', message: error})
        })

    // Check error length
    if (errors.length > 0) {
        return new Response(
            JSON.stringify({ 
                errors: errors, 
            }),
            { status: 400}
        )
    }

    return new Response(
        JSON.stringify({
            data: data && data.publishFact,
        }),
        responseInit
    )
}