import "./App.css";
import MainPage from "./product_mgmt/MainPage.js";
import { products } from "./product_mgmt/productList.json";

function App() {
  if (
    !localStorage ||
    !localStorage.getItem("Products") ||
    JSON.parse(localStorage.getItem("Products")).length < 0
  )
    localStorage.setItem("Products", JSON.stringify(products));
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
