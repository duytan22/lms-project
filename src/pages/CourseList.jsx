import React, { useEffect, useMemo, useState } from 'react'
import { Table, Input, Select, Button, Space, Popconfirm, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getCourses, deleteCourse } from '../api/courses'
import styles from './CourseList.module.css'
import { LEVELS, PAGE_SIZE } from '../constants/course'

const { Search } = Input

const CourseList = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState(null)
  const [filterLevel, setFilterLevel] = useState(null)

  // =========================
  // LOAD DATA (AXIOS STYLE)
  // =========================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await getCourses()
        setCourses(data)
      } catch (e) {
        message.error('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Category lấy từ data
  const categories = useMemo(
    () => [...new Set(courses.map(c => c.category))],
    [courses]
  )

  // Filter logic
  const filtered = useMemo(() => {
    return courses.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filterCategory && c.category !== filterCategory) return false
      if (filterLevel && c.level !== filterLevel) return false
      return true
    })
  }, [courses, search, filterCategory, filterLevel])

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteCourse(id)
      setCourses(prev => prev.filter(i => i.id !== id))
      message.success('Deleted')
    } catch (e) {
      message.error('Delete failed')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Level', dataIndex: 'level', key: 'level' },
    { title: 'Lessons', dataIndex: 'numberOfLesson', key: 'numberOfLesson' },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (t) => <img src={t} alt="thumb" className={styles.thumbnail} />
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, row) => (
        <Space>
          <Button onClick={() => navigate(`/courses/edit/${row.id}`)}>Edit</Button>
          <Popconfirm
            title="Delete course?"
            onConfirm={() => handleDelete(row.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Search
            placeholder="Search by name"
            allowClear
            onSearch={setSearch}
            className={styles.search}
          />

          <Select
            placeholder="Category"
            allowClear
            value={filterCategory}
            onChange={setFilterCategory}
            className={styles.select}
          >
            {categories.map(c => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Level"
            allowClear
            value={filterLevel}
            onChange={setFilterLevel}
            className={styles.select}
          >
            {LEVELS.map(level => (
              <Select.Option key={level} value={level}>
                {level}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Button type="primary" onClick={() => navigate('/courses/add')}>
          Add Course
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: PAGE_SIZE }}
      />
    </div>
  )
}

export default CourseList
