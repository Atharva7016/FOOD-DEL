import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL || "https://food-del-backendd-sw5b.onrender.com";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])
    const [search,setSearch] = useState("");

    const addToCart = async (itemId) => {
        if ( !cartItems[itemId] ) {
            setCartItems( (prev) => ( {...prev, [itemId]: 1} ) )
        }
        else{
            setCartItems( (prev) => ( {...prev, [itemId]:prev[itemId] + 1} ) )
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems( (prev) => ( {...prev, [itemId]:prev[itemId] - 1 } ) )
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0 ){
                let itemInfo = food_list.find( (product) => product._id === item );
                if(itemInfo){
                    totalAmount += itemInfo.price*cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list")
            if(response.data.success){
                setFoodList(response.data.data || [])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
            setCartItems(response.data.cartData || {})
        } catch (error) {
            setCartItems({})
        }
    }
    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
              setToken(localStorage.getItem("token"));
              await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();

        const interval = setInterval(fetchFoodList, 5000);
        const onVisible = () => {
            if (document.visibilityState === "visible") {
                fetchFoodList();
            }
        };
        document.addEventListener("visibilitychange", onVisible);
        window.addEventListener("focus", fetchFoodList);

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("focus", fetchFoodList);
        };
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        token,
        search,
        setSearch,
        fetchFoodList,
        loadCartData
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
