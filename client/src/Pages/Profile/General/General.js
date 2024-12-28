import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../apicalls/users';
import { message, Form, Input, Radio, Button } from 'antd';
import { SetLoader } from '../../../Redux/lodersSlice';

const sexOptions = ['Male', 'Female'];

function General() {
  const { user } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm(); // Initialize the Ant Design Form instance
  const dispatch = useDispatch();
  const createdAtFromNow = moment(user.createdAt).fromNow();
  const updatedAtFromNow = moment(user.updatedAt).fromNow();

  const [isFormEdited, setIsFormEdited] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);

    form.setFieldsValue({
      name: user.name,
      email: user.email,
      contact: user.contact,
      address: user.address,
      age: user.age,
      sex: user.sex,
    });
  };

  const handleSave = async () => {
    try {
      await form.validateFields(); // Validate the form fields
      const values = form.getFieldsValue();

      if (values.contact && !/^\d{10}$/.test(values.contact)) {
        message.error('Contact number must be a 10-digit number.');
        return;
      }

      dispatch(SetLoader(true));
      const updatedUser = { ...user, ...values };
      const response = await updateUserProfile(updatedUser);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setIsEditing(false);
        window.location.reload();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields(['name', 'contact', 'address', 'age', 'sex']);
    setIsFormEdited(false);
  };

  return (
    <div className="flex-1 bg-neutral-50">
      <div className="mx-auto min-h-[30rem] w-full max-w-7xl px-2 pb-8 pt-4 sm:px-4">
        <main className="w-full space-y-4">
          <div className="overflow-hidden rounded-lg bg-gradient-to-l from-green-200 via-white to-white shadow">
            <div className="flex items-center justify-between px-4 py-5 sm:p-6">
              <h1 className="text-4xl font-bold">Your Profile</h1>
              {isEditing ? (
                <div>
                  <Button
                    type="primary"
                    onClick={handleSave}
                    disabled={!isFormEdited}
                  >
                    Save
                  </Button>
                  <Button
                    type="danger"
                    onClick={handleCancel}
                    style={{ marginLeft: '8px' }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button type="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>

          <section className="bg-white px-4 py-5 shadow sm:p-6 lg:flex-row lg:space-y-2 lg:space-x-4">
            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Information</h2>
              </div>

              <div className="mt-4 flex flex-col gap-5 font-medium">
                {isEditing ? (
                  <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={() => setIsFormEdited(true)}
                  >
                    <Form.Item
                      label="Your Name:"
                      name="name"
                      rules={[{ required: true, message: 'Name is required.' }]}
                    >
                      <Input placeholder="Your Name" />
                    </Form.Item>
                    <Form.Item label="Email:" name="email">
                      <Input placeholder="Email" disabled />
                    </Form.Item>
                    <Form.Item label="Contact number:" name="contact">
                      <Input
                        placeholder="Contact number"
                        type="number"
                        maxLength={10}
                      />
                    </Form.Item>
                    <Form.Item label="Address:" name="address">
                      <Input placeholder="Address" />
                    </Form.Item>
                    <Form.Item label="Age:" name="age">
                      <Input placeholder="Age" type="number" />
                    </Form.Item>
                    <Form.Item label="Sex:" name="sex">
                      <Radio.Group>
                        {sexOptions.map((option) => (
                          <Radio key={option} value={option}>
                            {option}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                ) : (
                  <>
                    <p className="text-gray-600">
                      <span className="font-semibold">Name:</span> {user.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    {user.contact && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Contact:</span>{' '}
                        {user.contact}
                      </p>
                    )}
                    {user.address && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Address:</span>{' '}
                        {user.address}
                      </p>
                    )}
                    {user.age && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Age:</span> {user.age}
                      </p>
                    )}
                    {user.sex && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Sex:</span> {user.sex}
                      </p>
                    )}

                    <div className="flex gap-2 text-xs font-normal text-gray-500">
                      <p>Created {createdAtFromNow}</p>
                      <p>•</p>
                      <p>Updated {updatedAtFromNow}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default General;
