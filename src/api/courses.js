import axiosClient from './axiosClient'

const STORAGE_KEY = 'lms_courses_v1'

const sample = [
  {
    id: '1',
    name: 'Intro to Networking',
    category: 'Networking',
    level: 'Beginner',
    numberOfLesson: 12,
    description: 'Basic networking concepts',
    thumbnail: 'https://via.placeholder.com/120'
  }
]

// ==========================
// FAKE BACKEND USING LOCALSTORAGE
// ==========================
const getLocalCourses = () => {
  const r = localStorage.getItem(STORAGE_KEY)
  if (!r) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
    return sample
  }
  return JSON.parse(r)
}

const saveLocalCourses = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

// ==========================
// API FUNCTIONS (AXIOS STYLE)
// ==========================

export const getCourses = async () => {
  // fake axios call
  await axiosClient.get('/courses')
  return getLocalCourses()
}

export const getCourseById = async (id) => {
  await axiosClient.get(`/courses/${id}`)
  const list = getLocalCourses()
  return list.find(i => i.id === id)
}

export const addCourse = async (course) => {
  await axiosClient.post('/courses', course)

  const list = getLocalCourses()
  const id = Date.now().toString()
  const newCourse = { ...course, id }

  list.unshift(newCourse)
  saveLocalCourses(list)

  return newCourse
}

export const updateCourse = async (id, payload) => {
  await axiosClient.put(`/courses/${id}`, payload)

  const list = getLocalCourses()
  const idx = list.findIndex(i => i.id === id)

  if (idx === -1) throw new Error('Not found')

  list[idx] = { ...list[idx], ...payload }
  saveLocalCourses(list)

  return list[idx]
}

export const deleteCourse = async (id) => {
  await axiosClient.delete(`/courses/${id}`)

  const list = getLocalCourses()
  const next = list.filter(i => i.id !== id)
  saveLocalCourses(next)
}
