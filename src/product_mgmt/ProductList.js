import { emptyproduct } from "./productList.json";

function ProductList({ porducts, loading, modifyClick, delProdClick }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const titles = Object.keys(emptyproduct[0]);
  return (
    <div className="Add-form">
      <table class="prod_list_table">
        <thead>
          <tr className="product_tr">
            {titles.map((titles, key) => (
              <th className="table_header" key={key}>
                {titles}
              </th>
            ))}
            <th className="table_header" key="action">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {porducts.map((items, i) => (
            <tr key={i} className="product_tr">
              {Object.values(porducts[i]).map((value, key) => (
                <td className="table_value" key={key}>
                  {value}
                </td>
              ))}
              <td key="modify" className="table_value">
                <input
                  type="button"
                  className=" table_btn"
                  onClick={() => modifyClick(items.Id)}
                  key={items.id}
                  value="Edit"
                ></input>
                <input
                  type="button"
                  className=" table_btn"
                  onClick={() => delProdClick(items.Id)}
                  key={items.id}
                  value="Delete"
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
