// configurar un path 
// require('dotenv').config({path: '../.env'}); 
require('dotenv').config();

// var << no se usa mas
// let   << se define una vez pero se puede sobrescribir su valor
// const << se define una vez y no se puede sobrescribir su valor

const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');

let file;

const loadFile = () => file = JSON.parse(fs.readFileSync(process.env.DB, 'utf-8'));

const app = express();

/**
 * 
 * Todos Los middlewares van antes de las rutas
 * 
 */
app.use(bodyParser.json({limit: '20MB'}));

/**
 * ['1', 2, 3]
 */
app.use(bodyParser.urlencoded({}))


/**
*	HTTP
*	GET  Se utiliza para traer datos
*	POST Se utiliza para crear datos
*	PUT  Se utiliza para modificar datos
*	DELETE Se utiliza para borrar datos
*
*	COPY Se copiar datos de un lado a otro Pagina A > Pagina B
*	REQUEST WebHooks ,  Pagina A > Pagina B  < Pagina A y lo salvo
*/

app.get('/', (req, res, next) => {
	/**
	*	req.
	*		- Params  parámetros de url  > localhost:2000/api/usuarios/:id,  req.params.id
	*		- Query   parámetros de la url pero query params, localhost:2000/api/usuarios?id=nuestra-id, req.query.id
	*		- Body  Caso de que sea post y put, req.body
	*	res
	*		res.sendStatus ( 200, 204, 403);
	*		res.send ();
	*
	*	next
	*		Continuar con nuestra ejecución
	*
	*	app.get('/sincronizar', preSalvadoDatos, trabajoDeDatos)
	*
	*	preSalvadoDatos(req, res, next) => { .... se trabajan datos de pre guardado .... next(); }
	*	trabajoDeDatos(req, res, next) => { .... trabajar datos ... res.send()}
	*/
	loadFile();
	res.send(file);
});

app.get('/query', (req, res, next) => { res.send(req.query.id) });

app.get('/:id', (req, res, next) => { 
	loadFile();
	const result = file.find(obj => parseInt(obj._id) === parseInt(req.params.id));
	res.send(result)
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
