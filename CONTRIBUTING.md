# Współpraca w projekcie Bezrobocie w Polsce

Dziękujemy za zainteresowanie współpracą! Ten dokument wyjaśnia, jak zgłaszać błędy i dokładać zmiany.

## 🐛 Zgłaszanie błędów

Przed zgłoszeniem sprawdź, czy błąd nie został już zgłoszony w [Issues](https://github.com/your-repo/bezrobocie-polska/issues).

Aby zgłosić błąd:
1. Użyj szablonu "Bug Report" w GitHub Issues
2. Podaj tytuł i opis problemu
3. Opisz kroki do reprodukcji
4. Dołącz zrzuty ekranu (jeśli dotyczy)
5. Podaj środowisko (system, wersja przeglądarki)

## 💡 Propozycje funkcjonalności

Chętnie usłyszymy o pomysłach na ulepszenia! Aby zaproponować funkcjonalność:
1. Użyj szablonu "Feature Request" w GitHub Issues
2. Opisz, co chcesz dodać i dlaczego
3. Podaj przykłady użycia (jeśli dotyczy)

## 🛠️ Jak dokonać zmian

### Proces

1. **Forknij repozytorium** i utwórz branch dla swojej zmiany
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Zrój zmiany** zgodnie z konwencją:
   - Pisz czytelny kod z komentarzami (tylko gdy konieczne)
   - Dodaj testy dla nowych funkcji
   - Uruchom testy i linter lokalnie:
     ```bash
     bun test
     bun run lint
     ```

3. **Commituj zmiany** z jasnymi komunikatami:
   ```bash
   git commit -m "Add: feature description"
   ```

4. **Pushnij branch** i utwórz Pull Request
   - Użyj szablonu PR w GitHub
   - Opisz, co zmieniłeś i dlaczego
   - Odnies się do powiązanych issues

### Wymagania dla PR

- Kod musi przechodzić testy
- Linter nie może zgłaszać błędów
- Opis PR musi być jasny i kompletny
- Zmiany muszą być zgodne z stylem projektu

## 📋 Code Style

- TypeScript dla wszystkich nowych plików
- Indentacja: 2 spacje
- Maksymalna długość linii: 100 znaków
- Nazewnictwo: camelCase dla zmiennych, PascalCase dla klas

## ✍️ Licencja

Twój wkład będzie licencjonowany na tej samej licencji co projekt (MIT).

## 📞 Kontakt

Pytania? Otwórz Issue lub skontaktuj się przez GitHub Discussions.
