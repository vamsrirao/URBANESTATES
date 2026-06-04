const express = require('express');
const router = express.Router();
const { 
    getProperties, 
    searchProperties, 
    getPropertyById, 
    createProperty 
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');

router.get('/search', searchProperties);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, authorize('Seller', 'Agent', 'Admin'), createProperty);

module.exports = router;
