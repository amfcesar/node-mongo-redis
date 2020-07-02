const redis = require('redis');
const client = redis.createClient();

const Person = require('../config/db');

const expired = () => client.expire('allpersons', 0);

const PersonRepository = {}; 

PersonRepository.getAll = () => Person.find();

PersonRepository.getById = (id) => Person.findById(id);

PersonRepository.create = (person) => {
    expired();
    return Person.create(person);
} 

PersonRepository.update = (id, person) => {
    expired();
    return Person.findByIdAndUpdate(id, { ...person }, { new : true} );
} 

PersonRepository.delete = (id) => {
    expired();
    return Person.findByIdAndRemove(id);
}

PersonRepository.getByEmail = (email) => Person.findOne({ mail: email });

PersonRepository.existsByEmail = (email) => Person.exists({ mail: email });

module.exports = PersonRepository;



