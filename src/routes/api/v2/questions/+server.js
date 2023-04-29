import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    // Question type
    const type = url.searchParams.get('type') || null
    const query = queryGetQuestions(type)
    const data = await hygraphOnSteroids.request(query, { first, skip, type })
    
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetQuestions(type){

    // If type is not null, return questions with type
    if (type !== null) {
        return gql`
            query getQuestions($first: Int, $skip: Int, $type: QuestionType){
                questions(first: $first, skip: $skip, where: { type: $type }){
                    title
                    type
                }
            }
        `
    }
    // If type is null, return all questions
    else{
        return gql`
            query getQuestions($first: Int, $skip: Int){
                questions(first: $first, skip: $skip){
                    title
                    type
                }
            }
        `
    }
}