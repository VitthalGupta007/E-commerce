import { Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { GetAllBids } from '../../../apicalls/bids';
import { SetLoader } from '../../../Redux/lodersSlice';

function Bids() {
  const [bidsData, setBitsdata] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        buyer: user._id,
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
      title: 'Product',
      dataIndex: 'product',
      render: (text, record) => {
        return record.product ? record.product.name : null;
      },
    },
    {
      title: 'Bid Placed On',
      dataIndex: 'createdAt',
      render: (text, record) => {
        return moment(text).format('DD-MM-YYYY hh:mm a');
      },
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: 'Offered Amount',
      dataIndex: 'offeredPrice',
      render: (text, record) => {
        return record.product ? record.product.price : null;
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
    getData();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <Table
        columns={columns}
        dataSource={bidsData
          .filter((bid) => bid.product && bid.product.name) // Filter bids with product name
          .map((bid) => ({ ...bid, key: bid._id }))}
      />
    </div>
  );
}
export default Bids;
