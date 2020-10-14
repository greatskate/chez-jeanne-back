const { RoomModel } = require("../../models");
const { PictureModel } = require("../../models/build/picture");

const RoomRestHandlers = {
    get:(req, res)=>{
        RoomModel.select('')
        .then((rooms)=>{
            const returnRooms = rooms;
            for(let i = 0; i<returnRooms.length;i++){
                returnRooms[i].pictures = [];
            }
            PictureModel.select('').then(
                (pictures)=>{
                    for(let i = 0;i<pictures.length;i++){
                        for (let j = 0; j<returnRooms.length; j++){
                            if (pictures[i].room === returnRooms[j].id){
                                returnRooms[j].pictures.push(pictures[i]);
                            }
                        }
                    }
                    res.send(returnRooms);
                }
            )
        })
        .catch((err)=>{
            throw err;
        })
    },
    getOne:(req, res)=>{
        RoomModel.select(`id = ${req.params.id}`)
        .then((users)=>{
            res.send(users);
        })
        .catch((err)=>{
            throw err;
        })
    },
    post: (req, res) =>{
        RoomModel.insert(req.body.name, req.body.description, req.body.price)
        .then((object)=>{
            res.send(object);
        })
        .catch((err)=>{
            throw err;
        });
    },
    put: (req, res) =>{
        RoomModel.update(req.body, `id = ${req.params.id}`)
        .then((object)=>{
            res.send(object)
        })
        .catch((err)=>{
            throw err;
        })
    },
    delete: (req, res) =>{
        RoomModel.delete(`id = ${req.params.id}`)
        .then((object)=>{
            res.send({})
        })
        .catch((err)=>{
            throw err;
        })
    },
}

module.exports.RoomRestHandlers = RoomRestHandlers;