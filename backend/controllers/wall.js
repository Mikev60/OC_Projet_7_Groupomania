const bdd = require('../mysqlConfig');

exports.postMessage = (req, res, next) => {
    let syntaxeMessage = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,100}$/;
    if(syntaxeMessage.test(req.body.message) && req.file != null) {
        let dataPost = {
            authorId: '1',
            image: req.file.originalname, 
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

exports.getAllPosts = (req, res, next) => {
    bdd.query('SELECT * FROM posts ORDER BY id DESC', (err, resultat) => {
        if(err) throw (err);
        console.log('boucle requête')
        return res.status(200).json({ resultat });
    })
}