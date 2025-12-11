import { useState } from "react";
import { Form, Input, Button, InputNumber, Select, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../api/courses";

export default function AddCourse() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => {
        try {
            setLoading(true);
            addCourse(values);
            message.success("Thêm khóa học thành công!");
            navigate("/courses");
        } catch (e) {
            message.error("Có lỗi xảy ra khi thêm khóa học");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Add New Course" style={{ maxWidth: 700, margin: "0 auto" }}>
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                initialValues={{
                    name: "",
                    category: "",
                    level: "Beginner",
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Tên không được để trống" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: "Category không được để trống" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="level"
                    label="Level"
                    rules={[{ required: true, message: "Level không được để trống" }]}
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
                        { required: true, message: "Không được để trống" },
                        { type: "number", min: 1, message: "Phải lớn hơn 0" }
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

                {/* -------------------- NÚT EXIT + SAVE -------------------- */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                    <Button danger onClick={() => navigate("/courses")}>
                        Exit
                    </Button>

                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add Course
                    </Button>
                </div>
            </Form>
        </Card>
    );
}
