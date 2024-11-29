const {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} = require("firebase/firestore");
const { db } = require("../Config/firebase");

const addEmployee = async (req, res) => {
  const { name, surname, age, idNumber, role } = req.body;

  try {
    const docRef = await addDoc(collection(db, "employees"), {
      name: name,
      surname: surname,
      age,
      idNumber,
      role,
    });
    res.json({
      message: "Added successfully",
    });
  } catch (error) {
    console.log("Adding employee error", error);
  }
};

const getEmployees = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({
      data: data,
    });
  } catch (error) {
    console.log("Error in getting employee", error);
    res.status(500).json({ error: "Error fetching employees" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, surname, age, idNumber, role } = req.body;

    console.log("Updating employee ID:", id); 

    if (!name || !surname || !age || !idNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employeeDocRef = doc(db, "employees", id);

    await setDoc(
      employeeDocRef,
      {
        name,
        surname,
        age,
        idNumber,
        role,
      },
      { merge: true }
    );

    res.json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.log("Error updating employee", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting employee with id:", id);
    const employeeDocRef = doc(db, "employees", id);
    await deleteDoc(employeeDocRef);

    res.json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    console.log("Error in deleting employee", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
};
