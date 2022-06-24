import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'


export const register = async (req, res) => {
    // try catch поможет отловить ошибки
    try {
    
        // сохраняем пароль
        // создаем алгоритм шифрования
        // шифруем пароль
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        // создаем документ для mongoDB из запроса
        const doc = new UserModel({
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
            passwordHash: hash,
        });

        // сохраняем пользователя
        const user = await doc.save()

        // создаем токен(id) из id пользователя
        // строка для шифрования
        // на 30 дней
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        )

        // отдадим ответ клиенту без пароля
        // и отдадим токен
        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }


}

export const login = async (req, res) => {
    try {
        // есть ли User с таким email ?
        const user = await UserModel.findOne({
            email: req.body.email
        })

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        // если есть сравним их пароли
        const isValidPass = await bcrypt.compare(
            req.body.password, user._doc.passwordHash
        )
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        )

        const { passwordHash, ...userData } = user._doc;

        // отправляем ответ
        res.json({
            ...userData,
            token
        });


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}

export const getMe = async (req, res) => {
    // если checkAuth успешен, управление перейдет сюда
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const { passwordHash, ...userData } = user._doc;

        res.json({ userData });
    } catch (err) {
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}