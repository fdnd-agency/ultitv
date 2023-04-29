import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    // Game id
    const id = Number(url.searchParams.get('id')) || null
    const query = queryGetGames(id)
    const data = await hygraphOnSteroids.request(query, { first, skip, id })
    
    return new Response(JSON.stringify(data), responseInit)
}

function queryGetGames(id){
    // If id is not null, return game with id
    if (id !== null) {
        return gql`
            query getGames($first: Int, $skip: Int, $id: Int){
                games(first: $first, skip: $skip, where: { gameId: $id }){
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
    // If id is null, return all games
    else{
        return gql`
            query getGames($first: Int, $skip: Int){
                games(first: $first, skip: $skip){
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
    
}