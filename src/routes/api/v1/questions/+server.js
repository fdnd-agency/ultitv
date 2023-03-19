import { gql } from 'graphql-request'
import { hygraph } from '$lib/server/hygraph'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
  let id = url.searchParams.get('id') ?? ''
  
  const query = gql`
    query getQuestions($id: ID!) {
      questions(where: { player: { id: $id } }) {
        id
        title
        answer
        player {
          id
        }
      }
    }
  `

  const data = await hygraph.request(query, { id })
  return new Response(JSON.stringify(data), responseInit)
}

export async function POST({ request }) {
  const requestData = await request.json()
  let errors = []

  console.log(requestData)

  // Controleer de request data op juistheid
  if (!requestData.title || typeof requestData.title !== 'string') {
    errors.push({ field: 'title', message: 'title should exist and have a string value' })
  }
  if (!requestData.answer || typeof requestData.answer !== 'string') {
    errors.push({ field: 'answer', message: 'answer should exist and have a string value' })
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
    mutation createQuestion($title: String!, $answer: String!, $playerId: ID!) {
      createQuestion(data: { title: $title, answer: $answer, player: { connect: { id: $playerId } } }) {
        id
      }
    }
  `
  // Bereid publiceren voor
  const publication = gql`
    mutation publishQuestions($id: ID!) {
      publishQuestion(where: { id: $id }, to: PUBLISHED) {
        id
      }
    }
  `

  // Voer de mutatie uit
  const data = await hygraph
    .request(mutation, { ...requestData })
    // Stuur de response met created id door
    .then((data) => {
      console.log(data)
      return (
        hygraph
          // Voer de publicatie uit met created id
          .request(publication, { id: data.createQuestion.id ?? null })
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

