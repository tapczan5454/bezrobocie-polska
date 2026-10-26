import { describe, it, expect, beforeAll } from 'bun:test';
import { Database } from '../src/database';

describe('Database', () => {
  let db: Database;

  beforeAll(async () => {
    db = new Database('./data');
    await db.loadData();
  });

  it('should load data successfully', () => {
    const data = db.getAll();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should return data for a specific year', () => {
    const years = db.getAvailableYears();
    const year = years[0];
    const data = db.getByYear(year);
    expect(data.length).toBeGreaterThan(0);
    data.forEach(d => {
      expect(d.year).toBe(year);
    });
  });

  it('should return data for a specific unit', () => {
    const units = db.getUnits();
    const unitId = units[0].id;
    const data = db.getByUnit(unitId);
    expect(data.length).toBeGreaterThan(0);
    data.forEach(d => {
      expect(d.unitId).toBe(unitId);
    });
  });

  it('should return available years', () => {
    const years = db.getAvailableYears();
    expect(Array.isArray(years)).toBe(true);
    expect(years.length).toBeGreaterThan(0);
  });

  it('should return units', () => {
    const units = db.getUnits();
    expect(Array.isArray(units)).toBe(true);
    expect(units.length).toBeGreaterThan(0);
    units.forEach(u => {
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('name');
    });
  });

  it('should calculate average by year', () => {
    const averages = db.getAverageByYear();
    expect(Array.isArray(averages)).toBe(true);
    expect(averages.length).toBeGreaterThan(0);
    averages.forEach(a => {
      expect(a).toHaveProperty('year');
      expect(a).toHaveProperty('avgRate');
      expect(typeof a.avgRate).toBe('number');
    });
  });

  it('should return ranking by year', () => {
    const years = db.getAvailableYears();
    const year = years[0];
    const ranking = db.getRankingByYear(year, 'desc');
    expect(Array.isArray(ranking)).toBe(true);
    expect(ranking.length).toBeGreaterThan(0);

    // Check if sorted descending
    for (let i = 0; i < ranking.length - 1; i++) {
      expect(ranking[i].rate).toBeGreaterThanOrEqual(ranking[i + 1].rate);
    }
  });
});
