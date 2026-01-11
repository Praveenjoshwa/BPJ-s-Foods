import React, { useEffect, useState, useMemo } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check URL for filters on mount
  useEffect(() => {
    const stockParam = searchParams.get('stock');
    const searchParam = searchParams.get('search');

    if (stockParam === 'low') {
      setStockFilter('Low Stock');
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error fetching products")
    }
  }

  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/product/remove`, { id: productId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error removing product")
    }
  }

  // Get unique categories from the list
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(list.map(item => item.category))];
    return ['All', ...uniqueCategories.sort()];
  }, [list]);

  // Filter list based on search term, category, and stock
  const filteredList = useMemo(() => {
    return list.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tamilName && item.tamilName.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesStock = stockFilter === 'All' ||
        (stockFilter === 'Low Stock' && item.stock <= 10) ||
        (stockFilter === 'In Stock' && item.stock > 10);
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [list, searchTerm, selectedCategory, stockFilter]);

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Products List</p>

      {/* Search and Filter Section */}
      <div className="list-filters">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <select
          className="category-select"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="All">All Stock</option>
          <option value="In Stock">✅ In Stock</option>
          <option value="Low Stock">⚠️ Low Stock</option>
        </select>
        <span className="results-count">{filteredList.length} items</span>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b>Action</b>
        </div>
        {filteredList.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={item.image.startsWith("http") ? item.image : `${url}/images/` + item.image} alt="" />
              <div>
                <p>{item.name}</p>
                {item.tamilName && <p className="tamil-name-admin">{item.tamilName}</p>}
              </div>
              <p>{item.category}</p>
              <p>₹{item.price}/{item.unit}</p>
              <p className={item.stock <= 10 ? "low-stock-admin" : ""}>{item.stock} {item.unit}</p>
              <div className="action-buttons-list">
                <span onClick={() => navigate(`/add?edit=${item._id}`)} className='edit-btn' data-tooltip="Edit">✏️</span>
                <span onClick={() => removeProduct(item._id)} className='delete-btn' data-tooltip="Delete">✕</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
