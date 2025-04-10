import { PrimeiroMiddleware } from './primeiro.middleware';

describe('PrimeiroMiddleware', () => {
  it('should be defined', () => {
    expect(new PrimeiroMiddleware()).toBeDefined();
  });
});
