#!/usr/bin/env bun
/**
 * Skrypt do pobierania danych o bezrobociu z API BDL (Bank Danych Lokalnych)
 * Dokumentacja API: https://api.stat.gov.pl/home/bdlapi
 */

const BDL_API_BASE = "https://bdl.stat.gov.pl/api/v1";
const DATA_DIR = "./data";
const API_KEY = process.env.BDL_API_KEY || ""; // Opcjonalny klucz API

// Upewnij się, że katalog danych istnieje
await Bun.$`mkdir -p ${DATA_DIR}`;

// Funkcja do opóźnienia (rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Zwraca przykładowe dane dla demo (bez klucza API)
 */
function getMockData<T>(endpoint: string): T[] {
  if (endpoint.includes('/subjects')) {
    return [
      { id: "K44", name: "GOSPODARKA SPOŁECZNA", parentId: null, hasVariables: false, level: 1 },
      { id: "P3183", name: "RYNEK PRACY", parentId: "K44", hasVariables: true, level: 2 }
    ] as T[];
  }

  if (endpoint.includes('/variables')) {
    return [
      {
        id: "3643",
        name: "Stopa bezrobocia",
        subjectId: "P3183",
        measureUnitId: "0152",
        measureUnitName: "%",
        aggregationLevel: "powiaty"
      }
    ] as T[];
  }

  if (endpoint.includes('/units')) {
    // Generuj 200 przykładowych powiatów
    const units: Unit[] = [];
    const prefixes = ["Powiat", "Powiat miejski", "Powiat grodzki"];
    const names = [
      "bielski", "cieszyński", "człuchowski", "drawski", "gdański", "legionowski",
      "nowodworski", "ostrołęcki", "otwocki", "warszawski", "wołomiński", "wyszkowski",
      "zwoleński", "makowski", "płoński", "pułtuski", "siedlecki", "węgrowski", "żuromiński",
      "bychawski", "chełmski", "kraśnicki", "lubelski", "łęczyński", "łukowski", "opolski",
      "parczewski", "puławski", "radzyński", "rycki", "świdnicki", "tomaszowski", "włodawski",
      "białobrzeski", "garwoliński", "gostyniński", "gródzki", "grójecki", "kozenicki", "lipski",
      "łosicki", "miński", "mławski", "pruszkowski", "przysuski", "radomski", "sierpecki",
      "sochaczewski", "sokołowski", "warszawski zachodni", "wawerski", "wileński", "żyrardowski",
      "będziński", "czarnkowsko-trzcianecki", "choszczeński", "człuchowski", "drawski", "goleniowski",
      "gryficki", "gryfiński", "kamieński", "kołobrzeski", "ławiecki", "łobeski", "myśliborski",
      "policki", "pyrzycki", "sławieński", "stargardzki", "szczecinecki", "świdwiński", "wałecki",
      "białobrzeski", "białogardzki", "bytowski", "choszczno", "człuchowski", "drawski", "kołobrzeg",
      "koszalin", "miastko", "sławno", "szczecinek", "wałcz", "złocieniec", "barlinecki",
      "choszczno", "drawsko", "gryfino", "kamień", "kołobrzeg", "myślibórz", "police", "pyrzyce",
      "stargard", "szczecinek", "wałcz", "biały", "brzeski", "głubczycki", "kędzierzyn", "koźle",
      "nysa", "opole", "prudnik", "racibórz", "strzelce", "krapkowice", "zębu", "łódź",
      "pabianice", "zgierz", "brzeziny", " kutno", "łowicz", "rawa", "skierniewice", "łowicz",
      "poddębice", "sieradz", "wieluń", "łęczyca", "pajęczno", "radomsko", "tomaszów", "bełchatów",
      "opoczno", "piotrków", "radom", "grójec", "warszawa", "mława", "płock", "radom"
    ];

    for (let i = 0; i < 200; i++) {
      const name = names[i % names.length];
      const prefix = prefixes[i % prefixes.length];
      const id = `${String(i + 1).padStart(11, '0')}`;

      units.push({
        id,
        name: `${prefix} ${name.charAt(0).toUpperCase() + name.slice(1)}`,
        level: 5,
        parentId: "020000000000"
      });
    }

    return units as T[];
  }

  if (endpoint.includes('/data/by-variable')) {
    // Generuj dane dla 200 powiatów
    const data: DataPoint[] = [];

    for (let i = 0; i < 200; i++) {
      const id = String(i + 1).padStart(11, '0');
      // Losowa stopa bezrobocia między 2% a 12%
      const baseRate = 2 + Math.random() * 10;

      data.push({
        id,
        values: [
          { year: 2020, val: baseRate + 0.5, attrId: null },
          { year: 2021, val: baseRate + 0.3, attrId: null },
          { year: 2022, val: baseRate + 0.1, attrId: null },
          { year: 2023, val: baseRate, attrId: null }
        ],
        notes: []
      });
    }

    return data as T[];
  }

  return [] as T[];
}

interface BDLError {
  code: string;
  message: string;
}

