import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../Redux/lodersSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';
import Images from './Images';

const additionalOptions = [
  {
    label: 'Bill Available',
    name: 'billavailable',
  },
  {
    label: 'Warranty Available',
    name: 'warrantyavailable',
  },
  {
    label: 'Accessories Available',
    name: 'accessoriesavailable',
  },
  {
    label: 'Box Available',
    name: 'boxavailable',
  },
];

const rules = [
  {
    required: true,
    message: 'required',
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab = '1', setSelectedTab] = useState('1')
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const handleFinish = async (values) => {
    try {
      dispatch(SetLoader(true));

      if (values.name.length > 25) {
        dispatch(SetLoader(false));
        message.error('Name should not exceed 25 characters.');
        return;
      }

      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = 'Pending';
        response = await AddProduct(values);
      }

      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setFieldsValue(selectedProduct);
  }, [selectedProduct]);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === '2' && {footer: false})}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? 'Edit Product' : 'Add Product'}
        </h1>

        <Tabs defaultActiveKey="1"
        activeKey={selectedTab}
        onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General Info" key="1">
            <Form layout="vertical" ref={formRef} onFinish={handleFinish}>
              <Form.Item label="Product Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" rows="3" />
              </Form.Item>

              <Row gutter={[20, 20]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="How old is the product? (in Years)"
                    name="age"
                    rules={rules}
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select style={{ borderRadius: '5px' }}>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="home">Home</option>
                      <option value="sports">Sport</option>
                      <option value="others">Others</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex gap-12">
                {additionalOptions.map((item, index) => {
                  return (
                    <Form.Item key={index} label={item.label} name={item.name} rules={rules}>
                      <select
                        style={{ borderRadius: '5px' }}
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.value,
                          });
                        }}
                      >
                        <option value="">Select</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </Form.Item>
                  );
                })}
              </div>

              <Form.Item
                label="Show Bids on Product Page"
                name="showBidsOnProductPage"
                valuePropName="checked"
              >
                <Input
                  type="checkbox"
                  onChange={(e) => {
                    formRef.current.setFieldsValue({
                      showBidsOnProductPage: e.target.checked,
                    });
                  }}
                  checked={formRef.current?.getFieldValue(
                    "showBidsOnProductPage"
                  )}
                  style={{ width: 50  , marginLeft:20}}
                />
              </Form.Item>


            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} getData={getData} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}
export default ProductsForm;
