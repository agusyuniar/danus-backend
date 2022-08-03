const {sqlDB} = require('../database');
const cryp = require('crypto')
const { createJWTToken } = require('../helpers/jwt')


const kuncirahasia = 'powerranger'
module.exports = {
    keepLogin: (req,res) => {
        console.log('sCline9 ',req);
        res.status(200).send({ ...req.user, token: req.token })

    },
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
        console.log('login : ',username);
        console.log('pass: ',password);
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
            var token = createJWTToken({...result[0]},{expiresIn:'1h'})
            res.status(200).send({...result[0], token})
        })
    },

    registerStaff: (req,res) => {
        req.body.password = cryp.createHmac('sha256',kuncirahasia)
            .update(req.body.password)
            .digest('hex');
        let scriptCekUsername = `select * from staff where username = ${sqlDB.escape(req.body.username)}`

        sqlDB.query(scriptCekUsername, (err, resultUsername) => {
            console.log('cek username : ', resultUsername);
            if(err) return res.status(500).send({message: 'Database error (username)', err, error:true})

            if(resultUsername.length>0){
                return res.status(500).send({err, message: 'Username sudah terdaftar'})
            }
            let scriptRegis = `insert into staff set ? `
            sqlDB.query(scriptRegis, req.body, (err, results) => {
                if(err) return res.status(500).send({message:'Database error (gagal insert)', err, error:true})

                var {username, password} = req.body;
                var token = createJWTToken({username, password});

                res.status(200).send({result: results, username: req.body.username})
            })
        })
    }
}