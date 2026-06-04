const legalService = require('../services/legalService');

// @desc    Create a legal record for a property
// @route   POST /api/legal
// @access  Private (Lawyer/Admin)
const createLegalRecord = async (req, res) => {
    try {
        // Inject lawyerId from authenticated user if not provided (Lawyer role)
        const data = {
            ...req.body,
            lawyerId: req.body.lawyerId || req.user._id
        };
        const record = await legalService.createLegalRecord(data);
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get legal record for a property
// @route   GET /api/legal/property/:propertyId
// @access  Public
const getLegalRecordByProperty = async (req, res) => {
    try {
        const record = await legalService.getLegalRecordByProperty(req.params.propertyId);
        if (!record) return res.status(404).json({ message: 'No legal record found for this property' });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all legal records assigned to logged-in lawyer
// @route   GET /api/legal/my
// @access  Private (Lawyer)
const getMyLegalRecords = async (req, res) => {
    try {
        const records = await legalService.getLegalRecordsByLawyer(req.user._id);
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all legal records (Admin)
// @route   GET /api/legal
// @access  Private (Admin)
const getAllLegalRecords = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await legalService.getAllLegalRecords(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update legal record status
// @route   PATCH /api/legal/:id/status
// @access  Private (Lawyer/Admin)
const updateLegalStatus = async (req, res) => {
    try {
        const { status, rejectionReason } = req.body;
        if (!status) return res.status(400).json({ message: 'Status is required' });
        const record = await legalService.updateLegalStatus(req.params.id, status, rejectionReason);
        res.json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add documents to a legal record
// @route   PATCH /api/legal/:id/documents
// @access  Private (Lawyer)
const addDocuments = async (req, res) => {
    try {
        const { urls } = req.body;
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return res.status(400).json({ message: 'urls array is required' });
        }
        const record = await legalService.addDocuments(req.params.id, req.user._id, urls);
        res.json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createLegalRecord,
    getLegalRecordByProperty,
    getMyLegalRecords,
    getAllLegalRecords,
    updateLegalStatus,
    addDocuments
};
