"use client"

import { useState, useEffect, useCallback } from 'react'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type PrismaModels = {
  student: typeof prisma.student
  course: typeof prisma.course
  module: typeof prisma.module
  task: typeof prisma.task
  event: typeof prisma.event
}

type ModelName = keyof PrismaModels

// Helper type for inferring the return type of Prisma methods
type InferPrismaResult<T> = T extends (...args: any[]) => Promise<infer U> ? U : never

// Hook for fetching data
export function useFetch<T extends ModelName>(
  modelName: T,
  query: Prisma.Args<PrismaModels[T], 'findMany'> | undefined = undefined
) {
  type ResultType = InferPrismaResult<PrismaModels[T]['findMany']>
  const [data, setData] = useState<ResultType | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await (prisma[modelName] as any).findMany(query)
      setData(result)
      console.log("success")
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'))
      alert("Failure")
    } finally {
      setLoading(false)
    }
  }, [modelName, query])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Hook for creating data
export function useCreate<T extends ModelName>(modelName: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createItem = async (data: Prisma.Args<PrismaModels[T], 'create'>['data']) => {
    try {
      setLoading(true)
      const result = await (prisma[modelName] as any).create({ data })
      return result
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'))
      throw e
    } finally {
      setLoading(false)
    }
  }

  return { createItem, loading, error }
}

// Hook for updating data
export function useUpdate<T extends ModelName>(modelName: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateItem = async (
    id: string,
    data: Prisma.Args<PrismaModels[T], 'update'>['data']
  ) => {
    try {
      setLoading(true)
      const result = await (prisma[modelName] as any).update({
        where: { id },
        data,
      })
      return result
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'))
      throw e
    } finally {
      setLoading(false)
    }
  }

  return { updateItem, loading, error }
}

// Hook for deleting data
export function useDelete<T extends ModelName>(modelName: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const deleteItem = async (id: string) => {
    try {
      setLoading(true)
      const result = await (prisma[modelName] as any).delete({
        where: { id },
      })
      return result
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'))
      throw e
    } finally {
      setLoading(false)
    }
  }

  return { deleteItem, loading, error }
}

// Hook for fetching a single item
export function useFetchOne<T extends ModelName>(modelName: T, id: string) {
  type ResultType = InferPrismaResult<PrismaModels[T]['findUnique']>
  const [data, setData] = useState<ResultType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await (prisma[modelName] as any).findUnique({
        where: { id },
      })
      setData(result)
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'))
    } finally {
      setLoading(false)
    }
  }, [modelName, id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default {
  useFetch,
  useCreate,
  useUpdate,
  useDelete,
  useFetchOne,
}
