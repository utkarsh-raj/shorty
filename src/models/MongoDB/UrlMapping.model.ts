import mongoose from 'mongoose';

const urlMappingSchema = new mongoose.Schema({
    original_url: String,
    short_url: {
        type: String,
        index: { unique: true }
    },
    expire_at: Date
});

urlMappingSchema.index({ expire_at: 1 }, { expireAfterSeconds: 0 });

const UrlMapping = mongoose.model('UrlMapping', urlMappingSchema);

export default UrlMapping;
