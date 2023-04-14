import axios, { AxiosError } from 'axios'
import { DependencyList, useEffect, useState } from 'react'

export const useFetch = (path: string) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<null | AxiosError>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [lastRequest, setLastRequest] = useState<number>(Date.now())

  const handleReload = () => {
    setLastRequest(Date.now())
  }

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/${path}`, {
          signal: abortController.signal,
        })
        setData(response.data)
        setLoaded(true)
      } catch (error) {
        const err = error as AxiosError
        if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
          setError(err)
          setLoaded(false)
        }
      }
    }
    fetchData()
    return () => {
      setData(null)
      setError(null)
      setLoaded(false)
      console.log('Unmount component')
      return abortController.abort()
    }
  }, [lastRequest])

  return { data, error, loaded, handleReload }
}
