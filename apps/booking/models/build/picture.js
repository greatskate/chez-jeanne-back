const { Client } = require('pg');

class Picture{
    constructor(id, description, url, room){
        this.id = id;
        this.description = description; 
this.url = url; 
this.room = room; 

    }
}

module.exports.Picture = Picture;

const PictureModel = {
    createTable: () => new Promise((succes, fail) => {
        
        const CREATE_TABLE = `
            CREATE TABLE pictures (
                id serial PRIMARY KEY, 
            description TEXT,
            url VARCHAR(100),
            room INTEGER REFERENCES rooms(id)
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
    insert: (description, url, room) => new Promise((succes, fail) => {
        
        const INSERT = `
        INSERT INTO
            pictures(description, url, room)
        VALUES('${description}', '${url}', ${room});
        SELECT currval('pictures_id_seq');
    `;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new Picture(res[1].rows[0].currval,description, url, room));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    select: (condition) => new Promise((succes, fail) => {
        
        const SELECT = `
        SELECT
            id, description, url, room
        FROM
            pictures
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new Picture(res.rows[i].id, res.rows[i].description, res.rows[i].url, res.rows[i].room));
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
            UPDATE pictures
            SET
            ${Object.keys(object).map((key)=>`${key} = ${object[key]}`)}
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
            pictures
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


module.exports.PictureModel = PictureModel;