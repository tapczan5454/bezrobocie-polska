# Lessons Learned - Projekt "Bezrobocie w Polsce"

**Dokument ID:** DOC-002
**Wersja:** 1.0
**Autor:** Zespół projektu
**Data:** 2026-10-26
**Status:** Finalny

---

## 1. Co zadziałało dobrze (What Went Well)

### 1.1 Wybór technologii
- **Bun** jako runtime JS/TS okazał się bardzo szybki i przyjemny w użyciu
- **Hono** - lekki framework webowy, prosty w konfiguracji
- **Baza danych JSON** - wystarczająca dla potrzeb projektu, uniknięto problemów z zależnościami natywnymi

### 1.2 Struktura projektu
- Oddzielenie logiki serwera od frontendu
- Skrypt do pobierania danych oddzielony od aplikacji
- Jasna struktura katalogów zgodna z dobrymi praktykami

### 1.3 Open Source
- Szablony GitHub (issues, PR) ułatwiają współpracę
- Kompletna dokumentacja ułatwia zrozumienie projektu
- Licencja MIT promuje reużywalność

### 1.4 Rate Limiting
- Implementacja opóźnień i retry mechanism w skrypcie pobierania danych
- Mock mode pozwala na demo bez klucza API

### 1.5 Docker
- Docker Compose umożliwia łatwy deploy jedną komendą
- Izolacja środowiska dla reprodukowalności

## 2. Co nie zadziałało (What Didn't Work)

### 2.1 DuckDB na Windows
- **Problem**: DuckDB wymaga Visual Studio z "Desktop development with C++" do kompilacji modułów natywnych
- **Wpływ**: Strata czasu na próby instalacji, konieczność zmiany technologii
- **Alternatywa**: Przełączenie na bazę danych JSON

### 2.2 API BDL - limity
- **Problem**: 5 żądań/sek dla użytkowników anonimowych, 429 Too Many Requests
- **Wpływ**: Wymusiło implementację rate limiting i mock mode
- **Alternatywa**: Rejestracja w API BDL dla wyższych limitów

### 2.3 Brak geoJSON w API BDL
- **Problem**: API BDL nie udostępnia współrzędnych geograficznych jednostek terytorialnych
- **Wpływ**: Niemożność stworzenia autentycznej mapy Polski
- **Alternatywa**: Tabelaryczna wizualizacja

### 2.4 Dokumentacja API BDL
- **Problem**: Dokumentacja jest rozległa, ale brakuje prostych przykładów dla początkujących
- **Wpływ**: Dłuższy czas eksploracji API
- **Alternatywa**: Eksperymenty z endpointami

## 3. Co zrobilibyśmy inaczej (What We Would Do Differently)

### 3.1 Wcześniejsze sprawdzenie zależności
- **Lekcja**: Sprawdzić wymagania zależności natywnych przed wyborem technologii
- **Działanie**: Wybrać DuckDB tylko w środowisku Linux lub z Docker od początku

### 3.2 Rejestracja w API przed rozpoczęciem
- **Lekcja**: API z restrykcyjnymi limitami wymagają klucza od początku
- **Działanie**: Zarejestrować się w API BDL przed rozpoczęciem projektu lub używać Docker z Linux

### 3.3 Alternatywne źródła geoJSON
- **Lekcja**: Nie zakładać, że wszystkie dane będą w jednym API
- **Działanie**: Zbadać zewnętrzne źródła geoJSON (np. GUGiK) przed rozpoczęciem

### 3.4 Prototypowanie API
- **Lekcja**: Eksperymentować z API przed pełną implementacją
- **Działanie**: Stworzyć prosty skrypt testowy do eksploracji API

## 4. Rekomendacje (Recommendations)

### 4.1 Dla przyszłych projektów
1. **Sprawdź zależności natywne** przed wyborem technologii, szczególnie na Windows
2. **Zarejestruj się w API** przed rozpoczęciem pracy, jeśli limity są restrykcyjne
3. **Wybierz środowisko Docker** dla natywnych zależności (Linux kontener)
4. **Eksploruj API** przed pełną implementacją - sprawdź, co faktycznie jest dostępne
5. **Miej plan B** dla alternatywnych technologii

### 4.2 Dla rozwoju tego projektu
1. **Zarejestrować się w API BDL** i uzyskać klucz dla prawdziwych danych
2. **Dodać geoJSON** z zewnętrznego źródła (np. GUGiK) dla mapy Polski
3. **Rozważyć DuckDB w Docker** jeśli potrzebna będzie zaawansowana analityka
4. **Dodać testy** jednostkowe i integracyjne
5. **Rozszerzyć o inne dane** z BDL (np. wynagrodzenia, inwestycje)

### 4.3 Dla wykorzystania danych z dane.gov.pl
1. **Czytaj dokumentację** uważnie - API różnią się strukturą
2. **Sprawdź limity** przed rozpoczęciem - niektóre API są bardzo restrykcyjne
3. **Rejestracja jest warta** - wyższe limity ułatwiają pracę
4. **Mock dane są przydatne** dla demo i testów
5. **Rate limiting jest konieczny** - nie spamuj API

## 5. Wnioski ogólne (General Conclusions)

### 5.1 Proces projektowy
- Projekt zrealizowano zgodnie z planem (5 dni)
- Agile podejście - szybkie iteracje i dostosowania
- Kontynuacja pomimo wyzwań technicznych

### 5.2 Zespół
- Jedna osoba - wystarczająca dla takiego rozmiaru projektu
- Samodzielność wymaga samodyscypliny i dobrej dokumentacji

### 5.3 Technologie
- Nowe technologie (Bun, Hono) są wartościowe do eksploracji
- Alternatywy dla Node.js (Bun) są dojrzałe do produkcji
- Prostec jest często lepsza niż złożoność

### 5.4 Open Source
- Dobre praktyki open source są warte inwestycji czasu
- Dokumentacja jest kluczowa dla innych deweloperów
- Szablony GitHub ułatwiają współpracę

## 6. Zasoby i narzędzia (Resources and Tools)

### 6.1 Przydatne narzędzia
- **Bun**: Runtime JS/TS - https://bun.sh
- **Hono**: Framework webowy - https://hono.dev
- **Docker**: Konteneryzacja - https://docker.com
- **API BDL**: Bank Danych Lokalnych - https://api.stat.gov.pl

### 6.2 Dokumentacja
- Dokumentacja API BDL
- Dokumentacja Bun
- Dokumentacja Hono
- Open Source Guides - https://opensource.guide

## 7. Podziękowania

- Główny Urząd Statystyczny za udostępnienie danych BDL
- Ministerstwo Cyfryzacji za portal dane.gov.pl
- Społeczności open source za narzędzia i dokumentację

---

**Historia zmian:**
- v1.0 (2026-10-26): Pierwsza wersja dokumentu
