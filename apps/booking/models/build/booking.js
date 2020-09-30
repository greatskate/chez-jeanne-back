const { Client } = require('pg');

class Booking{
    constructor(id, room, price, dayStart, dayEnd, email, name, reference){
        this.id = id;
        this.room = room; 
this.price = price; 
this.dayStart = dayStart; 
this.dayEnd = dayEnd; 
this.email = email; 
this.name = name; 
this.reference = reference; 

    }
}

module.exports.Booking = Booking;

const BookingModel = {
    createTable: () => new Promise((succes, fail) => {
        
        const CREATE_TABLE = `
            CREATE TABLE bookings (
                id serial PRIMARY KEY, 
            room INTEGER REFERENCES rooms(id),
            price FLOAT,
            dayStart DATE,
            dayEnd DATE,
            email VARCHAR(100),
            name VARCHAR(100),
            reference VARCHAR(10)
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
    insert: (room, price, dayStart, dayEnd, email, name, reference) => new Promise((succes, fail) => {
        
        const INSERT = `
        INSERT INTO
            bookings(room, price, dayStart, dayEnd, email, name, reference)
        VALUES(${room}, ${price}, ${dayStart}, ${dayEnd}, '${email}', '${name}', '${reference}');
        SELECT currval('bookings_id_seq');
    `;
        const client = new Client();
        client.connect();
        client.query(INSERT)
            .then((res) => {
            client.end();
            succes(new Booking(res[1].rows[0].currval,room, price, dayStart, dayEnd, email, name, reference));
            })
            .catch((err) => {
            client.end();
            fail(err);
            });
    
    }),
    select: (condition) => new Promise((succes, fail) => {
        
        const SELECT = `
        SELECT
            id, room, price, dayStart, dayEnd, email, name, reference
        FROM
            bookings
        ${condition !== '' ? 'WHERE' : ''} ${condition};
        `;
        const client = new Client();
        client.connect();
        client.query(SELECT)
            .then((res) => {
            const objects = [];
            for (let i = 0; i < res.rows.length; i += 1) {
                objects.push(new Booking(res.rows[i].id, res.rows[i].room, res.rows[i].price, res.rows[i].dayStart, res.rows[i].dayEnd, res.rows[i].email, res.rows[i].name, res.rows[i].reference));
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
            UPDATE bookings
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
            bookings
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


module.exports.BookingModel = BookingModel;