const express = require('express');
const app = express();
const path = require('path');
const _ = require('lodash');

const heroes = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

app.use(express.static(__dirname + '/dist'));

app.get('/api/heroes', function(req, res) {
    if (req.query.name) {
        var nameFilter = new RegExp(_.escapeRegExp(req.query.name), "gi");
        res.json(_.filter(heroes, h => h.name.match(nameFilter)));
    } else {
        res.json(heroes);
    }
});

app.get('/api/heroes/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    res.json(heroes.find(h => h.id === id));
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});


app.listen(process.env.PORT || 4300);