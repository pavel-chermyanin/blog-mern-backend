import { body } from "express-validator";

// валидируем тело запроса
export const registerValidation = [
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
    body(
        'fullname',
        'Укажите имя'
        ).isLength({min: 3}),
    // необязательное поле
    // если придет проверь, является ли это ссылкой
    body(
        'avatarUrl',
        'Неверная ссылка на автарку'
        ).optional().isURL(),
];