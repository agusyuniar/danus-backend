const {sqlDB} = require('../database');
const cryp = require('crypto')
const { createJWTToken } = require('../helpers/jwt')


const kuncirahasia = 'powerranger'
module.exports = {
    list: (req,res) => {
        const sql = 'SELECT * from staff';
        sqlDB.query(sql,(err,results)=>{
            console.log(results);
            console.log(err);
            if(err) return res.status(500).send({
                
                message:'gagal memuat list stafff'})

            res.status(200).send(results)         
        })
    },
    login: (req,res) => {
        var {username,password} = req.body;
        // password = cryp.createHmac('sha256', kuncirahasia)
        //             .update(password)
        //             .digest('hex');
        console.log(username);
        console.log(password);
        var sql = `SELECT username, password
                    FROM staff
                    WHERE username = ${sqlDB.escape(username)}
                    AND password = ${sqlDB.escape(password)};`;
                    // WHERE username = ${(username)}
                    // AND password = ${(password)}`;
        
        sqlDB.query(sql, (err, result) => {
            if(err) return res.status(500).send({err, message:'Database Error'});
            if(result.length === 0){
                return res.status(500).send({message:'Username atau Password salah'})
            }
            console.log('sukses');
            var token = createJWTToken({...result[0]},{expiresIn:'2h'})
            res.status(200).send({...result[0], token})
        })
    }
}