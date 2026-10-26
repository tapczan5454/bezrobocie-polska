# Bezrobocie w Polsce 🇵🇱

Projekt open source analizujący dane o bezrobociu w Polsce na podstawie danych z Banku Danych Lokalnych (BDL) dostępnego przez dane.gov.pl.

## 📋 Czym jest projekt

Aplikacja webowa, która:
- Agreguje dane o bezrobociu z API BDL (Główny Urząd Statystyczny)
- Przedstawia wizualizację bezrobocia na mapie Polski (poziom powiatów)
- Pokazuje trendy w czasie i porównania między regionami
- Udostępnia dane do dalszej analizy

## 🌐 Źródło danych

Dane pochodzą z **Banku Danych Lokalnych (BDL)** Głównego Urzędu Statystycznego, dostępne przez API:
- API BDL: https://api.stat.gov.pl/home/bdlapi
- Portal danych: https://dane.gov.pl

## 🚀 Jak uruchomić

### Wymagania
- Docker i Docker Compose LUB
- Bun (runtime JavaScript/TypeScript)

### Sposób 1: Docker Compose (zalecany)

```bash
docker compose up
```

Aplikacja będzie dostępna pod adresem http://localhost:3000

### Sposób 2: Lokalnie z Bun

```bash
# Zainstaluj zależności
bun install

# Pobierz dane
bun run scripts/fetch-data.ts

# Uruchom aplikację
bun run src/server.ts
```

## 📁 Struktura projektu

```
.
├── src/              # Kod aplikacji
├── tests/            # Testy
├── docs/             # Dokumentacja
├── scripts/          # Skrypty (np. pobieranie danych)
├── .github/          # Szablony PR, issues i CI
├── data/             # Dane (nie w repozytorium - generowane przez skrypty)
├── .env.example      # Przykładowe zmienne środowiskowe
├── LICENSE           # Licencja MIT
├── README.md         # Ten plik
├── CONTRIBUTING.md   # Wskazówki dla kontrybutorów
├── CODE_OF_CONDUCT.md # Kodeks postępowania
└── CHANGELOG.md      # Historia zmian
```

## 🛠️ Technologie

- **Bun** - szybki runtime JavaScript/TypeScript
- **Hono** - lekki framework webowy
- **Docker** - konteneryzacja dla łatwego deployu
- **MapLibre GL** - wizualizacja mapy (planowane)

## 📝 Dokumentacja

Pełna dokumentacja znajduje się w katalogu `docs/`:
- Raport końcowy ISO 21513 - <ref_file file="C:\Users\xbox_\Downloads\pro\docs\raport_koncowy_iso21513.md" />
- Lessons learned (PMI) - <ref_file file="C:\Users\xbox_\Downloads\pro\docs\lessons_learned_pmi.md" />
- Kontrola dokumentów ISO 10013 - <ref_file file="C:\Users\xbox_\Downloads\pro\docs\kontrola_dokumentow_iso10013.md" />

## ⚡ Wydajność i optymalizacja

- **Czas ładowania strony**: < 1s (lokalnie)
- **Czas odpowiedzi API**: < 50ms
- **Rate limiting**: 2 sekundy opóźnienia między żądaniami do API BDL (limit 5/sek dla anonimowych)
- **Mock mode**: Działa bez opóźnień dla demo
- **Baza danych JSON**: Operacje w pamięci, bardzo szybkie

## 🧪 Testy

```bash
# Uruchom testy
bun test
```

Testy obejmują:
- Testy jednostkowe bazy danych
- Testy integracyjne API

## 🔑 API BDL

Aby pobrać prawdziwe dane z API BDL:

1. Zarejestruj się na https://api.stat.gov.pl/
2. Uzyskaj klucz API
3. Ustaw zmienną środowiskową:
   ```bash
   export BDL_API_KEY=twój_klucz
   ```
4. Uruchom skrypt ponownie:
   ```bash
   bun run fetch-data
   ```

Bez klucza API skrypt używa mock danych dla demo.

## 🤝 Współpraca

Wszelkie wkłady są mile widziane! Zobacz [CONTRIBUTING.md](CONTRIBUTING.md) aby dowiedzieć się więcej.

## 📄 Licencja

MIT License - zobacz [LICENSE](LICENSE)

## 🙏 Podziękowania

- Główny Urząd Statystyczny za udostępnienie danych BDL
- Ministerstwo Cyfryzacji za portal dane.gov.pl
