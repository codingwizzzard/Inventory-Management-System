import React, { useEffect, useState } from "react";
import { getSuppliers, exportSupplierCSV, importSupplierCSV, deleteSupplier } from "../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
    }
  };

  const handleExportSupplierCSV = async () => {
    try {
      const response = await exportSupplierCSV();
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "suppliers.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting supplier CSV:", error.message);
    }
  };

  const handleImportSupplierCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await importSupplierCSV(formData);
      console.log("Import successful:", response.data);
      fetchSuppliers(); // Refresh suppliers after import
    } catch (error) {
      console.error("Error importing supplier CSV:", error.message);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted successfully");
      fetchSuppliers(); // Refresh suppliers after deletion
    } catch (error) {
      console.error("Error deleting supplier:", error.message);
      toast.error("Failed to delete supplier");
    }
  };
  const handleEditSupplier = (id) => {
    navigate(`/edit-supplier/${id}`); 
  };


  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card w-100">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col d-flex justify-content-between">
                    <h4 className="card-title">Supplier Management</h4>
                    <div className="col-auto">
                    <button type="button" className="btn btn-sm me-2" style={{ backgroundColor: "#007bff", color: "white" }} onClick={handleExportSupplierCSV} > Export CSV </button>
                    <input type="file" accept=".csv" onChange={handleImportSupplierCSV} style={{ display: "none" }} id="import-supplier-csv-input" />
                    <label htmlFor="import-supplier-csv-input" className="btn btn-sm " style={{ backgroundColor: "#007bff", color: "white" }}> Import CSV </label> 
                  </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="table-responsive">
                  <table className="table datatable" id="datatable_1">
                    <thead className="table-light">
                      <tr className="text-center">
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suppliers.map((supplier) => (
                        <tr key={supplier._id} className="text-center">
                          <td>{supplier.name}</td>
                          <td>{supplier.contactDetails.phone}</td>
                          <td>{supplier.contactDetails.email}</td>
                          <td>
                            <button
                              onClick={() => handleEditSupplier(supplier._id)}
                              className="btn btn-sm me-1"
                              style={{ backgroundColor: "#007bff", color: "white" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSupplier(supplier._id)}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;
