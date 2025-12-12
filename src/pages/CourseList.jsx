import React, { useEffect, useMemo, useState } from 'react'
import { Table, Input, Select, Button, Space, Popconfirm, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { loadCourses, deleteCourse, saveCourses } from '../api/courses'


const { Search } = Input


export default function CourseList() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [filterCategory, setFilterCategory] = useState(null)
    const [filterLevel, setFilterLevel] = useState(null)


useEffect(() => {
    setLoading(true)
    const data = loadCourses()
    setCourses(data)
    setLoading(false)
}, [])


const categories = useMemo(() => [...new Set(courses.map(c => c.category))], [courses])
const levels = useMemo(() => [...new Set(courses.map(c => c.level))], [courses])


const filtered = courses.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCategory && c.category !== filterCategory) return false
    if (filterLevel && c.level !== filterLevel) return false
    return true

}
)
console.log("Search Term:", search);
console.log("Courses:", courses);
console.log("Filtered:", filtered);


const handleDelete = (id) => {
    deleteCourse(id)
const next = courses.filter(i => i.id !== id)
    setCourses(next)
message.success('Deleted')
}
const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a,b)=>a.name.localeCompare(b.name) },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Level', dataIndex: 'level', key: 'level' },
    { title: 'Lessons', dataIndex: 'numberOfLesson', key: 'numberOfLesson' },
    { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: 'Thumbnail', dataIndex: 'thumbnail', key: 'thumbnail', render: (t) => <img src={t} alt="t" style={{width:80}} /> },
    {
title: 'Actions', key: 'actions', render: (_, row) => (
    <Space>
        <Button onClick={() => navigate(`/courses/edit/${row.id}`)}>Edit</Button>
            < Popconfirm title="Delete?" onConfirm={() => handleDelete(row.id)}>
        <Button danger>Delete</Button>
            </Popconfirm>
    </Space>
        )
    }   
]


return (
<div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8}}>
            <Search placeholder="Search by name" onSearch={(v)=>setSearch(v)} allowClear style={{width:240}} />


            <Select placeholder="Category" allowClear style={{width:160}} onChange={v=>setFilterCategory(v)} value={filterCategory}>
                    {categories.map(c=> <Select.Option key={c} value={c}>{c}</Select.Option>)}
            </Select>


            <Select placeholder="Level" allowClear style={{width:160}} onChange={v=>setFilterLevel(v)} value={filterLevel}>
                    {levels.map(l=> <Select.Option key={l} value={l}>{l}</Select.Option>)}
            </Select>
    </div>


    <div>
            <Button type="primary" onClick={()=>navigate('/courses/add')}>Add Course</Button>
    </div>
</div>


        <Table
            columns={columns}
            dataSource={filtered}
            loading={loading}
            rowKey={(r)=>r.id}
            pagination={{ pageSize: 10 }}
        />
</div>
    )
}