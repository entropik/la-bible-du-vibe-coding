# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [1.1.0] - 2025-12-12

### Corrigé
- Correction balise JSX non fermée (`</div>` → `</a>`) dans la section Standards & Spécifications (ligne 8492)
- Suppression des bordures blanches sur les côtés de l'application
- Suppression des barres de défilement horizontales indésirables

### Ajouté
- Fichier CSS global (`src/index.css`) avec :
  - Reset CSS complet (margin, padding, box-sizing)
  - `overflow-x: hidden` sur html/body
  - Scrollbar personnalisée style sombre
- Propriétés `maxWidth: '100vw'` et `overflowX: 'hidden'` sur le conteneur principal
- Fichier `CLAUDE.md` pour la documentation du projet

### Technique
- Import du CSS global dans `main.jsx`
- Build Vite fonctionnel

## [1.0.0] - 2025-12-12

### Ajouté
- Version initiale de La Bible du Vibe Coding
- Encyclopédie interactive des outils de vibe coding 2025
- 67+ outils IA référencés
- 50+ modèles LLM documentés
- 85+ DevOps tools
- 50+ ressources et formations
- Glossaire de 51 termes
- Timeline interactive des outils et LLM
- Filtres par catégorie, tier, pays, année
- Modes d'affichage grille et timeline
- Sections dépliables : Introduction, LLM, GitHub, Ressources
- Design responsive avec thème sombre
