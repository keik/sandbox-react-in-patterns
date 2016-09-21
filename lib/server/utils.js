/**
 * Return all routes as pretty string
 *
 * @param {app} app
 * @return {string} all routes as pretty string
 */
export function getRoutesAsString(app) {
  return app._router.stack.filter(layer => layer.name == 'router')
    .reduce((acc, layer) => acc + layer.handle.stack
            .reduce((acc, layer) => acc + layer.route.stack
                    .reduce((acc, layer) => layer.method.toUpperCase() + Array(7 - layer.method.length).join(' ') + ': ' + acc + '\n',
                            layer.route.path), ''), '')
}

/**
 * Return full HTML string with React props
 *
 * @param {string} content content as HTML string
 * @param {object} props React props object for Server-Side Rendering
 * @param {string} entryName name of entrypoint
 */
export function renderFullPage(content, props, entryName) {
  return `
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title></title>
     <link rel="stylesheet" href="${ entryName }.css">
   </head>
   <body>
     <div id="app">${ content }</div>
     <script>APP_PROPS = ${ JSON.stringify(props) }</script>
     <script src="${ entryName }.js"></script>
   </body>
 </html>
 `
}
