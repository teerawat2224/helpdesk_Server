const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// ดึงรายงานทั้งหมด


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

module.exports = { getAllReports, deleteReport };