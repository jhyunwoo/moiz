import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useQuizPoint(quizId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    result: string
    data: { point: number }
  }>(`/api/point?quizId=${quizId}`, fetcher, { refreshInterval: 1000 })

  return {
    quizPoint: data?.data.point,
    quizPointLoading: isLoading,
    quizPointError: error,
    quizPointMutate: mutate,
  }
}
