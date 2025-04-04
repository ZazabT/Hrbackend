import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';  
import { departments } from '../drizzle/schema.js';  

// Helper function to check if a department exists
const checkDepartmentExists = async (id) => {
    const department = await db.select().from(departments).where(eq(departments.id, id));
    return department.length > 0;
};

// GET ALL DEPARTMENTS CONTROLLER
export const getAllDepartments = async (req, res) => {
    try {
        const departmentsList = await db.select().from(departments);
        if (departmentsList.length === 0) {
            return res.status(200).json({'message': 'No departments found', 'count': 0});
        }
        res.status(200).json({'departments': departmentsList, 'count': departmentsList.length, 'message': 'Departments fetched successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

// GET DEPARTMENT BY ID CONTROLLER
export const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await db.select().from(departments).where(eq(departments.id, id));
        if (department.length === 0) {
            return res.status(404).json({'message': 'Department not found'});
        }
        res.status(200).json({'department': department[0], 'message': 'Department fetched successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

// POST (ADD) DEPARTMENT CONTROLLER
export const addDepartment = async (req, res) => {
    const { name, departmentDescription } = req.body;
    if (!name || !departmentDescription) {
        return res.status(400).json({'message': 'Both name and department description are required'});
    }
    try {
        const department = await db.insert(departments).values({ name, departmentDescription });
        res.status(201).json({'department': department, 'message': 'Department created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

// UPDATE DEPARTMENT BY ID CONTROLLER
export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, departmentDescription } = req.body;
    if (!await checkDepartmentExists(id)) {
        return res.status(404).json({'message': 'Department not found'});
    }
    try {
        const updatedDepartment = await db.update(departments).set({ name, departmentDescription }).where(eq(departments.id, id));
        res.status(200).json({'department': updatedDepartment, 'message': 'Department updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

// DELETE DEPARTMENT BY ID CONTROLLER
export const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    if (!await checkDepartmentExists(id)) {
        return res.status(404).json({'message': 'Department not found'});
    }
    try {
        const deletedDepartment = await db.delete(departments).where(eq(departments.id, id));
        res.status(200).json({'department': deletedDepartment, 'message': 'Department deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};
