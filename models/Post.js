import mongoose from "mongoose";


// создаем схему User
const PostSchema = new mongoose.Schema(
    // наша модель получения данных
    {
        title: {
            type: String,
            required: true,
        },
        
        text: {
            type: String,
            required: true,
            unique: true
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        // здесь мы создаем связь между двумя таблицами
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        imageUrl: String,
    },

    {
        timestamps: true
    }
)

export default mongoose.model('Post', PostSchema)