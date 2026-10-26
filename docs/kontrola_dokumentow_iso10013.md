# Kontrola Dokumentów - Projekt "Bezrobocie w Polsce"

**Dokument ID:** DOC-003
**Wersja:** 1.0
**Autor:** Zespół projektu
**Data:** 2026-10-26
**Status:** Finalny

---

## 1. Cel dokumentu

Celem tego dokumentu jest zapewnienie identyfikacji, wersjonowania i kontroli wszystkich dokumentów projektu zgodnie z normą ISO 10013.

## 2. Rejestr dokumentów

| ID Dokumentu | Tytuł | Wersja | Autor | Data utworzenia | Status |
|--------------|-------|--------|-------|-----------------|--------|
| DOC-001 | Raport końcowy ISO 21513 | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| DOC-002 | Lessons Learned PMI | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| DOC-003 | Kontrola dokumentów ISO 10013 | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| README | README.md | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| CONTRIB | CONTRIBUTING.md | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| CONDUCT | CODE_OF_CONDUCT.md | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| CHANGELOG | CHANGELOG.md | 1.0 | Zespół projektu | 2026-10-26 | Finalny |
| LICENSE | LICENSE | 1.0 | Zespół projektu | 2026-10-26 | Finalny |

## 3. Procedura wersjonowania

### 3.1 Format wersji
Wersje dokumentów są oznaczane w formacie `X.Y`:
- **X** - wersja główna (główne zmiany, nowa struktura)
- **Y** - wersja pomocnicza (drobne poprawki, aktualizacje)

### 3.2 Proces zatwierdzania
1. Autor tworzy lub aktualizuje dokument
2. Dokument jest recenzowany przez zespół
3. Po akceptacji wersja jest oznaczana jako "Finalny"
4. Zmiany są rejestrowane w sekcji "Historia zmian"

### 3.3 Historia zmian
Każdy dokument zawiera sekcję "Historia zmian" na końcu z formatem:
```
vX.Y (YYYY-MM-DD): Opis zmiany
```

## 4. Procedura aktualizacji

### 4.1 Typy zmian
- **Dodanie (Add)**: Nowy dokument lub nowa sekcja
- **Aktualizacja (Update)**: Zmiana istniejącej treści
- **Usunięcie (Remove)**: Usunięcie sekcji lub dokumentu
- **Poprawka (Fix)**: Korekta błędów

### 4.2 Proces aktualizacji
1. Wprowadzenie zmian w dokumencie
2. Aktualizacja wersji dokumentu
3. Dodanie wpisu do historii zmian
4. Aktualizacja rejestru dokumentów (DOC-003)
5. Commit z opisem zmian

### 4.3 Przykład aktualizacji
```
Dokument: DOC-001 (Raport końcowy ISO 21513)
Wersja: 1.0 → 1.1
Zmiana: Dodanie sekcji "Wskazniki sukcesu"
Autor: Zespół projektu
Data: 2026-10-27
```

## 5. Kontrola jakości

### 5.1 Checklist przed zatwierdzeniem
- [ ] Dokument ma unikalny ID
- [ ] Dokument ma numer wersji
- [ ] Dokument ma autora i datę
- [ ] Dokument ma sekcję "Historia zmian"
- [ ] Dokument jest spójny i kompletny
- [ ] Dokument jest wolny od błędów gramatycznych
- [ ] Dokument jest zgodny z szablonem (jeśli dotyczy)

### 5.2 Recenzja
- Dokumenty są recenzowane przez co najmniej jedną osobę przed zatwierdzeniem
- Recenzja sprawdza: poprawność merytoryczną, format, kompletność

## 6. Dostęp i dystrybucja

### 6.1 Lokalizacja
- Dokumentacja techniczna: `docs/`
- Dokumentacja open source: katalog główny
- Kod: `src/`, `scripts/`, `public/`

### 6.2 Dostępność
- Wszystkie dokumenty są dostępne w repozytorium Git
- Dokumenty są otwarte (publiczne) zgodnie z licencją MIT
- Zmiany są śledzone przez historię Git

## 7. Retencja dokumentów

### 7.1 Okres retencji
- Dokumenty projektowe: przechowywane w repozytorium na czas nieokreślony
- Historia zmian: przechowywana w Git

### 7.2 Archiwizacja
- Stare wersje dokumentów są dostępne w historii Git
- Dokumenty oznaczone jako "Superseded" mogą być usunięte po 6 miesiącach

## 8. Szablon dokumentu

### 8.1 Nagłówek
```markdown
# Tytuł dokumentu

**Dokument ID:** DOC-XXX
**Wersja:** X.Y
**Autor:** Nazwa autora
**Data:** YYYY-MM-DD
**Status:** [Roboczy|Finalny|Superseded]
```

### 8.2 Stopka
```markdown
---

**Historia zmian:**
- vX.Y (YYYY-MM-DD): Opis zmiany
```

## 9. Zgodność z ISO 10013

### 9.1 Zasady ISO 10013
Ten system kontroli dokumentów jest zgodny z następującymi zasadami ISO 10013:
- ✅ Identyfikacja dokumentów (ID, wersja, autor, data)
- ✅ Wersjonowanie dokumentów
- ✅ Procedura zatwierdzania
- ✅ Kontrola zmian
- ✅ Dystrybucja i dostęp
- ✅ Retencja i archiwizacja

### 9.2 Odchylenia
Brak odchyleń od normy ISO 10013.

## 10. Wnioski

System kontroli dokumentów zapewnia:
- Przejrzystość i śledzenie zmian
- Jakość dokumentacji
- Zgodność z normami (ISO 10013, ISO 21513)
- Łatwość współpracy w zespole

---

**Historia zmian:**
- v1.0 (2026-10-26): Pierwsza wersja dokumentu kontroli dokumentów