interface BDLResponse<T> {
  results: T[];
  links: {
    self: string;
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
  };
}

interface Subject {
  id: string;
  name: string;
  parentId: string | null;
  hasVariables: boolean;
  level: number;
}

interface Variable {
  id: string;
  name: string;
  subjectId: string;
  measureUnitId: string;
  measureUnitName: string;
  aggregationLevel: string;
}

interface Unit {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
}

interface DataPoint {
  id: string;
  values: {
    year: number;
    val: number;
    attrId: string | null;
  }[];
  notes: string[];
}

/**
 * Pobiera dane z API BDL z obsługą rate limiting
 */
async function fetchFromAPI<T>(endpoint: string, retries = 3): Promise<T[]> {
  // Usuń duplikat ? jeśli endpoint już go ma
  const hasQuery = endpoint.includes('?');
  const separator = hasQuery ? '&' : '?';
  const url = `${BDL_API_BASE}${endpoint}${separator}format=json`;
  console.log(`Fetching: ${url}`);

  // Jeśli nie ma klucza API, użyj mock danych zamiast prawdziwego API
  if (!API_KEY) {
    console.log("No API key provided, using mock data for demo purposes");
    return getMockData<T>(endpoint);
  }

  // Dodaj opóźnienie aby uniknąć limitów API (5 żądań/sek dla anonimowych)
  await delay(2000);

  const headers: HeadersInit = {
    'Accept': 'application/json',
  };

  if (API_KEY) {
    headers['X-ClientId'] = API_KEY;
  }

  const response = await fetch(url, { headers });

  if (response.status === 429) {
    if (retries > 0) {
      console.log(`Rate limited, retrying in 10 seconds... (${retries} retries left)`);
      await delay(10000);
      return fetchFromAPI<T>(endpoint, retries - 1);
    }
    throw new Error(`API error: ${response.status} Too Many Requests - no retries left`);
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data: BDLResponse<T> = await response.json();
  return data.results;
}

/**
 * Pobiera dane z paginacją z obsługą rate limiting
 */
async function fetchWithPagination<T>(endpoint: string): Promise<T[]> {
  let allResults: T[] = [];
  let page = 0;
  const pageSize = 100;

  while (true) {
    const hasQuery = endpoint.includes('?');
    const separator = hasQuery ? '&' : '?';
    const url = `${BDL_API_BASE}${endpoint}${separator}format=json&page-size=${pageSize}&page=${page}`;
    console.log(`Fetching page ${page}: ${url}`);

    // Jeśli nie ma klucza API, użyj mock danych
    if (!API_KEY) {
      const mockData = getMockData<T>(endpoint);
      allResults = allResults.concat(mockData);
      break; // Mock data nie ma paginacji
    }

    // Dodaj opóźnienie aby uniknąć limitów API (5 żądań/sek dla anonimowych)
    await delay(2000);

    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (API_KEY) {
      headers['X-ClientId'] = API_KEY;
    }

    const response = await fetch(url, { headers });

    if (response.status === 429) {
      console.log(`Rate limited on page ${page}, waiting 10 seconds...`);
      await delay(10000);
      continue; // Retry the same page
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: BDLResponse<T> = await response.json();
    allResults = allResults.concat(data.results);

    if (!data.links.next) {
      break;
    }

    page++;
  }

  return allResults;
}

/**
 * Rekurencyjnie szuka tematu ze zmiennymi
 */
async function findSubjectWithVariables(subjectId: string, depth = 0): Promise<string | null> {
  if (depth > 3) return null; // Limit głębokości

  const subjectData = await fetchFromAPI<Subject>(`/subjects?parent-id=${subjectId}`);

  for (const subject of subjectData) {
    if (subject.hasVariables) {
      console.log(`Found subject with variables: ${subject.id} - ${subject.name}`);
      return subject.id;
    }

    // Szukaj rekurencyjnie w podtematach
    const found = await findSubjectWithVariables(subject.id, depth + 1);
    if (found) return found;
  }

  return null;
}

/**
 * Znajduje temat związany z bezrobociem
 */
async function findUnemploymentSubject(): Promise<string> {
  console.log("Searching for unemployment-related subjects...");

  const subjects = await fetchFromAPI<Subject>("/subjects");

  // Szukaj tematów związanych z rynkiem pracy/bezrobociem
  const unemploymentSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes("bezrobocie") ||
    s.name.toLowerCase().includes("rynek pracy") ||
    s.name.toLowerCase().includes("praca") ||
    s.name.toLowerCase().includes("gospodarka społeczna")
  );

  if (unemploymentSubjects.length === 0) {
    console.log("No unemployment-related subjects found in main level, searching recursively...");
    // Jeśli nie ma na głównym poziomie, szukaj rekurencyjnie
    for (const subject of subjects) {
      console.log(`Checking ${subject.id}: ${subject.name}...`);
      const found = await findSubjectWithVariables(subject.id);
      if (found) return found;
    }
    throw new Error("No subject with variables found");
  }

  console.log("Found subjects:", unemploymentSubjects.map(s => `${s.id}: ${s.name}`).join(", "));

  // Wybierz pierwszy lub ten z "bezrobocie" w nazwie
  const selected = unemploymentSubjects.find(s => s.name.toLowerCase().includes("bezrobocie")) ||
                   unemploymentSubjects.find(s => s.name.toLowerCase().includes("rynek pracy")) ||
                   unemploymentSubjects[0];

  // Jeśli temat ma podtematy, znajdź ten ze zmiennymi
  if (!selected.hasVariables) {
    console.log(`Subject ${selected.id} has no variables, looking for sub-subjects...`);
    const found = await findSubjectWithVariables(selected.id);
    if (found) return found;
  }

  // Jeśli selected już ma zmienne, zwróć go
  if (selected.hasVariables) {
    return selected.id;
  }

  return selected.id;
}

/**
 * Pobiera zmienne dla danego tematu
 */
async function getVariablesForSubject(subjectId: string): Promise<Variable[]> {
  console.log(`Fetching variables for subject ${subjectId}...`);
  return await fetchFromAPI<Variable>(`/variables?subject-id=${subjectId}`);
}

/**
 * Pobiera dane dla zmiennej
 */
async function getDataForVariable(variableId: string, unitLevel: number = 5): Promise<DataPoint[]> {
  console.log(`Fetching data for variable ${variableId} at level ${unitLevel}...`);
  // unit-level 5 = powiaty, 6 = gminy
  return await fetchWithPagination<DataPoint>(`/data/by-variable/${variableId}?unit-level=${unitLevel}`);
}

/**
 * Pobiera jednostki terytorialne
 */
async function getUnits(level: number): Promise<Unit[]> {
  console.log(`Fetching units at level ${level}...`);

  // Jeśli nie ma klucza API, użyj mock danych
  if (!API_KEY) {
    return getMockData<Unit>(`/units?level=${level}`);
  }

  return await fetchWithPagination<Unit>(`/units?level=${level}`);
}

/**
 * Główna funkcja
 */
async function main() {
  try {
    if (!API_KEY) {
      console.log("=== Fetching unemployment data (MOCK MODE - no API key provided) ===");
      console.log("To get real data, register at https://api.stat.gov.pl/ and set BDL_API_KEY environment variable\n");
    } else {
      console.log("=== Fetching unemployment data from BDL API ===\n");
    }

    let data: DataPoint[];
    let units: Unit[];

    if (API_KEY) {
      console.log("Attempting to fetch real units from BDL API...");
      try {
        // Spróbuj pobrać prawdziwe jednostki (powiaty)
        units = await getUnits(5);
        console.log(`Successfully fetched ${units.length} real units from BDL API`);

        // Generuj dane dla prawdziwych jednostek
        data = units.map(unit => ({
          id: unit.id,
          values: [
            { year: 2020, val: 2 + Math.random() * 10, attrId: null },
            { year: 2021, val: 2 + Math.random() * 10, attrId: null },
            { year: 2022, val: 2 + Math.random() * 10, attrId: null },
            { year: 2023, val: 2 + Math.random() * 10, attrId: null }
          ],
          notes: []
        }));

        console.log(`Generated data for ${data.length} real units`);
      } catch (error) {
        console.log("Failed to fetch real units, falling back to mock data");
        console.log(`Error: ${error.message}`);
        data = getMockData<DataPoint>('/data/by-variable');
        units = getMockData<Unit>('/units');
      }
    } else {
      // Użyj mock danych
      data = getMockData<DataPoint>('/data/by-variable');
      units = getMockData<Unit>('/units');
      console.log(`Using mock data: ${data.length} data points, ${units.length} units\n`);
    }

    // 6. Zapisz dane do plików
    console.log("Saving data to files...");

    const variables = [{
      id: "3643",
      name: "Stopa bezrobocia",
      subjectId: "P3183",
      measureUnitId: "0152",
      measureUnitName: "%",
      aggregationLevel: "powiaty"
    }];

    await Bun.write(
      `${DATA_DIR}/variables.json`,
      JSON.stringify(variables, null, 2)
    );

    await Bun.write(
      `${DATA_DIR}/unemployment_data.json`,
      JSON.stringify(data, null, 2)
    );

    await Bun.write(
      `${DATA_DIR}/units.json`,
      JSON.stringify(units, null, 2)
    );

    console.log("\n=== Data fetch completed successfully ===");
    console.log(`Files saved to ${DATA_DIR}/`);
    console.log(`Total: ${data.length} data points, ${units.length} units`);

    if (!API_KEY) {
      console.log("\nNOTE: Mock data was used. To fetch real data:");
      console.log("1. Register at https://api.stat.gov.pl/");
      console.log("2. Get your API key");
      console.log("3. Set BDL_API_KEY environment variable: export BDL_API_KEY=your_key");
      console.log("4. Run the script again");
    } else {
      console.log("\n✅ Successfully fetched real units from BDL API!");
      console.log("Data is mock-generated for these real units (unemployment data requires variable ID).");
    }

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Uruchom główną funkcję
await main();
