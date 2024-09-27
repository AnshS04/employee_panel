import axios from "axios";
import React from "react";

const Modal = (props) => {
  const {
    setModal,
    employeeId,
    name,
    setName,
    email,
    setEmail,
    mobile,
    setMobile,
    designation,
    setDesignation,
    gender,
    setGender,
    course,
    setCourse,
    image,
    setImage,
  } = props;

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Mobile", mobile);
    formData.append("Designation", designation);
    formData.append("Gender", gender);
    formData.append("Course", course);

    if (image) {
      formData.append("Image", image);
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.put(
        `http://localhost:5000/api/updateEmployee/${employeeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (response.status === 200) {
        console.log("Employee updated successfully:", response.data);
        setModal(false); 
        window.location.reload();
        
      }
    } catch (error) {
      if (error.response) {
        console.error("Error updating employee:", error.response.data);
        alert(
          `Failed to update employee: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-xl max-h-[70vh]">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">Employee</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={() => setModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4" onSubmit={updateEmployee}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter email"
                  required
                />
              </div>

              
              <div className="col-span-1">
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="designation"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Designation
                </label>
                <select
                  name="designation"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Select designation
                  </option>{" "}
                  
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              
              <div className="col-span-1">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <input
                      id="male"
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="male"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center mr-4">
                    <input
                      id="female"
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="female"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="course"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Course
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="mca"
                      type="checkbox"
                      value="MCA"
                      checked={course === "MCA"}
                      onChange={handleCourseChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="mca"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      MCA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="bca"
                      type="checkbox"
                      value="BCA"
                      checked={course === "BCA"}
                      onChange={handleCourseChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="bca"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      BCA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="bsc"
                      type="checkbox"
                      value="BSC"
                      checked={course === "BSC"}
                      onChange={handleCourseChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="bsc"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      BSC
                    </label>
                  </div>
                </div>
              </div>

              
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  value={image.path}
                  onChange={handleImageChange} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
