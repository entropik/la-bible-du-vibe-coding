# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [1.5.0] - 2025-12-15

### Unification UI Responsive - Toutes sections
- **Classes CSS génériques** appliquées à Ressources, Benchmarks, GitHub
- **Conteneur `.section-container`** : hauteur adaptative (50vh mobile, 85vh desktop)
- **Header `.section-header`** : padding responsive (16px mobile, 32px desktop)
- **Filtres `.category-filters`** : pills scrollables horizontalement sur mobile
- **Grilles `.items-grid`** : 1 colonne mobile, auto-fill sur tablette/desktop
- **Recherche `.search-input`** : padding et font-size adaptatifs
- **Labels GitHub raccourcis** : "Frontend" au lieu de "Frameworks Frontend", etc.

### Technique
- Extraction des styles inline vers classes CSS réutilisables
- Suppression ~300 lignes de styles dupliqués dans App.jsx
- Mobile-first avec breakpoints : 480px, 640px, 768px

## [1.4.0] - 2025-12-15

### Refonte UI Mobile - Section LLM
- **Filtres d'ère** : Pills horizontaux scrollables (swipe) au lieu de grille 4 lignes
- **Header sticky** : Padding réduit sur mobile (16px vs 32px)
- **Dropdowns** : Labels compacts (US/FR/CN au lieu de noms complets)
- **Toggle Timeline/Grille** : Pleine largeur sur mobile < 480px
- **Conteneur** : Hauteur adaptative (50vh mobile, 85vh desktop)

### Technique
- Classes CSS responsive : `.llm-section`, `.llm-header`, `.era-filters`, `.era-pill`, `.llm-controls`, `.llm-view-toggle`
- Media queries : 480px, 640px, 768px
- Années masquées sur mobile (classe `.era-years`)

## [1.3.1] - 2025-12-15

### Modifié
- Effet gribouillage manuscrit sur le mot "ultime" dans le tagline
  - Ligne rouge/rose (#ff6b6b) épaisse avec rotation -3°
  - Dégradé aux extrémités pour effet "brush"
  - Remplace le simple strikethrough CSS

### Technique
- Classe CSS `.scribble` avec pseudo-élément `::after`

## [1.3.0] - 2025-12-15

### Ajouté
- Design responsive mobile-first pour la barre de navigation
  - Mobile (< 640px) : 2 colonnes
  - Tablette (640-1023px) : 3 colonnes
  - Desktop (≥ 1024px) : 6 colonnes
- Classe CSS `.nav-buttons-grid` avec media queries

### Technique
- Migration des styles inline vers CSS externe pour le responsive
- Configuration nginx `try_files` pour le support SPA (React Router)

## [1.2.0] - 2025-12-15

### Ajouté
- Page "À propos" (`/a-propos`) avec contenu narratif complet
  - Histoire du projet et du vibe coding
  - Présentation de l'auteur (Marc)
  - Roadmap des fonctionnalités à venir
- React Router pour la navigation multi-pages
- Bouton "À propos" dans le header (après VPS Providers)
- Lien "À propos" dans le footer
- Composant `About.jsx` avec design cohérent

### Technique
- Installation de `react-router-dom`
- Configuration BrowserRouter dans `main.jsx`
- Composant App avec Routes

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
