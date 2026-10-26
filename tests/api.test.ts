import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { Database } from '../src/database';

describe('API Integration Tests', () => {
  let db: Database;
  const baseUrl = 'http://localhost:3000/api';

  beforeAll(async () => {
    db = new Database('./data');
    await db.loadData();
  });

  it('should return health check', async () => {
    const response = await fetch(`${baseUrl}/health`);
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data).toHaveProperty('timestamp');
  });

  it('should return all data', async () => {
    const response = await fetch(`${baseUrl}/data`);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should return available years', async () => {
    const response = await fetch(`${baseUrl}/years`);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should return units', async () => {
    const response = await fetch(`${baseUrl}/units`);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should return data for specific year', async () => {
    const years = db.getAvailableYears();
    const year = years[0];
    const response = await fetch(`${baseUrl}/year/${year}`);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    data.forEach((d: any) => {
      expect(d.year).toBe(year);
    });
  });

  it('should return average by year', async () => {
    const response = await fetch(`${baseUrl}/average`);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should return ranking by year', async () => {
    const years = db.getAvailableYears();
    const year = years[0];
    const response = await fetch(`${baseUrl}/ranking/${year}?order=desc`);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
