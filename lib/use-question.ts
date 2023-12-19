import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useQuestion(quizId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    data: {
      question: string
      image?: string
      state: "OPEN" | "WATING" | "ANSWER"
      id: string
    }
    result: string
  }>(`/api/quiz?quizId=${quizId}`, fetcher, { refreshInterval: 1000 })

  return {
    question: data?.data,
    questionLoading: isLoading,
    questionError: error,
    questionMutate: mutate,
  }
}
