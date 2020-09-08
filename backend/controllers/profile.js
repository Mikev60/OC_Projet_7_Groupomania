const bdd = require('../mysqlConfig');
const fs = require('fs');
const bcrypt = require('bcrypt'); 

exports.updateAvatar = (req, res, next) => {

    let avatarToUpload = `${req.protocol}://${req.get('host')}/profiles/${req.file.filename}`
    let avatarToDelete = req.body.avatarActuel.split('/profiles/')[1];

    console.log(avatarToDelete);

    fs.unlink(`images/profiles/${avatarToDelete}`, () => {
        bdd.query('UPDATE users SET avatar="'+avatarToUpload+'" WHERE id="'+req.body.userId+'"', (err, result) => {
            if(err) throw err;
            return res.status(201).json({ message: 'Avatar changé '})
        })
    })
    console.log('route avatar ok');
}

exports.changePassword = (req, res, next) => {
    console.log(req.body);
        bdd.query('SELECT password FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
            if(err) throw err; 
            bcrypt.compare(req.body.currentPassword, resultat[0].password)
            .then(valid => {
                if(!valid){
                    if(!valid) return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas"});
                }
                bcrypt.hash(req.body.newPassword, 10)
                    .then(hash => {
                        bdd.query('UPDATE users SET password="'+hash+'" WHERE id="'+req.body.userId+'"', (err, result) => {
                            if(err) throw err;
                            return res.status(200).json({ message: 'Le mot de passe a bien été changé '});
                        })
                    })
                    .catch(error => console.log(error));
            })
        })
}

exports.deleteAccount = (req,res,next) => {
    bdd.query('SELECT password, avatar FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
        if(err) throw err; 
        bcrypt.compare(req.body.password, resultat[0].password)
        .then(valid => {
            if(!valid){
                if(!valid) return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas"});
            }
            let avatarToDelete = resultat[0].avatar.split('/profiles')[1]
            fs.unlink(`images/profiles/${avatarToDelete}`, () => { 
                bdd.query('DELETE FROM users WHERE id="'+req.body.userId+'"',(err, result) => {
                    if(err) throw err;
                    console.log("utilisateur supprimé")
                    bdd.query('DELETE FROM posts WHERE authorId="'+req.body.userId+'"',(err, result) => { 
                        if(err) throw err;
                        console.log("posts supprimés")
                        bdd.query('DELETE FROM answers WHERE idAuteur="'+req.body.userId+'"',(err, result) => { 
                            if(err) throw err;
                            console.log('messages supprimés');
                            return res.status(200).json({ message: 'Votre compte a bien été supprimé, vous allez être redirigé'});
                        })
                    })
                })
            })

        })
    })
}