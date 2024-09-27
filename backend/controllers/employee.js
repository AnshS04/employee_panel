const Employee = require("../models/employee");

const createEmployee = async (req, res) => {
    const { Name, Email, Mobile, Designation, Gender, Course } = req.body;
    const Image = req.file ? req.file.path : null;

    // console.log(req.body, Image)

    if (!Name || !Email || !Mobile || !Designation || !Gender || !Course || !Image) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
        return res.status(400).json({ message: "Enter a valid email." });
    }

    if (!/^[0-9]{10}$/.test(Mobile)) {
        return res.status(400).json({ message: "Enter a valid 10-digit mobile number." });
    }


    try {
        const existingEmployee = await Employee.findOne({ Email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with the same Email already exists.' });
        }

        const newEmployee = new Employee({
            Image,
            Name,
            Email,
            Mobile,
            Designation,
            Gender,
            Course
        });

        await newEmployee.save();

        return res.status(201).json({ message: 'Employee created successfully!', employee: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

const updateEmployee = async (req, res) => {
    const { Id } = req.params; 
    const updateData = req.body; 

    const { Name, Email, Mobile, Designation, Gender, Course } = updateData;
    const Image = req.file ? req.file.path : null;

    if (!Name || !Email || !Mobile || !Designation || !Gender || !Course) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
        return res.status(400).json({ message: "Enter a valid email." });
    }

    if (!/^[0-9]{10}$/.test(Mobile)) {
        return res.status(400).json({ message: "Enter a valid 10-digit mobile number." });
    }

    try {


        if (req.file) {
            updateData.Image = req.file.path; 
        }

        const updatedEmployee = await Employee.findOneAndUpdate(
            { Id: Id },              
            { $set: updateData },     
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({
            message: 'Employee updated successfully',
            employee: updatedEmployee
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const deleteEmployee = async (req, res) => {
    const { Id } = req.params;

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ Id: Id });

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({
            message: 'Employee deleted successfully',
            employee: deletedEmployee
        });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

};

module.exports = {createEmployee, updateEmployee, deleteEmployee, getEmployees}