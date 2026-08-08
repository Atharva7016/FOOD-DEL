import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ( {category} ) => {
  const { food_list, search } = useContext(StoreContext);
  const query = search.trim().toLowerCase();

  const filteredList = food_list.filter( (item) => {
    const matchesCategory = category === "ALL" || category === item.category;
    const matchesSearch = !query
      || item.name.toLowerCase().includes(query)
      || item.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  })

  return (
    <div className='food-display' id="food-display" >
      <h2> Top dishes near you </h2>
      { filteredList.length === 0
        ? <p className='food-display-no-results'>No dishes found{ query ? ` for "${search}"` : "" }.</p>
        : <div className='food-display-list'>
            { filteredList.map( (item,index) => (
              <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
            ))}
          </div>
      }
    </div>
  )
}
export default FoodDisplay;