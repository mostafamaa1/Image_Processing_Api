import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

// Suite for endpoint testing
describe('Test for endpoint responses', (): void => {
  // main route
  describe('main route', () => {
    it('gets the / endpoint with status(200)', async (): Promise<void> => {
      const response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  // api route
  describe('api route', () => {
    const fileName = 'palmtunnel';
    const width = 800;
    const height = 400;

    it('gets the /api endpoint with status(200)', async (): Promise<void> => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });

    it('/api should return a message', async (): Promise<void> => {
      const response = await request.get('/api');

      expect(response.text).toEqual('Main route');
    });

    it('Respond with 200 endpoint is working', async (): Promise<void> => {
      const response = await request.get(
        `/api/images?filename=${fileName}&width=${width}&height=${height}`
      );

      expect(response.status).toBe(200);
    });

    it('Respond with 400 parameter is missing', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=fjord&width=100'
      );

      expect(response.status).toEqual(400);
    });

    it('Respond with 400 width and height must be number ', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=fjord&width=xx&height=x'
      );
      expect(response.status).toBe(400);
    });
  });
});
