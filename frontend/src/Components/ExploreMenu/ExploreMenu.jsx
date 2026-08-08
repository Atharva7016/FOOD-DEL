import React, { useContext } from 'react'
import "./ExploreMenu.css"
import { assets, menu_list } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ( {category, setCategory} ) => {
  const { search, setSearch } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-menu'>
        <div className='explore-menu-header'>
          <h1>Explore our menu</h1>
          <div className='explore-menu-search'>
            <img src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <span className='explore-menu-search-clear' onClick={() => setSearch("")}>&times;</span>
            )}
          </div>
        </div>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time </p>
        <div className='explore-menu-list' id='explore-menu-list'>
            { menu_list.map( (item,index) => {
                return(
                    <div onClick={ () => setCategory( prev => prev === item.menu_name ? "ALL":item.menu_name ) } key={index} className='explore-menu-list-item'>
                        <img className={ category === item.menu_name ? "active":"" } src={ item.menu_image } alt='' />
                        <p> {item.menu_name} </p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}
export default ExploreMenu;
