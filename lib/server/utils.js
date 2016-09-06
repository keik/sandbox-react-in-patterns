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
