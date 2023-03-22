import { hygraphOnSteroids } from '$lib/server/hygraph'
import { gql } from 'graphql-request'
import { responseInit } from '$lib/server/responseInit'

export async function GET({ url }) {
  const first = Number(url.searchParams.get('first') ?? 5)
  const skip = Number(url.searchParams.get('skip') ?? 0)
  const direction = url.searchParams.get('direction') === 'ASC' ? 'ASC' : 'DESC'
  const orderBy = (url.searchParams.get('orderBy') ?? 'publishedAt') + '_' + direction
  const query = queryGetQuestions()
  const data = await hygraphOnSteroids.request(query, { first, skip, orderBy })

  return new Response(JSON.stringify(data), responseInit)
}

function queryGetQuestions() {
  return gql`
    query getQuestions($first: Int, $skip: Int, $orderBy: QuestionOrderByInput) {
      questions(first: $first, skip: $skip, orderBy: $orderBy) {
        id
        title
        answers {
            content
        }
      }
      questionsConnection {
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
  `
}