import React, { useState } from "react";
import { addSupplier } from "../services/api"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSupplier = () => {
        const [formData, setFormData] = useState({
          name: "",
          contactDetails: {
            email: "",
            phone: "",
          },
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          if (name === "email" || name === "phone") {
            setFormData({
              ...formData,
              contactDetails: {
                ...formData.contactDetails,
                [name]: value,
              },
            });
          } else {
            setFormData({ ...formData, [name]: value });
          }
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            await addSupplier(formData);
            toast.success("Supplier added successfully!"); 
            setFormData({ name: "", contactDetails: { email: "", phone: "" } }); 
          } catch (err) {
            toast.error(err.response?.data?.error || "Failed to add supplier. Please try again."); 
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
                    <h4 className="card-title">Add New Supplier</h4>                      
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="name" className="col-sm-2 form-label mb-0">Name</label>
                    <div className="col-sm-10">
                      <input 
                        className="form-control" 
                        type="text" 
                        id="name"  
                        value={formData.name} 
                        onChange={handleChange} 
                        name="name" 
                        placeholder="Enter name"
                        required 
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="email" className="col-sm-2 form-label mb-0">Email</label>
                    <div className="col-sm-10">
                      <input 
                        className="form-control" 
                        type="email" 
                        id="email" 
                        name="email"  
                        value={formData.contactDetails.email} 
                        onChange={handleChange} 
                        placeholder="Enter email" 
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <label htmlFor="phone" className="col-sm-2 form-label mb-0">Phone</label>
                    <div className="col-sm-10">
                      <input 
                        className="form-control" 
                        name='phone'  
                        type="tel" 
                        id="phone"  
                        value={formData.contactDetails.phone} 
                        onChange={handleChange} 
                        placeholder="Enter phone number" 
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-10 offset-sm-2" style={{marginLeft:"500px"}}>
                      <button type="submit" className="btn tex" style={{backgroundColor:"#007bff",color:"white"}}>Submit form</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default AddSupplier