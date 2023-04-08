import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cookieParser from 'cookie-parser';
import session from 'express-session';




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

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

app.get('/', function (httpRequest, httpResponse) {
    if (httpRequest.session.page_views) {
        httpRequest.session.page_views++;
        httpResponse.send("You visited this page " + httpRequest.session.page_views + " times");
        console.log(httpRequest.session)
    } else {
        httpRequest.session.page_views = 1;
        httpResponse.send("Welcome to this page for the first time!");
    }
});

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
    var produits = []
    var price = 0
    connection.query("SELECT * FROM commande WHERE id_client = 0 ", async (err, rows) => {
        for (const element of rows) {
            var rawElement = await getElement(element)
            price += rawElement.price
            produits.push(rawElement)
        }
        console.log(produits)
        httpResponse.render('pages/panier', { produits: produits, price: price })
    })
});

function getElement(elem) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM produits WHERE id = ? ", [elem.id_produit], (err, rows) => {
            if (err) throw err;
            resolve(rows[0])
        })
    })
}





app.post('/ajoutpanier', function (httpRequest, httpResponse, next) {
    console.log(httpRequest.body.product_id)
    connection.query('insert into commande (id_client, id_produit) values (?)', [[0, parseInt(httpRequest.body.product_id)]],
        function (err, result) {
            if (err) throw err;
        }
    )
})




app.listen('3003');

