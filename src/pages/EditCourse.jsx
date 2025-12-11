import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, InputNumber, Select, Card, message } from "antd";
import { getCourseById, updateCourse } from "../api/courses";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const course = getCourseById(id);

        if (!course) {
            message.error("Không tìm thấy khóa học");
            navigate("/courses");
            return;
        }

        form.setFieldsValue(course);
    }, [id]);

    const handleSubmit = (values) => {
        try {
            setLoading(true);
            updateCourse(id, values);
            message.success("Cập nhật thành công!");
            navigate("/courses");
        } catch (e) {
            message.error("Có lỗi xảy ra khi cập nhật");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Edit Course" style={{ maxWidth: 700, margin: "0 auto" }}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>

                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Tên không được để trống" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="category" label="Category" rules={[{ required: true, message: "Category không được để trống" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="level" label="Level" rules={[{ required: true, message: "Level không được để trống" }]}>
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

                <Form.Item name="thumbnail" label="Thumbnail">
                    <Input />
                </Form.Item>

                {/* -------------------- NÚT EXIT + SAVE -------------------- */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                    <Button danger onClick={() => navigate("/courses")}>
                        Exit
                    </Button>

                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                </div>
            </Form>
        </Card>
    );
}
