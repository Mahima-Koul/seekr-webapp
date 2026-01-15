import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


axios.defaults.baseURL= import.meta.env.VITE_BASE_URL
// const storedToken = localStorage.getItem("token");
// if (storedToken) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
// }

export const AppContext = createContext();

export const AppProvider =({children})=>{

    const navigate= useNavigate()

    const [token, setToken]= useState(null)
    const [items, setItems]= useState([])
    const [input, setInput]= useState("")
     const [selectedCategory, setSelectedCategory] = useState("All"); // ⭐ new state

const fetchPublicItems = async () => {
  try {
    const { data } = await axios.get('/api/item/all'); // NO token
    if (data.success) setItems(data.items);
  } catch (err) {
    console.error("Error fetching public items:", err);
  }
};

// Fetch public items ONCE, even if no token
useEffect(() => {
  fetchPublicItems();
}, []);

     
    const fetchItems= async ()=>{
        if (!token) return;
        try {
            const {data}= await axios.get('/api/item/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      //withCredentials: true,
    });//
            data.success? setItems(data.items) : toast.error(data.message)
        } catch (error) {
             toast.error(error.message)
        }
    }

      useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
     axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);
  

  useEffect(() => {
  if (!token) return;
  fetchItems();
}, [token]);

    // useEffect(()=>{
    //     ///
    //     if (!token) return;
    //     fetchItems()
    //     const token= localStorage.getItem('token')
    //     if(token){
    //         setToken(token)
    //         axios.defaults.headers.common['Authorization']=`Bearer ${token}`
    //     }
    // },[])

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