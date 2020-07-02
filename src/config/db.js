const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_employees', 
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } );

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        min: 3,
        max: 80
    }, 
    mail: { 
        type: String, 
        unique: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN']
    } 
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;

