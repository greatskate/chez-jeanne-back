const { Client } = require('pg');

class Room{
    constructor(id, name, description, price){
        this.id = id;
        this.name = name; 
this.description = description; 
this.price = price; 

    }
}

module.exports.Room = Room;

const RoomModel = {
    createTable: () => new Promise((succes, fail) => {
        
        const CREATE_TABLE = `
            CREATE TABLE rooms (
                id serial PRIMARY KEY, 
            name VARCHAR(40),
            description TEXT,
            price FLOAT
            );
        `;
        const client = new Client();
        client.connect();
        client.query(CREATE_TABLE)
        .then(() => {
            client.end();
            succes();
        });
    
    }),
    insert: (name, description, price) => new Promise((succes, fail) => {
        
        const INSERT = `
        INSERT INTO
            rooms(name, description, price)
        VALUES('${name}', '${description}', ${price});
        SELECT currval('rooms_id_seq');
    `;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new Room(res[1].rows[0].currval,name, description, price));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    select: (condition) => new Promise((succes, fail) => {
        
        const SELECT = `
        SELECT
            id, name, description, price
        FROM
            rooms
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new Room(res.rows[i].id, res.rows[i].name, res.rows[i].description, res.rows[i].price));
            }
            client.end();
            succes(objects);
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    update: (object, condition) => new Promise((succes, fail) => {
        
            const UPDATE = `
            UPDATE rooms
            SET
            ${Object.keys(object).map((key)=>`${key} = '${object[key]}'`)}
            ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
            const client = new Client();
            client.connect();
            client.query(UPDATE)
                .then(() => {
                client.end();
                succes(object);
                })
                .catch((err) => {
                client.end();
                fail(err);
                });
    
    }),
    delete: (condition) => new Promise((succes, fail) => {
        
        const DELETE = `
        DELETE
        FROM
            rooms
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(DELETE)
            .then((res) => {
            client.end();
            succes();
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    })
}


module.exports.RoomModel = RoomModel;