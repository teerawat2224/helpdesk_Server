const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ฟังก์ชันจัดการเคส
const getAllCases = async (req, res) => {
    try {
        const cases = await prisma.case.findMany();
        res.json(cases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cases', error });
    }
};

const createCase = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newCase = await prisma.case.create({
            data: { title, description },
        });
        res.status(201).json(newCase);
    } catch (error) {
        res.status(500).json({ message: 'Error creating case', error });
    }
};

const updateCase = async (req, res) => {
    const { title, description } = req.body;
    try {
        const updatedCase = await prisma.case.update({
            where: { id: parseInt(req.params.id) },
            data: { title, description },
        });
        res.json(updatedCase);
    } catch (error) {
        res.status(500).json({ message: 'Error updating case', error });
    }
};

const deleteCase = async (req, res) => {
    try {
        await prisma.case.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json({ message: 'Case deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting case', error });
    }
};

// ฟังก์ชันจัดการสถานที่
const getAllLocations = async (req, res) => {
    try {
        const locations = await prisma.location.findMany();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

const createLocation = async (req, res) => {
    const { name, address } = req.body;
    try {
        const newLocation = await prisma.location.create({
            data: { name, address },
        });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating location', error });
    }
};

// ฟังก์ชันจัดการผู้รับผิดชอบ
const getAllResponsibles = async (req, res) => {
    try {
        const responsibles = await prisma.responsible.findMany();
        res.json(responsibles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching responsibles', error });
    }
};

// ฟังก์ชันจัดการผู้ใช้งาน
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany(); // ตรวจสอบว่า prisma.users ตรงกับชื่อ model ใน Prisma schema
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error); 
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};


const updateUserRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        console.log("Received userId:", userId);
        console.log("Received role:", role);

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: { role },
        });

        res.json({ message: 'User role updated successfully', updatedUser });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: 'Error updating user role', error: error.message || error });
    }
};



// ฟังก์ชันจัดการปฏิทิน
const getCalendarEvents = async (req, res) => {
    try {
        const events = await prisma.calendarEvent.findMany();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching calendar events', error });
    }
};



const getAllReports = async (req, res) => {
    try {
        const reports = await prisma.reports.findMany();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all reports', error });
    }
};

// ลบรายงาน
const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        await prisma.reports.delete({
            where: { id: reportId },
        });
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error });
    }
};

// ส่งออกฟังก์ชันทั้งหมด
module.exports = {
    getAllCases,
    createCase,
    updateCase,
    deleteCase,
    getAllLocations,
    createLocation,
    getAllResponsibles,
    getAllUsers,
    getCalendarEvents,
    updateUserRole,
    getAllReports,
    deleteReport,
};
