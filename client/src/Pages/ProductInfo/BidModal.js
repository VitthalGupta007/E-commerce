import { Form, Input, Modal, message } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../Redux/lodersSlice';
import { PlaceNewBid } from '../../apicalls/bids';
import { AddNotification } from '../../apicalls/notifications';

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const rules = [{ required: true, message: 'Required' }];
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success('Bid Added Successfully');
        await AddNotification({
          title: "A new bid has been placed",
          message: `A new bid has been placed on your product ${product.name} by ${user.name} for \u20B9 ${values.bidAmount}`,
          user: product.seller._id,
          onClick: `/product/${product._id}`,
          read: false,
        });
        reloadData();
        setShowBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  

  return (
    <Modal
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-indigo-400 text-center">
          New Bid
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={handleFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input type='number' />
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="phone" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
export default BidModal;
