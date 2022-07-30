export function adapt({ controller, method }) {
  return async function (request, response) {
    if (typeof controller[method] !== 'function') {
      throw new Error(`${method} is not a function`);
    }

    const handler = controller[method].bind(controller);

    const { status, body, headers = {} } = await handler(request);

    for (const [key, value] of Object.entries(headers)) {
      response.set(key, value);
    }

    response.status(status);
    response.json(body);
  };
}
