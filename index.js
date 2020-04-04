// var << no se usa mas
// let   << se define una vez pero se puede sobreescribir su valor
// const << se define una vez y no se puede sobreescribir su valor

const express = require('express');
const app = express();

/**
*	HTPP
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
	*		- Params  parametros de url  > localhost:2000/api/usuarios/:id,  req.params.id
	*		- Query   parametros de la url pero query params, localhost:2000/api/usuarios?id=nuestra-id, req.query.id
	*		- Body  Caso de que sea post y pust, req.body
	*	res
	*		res.sendStatus ( 200, 204, 403);
	*		res.send ();
	*
	*	next
	*		Continuar con nuestra ejecucion
	*
	*	app.get('/sincronizar', preSalvadoDatos, trabajoDeDatos)
	*
	*	preSalvadoDatos(req, res, next) => { .... se trabajan datos de pre guardado .... next(); }
	*	trabajoDeDatos(req, res, next) => { .... trabajar datos ... res.send()}
	*
	*/
	res.send('Hola Mundo');
});

app.get('/query', (req, res, next) => { res.send(req.query.id)});

app.get('/:id', (req, res, next) => { res.send(req.params.id)});

app.listen(1000, () => console.log('Runing on port 1000'));
