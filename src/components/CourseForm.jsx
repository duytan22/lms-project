import React, { useEffect } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";

const { TextArea } = Input;

export default function CourseForm({ initialValues = {}, onSubmit, loading }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => onSubmit(values)}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please input category" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="level"
        label="Level"
        rules={[{ required: true, message: "Please select level" }]}
      >
        <Select>
          <Select.Option value="Beginner">Beginner</Select.Option>
          <Select.Option value="Intermediate">Intermediate</Select.Option>
          <Select.Option value="Advanced">Advanced</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="lessons"
        label="Number of lessons"
        rules={[{ required: true, message: "Please enter number of lessons" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="thumbnail" label="Thumbnail URL">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
