
import PostModel from '../models/Post.js'

// функции обработчики запросов
// работаем с нашей моделью PostModel


export const getAll = async (req, res) => {
    try {
        // связываем наши модели
        const posts = await PostModel
            .find()
            .populate('user')
            .exec()

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}


export const getOne = async (req, res) => {
    try {
        // отловить динамический параметр
        // найти статью и обновить поле viewsCount на 1
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            },

            // функция обработчик
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть статью'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }
                res.json(doc)
            }
        )


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const remove = async (req, res) => {
    try {

        const postId = req.params.id
        PostModel.findOneAndDelete(
            {
                _id: postId
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Не удалось получить статьи'
                    })
                }

                if (!doc) {
                    if (!doc) {
                        return res.status(404).json({
                            message: 'Статья не найдена'
                        })
                    }
                }

                res.json({
                    success: true
                })
            }
        )


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save()
        res.json(post)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}
export const update = async (req, res) => {
    try {

        const postId = req.params.id
        
        await PostModel.updateOne(

            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        )

        res.json({
            message: true
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}