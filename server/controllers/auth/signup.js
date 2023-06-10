const db = require('../../database.js')
const bcrypt = require('bcrypt')
const signup = async (req, res) =>{

    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const username = req.body.username; 
    const email = req.body.email; 

    const query = "INSERT INTO register (username, password, email) VALUES (?,?,?)";
    db.query(query, [username, hashedPassword, email], (error, data)=>{
        if(error){
            // console.log(error);
            res.status(500).send(error);
        }else{
            res.status(200).send(data);
        }
    })
}

module.exports = {signup};
