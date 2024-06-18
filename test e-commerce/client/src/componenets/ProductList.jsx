import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';

const categories = ['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'];
const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];

const App = () => {
  const [category, setCategory] = useState('Laptop');
  const [company, setCompany] = useState('AMZ');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [numItems, setNumItems] = useState(100);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleFetchData = async () => {
    if (category && company && numItems && minPrice && maxPrice) {
      const url = `http://localhost:3001/${company}/categories/${category}/products?top=${numItems}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      const params = {
        top: numItems,
        minPrice,
        maxPrice,
      };

      try {
        const response = await axios.get(url, { params });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 md:p-10 lg:p-16 bg-gray-100 min-h-screen  ">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Product Search</h1>
      <form className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:border-gray-500"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              Company
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:border-gray-500"
            >
              <option value="">Select Company</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              Minimum Price
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              Maximum Price
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              Number of Items
            </label>
            <input
              type="number"
              value={numItems}
              onChange={(e) => setNumItems(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleFetchData}
          disabled={!category || !company || !numItems}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Fetch Data
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((product, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    <div className="flex justify-center mt-8">
  <div className="flex items-center space-x-2">
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Prev
    </button>
    <span className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700">
      Page {currentPage}
    </span>
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={indexOfLastItem >= data.length}
      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</div>

    </div>
  );
};

export default App;
