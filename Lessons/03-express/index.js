/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Express es un framework de NodeJS.
 *
 *
 * IMPORTANTE:
 *  			  - Express suele detectar el "Content-Type".
 *                - Los Middleware se crean a través del método <user(<...>)>
 *  			  - El orden de las request importa, ya que se evalúan
 *                  secuencialmente.
 *  			  - Si en el Middleware no especifico la ruta, se verán
 *                  afectadas todas las rutas de la API.
 *  			  - Express me permite construir el cuerpo de la solicitud
 *                  llamando a: <<ExpressApp>.json()>.
 *  			  - Middleware = Interceptan la solicitud realizando los
 *                               cambios o comprobaciones necesarias para
 *                               que el emisor de solicitud pueda continuar.
-------------------------------------------------------------------------- */

const express = require('express')
const dittoJSON = require('./data/ditto.json')

const app = express() // Crea la aplicación (API) de Express.

app.disable('x-powered-by') // Desactiva el encabezado "Express".

// Middleware - Construye el cuerpo de la solicitud (solución Express)
app.use(express.json())

// Middleware - Construye el cuerpo de la solicitud (solución manual)
/*
app.use((req, res, next) => {
	if (req.method !== 'POST') return next()
	if (req.headers['content-type'] !== 'application/json') return next()

	let body = ''

    // Construir cuerpo de la solicitud
	req.on('data', (chunk) => {
		body += chunk.toString()
	})

    // Utilizar cuerpo de la solicitud, cuando se ha terminado de construir
	req.on('end', () => {
		const data = JSON.parse(body)
		req.body = data
		next()
	})
})
*/

app.get('/', (req, res) => {
	res.status(200).send('<h1>Mi Página</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
	res.status(200).json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
	res.status(201).json(req.body)
})

// Middleware - En caso de no entrar a una ruta válida
app.use((req, res) => {
	res.status(404).send('<h1>404 Not Found</h1>')
})

// Levanto la aplicación (API) de Express
app.listen(3000, () => {
	console.log('Servidor funcionando en http://localhost:3000')
})
