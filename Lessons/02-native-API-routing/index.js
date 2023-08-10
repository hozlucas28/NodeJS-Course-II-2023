/* --------------------------------------------------------------------------
 * IMPORTANTE:
 *  			  - Al crear una API nativa en NodeJS, es necesario
 *                  construir el cuerpo de la solicitud enviada por el
 *                  emisor. Debido, que esta llega de a "trozos".
-------------------------------------------------------------------------- */

const http = require('node:http')
const dittoJSON = require('./data/ditto.json')

// Crear función procesadora de solicitudes
const processRequest = (req, res) => {
	const { method, url } = req

	switch (method) {
		case 'GET':
			switch (url) {
				case '/pokemon/ditto':
					res.setHeader('Content-Type', 'application/json, charset=utf-8')
					return res.end(JSON.stringify(dittoJSON))

				default:
					req.statusCode = 404
					res.setHeader('Content-Type', 'text/html, charset=utf-8')
					return res.end('<h1>404 Not Found</h1>')
			}

		case 'POST':
			switch (url) {
				case '/pokemon':
					let body = ''

					// Construir cuerpo de la solicitud
					req.on('data', (chunk) => {
						body += chunk.toString()
					})

					// Utilizar cuerpo de la solicitud, cuando se ha terminado de construir
					req.on('end', () => {
						const data = JSON.parse(body)
						res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
						res.end(JSON.stringify(data))
					})
					break

				default:
					req.statusCode = 404
					res.setHeader('Content-Type', 'text/html, charset=utf-8')
					return res.end('<h1>404 Not Found</h1>')
			}
	}
}

// Crear servidor
const server = http.createServer(processRequest)

// Levantar servidor (API)
server.listen(3000, () => {
	console.log(`http://localhost:${server.address().port}`)
})
