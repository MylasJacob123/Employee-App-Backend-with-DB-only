import React, { useState, useEffect } from "react";
import "./UpdateEmployee.css";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateEmployee = ({ employeeData, onUpdateEmployee, onCancel }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: "",
    surname: "",
    age: "",
    idNumber: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [id, setId] =useState()

  useEffect(() => {
    console.log("Employee data received:", employeeData.employee);

    setId(employeeData.employee);
    if (employeeData && employeeData.employee) {
      setUpdatedEmployee(employeeData.employee); 
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const validate = () => {
    const errors = {};
    const namePattern = /^[A-Z].*/;
    const idNumberPattern = /^\d{13}$/;
    const rolePattern = /^[A-Z].*/;

    if (!namePattern.test(updatedEmployee.name))
      errors.name = "Name must start with a capital letter";
    if (!namePattern.test(updatedEmployee.surname))
      errors.surname = "Surname must start with a capital letter";
    if (!idNumberPattern.test(updatedEmployee.idNumber))
      errors.idNumber = "ID Number must consist of 13 digits";
    if (!updatedEmployee.age || updatedEmployee.age < 18)
      errors.age = "Valid age is required (min 18)";
    if (!rolePattern.test(updatedEmployee.role))
      errors.role = "Role must start with a capital letter";

    return errors;
  };

  const updateEmployee = async (id) => {
    console.log("Updating employee with ID:", id);
    try {
      const response = await axios.put(
        `http://localhost:9001/api/updateEmployee/${id}`,
        {
          ...updatedEmployee,
        }
      );
      onUpdateEmployee(response.data);
      Swal.fire("Success!", "Employee updated successfully.", "success");
    } catch (error) {
      console.error("Error updating Employee:", error);
      Swal.fire("Error!", "Failed to update the employee.", "error");
    }
  };
  

  const handleUpdateClick = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(id)
      updateEmployee(id); 
    }
  };

  return (
    <div className="update-employee-modal">
      <div className="update-employee-container">
        <h2>Update Employee</h2>
        <form className="update-employee-form">
          {/* Removed Photo Upload Section */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedEmployee.name || ""}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="update-component-error">{errors.name}</span>
          )}

          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={updatedEmployee.surname || ""}
            onChange={handleChange}
          />
          {errors.surname && (
            <span className="update-component-error">{errors.surname}</span>
          )}

          <label>Age</label>
          <input
            type="number"
            name="age"
            value={updatedEmployee.age || ""}
            onChange={handleChange}
          />
          {errors.age && (
            <span className="update-component-error">{errors.age}</span>
          )}

          <label>ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={updatedEmployee.idNumber || ""}
            onChange={handleChange}
          />
          {errors.idNumber && (
            <span className="update-component-error">{errors.idNumber}</span>
          )}

          <label>Role</label>
          <input
            type="text"
            name="role"
            value={updatedEmployee.role || ""}
            onChange={handleChange}
          />
          {errors.role && (
            <span className="update-component-error">{errors.role}</span>
          )}

          <button
            type="button"
            className="save-btn"
            onClick={handleUpdateClick}
          >
            Save
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
