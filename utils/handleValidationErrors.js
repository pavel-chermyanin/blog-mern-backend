import { validationResult } from "express-validator"; 

export default (req, res, next) => {
    // validationResult отловит ошибки валидации
    // если есть поместить в errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // вернуть все ошибки
        return res.status(400).json(errors.array())
    }

    next()
}
