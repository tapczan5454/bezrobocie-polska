/**
 * Prosta baza danych oparta na JSON dla projektu
 * DuckDB był problematyczny na Windows bez Visual Studio
 */

import { readFile, writeFile } from 'fs/promises';

interface UnemploymentData {
  unitId: string;
  unitName: string;
  year: number;
  rate: number;
}

class Database {
  private data: UnemploymentData[] = [];
  private dataPath: string;

  constructor(dataPath: string = './data') {
    this.dataPath = dataPath;
  }

  /**
   * Ładuje dane z plików JSON
   */
  async loadData(): Promise<void> {
    try {
      const [unitsData, unemploymentData] = await Promise.all([
        readFile(`${this.dataPath}/units.json`, 'utf-8'),
        readFile(`${this.dataPath}/unemployment_data.json`, 'utf-8')
      ]);

      const units = JSON.parse(unitsData);
      const data = JSON.parse(unemploymentData);

      // Przekształć dane do formatu łatwego do zapytań
      this.data = [];

      for (const unit of units) {
        const unitData = data.find((d: any) => d.id === unit.id);
        if (unitData && unitData.values) {
          for (const value of unitData.values) {
            this.data.push({
              unitId: unit.id,
              unitName: unit.name,
              year: value.year,
              rate: value.val
            });
          }
        }
      }

      console.log(`Loaded ${this.data.length} data points`);
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  /**
   * Pobiera wszystkie dane
   */
  getAll(): UnemploymentData[] {
    return this.data;
  }

  /**
   * Pobiera dane dla konkretnego roku
   */
  getByYear(year: number): UnemploymentData[] {
    return this.data.filter(d => d.year === year);
  }

  /**
   * Pobiera dane dla konkretnej jednostki
   */
  getByUnit(unitId: string): UnemploymentData[] {
    return this.data.filter(d => d.unitId === unitId);
  }

  /**
   * Pobiera dostępne lata
   */
  getAvailableYears(): number[] {
    const years = new Set(this.data.map(d => d.year));
    return Array.from(years).sort((a, b) => a - b);
  }

  /**
   * Pobiera wszystkie jednostki
   */
  getUnits(): { id: string; name: string }[] {
    const units = new Map(this.data.map(d => [d.unitId, d.unitName]));
    return Array.from(units.entries()).map(([id, name]) => ({ id, name }));
  }

  /**
   * Pobiera dane agregowane (średnia dla wszystkich jednostek w danym roku)
   */
  getAverageByYear(): { year: number; avgRate: number }[] {
    const yearlyData = new Map<number, number[]>();

    for (const d of this.data) {
      if (!yearlyData.has(d.year)) {
        yearlyData.set(d.year, []);
      }
      yearlyData.get(d.year)!.push(d.rate);
    }

    return Array.from(yearlyData.entries())
      .map(([year, rates]) => ({
        year,
        avgRate: rates.reduce((a, b) => a + b, 0) / rates.length
      }))
      .sort((a, b) => a.year - b.year);
  }

  /**
   * Pobiera ranking jednostek według stopy bezrobocia dla danego roku
   */
  getRankingByYear(year: number, order: 'asc' | 'desc' = 'desc'): UnemploymentData[] {
    const yearData = this.getByYear(year);
    return yearData.sort((a, b) =>
      order === 'desc' ? b.rate - a.rate : a.rate - b.rate
    );
  }
}

export { Database, UnemploymentData };
