const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send('Erreur lors de la déconnexion');
            } else {
                res.clearCookie('sessionID'); 
                res.redirect('/');
            }
        });
    } else {
        res.status(400).send('Aucune session trouvée');
    }
});

module.exports = router;
