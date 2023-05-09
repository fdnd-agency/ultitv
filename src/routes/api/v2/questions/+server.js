import { hygraph, hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
    const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
    // Question type
    const type = url.searchParams.get('type') || null
    const query = queryGetQuestions(type)
    const data = await hygraphOnSteroids.request(query, { first, skip, type, orderBy })
    
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetQuestions(type){

    // If type is not null, return questions with type
    if (type !== null) {
        return gql`
            query getQuestions($first: Int, $skip: Int, $type: QuestionType, $orderBy: QuestionOrderByInput){
                questions(first: $first, skip: $skip, where: { type: $type }, orderBy: $orderBy){
                    title
                    type
                }
            }
        `
    }
    // If type is null, return all questions
    else{
        return gql`
            query getQuestions($first: Int, $skip: Int, $orderBy: QuestionOrderByInput){
                questions(first: $first, skip: $skip, orderBy: $orderBy){
                    title
                    type
                }
            }
        `
    }
}

export async function POST({ request }) {
    const requestData = await request.json()
    const errors = []

    // Check request data
    if (!requestData.title || typeof requestData.title !== 'string') {
        errors.push({field: 'title', message: 'title should exist and have a string value'})
    }
        
    if (errors.length > 0){
        return new Response(
            JSON.stringify({
                errors: errors,
            }),
            { status: 400 }
        )
    }

    // Mutation query for adding a question
    const mutation = gql`
        mutation createQuestion($title: String!, $type: QuestionType){
            createQuestion(
                data: {
                    title: $title
                    type: $type
                }
            ){
                id
            }
        }
    `

    // Mutation for publication
    const publication = gql`
        mutation publishQuestion($id: ID!){
            publishQuestion(where: { id: $id }, to: PUBLISHED){
                id
            }
        }
    `

    // Execute mutation
    const data = await hygraph
        .request(mutation, {...requestData})
        .then((data) => {
            return (
                // Execute publication
                hygraph.request(publication, { id: data.createQuestion.id ?? null })
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
            data: data && data.publishQuestion,
        }),
        responseInit
    )
}