const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createLegalRecord,
    getLegalRecordByProperty,
    getMyLegalRecords,
    getAllLegalRecords,
    updateLegalStatus,
    addDocuments
} = require('../controllers/legalController');

// Public
router.get('/property/:propertyId', getLegalRecordByProperty);

// Lawyer-only routes
router.post('/', protect, authorize('Lawyer', 'Admin'), createLegalRecord);
router.get('/my', protect, authorize('Lawyer'), getMyLegalRecords);
router.patch('/:id/status', protect, authorize('Lawyer', 'Admin'), updateLegalStatus);
router.patch('/:id/documents', protect, authorize('Lawyer'), addDocuments);

// Admin-only
router.get('/', protect, authorize('Admin'), getAllLegalRecords);

module.exports = router;
