import React from 'react';

const ProductCard = ({ product }) => {
  const { productName, price, rating, discount, availability, id } = product;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
      <img
        src={`https://picsum.photos/200/300?random=${id}`}
        alt={productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{productName}</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-bold text-blue-600">₹{price}</p>
          <p className="text-sm text-yellow-500">{rating}★</p>
        </div>
        <p className="text-gray-500 mb-1">Discount: <span className="text-green-500 font-semibold">{discount}%</span></p>
        <p className={`text-gray-500 ${availability === 'In Stock' ? 'text-green-500' : 'text-red-500'} font-semibold`}>{availability}</p>
      </div>
    </div>
  );
};

export default ProductCard;
