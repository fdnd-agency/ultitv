import { hygraph2, hygraphOnSteroids2 } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 50)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    // Game id
    const id = Number(url.searchParams.get('id')) || null
    const query = queryGetStats(id)
    const data = await hygraphOnSteroids2.request(query, { first, skip, id })

    return new Response(JSON.stringify(data), responseInit)
}

function queryGetStats(id){
    // If id is not null, return game stats with id
    if (id !== null) {
        return gql`
            query getStats($first: Int, $skip: Int, $id: Int){
                stats(first: $first, skip: $skip, where: {game: {gameId: $id}}){
                    id
                    game {
                        gameId
                    }
                    point (first: 500){
                        turnovers
                        startedOnOffence {
                            name
                        }
                        startedOnDefence {
                            name
                        }
                        scored {
                            name
                        }
                        team1Score
                        team2Score
                        passes {
                            id
                        }
                        blockPlayers {
                            id
                        }
                        turnoverPlayers {
                            id
                        }
                        lastPointInHalf
                        scoredBy {
                            id
                            name
                        }
                        assistBy {
                            id
                            name
                        }
                        team1Class
                        team1OorD
                        team1Turnovers
                        team2Class
                        team2OorD
                        team2Turnovers
                    }
                }
            }
        `
    }
    // If id is null, return all game stats
    else{
        return gql`
            query getStats($first: Int, $skip: Int){
                stats(first: $first, skip: $skip){
                    id
                    game {
                        gameId
                    }
                    point (first: 500){
                        turnovers
                        startedOnOffence {
                            name
                        }
                        startedOnDefence {
                            name
                        }
                        scored {
                            name
                        }
                        team1Score
                        team2Score
                        passes {
                            id
                        }
                        blockPlayers {
                            id
                        }
                        turnoverPlayers {
                            id
                        }
                        lastPointInHalf
                        scoredBy {
                            id
                            name
                        }
                        assistBy {
                            id
                            name
                        }
                        team1Class
                        team1OorD
                        team1Turnovers
                        team2Class
                        team2OorD
                        team2Turnovers
                    }
                }
            }
        `
    }

}

// Post for a new point
export async function POST({ request }) {
    const requestData = await request.json()
    const errors = []

    // Check request data
    if (!requestData.startedOnOffence || typeof requestData.startedOnOffence !== 'id') {
        errors.push({ field: 'startedOnOffence', message: 'startedOnOffence should exist and have an id value' })
    }

    if (!requestData.startedOnDefence || typeof requestData.startedOnDefence !== 'id') {
        errors.push({ field: 'startedOnDefence', message: 'startedOnDefence should exist and have an id value' })
    }

    if (!requestData.scored || typeof requestData.scored !== 'id') {
        errors.push({ field: 'scored', message: 'scored should exist and have an id value' })
    }

    if (!requestData.scoredBy || typeof requestData.scoredBy !== 'id') {
        errors.push({ field: 'scoredBy', message: 'scoredBy should exist and have an id value' })
    }

    if (!requestData.assistBy || typeof requestData.assistBy !== 'id') {
        errors.push({ field: 'assistBy', message: 'assistBy should exist and have an id value' })
    }

    if (!requestData.team1Class || typeof requestData.team1Class !== 'string') {
        errors.push({ field: 'team1Class', message: 'team1Class should exist and have a string value' })
    }

    if (!requestData.team1OorD || typeof requestData.team1OorD !== 'string') {
        errors.push({ field: 'team1OorD', message: 'team1OorD should exist and have a string value' })
    }

    if (!requestData.team2Class || typeof requestData.team2Class !== 'string') {
        errors.push({ field: 'team2Class', message: 'team2Class should exist and have a string value' })
    }

    if (!requestData.team2OorD || typeof requestData.team2OorD !== 'string') {
        errors.push({ field: 'team2OorD', message: 'team2OorD should exist and have a string value' })
    }

    if (!requestData.stat || typeof requestData.stat !== 'id') {
        errors.push({ field: 'stat', message: 'stat should exist and have an id value' })
    }

    if (!requestData.team1Score || typeof requestData.team1Score !== 'number') {
        errors.push({ field: 'team1Score', message: 'team1Score should exist and have a number value' })
    }

    if (!requestData.team2Score || typeof requestData.team2Score !== 'number') {
        errors.push({ field: 'team2Score', message: 'team2Score should exist and have a number value' })
    }

    // Mutation query for adding a point
    const pointMutation = gql`
        mutation createPoint($turnovers: Int, $startedOnOffence: ID!, $startedOnDefence: ID!, $scored: ID!, $team1Score: Int!, $team2Score: Int!, $passes: [PlayerWhereUniqueInput!], $blockPlayers: [PlayerWhereUniqueInput!], $turnoverPlayers: [PlayerWhereUniqueInput!], $lastPointInHalf: Boolean, $scoredBy: ID!, $assistBy: ID!, $team1Class: Class!, $team1OorD: Side!, $team1Turnovers: Int, $team2Class: Class!, $team2OorD: Side!, $team2Turnovers: Int, $stat: ID!){
            createPoint(
                data: {
                    turnovers: $turnovers
                    startedOnOffence: { connect: { id: $startedOnOffence } }
                    startedOnDefence: { connect: { id: $startedOnDefence } }
                    scored: { connect: { id: $scored } }
                    team1Score: $team1Score
                    team2Score: $team2Score
                    passes: { connect: $passes }
                    blockPlayers: { connect: $blockPlayers }
                    turnoverPlayers: { connect: $turnoverPlayers }
                    lastPointInHalf: $lastPointInHalf
                    scoredBy: { connect: { id: $scoredBy } }
                    assistBy: { connect: { id: $assistBy } }
                    team1Class: $team1Class
                    team1OorD: $team1OorD
                    team1Turnovers: $team1Turnovers
                    team2Class: $team2Class
                    team2OorD: $team2OorD
                    team2Turnovers: $team2Turnovers
                    stat: { connect: { id: $stat } }
                }
            ){
                id
            }
        }
    `

    // Publish Point and publish stats connection

    // Point publication
    const pointPublication = gql`
        mutation publishPoint($id: ID!){
            publishPoint(where: {id: $id}, to: PUBLISHED){
                id
            }
            publishManyStatsConnection(to: PUBLISHED){
                edges{
                    node{
                        id
                    }
                }
            }
        }
    `

    // Execute point mutation
    const data = await hygraph2
    .request(pointMutation, {...requestData})
    .then((data) => {
        return (
            // Execute point publication
            hygraph2.request(pointPublication, {id: data.createPoint.id ?? null })
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
            data: data && data.publishPoint,
        }),
        responseInit
    )
}