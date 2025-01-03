import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetLoader } from '../../Redux/lodersSlice';
import { GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import Divider from '../../Components/Divider';
import Filters from './Filters';
import { debounce } from 'lodash';

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: 'Approved',
    category: [],
    age: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      setLoading(true);
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
        setFilteredProducts(response.data); // Set filtered products initially
      }
    } catch (error) {
      dispatch(SetLoader(false));
      setLoading(false);
      message.error(error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Debounce search query to prevent excessive filtering
  const debouncedSearch = debounce((query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, 500);

  useEffect(() => {
    getData();
  }, [filters]);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex gap-5" id="shop">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-2xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            id="product-search"
            placeholder="Search Products here...."
            className="border border-gray-300 rounded border-solid px-2 py-1 h-14 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div
          className={`grid gap-5 ${showFilters ? 'grid-cols-4' : 'grid-cols-5'}`}
        >
          {loading ? (
            <div className="text-center w-full py-5">Loading...</div>
          ) : (
            filteredProducts?.map((product) => (
              <div
                key={product._id}
                className="border border-gray-400 rounded border-solid flex flex-col gap-2 pb-2"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-52 p-5 rounded-md object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
                <div className="px-5 flex flex-col">
                  <h1 className="text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {product.name}
                  </h1>
                  <p className="text-sm">
                    {product.age} {product.age === 1 ? 'year' : 'years'} old
                  </p>
                  <Divider />
                  <span className="text-xl font-semibold text-rose-600">
                    &#8377; {product.price}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
