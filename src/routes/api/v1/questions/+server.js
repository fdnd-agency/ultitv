import { gql } from 'graphql-request'
import { hygraph, hygraphOnSteroids } from '$lib/server/hygraph'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
  const id = url.searchParams.get('id') ?? ''
  const query = queryGetAnswers()
  const data = await hygraphOnSteroids.request(query, { id })
  
  return new Response(JSON.stringify(data), responseInit)
}

function queryGetAnswers() {
  return gql`
    query getAnswers($id: ID!) {
      answers(where: { player: { id: $id } }) {
        question {
          id
          title
        }
        content
        player {
          id
          name
        }
      }
    }
  `
}

export async function POST({ request }) {
  const requestData = await request.json()
  const errors = []

  // Controleer de request data op juistheid
  if (!requestData.questionTitle || typeof requestData.title !== 'string') {
    errors.push({ field: 'questionTitle', message: 'questionTitle should exist and have a string value' })
  }
  if (!requestData.content || typeof requestData.content !== 'string') {
    errors.push({ field: 'content', message: 'content should exist and have a string value' })
  }
  if (!requestData.playerId) {
    errors.push({ field: 'playerId', message: 'playerId should exist' })
  }
  

  // Als we hier al errors hebben in de form data sturen we die terug
  if (errors.length > 0) {
    return new Response(
      JSON.stringify({
        errors: errors,
      }),
      {status: 400}
    )
  }

  // Bereid de mutatie voor
  const mutation = gql`
    mutation createAswer($questionTitle: String!, $content: String!, $playerId: ID!) {
      createAnswer(data: { questionTitle: $questionTitle, answer: $content, player: { connect: { id: $playerId } } }) {
        id
      }
    }
  `
  // Bereid publiceren voor
  const publication = gql`
    mutation publishAnswers($id: ID!) {
      publishAnswer(where: { id: $id }, to: PUBLISHED) {
        id
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
          .request(publication, { id: data.createAnswer.id ?? null })
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
      {status: 400}
    )
  }

  return new Response(
    JSON.stringify({
      data: data && data.publishQuestion,
    }),
    responseInit
  )
}

