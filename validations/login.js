import { body } from "express-validator";

// валидируем тело запроса
export const loginValidation = [
    //  свойство email является емайлом ?
    body(
        'email',
        'Неверный формат почты'
         ).isEmail(),
    // поле password должно быть минимум 5 символов
    body(
        'password',
        'Пароль должен быть минимум 5 символов'
        ).isLength({min: 5}),
    // поле fullname должно быть минимум 3 символа

];