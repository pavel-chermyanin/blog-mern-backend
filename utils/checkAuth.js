import jwt from "jsonwebtoken";

// функция выполнится при GET запросе /auth/me
export default (req, res, next) => {
    const token = (req.headers.authorization || '')
        .replace(/Bearer\s?/, '');

    if (token) {
        try {
            // расшифровываем token
            const decoded = jwt.verify(token, 'secret123');
            // сохраняем в поле запроса
            req.userId = decoded._id;
            // передаем управление роуту
            next();
        } catch (error) {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }

}