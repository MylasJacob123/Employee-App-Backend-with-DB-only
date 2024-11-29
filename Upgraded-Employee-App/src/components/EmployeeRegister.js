import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeRegister.css";

const EmployeeRegister = ({ onDeleteEmployee, onEditEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:9001/api/getEmployees"
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(employees);

  return (
    <div className="employee-register-container">
      <h2>Registered Employees</h2>
      {employees.length === 0 ? (
        <p>No employees registered yet.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>ID Number</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="employee-photo"
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.age}</td>
                <td>{employee.idNumber}</td>
                <td>{employee.role}</td>
                <td className="action-btn-container">
                  <button
                    className="update-btn"
                    onClick={() => onEditEmployee(employee.id, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteEmployee(employee.id, index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeRegister;
