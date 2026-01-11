import React, { useState, useEffect } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate } from 'react-router-dom'

const Add = ({ url }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;

  const [image, setImage] = useState(false);
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    tamilName: "",
    description: "",
    price: "",
    category: "Vegetables",
    unit: "kg",
    stock: "",
    brand: "",
    isOrganic: false
  })

  // Fetch product data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchProductData();
    }
  }, [editId]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        const product = response.data.data.find(p => p._id === editId);
        if (product) {
          setData({
            name: product.name || "",
            tamilName: product.tamilName || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            category: product.category || "Vegetables",
            unit: product.unit || "kg",
            stock: product.stock?.toString() || "",
            brand: product.brand || "",
            isOrganic: product.isOrganic || false
          });
          if (product.image) {
            setExistingImage(product.image.startsWith("http") ? product.image : `${url}/images/${product.image}`);
          }
        } else {
          toast.error("Product not found");
          navigate('/list');
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Error loading product");
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const translateName = async (name) => {
    if (!name) return;
    try {
      const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURI(name)}`);
      if (response.data && response.data[0] && response.data[0][0] && response.data[0][0][0]) {
        const translatedText = response.data[0][0][0];
        setData(prev => ({ ...prev, tamilName: translatedText }));
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

  const onNameBlurHandler = () => {
    if (data.name && !data.tamilName) {
      translateName(data.name);
    }
  }

  const clearNames = () => {
    setData(prev => ({ ...prev, name: "", tamilName: "" }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("tamilName", data.tamilName)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("unit", data.unit)
    formData.append("stock", Number(data.stock))
    formData.append("brand", data.brand)
    formData.append("isOrganic", data.isOrganic)

    if (image) {
      formData.append("image", image)
    }

    try {
      let response;
      if (isEditMode) {
        formData.append("id", editId);
        response = await axios.post(`${url}/api/product/update`, formData);
      } else {
        response = await axios.post(`${url}/api/product/add`, formData);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        if (isEditMode) {
          navigate('/list');
        } else {
          setData({
            name: "",
            tamilName: "",
            description: "",
            price: "",
            category: "Vegetables",
            unit: "kg",
            stock: "",
            brand: "",
            isOrganic: false
          });
          setImage(false);
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error saving product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='add'>
      <p className="page-title">{isEditMode ? '✏️ Edit Product' : '➕ Add Product'}</p>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image {isEditMode && !image && '(Leave empty to keep current)'}</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : (existingImage || assets.upload_area)}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
            required={!isEditMode && !existingImage}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} onBlur={onNameBlurHandler} value={data.name} type="text" name='name' placeholder='Type Here' required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tamil Name (Optional)</p>
          <div className="input-with-button">
            <input onChange={onChangeHandler} value={data.tamilName} type="text" name='tamilName' placeholder='தக்காளி' />
            <button type="button" onClick={clearNames} className="clear-btn">Clear Names</button>
          </div>
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Rice & Grains">Rice & Grains</option>
              <option value="Oil & Masala">Oil & Masala</option>
              <option value="Dairy">Dairy</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div className="add-category flex-col">
            <p>Unit</p>
            <select onChange={onChangeHandler} value={data.unit} name="unit">
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="L">L</option>
              <option value="piece">piece</option>
              <option value="dozen">dozen</option>
              <option value="pack">pack</option>
            </select>
          </div>
        </div>
        <div className="add-category-price">
          <div className="add-price flex-col">
            <p>Product Price (₹)</p>
            <input type="number" onChange={onChangeHandler} value={data.price} name='price' placeholder='₹50' required />
          </div>
          <div className="add-price flex-col">
            <p>Stock Quantity</p>
            <input type="number" onChange={onChangeHandler} value={data.stock} name='stock' placeholder='100' required />
          </div>
        </div>
        <div className="add-category-price">
          <div className="add-price flex-col">
            <p>Brand (Optional)</p>
            <input type="text" onChange={onChangeHandler} value={data.brand} name='brand' placeholder='Aavin' />
          </div>
          <div className="add-organic flex-row">
            <input type="checkbox" onChange={onChangeHandler} checked={data.isOrganic} name='isOrganic' id="isOrganic" />
            <label htmlFor="isOrganic">Is Organic?</label>
          </div>
        </div>
        <div className="form-actions">
          {isEditMode && (
            <button type="button" onClick={() => navigate('/list')} className="cancel-btn">
              Cancel
            </button>
          )}
          <button type='submit' className='add-btn' disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'UPDATE PRODUCT' : 'ADD PRODUCT')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add
