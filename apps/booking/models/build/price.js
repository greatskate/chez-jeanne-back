const { Client } = require('pg');

class Price{
    constructor(id, room, day, price){
        this.id = id;
        this.room = room; 
this.day = day; 
this.price = price; 

    }
}

module.exports.Price = Price;

const PriceModel = {
    createTable: () => new Promise((succes, fail) => {
        
        const CREATE_TABLE = `
            CREATE TABLE prices (
                id serial PRIMARY KEY, 
            room INTEGER REFERENCES rooms(id),
            day DATE,
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
    insert: (room, day, price) => new Promise((succes, fail) => {
        
        const INSERT = `
        INSERT INTO
            prices(room, day, price)
        VALUES(${room}, ${day}, ${price});
        SELECT currval('prices_id_seq');
    `;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new Price(res[1].rows[0].currval,room, day, price));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    select: (condition) => new Promise((succes, fail) => {
        
        const SELECT = `
        SELECT
            id, room, day, price
        FROM
            prices
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new Price(res.rows[i].id, res.rows[i].room, res.rows[i].day, res.rows[i].price));
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
            UPDATE prices
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
            prices
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


module.exports.PriceModel = PriceModel;