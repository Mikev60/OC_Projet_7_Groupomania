const bdd = require('../mysqlConfig');
const fs = require('fs');
const bcrypt = require('bcrypt'); 

exports.getFlagged = (req, res, next) => {

    console.log('route dashboard ok');
}

exports.flagPost = (req,res,next) => {
    bdd.query('SELECT role FROM users WHERE id="'+req.body.userId+'"', (err, result) => { // Vérification des accès de celui qui fait la requête
        if(err) {
            return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
        }
        if(result[0].role == "admin" && req.body.roleUser == "admin") {
            bdd.query('UPDATE posts SET isFlagged="1" WHERE id="'+req.body.idToFlag+'"', (err, result) => {
                if(err) {
                    return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
                }
                return res.status(200).json({ message: 'Le poste a bien été flag'});
            })
        }
    })
}
