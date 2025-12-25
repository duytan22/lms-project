import { useState } from "react"
import { Form, Input, Button, InputNumber, Select, Card, message } from "antd"
import { useNavigate } from "react-router-dom"
import { addCourse } from "../api/courses"

const AddCourse = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    try {
      setLoading(true)
      addCourse(values)
      message.success("Course added successfully!")

      navigate("/courses")
    } catch (e) {
      message.error("Failed to add course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Add New Course" style={{ maxWidth: 700, margin: "0 auto" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          level: "Beginner"
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="level"
          label="Level"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Beginner">Beginner</Select.Option>
            <Select.Option value="Intermediate">Intermediate</Select.Option>
            <Select.Option value="Advanced">Advanced</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="numberOfLesson"
          label="Number of Lessons"
          rules={[
            { required: true, message: "Required" },
            { type: "number", min: 1, message: "Must be greater than 0" }
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="thumbnail" label="Thumbnail URL">
          <Input />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button danger onClick={() => navigate("/courses")}>
            Exit
          </Button>

          <Button type="primary" htmlType="submit" loading={loading}>
            Add Course
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default AddCourse
