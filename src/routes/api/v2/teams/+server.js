import { hygraph2, hygraphOnSteroids2 } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
    const first = Number(url.searchParams.get('first') ?? 5)
    const skip = Number(url.searchParams.get('skip') ?? 0)
    const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
    const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
    // Team id
    const id = url.searchParams.get('id') || null
    const query = queryGetTeams(id)
    const data = await hygraphOnSteroids2.request(query, { first, skip, id, orderBy })

    return new Response(JSON.stringify(data), responseInit)
}

function queryGetTeams(id){
    // If id is not null, return team with id
    if (id !== null) {
        return gql`
            query getTeams($first: Int, $skip: Int, $id: ID, $orderBy: TeamOrderByInput){
                teams(first: $first, skip: $skip, where: { id: $id }, orderBy: $orderBy){
                    id
                    name
                    country
                    seeding
                    iso2
                    iso3
                    olympicCode
                    players {
                        id
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
    // If id is null, return all teams
    else{
        return gql`
            query getTeams($first: Int, $skip: Int, $orderBy: TeamOrderByInput){
                teams(first: $first, skip: $skip, orderBy: $orderBy){
                    id
                    name
                    country
                    seeding
                    iso2
                    iso3
                    olympicCode
                    players {
                        id
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
}

export async function POST({ request }){
    const requestData = await request.json()
    const errors = []

    // Check request data
    if (!requestData.name || typeof requestData.name !== 'string') {
        errors.push({ field: 'name', message: 'name should exist and have a string value' })
    }

    if (!requestData.country || typeof requestData.country !== 'string') {
        errors.push({ field: 'country', message: 'country should exist and have a string value' })
    }

    if (!requestData.seeding || typeof requestData.seeding !== 'number') {
        errors.push({ field: 'seeding', message: 'seeding should exist and have a number value' })
    }

    if (errors.length > 0){
        return new Response(
            JSON.stringify({
                errors: errors,
            }),
            { status: 400 }
        )
    }

    // Mutation query for adding team
    const mutation = gql`
        mutation createTeam($name: String!, $country: String!, $seeding: Int!, $iso2: String, $iso3: String, $olympicCode: String){
            createTeam(
                data: {
                    name: $name
                    country: $country
                    seeding: $seeding
                    iso2: $iso2
                    iso3: $iso3
                    olympicCode: $olympicCode
                }
            ){
                id
            }
        }
    `

    // Mutation for publication
    const publication = gql`
        mutation publishTeam($id: ID!){
            publishTeam(where: { id: $id }, to: PUBLISHED){
                id
            }
        }
    `

    // Execute mutation
    const data = await hygraph2
        .request(mutation, {...requestData})
        .then((data) => {
            return (
                // Execute publication
                hygraph2.request(publication, { id: data.createTeam.id ?? null })
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
            data: data && data.publishTeam,
        }),
        responseInit
    )
}