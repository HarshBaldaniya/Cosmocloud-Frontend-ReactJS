import "./App.css";
import { Button, Card, Form, Input, Typography, Select, message } from "antd";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const [form] = Form.useForm();
  const [showAddSubButtons, setShowAddSubButtons] = useState([false]);
  const [formDataJson, setFormDataJson] = useState("");

  const handleChange = (value, field, index) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ [field]: value });

    const updatedButtons = [...showAddSubButtons];
    updatedButtons[index] = value === "Nested";
    setShowAddSubButtons(updatedButtons);

    localStorage.setItem("showAddSubButtons", JSON.stringify(updatedButtons));
  };

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      const formDataJson = JSON.stringify(formData, null, 2);
      setFormDataJson(formDataJson); 

      Cookies.set("formData", formDataJson, { expires: 1 }); 

      message.success("Form data saved successfully!");
    } catch (error) {
      console.error("Form validation failed:", error);
      message.error("Failed to save form data. Please try again later.");
    }
  };

  const handleDownload = () => {
    if (formDataJson) {
      const blob = new Blob([formDataJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      message.error("Save the form data first.");
    }
  };

  useEffect(() => {
    const savedFormData = Cookies.get("formData");
    const savedButtonsData = localStorage.getItem("showAddSubButtons");

    if (savedFormData) {
      try {
        const parsedFormData = JSON.parse(savedFormData);
        form.setFieldsValue(parsedFormData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }

    if (savedButtonsData) {
      try {
        const parsedButtonsData = JSON.parse(savedButtonsData);
        setShowAddSubButtons(parsedButtonsData);
      } catch (error) {
        console.error("Error parsing saved button data:", error);
      }
    }
  }, [form]);

  const handleReset = () => {
    form.resetFields();
    Cookies.remove("formData");
    localStorage.removeItem("showAddSubButtons");
    message.success("Form data cleared successfully!");
  };

  const renderFormItem = (field, index) => (
    <Card size="small" key={field.key}>
      <div className="inputpart">
        <Form.Item
          label="Name"
          name={[field.name, "name"]}
          className="partofinput"
          rules={[
            {
              required: true,
              message: "Missing field name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          className="partofinput"
          name={[field.name, "category"]}
          rules={[
            {
              required: true,
              message: "Missing category",
            },
          ]}
        >
          <Select
            defaultValue="Select"
            onChange={(value) =>
              handleChange(value, [field.name, "category"], index)
            }
            options={[
              {
                value: "String",
                label: "String",
              },
              {
                value: "Number",
                label: "Number",
              },
              {
                value: "Nested",
                label: "Nested",
              },
            ]}
          />
        </Form.Item>
      </div>

      {form.getFieldValue(["items", field.name, "category"]) === "Nested" && (
        <Form.List name={[field.name, "list"]} initialValue={[]}>
          {(subFields, subOpt) => (
            <div
              id="mainpart"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {subFields.map((subField) => renderFormItem(subField, index + 1))}
              {showAddSubButtons[index] && (
                <Button type="dashed" onClick={() => subOpt.add()} block>
                  + Add Sub Item
                </Button>
              )}
            </div>
          )}
        </Form.List>
      )}
    </Card>
  );

  return (
    <div>
      <div className="titlename">
        <h1>Welcome to Reactjs Frontend Task</h1>
      </div>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
      >
        <Form.List name="items">
          {(fields, { add }) => (
            <div
              className="mainpart"
              style={{
                display: "flex",
                // rowGap: 16,
                flexDirection: "column",
                width: "60%",
              }}
            >
              {fields.map((field, index) => renderFormItem(field, index))}
              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography className="typopart">
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleSubmit} className="btnpartsmain">
        Save Form Data
      </Button>
      <Button type="danger" onClick={handleReset} lassName="btnpartsmain">
        Reset Form
      </Button>
      <Button type="primary" onClick={handleDownload} className="btnpartsmain">
        Download JSON
      </Button>
    </div>
  );
}

export default App;
