import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
    const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
    // Player id
    const id = url.searchParams.get('id') || null
    const query = queryGetPlayers(id)
    const data = await hygraphOnSteroids.request(query, { first, skip, id, orderBy })
    
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetPlayers(id){
    // If id is not null, return player with id
    if (id !== null) {
        return gql`
            query getPlayers($first: Int, $skip: Int, $id: ID, $orderBy: PlayerOrderByInput){
                players(first: $first, skip: $skip, where: { id: $id }, orderBy: $orderBy){
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
            query getPlayers($first: Int, $skip: Int, $orderBy: PlayerOrderByInput){
                players(first: $first, skip: $skip, orderBy: $orderBy){
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