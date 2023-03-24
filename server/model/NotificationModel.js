import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const NotificationModel = new mongoose.model('Notification', notificationSchema);
export default NotificationModel