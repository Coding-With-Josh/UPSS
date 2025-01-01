import { useGetAll, useCreate, useUpdate, useDelete, useGetOne } from './useApiHooks'
import { Student, Course, Task } from '@prisma/client'

// Student hooks
export const useStudents = () => useGetAll<Student>('students')
export const useCreateStudent = () => useCreate<Student>('students')
export const useUpdateStudent = () => useUpdate<Student>('students')
export const useDeleteStudent = () => useDelete('students')
export const useGetStudent = () => useGetOne<Student>('students')

// Course hooks
export const useCourses = () => useGetAll<Course>('courses')
export const useCreateCourse = () => useCreate<Course>('courses')
export const useUpdateCourse = () => useUpdate<Course>('courses')
export const useDeleteCourse = () => useDelete('courses')
export const useGetCourse = () => useGetOne<Course>('courses')

// Task hooks
export const useTasks = () => useGetAll<Task>('tasks')
export const useCreateTask = () => useCreate<Task>('tasks')
export const useUpdateTask = () => useUpdate<Task>('tasks')
export const useDeleteTask = () => useDelete('tasks')
export const useGetTask = () => useGetOne<Task>('tasks')