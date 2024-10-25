const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('obteniendo productos...')
});

router.get('/:id', (req, res) => {
    res.send('obteniendo producto...')
});

router.post('/', (req, res) => {
    res.send('publicando producto...')
});

router.patch('/', (req, res) => {
    res.send('editando producto...')
});

router.delete('/', (req, res) => {
    res.send('eliminando producto...')
});


module.exports = router;