import express from 'express'
import multer from 'multer';
import mongoose from 'mongoose';



import { registerValidation } from './validations/auth.js';
import { loginValidation } from './validations/login.js';
import { postValidation } from './validations/post.js';



import {
    checkAuth,
    handleValidationErrors
} from './utils/index.js'

import {
    UserController,
    PostController
} from './controllers/index.js';


// подключаемся к базе данных
mongoose
    .connect('mongodb+srv://firstDB:wwwwww@cluster0.g6hue.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB ok!');
    })
    .catch((err) => {
        console.log('DB error!!', err);
    })

// создаем приложение    
const app = express();



// создаем хранилище для картинок при помощи multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb не принимает ошибок, но принимает путь
        cb(null, 'uploads')
    },
    // прежде чем сохранить скажеи имя файла
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

// для роута картинок
const upload = multer({ storage })

// чтобы сервер понимал json
app.use(express.json())
// объясняем экспрессу откуда брать картинки
app.use('/uploads', express.static('uploads'))

// POST
// роут для авторизации
// handleValidationErrors отловит ошибки
app.post(
    '/auth/login',
    loginValidation,
    handleValidationErrors,
    UserController.login
)
// роут для регистрации
// сначала провалидируем с помощью registerValidation
app.post(
    '/auth/register',
    registerValidation,
    handleValidationErrors,
    UserController.register
)
// checkAuth проверит авторизацию 
app.get('/auth/me', checkAuth, UserController.getMe)


app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`
    })
})





app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post(
    '/posts',
    checkAuth,
    postValidation,
    handleValidationErrors,
    PostController.create
)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
    '/posts/:id',
    checkAuth,
    checkAuth,
    PostController.update
)

// приложение слушает порт 4444,
// в случае чего обработаем ошибку
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server ok!');
})