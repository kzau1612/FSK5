import { useState, useEffect, createContext } from "react";
import "./App.css";
import { httpClient } from "./ultils/client.js";
import ListItem from "./components/ListItem.jsx";
import Cart from "./components/Cart.jsx";

export const AppContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  httpClient.serverApi = "https://api-exercise-sopi.vercel.app/api/v1";

  const checkEmail = async () => {
    const pattern = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm;
    let email = localStorage.getItem("email");
    if (!email) {
      email = prompt("Please enter your email");
      if (email && pattern.test(email)) {
        localStorage.setItem("email", email);
      } else {
        return checkEmail();
      }
    }
    await getApiKey();
  };

  const getApiKey = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      const { res, data } = await httpClient.get(`/api-key?email=${email}`);
      if (res.ok) {
        const apiKey = data.data.apiKey;
        localStorage.setItem("apiKey", apiKey);
        httpClient.apiKey = apiKey;
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("apiKey");
        await checkEmail();
      }
    }
  };

  const getProduct = async () => {
    try {
      const { res, data } = await httpClient.get("/products?limit=8");
      if (res.ok) {
        setProducts(data.data.listProduct);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      try {
        const orderItems = cartItems.map((item) => ({
          productId: item._id,
          quantity: item.totalQuantity,
        }));

        const newProducts = products.map((product) => {
          const existingProduct = cartItems.find((item) => item._id === product._id);

          if (existingProduct) {
            return {
              ...product,
              quantity: product.quantity - existingProduct.totalQuantity,
            };
          }

          return product;
        });

        const { res, data } = await httpClient.post("/orders", orderItems);
        if (res.ok) {
          setProducts(newProducts);
          setCartItems([]);
          alert("Thanh toán thành công!");
        } else {
          console.error("Failed to add new todo");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await checkEmail();
      await getProduct();
    };
    initialize();
  }, []);

  console.log(cartItems);
  return (
    <AppContext.Provider value={{ products, setProducts, cartItems, setCartItems, handleSubmit }}>
      <div className="container">
        <h2 className="title">Welcome to Shop!</h2>
        <ListItem />
        {!cartItems.length ? <p className="text">Chưa có gì trong giỏ hàng cả!!!!</p> : <Cart />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
