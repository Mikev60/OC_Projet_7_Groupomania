const bdd = require('../mysqlConfig');

exports.postMessage = (req, res, next) => {
    let syntaxeMessage = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,100}$/;
    if(syntaxeMessage.test(req.body.message) && req.file != null) {
        let dataPost = {
            authorId: req.body.authorId,
            image: `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`, 
            message: req.body.message
        }
        bdd.query('INSERT INTO posts SET ?', dataPost,  (err, resultat) => {
            if(err) {
                console.log(err); 
                res.status(501).json({ message: 'Erreur dans le post '});
                throw err; 
            }
            return res.status(201).json({ message: 'Post effectué ! '});
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans les données transmises '});
    }


}

exports.postAnswer = (req,res, next) => {
    let syntaxeMessage = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,100}$/;
    if(syntaxeMessage.test(req.body.message)) {
        let dataAnswer = {
            idPost: req.body.postId,
            auteur: req.body.auteur, 
            message: req.body.message,
            idAuteur: req.body.idAuteur
        }
        bdd.query('INSERT INTO answers SET ?', dataAnswer, (err, resultat) => {
            if(err){
                console.log(err);
                res.status(201).json({ message: 'Erreur dans les données transmises'});
                throw err;
            }
            return res.status(201).json({ message: 'Réponse postée ! '});
        })
    }
    else {
        return res.status(501).json({ message: 'Erreur dans la syntaxe message' });
    }
}

exports.getAllPosts = (req, res, next) => {
    bdd.query('SELECT * FROM posts ORDER BY id DESC', (err, resultat) => {
        if(err) throw (err);
        console.log('boucle requête')
        return res.status(200).json({ resultat });
    })
}

exports.getAnswers = (req,res,next) => {
    bdd.query('SELECT answers.*, users.avatar FROM answers JOIN users ON answers.idAuteur = users.id AND answers.idPost="'+req.params.id+'" ORDER BY id DESC', (err, resultat) => {
        if(err) throw err;
        console.log(resultat);
        return res.status(200).json({ resultat });
    })
}