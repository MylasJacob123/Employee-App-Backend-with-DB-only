import React, { useState } from "react";
import EmployeeRegisterForm from "./components/EmployeeRegisterForm";
import EmployeeRegister from "./components/EmployeeRegister";
import SearchEmployee from "./components/SearchEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import "./App.css";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [view, setView] = useState("Registration Form");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const addEmployee = (employeeData) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, employeeData];
      setFilteredEmployees(updatedEmployees);
      return updatedEmployees;
    });
  };

  const deleteEmployee = async (id, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:9001/api/deleteEmployee/${id}`);
          setEmployees((prevEmployees) => {
            const updatedEmployees = prevEmployees.filter(
              (_, i) => i !== index
            );
            setFilteredEmployees(updatedEmployees);
            return updatedEmployees;
          });
          Swal.fire("Deleted!", "Employee has been deleted.", "success");
        } catch (error) {
          console.error("Error in deleting employee:", error.message);
          Swal.fire("Error!", "Failed to delete the employee.", "error");
        }
      }
    });
  };  

  const updateEmployee = (index, updatedEmployee) => {
    console.log("Updating employee at index:", index, "with data:", updatedEmployee); 
    setEmployees((prevEmployees) => {
        const newEmployees = [...prevEmployees];
        newEmployees[index] = updatedEmployee; 
        setFilteredEmployees(newEmployees); 
        return newEmployees;
    });
    setEmployeeToEdit(null);
};


  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = employees.filter(
        (employee) =>
          employee.idNumber && employee.idNumber.includes(searchTerm)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  const handleEditEmployee = (employee, index) => {
    setEmployeeToEdit({ employee, index });
  };

  return (
    <div className="App">
      <h1>Employee Registration App</h1>
      <div className="App-container">
        <aside className="sidebar">
          <button
            className={`registration-button ${
              view === "Registration Form" ? "active" : ""
            }`}
            onClick={() => setView("Registration Form")}
          >
            Employee Registration
          </button>
          <button
            className={`view-employees-button ${
              view === "Employee Register" ? "active" : ""
            }`}
            onClick={() => setView("Employee Register")}
          >
            View Employees
          </button>
        </aside>

        <main className="content">
          {view === "Registration Form" && (
            <EmployeeRegisterForm onAddEmployee={addEmployee} />
          )}
          {view === "Employee Register" && (
            <>
              <SearchEmployee onSearch={handleSearch} />
              <EmployeeRegister
                employees={filteredEmployees}
                onDeleteEmployee={(id, index) => deleteEmployee(id, index)}
                onEditEmployee={handleEditEmployee}
              />
            </>
          )}
        </main>

        {employeeToEdit && (
          <UpdateEmployee
            employeeData={employeeToEdit} 
            onUpdateEmployee={(updatedData) => {
              updateEmployee(employeeToEdit.index, updatedData);
              setEmployeeToEdit(null);
            }}
            onCancel={() => setEmployeeToEdit(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
