import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    // Player id
    const id = url.searchParams.get('id') || null
    const query = queryGetPlayers(id)
    const data = await hygraphOnSteroids.request(query, { first, skip, id })
    
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetPlayers(id){
    // If id is not null, return player with id
    if (id !== null) {
        return gql`
            query getPlayers($first: Int, $skip: Int, $id: ID){
                players(first: $first, skip: $skip, where: { id: $id }){
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
    // If id is null, return all players 
    else{
        return gql`
            query getPlayers($first: Int, $skip: Int){
                players(first: $first, skip: $skip){
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
}