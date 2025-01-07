"use client"

import React, { useState } from 'react'
import { Course } from '@prisma/client'

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: '', teacherId: '' })

//   useEffect(() => {
//     fetchCourses()
//   }, [])

  const fetchCourses = async () => {
    const response = await fetch('/api/courses')
    const data = await response.json()
    setCourses(data)
  }

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    })
    if (response.ok) {
      fetchCourses()
      setNewCourse({ title: '', description: '', category: '', teacherId: '' })
    }
  }

  const deleteCourse = async (id: string) => {
    const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' })
    if (response.ok) {
      fetchCourses()
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Management</h1>
      
      <form onSubmit={createCourse} className="mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newCourse.category}
          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={newCourse.teacherId}
          onChange={(e) => setNewCourse({ ...newCourse, teacherId: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Course</button>
      </form>

      <ul>
        {courses.map((course) => (
          <li key={course.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p>Category: {course.category}</p>
            <p>Teacher ID: {course.teacherId}</p>
            <button
              onClick={() => deleteCourse(course.id)}
              className="bg-red-500 text-white p-2 rounded mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CourseManagement