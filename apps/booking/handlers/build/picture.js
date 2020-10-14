const fs = require("fs");
const { PictureModel } = require("../../models")

const PictureRestHandlers = {
    get:(req, res)=>{
        PictureModel.select(`room = ${req.params.idRoom}`)
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
        const myFile = req.files.file;
        myFile.mv(`${__dirname}/../../../../public/img/${myFile.name}`,(err)=>{
            if (err){
                console.log(err);
            }

            PictureModel.insert(req.body.description, `/img/${myFile.name}`, req.body.room)
            .then((object)=>{
                res.send(object);
            })
            .catch((err)=>{
                throw err;
            });
        })
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
        PictureModel.select(`id = ${req.params.id}`)
        .then((pictures)=>{
            const picture = pictures[0];
            fs.unlink(`${__dirname}/../../../../public/${picture.url}`, (err)=>{
                if (err){
                    console.error(err);
                }
                PictureModel.delete(`id = ${req.params.id}`)
                .then((object)=>{
                    res.send({})
                })
                .catch((err)=>{
                    throw err;
                })
            }
            )
        })
    },
}

module.exports.PictureRestHandlers = PictureRestHandlers;