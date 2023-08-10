/* --------------------------------------------------------------------------
 * APUNTES:
 * 		   Al crear una API nativa de NodeJS es necesario, definir en la
 *         cabecera, el tipo de contenido que se retornara en el "body"
 *         (cuerpo de la respuesta).
 *
 *
 * IMPORTANTE:
 *  			  - <req> = Es un objeto que contendrá toda la información
 *                          proveniente del emisor de la solicitud.
 *  			  - <res> = Es un objeto que contendrá toda la información
 *                          de respuesta que se le enviara al emisor de la
 *                          solicitud, por parte del servidor.
-------------------------------------------------------------------------- */

const fs = require('node:fs')
const http = require('node:http')

// Definir servidor
const server = http.createServer((req, res) => {
	req.statusCode = 200 // Define el código de la respuesta (https://http.dev/status).
	res.setHeader('Content-Type', 'text/html; charset=utf-8') // Define el "body" (cuerpo de la respuesta).

	switch (req.url) {
		case '/':
			res.end('<h1>¡Hola Mundo!</h1>') // Enviá la respuesta al emisor de la solicitud.
			break

		case '/contact':
			res.end('<h1>Contacto</h1>')
			break

		case '/img':
			fs.readFile('./data/nodejs-logo.png', (error, img) => {
				if (error) {
					req.statusCode = 500
					res.end('<h1>505 - Internal Server Error</h1>')
				} else {
					res.setHeader('Content-Type', 'image/png; charset=utf-8')
					res.end(img)
				}
			})
			break

		default:
			req.statusCode = 404
			res.end('<h1>Not Found</h1>')
			break
	}
})

// Levantar servidor (API)
server.listen(3000, () => {
	console.log(`http://localhost:${server.address().port}`)
})
