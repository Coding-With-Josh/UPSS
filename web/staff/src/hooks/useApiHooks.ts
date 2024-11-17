import { useState, useCallback } from 'react'
import axios from 'axios'

// Generic type for API response
type ApiResponse<T> = {
  data: T
  error: string | null
}

// Generic hook for fetching all items
export function useGetAll<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get<ApiResponse<T[]>>(`/api/${endpoint}`)
      setData(response.data.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { data, loading, error, fetchData }
}

// Generic hook for creating an item
export function useCreate<T>(endpoint: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createItem = useCallback(async (item: Partial<T>) => {
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse<T>>(`/api/${endpoint}`, item)
      setError(null)
      return response.data.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { createItem, loading, error }
}

// Generic hook for updating an item
export function useUpdate<T>(endpoint: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateItem = useCallback(async (id: string, item: Partial<T>) => {
    setLoading(true)
    try {
      const response = await axios.put<ApiResponse<T>>(`/api/${endpoint}/${id}`, item)
      setError(null)
      return response.data.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { updateItem, loading, error }
}

// Generic hook for deleting an item
export function useDelete(endpoint: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteItem = useCallback(async (id: string) => {
    setLoading(true)
    try {
      await axios.delete(`/api/${endpoint}/${id}`)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { deleteItem, loading, error }
}

// Generic hook for finding a unique item
export function useGetOne<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOne = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const response = await axios.get<ApiResponse<T>>(`/api/${endpoint}/${id}`)
      setData(response.data.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  return { data, loading, error, fetchOne }
}