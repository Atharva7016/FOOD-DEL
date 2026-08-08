import React, { useState } from 'react'
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Add = ({url, token}) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData( data => ( {...data, [name]:value} ) )
  }
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
    const name = file.name.toLowerCase();
    if (!isJpeg || (!name.endsWith(".jpg") && !name.endsWith(".jpeg"))) {
      toast.error("Only JPG or JPEG images are allowed");
      event.target.value = "";
      setImage(false);
      return;
    }
    setImage(file);
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please upload a JPG or JPEG image");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price",Number(data.price));
    formData.append("category", data.category);
    formData.append("image",image);
    const response = await axios.post(`${url}/api/food/add`, formData, {headers:{token}});
    if(response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false);
      toast.success(response.data.message)
      navigate("/list")
    }
    else{
      toast.error(response.data.message)
    }
  }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image (JPG / JPEG only)</p>
          <label htmlFor="image">
            <img src={ image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={onImageChange} type="file" id='image' accept=".jpg,.jpeg,image/jpeg" hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product  description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}
export default Add;
