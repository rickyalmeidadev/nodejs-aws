import { BusinessError } from '../utils/business.js';
import { HttpError } from '../utils/http.js';

export function error(error, request, response, next) {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  if (error instanceof BusinessError) {
    return response.status(400).json({ message: error.message });
  }

  if (error instanceof HttpError) {
    return response.status(error.status).json({ message: error.message });
  }

  return response.status(500).json({ message: 'Internal server error' });
}
