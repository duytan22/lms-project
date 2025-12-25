// src/api/courses.js

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
// LOCAL STORAGE HELPERS
// ==========================
const getLocalCourses = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
      return sample
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
      return sample
    }

    return parsed
  } catch (e) {
    console.error('loadCourses error:', e)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
    return sample
  }
}

const saveLocalCourses = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

// ==========================
// API FUNCTIONS (NO AXIOS CALL → NO CRASH)
// ==========================

export const getCourses = async () => {
  return getLocalCourses()
}

export const getCourseById = async (id) => {
  const list = getLocalCourses()
  return list.find(i => i.id === id)
}

export const addCourse = async (course) => {
  const list = getLocalCourses()
  const id = Date.now().toString()

  const newCourse = { ...course, id }
  list.unshift(newCourse)

  saveLocalCourses(list)
  return newCourse
}

export const updateCourse = async (id, payload) => {
  const list = getLocalCourses()
  const idx = list.findIndex(i => i.id === id)

  if (idx === -1) {
    throw new Error('Not found')
  }

  list[idx] = { ...list[idx], ...payload }
  saveLocalCourses(list)

  return list[idx]
}

export const deleteCourse = async (id) => {
  const list = getLocalCourses()
  const next = list.filter(i => i.id !== id)
  saveLocalCourses(next)
}
