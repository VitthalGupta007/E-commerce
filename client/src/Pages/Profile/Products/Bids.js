import { Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Divider from '../../../Components/Divider';
import { SetLoader } from '../../../Redux/lodersSlice';
import { GetAllBids } from '../../../apicalls/bids';
import moment from 'moment';

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBitsdata] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBitsdata(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => {
        return record.buyer.name;
      },
    },
    {
      title: 'Bid Amount',
      dataIndex: 'bidAmount',
    },
    {
      title: 'Message',
      dataIndex: 'message',
    },

    {
      title: 'Contact Details',
      dataIndex: 'contactDetails',
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1500}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
        <h1 className=" text-primary">Bids</h1>
        <Divider />
        <h1 className="text-xl text-gray-500">
          Product Name: {selectedProduct.name}
        </h1>

        <Table
          columns={columns}
          dataSource={bidsData.map((bid) => ({ ...bid, key: bid._id }))}
        />
      </div>
    </Modal>
  );
}
export default Bids;
