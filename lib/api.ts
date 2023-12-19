/** url로 GET 요청 받은 다음 오류가 없을 경우 json 형텨로 데이터 반환 */
export async function api<T>(
  url: string,
  init?: RequestInit,
  errorCallback?: () => void
): Promise<T> {
  return fetch(url, init).then((response) => {
    if (!response.ok)
      if (errorCallback) {
        errorCallback()
      } else {
        throw new Error(response.statusText)
      }
    return response.json() as Promise<T>
  })
}
