const LegalRecord = require('../models/LegalRecord');

/**
 * Create a legal record for a property
 */
const createLegalRecord = async (data) => {
    const { propertyId, lawyerId, documentUrls = [], notes = '' } = data;

    // A property should have at most one active (non-rejected) legal record
    const existing = await LegalRecord.findOne({
        propertyId,
        status: { $in: ['PENDING_VERIFICATION', 'VERIFIED'] }
    });
    if (existing) {
        throw new Error('An active legal record already exists for this property');
    }

    const record = await LegalRecord.create({
        propertyId,
        lawyerId,
        documentUrls,
        notes
    });
    return record;
};

/**
 * Get legal record for a property
 */
const getLegalRecordByProperty = async (propertyId) => {
    return await LegalRecord.findOne({ propertyId })
        .populate('lawyerId', 'name email phone')
        .populate('propertyId', 'title location.address price');
};

/**
 * Get all legal records assigned to a lawyer
 */
const getLegalRecordsByLawyer = async (lawyerId) => {
    return await LegalRecord.find({ lawyerId })
        .populate('propertyId', 'title location.address location.city price images')
        .sort({ createdAt: -1 });
};

/**
 * Get all legal records — Admin
 */
const getAllLegalRecords = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
        LegalRecord.find()
            .populate('propertyId', 'title location.address')
            .populate('lawyerId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        LegalRecord.countDocuments()
    ]);
    return { records, total, page, pages: Math.ceil(total / limit) };
};

/**
 * Update legal record status
 */
const updateLegalStatus = async (recordId, status, rejectionReason = null) => {
    const allowedStatuses = ['PENDING_VERIFICATION', 'VERIFIED', 'REJECTED'];
    if (!allowedStatuses.includes(status)) {
        throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(', ')}`);
    }

    const update = { status };
    if (status === 'REJECTED' && rejectionReason) {
        update.rejectionReason = rejectionReason;
    }

    const record = await LegalRecord.findByIdAndUpdate(recordId, update, {
        new: true,
        runValidators: true
    });
    if (!record) throw new Error('Legal record not found');
    return record;
};

/**
 * Add document URLs to a record
 */
const addDocuments = async (recordId, lawyerId, urls) => {
    const record = await LegalRecord.findOne({ _id: recordId, lawyerId });
    if (!record) throw new Error('Legal record not found or unauthorized');
    record.documentUrls.push(...urls);
    await record.save();
    return record;
};

module.exports = {
    createLegalRecord,
    getLegalRecordByProperty,
    getLegalRecordsByLawyer,
    getAllLegalRecords,
    updateLegalStatus,
    addDocuments
};
