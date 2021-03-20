import React, { useState } from "react";
import ProductList from "./ProductList.js";
import Pagination from "./Pagination.js";
import AddProduct from "./AddProduct.js";
import "./Products.css";
import { emptyproduct } from "./productList.json";
const MainPage = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("Products"))
  );
  const [filteredProd, setFilteredProd] = useState(products);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(7);
  const [modifyId, setModifyId] = useState("");
  const [prodEdit, setProdEdit] = useState(emptyproduct[0]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const modifyFunc = (prodId) => {
    setModifyId(prodId);
    setProdEdit(products.find((item) => item.Id === prodId));
  };
  const saveFunction = (prodId, prodDetail) => {
    let itemId = products.findIndex((item) => item.Id === prodId);
    if (itemId === -1) {
      itemId = products.length;
      prodDetail.Id = products[products.length - 1]
        ? products[products.length - 1].Id + 1
        : 1;
    }
    products[itemId] = prodDetail;
    localStorage.setItem("Products", JSON.stringify(products));
    setProducts(JSON.parse(localStorage.getItem("Products")));
    setFilteredProd(products);
    setProdEdit(emptyproduct[0]);
    setModifyId(emptyproduct[0].Id);
  };
  const addProdClick = () => {
    setModifyId(products?.length || 0);
  };
  const delProdClick = (prodId) => {
    let itemId = products?.findIndex((item) => item.Id === prodId) || 0;
    products.splice(itemId, 1);
    setProdEdit(emptyproduct[0]);
    localStorage.setItem("Products", JSON.stringify(products));
    setProducts(JSON.parse(localStorage.getItem("Products")));
    setFilteredProd(products);
  };
  const filterProduct = (event) => {
    let filterProd = products.filter(
      (item) =>
        (event?.target?.name === "Name" &&
          item.Name.toLowerCase().indexOf(
            event?.target?.value.toLowerCase()
          ) !== -1) ||
        (event?.target?.name === "price" &&
          item.price
            .toString()
            .toLowerCase()
            .indexOf(event?.target?.value.toString().toLowerCase()) !== -1)
    );
    setFilteredProd(filterProd);
  };
  const filterBtnFunction = () => {
    setModifyId("xyz");
  };
  // Get current product
  const indexOfLastPost = currentPage * productPerPage;
  const indexOfFirstPost = indexOfLastPost - productPerPage;
  const currentProducts =
    filteredProd?.slice(indexOfFirstPost, indexOfLastPost) || [];

  return (
    <div className="main_container">
      {modifyId !== "xyz" && (
        <AddProduct
          productEdit={prodEdit}
          saveFunction={saveFunction}
          filterBtnFunction={filterBtnFunction}
        />
      )}
      {modifyId === "xyz" && (
        <div>
          <div>
            <div className="product_header">
              <div className="prod_header">Product</div>
              <div className="add_prod_btn">
                <input
                  type="button"
                  className="field_btn "
                  onClick={() => addProdClick()}
                  value="Add Product"
                ></input>
              </div>
            </div>
          </div>
          <section className="search_box">
            <div className="field_elem">
              <label>
                Name:
                <input
                  type="text"
                  name="Name"
                  onChange={filterProduct}
                  className="input_elem"
                />
              </label>
            </div>
            <div className="field_elem">
              <label>
                Price :
                <input
                  type="number"
                  name="price"
                  onChange={filterProduct}
                  className="input_elem"
                />
              </label>
            </div>
          </section>

          <ProductList
            modifyClick={modifyFunc}
            porducts={currentProducts}
            loading={loading}
            delProdClick={delProdClick}
          />
          <Pagination
            paginate={paginate}
            productPerPage={productPerPage}
            totalProduct={filteredProd?.length || 0}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
