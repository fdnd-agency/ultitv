import { hygraph, hygraphOnSteroids } from '$lib/server/hygraph'

import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
  const first = Number(url.searchParams.get('first') ?? 5)
  const skip = Number(url.searchParams.get('skip') ?? 0)
  const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
  const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
  const query = queryGetPlayers()
  const data = await hygraphOnSteroids.request(query, { first, skip, orderBy })

  return new Response(JSON.stringify(data), responseInit)
}

function queryGetPlayers() {
  return gql`
    query getPlayers($first: Int, $skip: Int, $orderBy: PlayerOrderByInput) {
      players(first: $first, skip: $skip, orderBy: $orderBy) {
        id
        name
        gender
        jerseyNumber
        image {
          height
          width
          original: url
          small: url(transformation: { image: { resize: { width: 500, fit: clip } } })
          originalAsWebP: url(transformation: { document: { output: { format: webp } } })
          smallAsWebP: url(transformation: { image: { resize: { width: 500, fit: clip } } document: { output: { format: webp } } })
        }
        team {
          name
        }
        answers {
          content
          question {
            title
          }
        }
      }
      playersConnection {
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `
}

export async function POST({ request }) {
  const requestData = await request.json()
  const errors = []

  // Controleer de request data op juistheid
  if (!requestData.name || typeof requestData.name !== 'string') {
    errors.push({ field: 'name', message: 'name should exist and have a string value' })
  }

  if (!requestData.answers || typeof requestData.answers !== 'object') {
    errors.push({ field: 'answers', message: 'answers should exist and have a string value' })
  }

  const answerList = requestData.answers.reduce((accumulator, answer) => {
    return accumulator + `{ content: "${answer.content}", question: { connect: { id: "${answer.questionId}"} } }\r\n`
  }, '')

  // Als we hier al errors hebben in de form data sturen we die terug
  if (errors.length > 0) {
    return new Response(
      JSON.stringify({
        errors: errors,
      }),
      { status: 400 }
    )
  }

  // Bereid de mutatie voor
  const mutation = gql`
    mutation createPlayer($name: String!, $gender: String, $jerseyNumber: String) {
      createPlayer(
        data: {
          name: $name
          gender: $gender
          jerseyNumber: $jerseyNumber
          answers: {
            create: [
              ${answerList}
            ]
          }
        }
      ) {
        id
      }
    }
  `
  // Bereid publiceren voor
  const publication = gql`
    mutation publishPlayer($id: ID!) {
      publishPlayer(where: { id: $id }, to: PUBLISHED) {
        id
      }
      publishManyAnswersConnection(to: PUBLISHED, from: DRAFT) {
        edges {
          node {
            id
          }
        }
      }
    }
  `

  // Voer de mutatie uit
  const data = await hygraph
    .request(mutation, { ...requestData })
    // Stuur de response met created id door
    .then((data) => {
      return (
        hygraph
          // Voer de publicatie uit met created id
          .request(publication, { id: data.createPlayer.id ?? null })
          // Vang fouten af bij het publiceren
          .catch((error) => {
            errors.push({ field: 'HyGraph', message: error })
          })
      )
    })
    // Vang fouten af bij de mutatie
    .catch((error) => {
      errors.push({ field: 'HyGraph', message: error })
    })

  if (errors.length > 0) {
    return new Response(
      JSON.stringify({
        errors: errors,
      }),
      { status: 400 }
    )
  }

  return new Response(
    JSON.stringify({
      data: data && data.publishPlayer,
    }),
    responseInit
  )
}
