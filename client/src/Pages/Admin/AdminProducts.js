import { Table, message } from 'antd'; // Removed unused Button import
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../Redux/lodersSlice';
import { GetProducts, UploadProductStatus } from '../../apicalls/products';
import moment from 'moment';

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UploadProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Empty array is fine here as getData is not dependent on external variables

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => (
        <img
          src={record?.images?.length > 0 ? record.images[0] : ""}
          alt=""
          className="w-20 h-20 object-cover rounded-md"
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Seller Name',
      dataIndex: 'name',
      render: (text, record) => record.seller.name,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'How old is the product?',
      dataIndex: 'age',
      render: (text, record) => (
        <span>{record.age} {record.age === 1 ? ' year' : ' years'} old</span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => record.status.toUpperCase(),
    },
    {
      title: 'Added On',
      dataIndex: 'createdAt',
      render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm A'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === 'Pending' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'Approved')}
              >
                Approve
              </span>
            )}
            {status === 'Pending' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'Rejected')}
              >
                Reject
              </span>
            )}
            {status === 'Approved' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'Blocked')}
              >
                Block
              </span>
            )}
            {status === 'Rejected' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'Pending')}
              >
                Retrieve
              </span>
            )}
            {status === 'Blocked' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'Approved')}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={products.map((product) => ({
          ...product,
          key: product._id, // Assigning unique key prop for each product
        }))}
      />
    </div>
  );
}

export default Products;
