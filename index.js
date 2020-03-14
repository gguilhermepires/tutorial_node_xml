
/*
npm install object-to-xml
npm install express
npm install request
npm install express-xml-bodyparser
npm install xml2js

exemplo xml enviado no post
<receita nome="pão" tempo_de_preparo="5 minutos" tempo_de_cozimento="1 hora">
  <titulo>Pão simples</titulo>
  <ingredientes>
    <ingrediente quantidade="3" unidade="xícaras">Farinha de Trigo</ingrediente>
    <ingrediente quantidade="7" unidade="gramas">Fermento</ingrediente>
    <ingrediente quantidade="1.5" unidade="xícaras" estado="morna">Água</ingrediente>
    <ingrediente quantidade="1" unidade="colheres de chá">Sal</ingrediente>
  </ingredientes>
  <instrucoes>
    <passo>Misture todos os ingredientes, e dissolva bem.</passo>
    <passo>Cubra com um pano e deixe por uma hora em um local morno.</passo>
    <passo>Misture novamente, coloque numa bandeja e asse num forno.</passo>
  </instrucoes>
</receita>

*/
const express = require('express');
const request = require("request");
const xmlparser = require('express-xml-bodyparser');
const parseString = require('xml2js').parseString;
var o2x = require('object-to-xml');

const app = express();
const portaExpress = 3001;

app.use(xmlparser());

app.post('/teste', function (req, res) {
    res.send("Recebido: " + req.body.receita.titulo[0]);
});

app.get('/envia', function (req, res) {

    var abc =
        '<receita nome="pão" tempo_de_preparo="5 minutos" tempo_de_cozimento="1 hora">' +
        '<titulo>Pão simples</titulo>' +
        '<ingredientes>' +
        '<ingrediente quantidade="3" unidade="xícaras">Farinha de Trigo</ingrediente>' +
        '<ingrediente quantidade="7" unidade="gramas">Fermento</ingrediente>' +
        '<ingrediente quantidade="1.5" unidade="xícaras" estado="morna">Água</ingrediente>' +
        '<ingrediente quantidade="1" unidade="colheres de chá">Sal</ingrediente>' +
        '</ingredientes>' +
        '<instrucoes>' +
        '<passo>Misture todos os ingredientes, e dissolva bem.</passo>' +
        '<passo>Cubra com um pano e deixe por uma hora em um local morno.</passo>' +
        '<passo>Misture novamente, coloque numa bandeja e asse num forno.</passo>' +
        '</instrucoes>' +
        '</receita>';

    console.log("Enviando:");
    
    //string para objeto
    parseString(abc, function (err, result) {
        console.dir(result.receita.titulo[0]);
    });

    // objeto para xml
    console.log(o2x(abc));

    request.post({
        url: "http://localhost:3001/teste",
        port: 3001,
        method: "POST",
        headers: {
            'Content-Type': 'application/xml',
        },
        body: abc
    },
        function (error, response, body) {
            console.log(response.statusCode);
            if (response.statusCode == 200) {
                console.log(body);
            } else
                console.log(error);
        });
});

app.listen(portaExpress, function (erro) {
    if (erro) {
        console.log("erro");
    } else
        console.log("servidor iniciado" + portaExpress);
})
