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

export async function POST({ request }) {
    const requestData = await request.json()

    console.log(requestData)

    // Mutation query for adding a player
    const mutation = gql`
        mutation createPlayer(
            $name: String!, 
            $jerseyNumber: Int!, 
            $gender: Gender, 
            $height: Int, 
            $pronounced: String, 
            $pronouns: String, 
            $team: TeamWhereUniqueInput!
        ){
            createPlayer(
                data: {
                    name: $name
                    jerseyNumber: $jerseyNumber
                    height: $height
                    pronounced: $pronounced
                    pronouns: $pronouns
                    gender: $gender
                    team: {
                        connect: {
                            id: $team
                        }
                    }
                }
            )
        }
    `

    // Mutation for publication
    const publication = gql`
        mutation publishPlayer($id: ID!){
            publishPlayer(where: { id: $id }, to: PUBLISHED){
                id
            }
            publishTeam(to: PUBLISHED, from: DRAFT){
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
                hygraph.request(publication, { id: data.createPlayer.id ?? null })
                // Catch error if publication fails
                .catch((error) => {
                    error.push({ field: 'HyGraph', message: error})
                })
            )
        })
        // Catch error if mutation fails
        .catch((error) => {
            error.push({ field: 'HyGraph', message: error})
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
            data: data && data.publishPlayer,
        }),
        responseInit
    )
}

