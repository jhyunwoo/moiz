import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useRanking(quizId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    result: string
    data: {
      id: string
      point: number
      userId: string | null
      quizId: string
      User: {
        nickname: string
      }
    }[]
  }>(`/api/ranking?quizId=${quizId}`, fetcher, { refreshInterval: 1000 })

  return {
    ranking: data?.data,
    rankingLoading: isLoading,
    rankingError: error,
    rankingMutate: mutate,
  }
}
