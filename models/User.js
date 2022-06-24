import mongoose from "mongoose";


// создаем схему User
const UserSchema = new mongoose.Schema(
    {
        // поле fullname - обязательная строка
        fullname: {
            type: String,
            required: true,
        },
        // поле email - обязательная уникальная строка
        email: {
            type: String,
            required: true,
            unique: true
        },
        // зашифруем в отдельном файле
        passwordHash: {
            type: String,
            required: true,
        },
        // необязательное строкое поле
        avatarUrl: String,
    },
    // при создании User прикрутить дату создания и обновления
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema)