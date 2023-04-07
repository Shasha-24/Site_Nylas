import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';




// creation de la connection mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'nylas',
    password: '',
})




//initialisation de l'application Express
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

//creation d'une 'route' avec la methode http*
//get dont le chemin est '/'

app.get('/', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    connection.query('select * from products', (err, result, fields) => {
        console.log(result);
        //envoie de la reponse http
        httpResponse.render('pages/index', { products: result })
    })
});

app.get('/formulaire', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    httpResponse.render('pages/formulaire')
});

app.get('/nosmontres', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    httpResponse.render('pages/nosmontres')
});

app.get('/nosproduits', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    httpResponse.render('pages/nosproduits')
});

app.get('/nostablettes', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    httpResponse.render('pages/nostablettes')
});

app.get('/nostelephones', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    connection.query("SELECT * FROM produits WHERE categorie = 'téléphone'", (err, rows) => {
        httpResponse.render('pages/nostelephones', { produits: rows })
    })
});

app.get('/nouscontacter', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    httpResponse.render('pages/nouscontacter')
});

app.get('/panier', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    console.log('objet request: ', httpRequest);
    //envoie de la reponse http
    httpResponse.render('pages/panier')
});




app.get('/nylasN16', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
    connection.query('select * from products', (err, result, fields) => {
        console.log(result);
        //envoie de la reponse h)ttp
        httpResponse.render('pages/nylasN16', { products: result })
    })
});

app.post('/panier', function (httpRequest, httpResponse, next) {
    console.log(httpRequest.body)
})


app.get('/panier', function (httpRequest, httpResponse, next) {
    //log de la requete entrante
        //envoie de la reponse h)ttp
        httpResponse.render('pages/panier')
        console.log(httpRequest)
    });



app.listen('3003');

