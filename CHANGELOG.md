# Changelog

Wszystkie znaczące zmiany w projekcie będą dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
i wersjonowanie zgodne z [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-26

### Dodane
- Inicjalna struktura projektu
- Skrypt do pobierania danych z API BDL (z obsługą rate limiting i mock mode)
- Baza danych oparta na JSON z zapytaniami (getAll, getByYear, getByUnit, getRankingByYear)
- Serwer webowy z Hono i endpointami API (7 endpointów)
- Aplikacja webowa z wizualizacją danych (statystyki, tabela, ranking)
- Konfiguracja Docker Compose dla łatwego deployu
- Pliki dokumentacji open source (README, CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)
- Licencja MIT
- CI/CD w GitHub Actions
- Szablony dla Issues i Pull Requests
- Raport końcowy ISO 21513
- Lessons learned zgodnie z PMI
- Kontrola dokumentów ISO 10013
- Testy jednostkowe dla bazy danych
- Testy integracyjne dla API

### Technologie
- Bun jako runtime JavaScript/TypeScript
- Hono jako framework webowy
- Baza danych JSON (zamiast DuckDB ze względu na problemy z kompilacją na Windows)
- Docker dla konteneryzacji

### Uwagi
- Mock mode pozwala na demo bez klucza API BDL
- Prawdziwe dane wymagają rejestracji w API BDL i ustawienia BDL_API_KEY
