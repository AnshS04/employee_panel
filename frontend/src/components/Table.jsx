import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import AddModal from "./AddModal";

const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null); 

  const getEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setEmployees(response.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setEmployeeId(employee.Id);
    setName(employee.Name);
    setEmail(employee.Email);
    setMobile(employee.Mobile);
    setDesignation(employee.Designation);
    setGender(employee.Gender);
    setCourse(employee.Course);
    setImage(employee.Image);
    setModal(true);
  };

  const deleteEmployee = async (Id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.delete(
        `http://localhost:5000/api/deleteEmployee/${Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
        console.log("Employee deleted successfully:", response.data);
        alert("Employee deleted successfully!");

        window.location.reload();
      
    } catch (error) {
      if (error.response) {
        console.error("Error deleting employee:", error.response.data);
      } 
      else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Employee List</h2>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setAddModal(true)} 
          >
            Add Employee
          </button>
        </div>

        <div className="relative overflow-x-auto mt-4">
          {modal && (
            <Modal
              setModal={setModal}
              employeeId={employeeId}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              mobile={mobile}
              setMobile={setMobile}
              designation={designation}
              setDesignation={setDesignation}
              gender={gender}
              setGender={setGender}
              course={course}
              setCourse={setCourse}
              image={image}
              setImage={setImage}
            />
          )}
          {addModal && (<AddModal setAddModal={setAddModal}/>)}
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Unique ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile No
                </th>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Course
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((item) => (
                <tr key={item.Id} className="bg-white border-b">
                  <td className="px-6 py-4">{item.Id}</td>
                  <td className="px-6 py-4">{item.Image}</td>
                  <td className="px-6 py-4">{item.Name}</td>
                  <td className="px-6 py-4">{item.Email}</td>
                  <td className="px-6 py-4">{item.Mobile}</td>
                  <td className="px-6 py-4">{item.Designation}</td>
                  <td className="px-6 py-4">{item.Gender}</td>
                  <td className="px-6 py-4">{item.Course}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => deleteEmployee(item.Id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
