const { PictureModel } = require("../../models")

const PictureRestHandlers = {
    get:(req, res)=>{
        PictureModel.select('')
        .then((users)=>{
            res.send(users);
        })
        .catch((err)=>{
            throw err;
        })
    },
    getOne:(req, res)=>{
        PictureModel.select(`id = ${req.params.id}`)
        .then((users)=>{
            res.send(users);
        })
        .catch((err)=>{
            throw err;
        })
    },
    post: (req, res) =>{
        PictureModel.insert(req.body.description, req.body.url, req.body.room)
        .then((object)=>{
            res.send(object);
        })
        .catch((err)=>{
            throw err;
        });
    },
    put: (req, res) =>{
        PictureModel.update(req.body, `id = ${req.params.id}`)
        .then((object)=>{
            res.send(object)
        })
        .catch((err)=>{
            throw err;
        })
    },
    delete: (req, res) =>{
        PictureModel.delete(`id = ${req.params.id}`)
        .then((object)=>{
            res.send({})
        })
        .catch((err)=>{
            throw err;
        })
    },
}

module.exports.PictureRestHandlers = PictureRestHandlers;