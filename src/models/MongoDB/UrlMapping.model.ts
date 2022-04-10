import mongoose from 'mongoose';

const urlMappingSchema = new mongoose.Schema({
    original_url: String,
    short_url: {
        type: String,
        index: { unique: true }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    accessed_at: Date
});

const UrlMapping = mongoose.model('UrlMapping', urlMappingSchema);

export default UrlMapping;
