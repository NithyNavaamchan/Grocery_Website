import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [product, setProduct] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    //Add Product to cart
    const addToCart = (itemID) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemID]) {
            cartData[itemID] += 1
        } else {
            cartData[itemID] = 1
        }
        setCartItems(cartData)
        toast.success("Added to Cart")
    }

    // Update Cart Item Quantity
    const updateCartItem = (itemID, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemID] = quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Product Fom Cart
    const removeFromCart = (itemID) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemID]) {
            cartData[itemID] -= 1
            if (cartData[itemID] === 0) {
                delete cartData[itemID]
            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
    }

    // Get cart item count
    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount
    }

    // Get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = product.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100
    }

    // Fetch All Products
    const fetchProducts = async () => {
        setProduct(dummyProducts)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const value = { navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, product, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}