import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


axios.defaults.baseURL= import.meta.env.VITE_BASE_URL
const AppContext = createContext();

export const AppProvider =({children})=>{

    const navigate= useNavigate()

    const [token, setToken]= useState(null)
    const [items, setItems]= useState([])
    const [input, setInput]= useState("")
     const [selectedCategory, setSelectedCategory] = useState("All"); // ⭐ new state


    const fetchItems= async ()=>{
        try {
            const {data}= await axios.get('/api/item/all')
            data.success? setItems(data.items) : toast.error(data.message)
        } catch (error) {
             toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchItems()
        const token= localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        }
    },[])

 // ⭐ Derived filtered items
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.type === selectedCategory);


    const value= {
        axios, navigate, token, setToken, items, setItems, input, setInput,
    selectedCategory,
    setSelectedCategory,
    filteredItems, // ⭐ expose filtered list

    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext=()=>{
    return useContext(AppContext)
}