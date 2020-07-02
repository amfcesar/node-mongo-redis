const redis = require('redis');
const client = redis.createClient();

const PersonRepository = require('../repositories/personRepository');

const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

exports.get = (_ , res) => {

    client.get('allpersons',async (err, reply) => {

        if (reply) return res.json(JSON.parse(reply))
        
        const person = await PersonRepository.getAll();
        client.set('allpersons', JSON.stringify(person));
        client.expire('allpersons', 60);
       
        return res.status(200).send(person);
    });

}

exports.getById = async (req, res) => {
    const { id: idOrEmail } = req.params;
    let response;
    
    if(!emailValidation.test(idOrEmail)) {
        response = await PersonRepository.getById(idOrEmail);
    }else {
        response = await PersonRepository.getByEmail(idOrEmail);
    }
       
    if(!response) return res.status(204).send();

    return res.status(200).send(response);
};

exports.post =  async (req, res) => {
    const person = req.body;
    const { mail } = person;

    if (await PersonRepository.existsByEmail(mail))
         return res.status(400).json({ err: "Email já existe!"});

    const creat = await PersonRepository.create(person);
    return res.status(200).send(creat);
};

exports.put = async (req, res) => {
    const { id } = req.params;
    const person = req.body;
    const response = await PersonRepository.update(id, person);
    if (!response) return res.status(204).send();
    
    return res.status(200).send(response);     
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await PersonRepository.delete(id);

    return res.status(200).json({ message: 'registro deletado com sucesso!'});
};

exports.getByEmail = async (req, res) => {
    const { email } = req.params;
    const response = await PersonRepository.getByEmail(email);

    if (!response) return res.status(204).send();
    
    return res.status(200).json(response);
};