import React from "react";
import { emptyproduct, CONSTANTS } from "./productList.json";

class AddProduct extends React.Component {
  constructor(productEdit) {
    super(productEdit);
    this.state = emptyproduct[0];
    this.setState({
      errorMsg: "",
      errorFlag: 0,
    });
    this.astrictElem = <span className="mandatory_elem">*</span>;
    this.emptyProduct = emptyproduct[0];
    this.msgError = ["Please enter valid "];
    this.saveFunction = productEdit.saveFunction;
    this.filterBtnFunction = productEdit.filterBtnFunction;
    this.handleChange = this.handleChange.bind(this);
    this.setState(productEdit.productEdit);
    this.prodDetails = productEdit.productEdit;
    this.updatecomponent = this.updatecomponent.bind(this);
    this.updatecomponent();
  }
  updatecomponent() {
    const titles = Object.keys(this.prodDetails);
    for (let i = 0; i < titles.length; i++) {
      this.setState({ [titles[i]]: this.prodDetails[titles[i]] });
    }
    this.msgError = ["Please enter valid "];
  }
  componentDidMount() {
    this.updatecomponent();
  }
  componentWillReceiveProps(nextProps) {
    this.prodDetails = nextProps.productEdit;
    this.updatecomponent();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  formReset = (e) => {
    e.target.reset();
    this.prodDetails = this.emptyProduct;
    this.updatecomponent();
    e.preventDefault();
  };
  validate_form = (event) => {
    event.preventDefault();
    const titles = Object.keys(this.state);
    let msg = this.msgError[0];
    for (let i = 1; i < titles.length - 1; i++) {
      this.field_validator(this.state[titles[i]], titles[i]);
    }
    for (let i = 1; i < this.msgError.length - 1; i++) {
      msg += `${this.msgError[i]}, `;
    }
    msg += `${this.msgError[this.msgError.length - 1]}. `;

    if (this.msgError.length > 1) {
      this.setState({ errorMsg: msg });
      this.msgError = ["Please enter valid "];
    } else {
      const prodDetail = this.state;
      delete prodDetail["errorMsg"];
      delete prodDetail["errorFlag"];
      this.saveFunction(prodDetail.Id, prodDetail);
    }
  };
  field_validator(elemValue, elemName) {
    const titles = Object.keys(CONSTANTS);
    switch (elemName) {
      case titles[1]:
      case titles[3]:
        if (elemValue === "") {
          this.msgError.push(CONSTANTS[elemName]);
          this.setState({ errorFlag: 1 });
        }
        break;
      case titles[2]:
      case titles[4]:
      case titles[5]:
        if (elemValue === 0 && typeof elemValue != Number) {
          this.msgError.push(CONSTANTS[elemName]);
          this.setState({ errorFlag: 1 });
        }
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <form
        id="addProdForm"
        ref={(el) => (this.myFormRef = el)}
        onSubmit={this.validate_form.bind(this)}
        onReset={this.formReset.bind(this)}
      >
        <table className="add_prod_table">
          <thead>
            <tr>
              <th className="add_prod_header">Add Product</th>
            </tr>
          </thead>
          <tbody>
            {this.state.errorFlag ? (
              <tr>
                <td className="error_msg">{this.state.errorMsg}</td>
              </tr>
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
            <tr>
              <td>
                <div className="input_box">
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.Name}
                      {this.astrictElem}:
                      <input
                        type="text"
                        name="Name"
                        value={this.state.Name}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.HSN}
                      {this.astrictElem}:
                      <input
                        type="text"
                        name="HSN"
                        value={this.state.HSN}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.Unit}
                      {this.astrictElem}:
                      <input
                        type="text"
                        name="unit"
                        value={this.state.Unit}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.Tax}
                      {this.astrictElem}:
                      <input
                        type="number"
                        name="tax"
                        value={this.state.Tax}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.Price}
                      {this.astrictElem}:
                      <input
                        type="number"
                        name="price"
                        value={this.state.Price}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.Type}:
                      <input
                        type="text"
                        name="type"
                        value={this.state.Type}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                  <div className="field_elem">
                    <label>
                      {CONSTANTS.Description}:
                      <textarea
                        name="description"
                        value={this.state.Description}
                        onChange={this.handleChange}
                        className="input_elem"
                      />
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="button_add_form">
                <input className="field_btn" type="submit" value="Save" />
                <input className="field_btn" type="reset" value="Cancel" />
                <input
                  className="field_btn"
                  type="button"
                  onClick={() => this.filterBtnFunction()}
                  value="View Products"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

export default AddProduct;
