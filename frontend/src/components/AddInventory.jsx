import React, { useState, useEffect } from "react";
import { getSuppliers, addInventoryItem } from "../services/api";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AddInventory = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    category: "",
    supplierId: "",
    lowStockThreshold: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (err) {
      toast.error("Error fetching suppliers. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInventoryItem(formData);
      toast.success("Inventory item added successfully!"); 
      setFormData({ itemName: "", quantity: "", category: "", supplierId: "", lowStockThreshold: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add inventory item. Please try again."); 
    }
  };

  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-6 col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col text-center">
                    <h4 className="card-title">Add Inventory Item</h4>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="itemName" className="col-sm-2 form-label mb-0">Item Name</label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="text"
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        placeholder="Enter item name"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="quantity" className="col-sm-2 form-label mb-0">Quantity</label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="category" className="col-sm-2 form-label mb-0">Category</label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="supplierId" className="col-sm-2 form-label mb-0">Supplier</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        id="supplierId"
                        name="supplierId"
                        value={formData.supplierId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Supplier</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="lowStockThreshold" className="col-sm-2 form-label mb-0">Low Stock Threshold</label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="number"
                        id="lowStockThreshold"
                        name="lowStockThreshold"
                        value={formData.lowStockThreshold}
                        onChange={handleChange}
                        placeholder="Enter low stock threshold"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-10 offset-sm-2" style={{marginLeft:"500px"}}>
                      <button type="submit" className="btn tex" style={{backgroundColor:"#007bff",color:"white"}}>Add Inventory Item</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
