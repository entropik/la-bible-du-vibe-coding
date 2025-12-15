# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

## [1.7.2] - 2025-12-15

### Modal outil - Responsive complet
- **Badge tier visible** : affiche "Incontournables" au lieu de `undefined` dans la modal
- **Layout responsive** : padding réduit sur mobile (20px vs 32px)
- **Logo adaptatif** : 80x80 mobile, 100x100 desktop
- **Grille infos** : 1 colonne sur mobile, 2 colonnes sur tablette/desktop
- **Titre sur sa propre ligne** : badge tier en dessous pour éviter le débordement

### Technique
- Classes CSS : `.modal-header`, `.modal-logo`, `.modal-body`, `.modal-info-grid`
- Media query 480px pour grille, 640px pour padding/logo

## [1.7.1] - 2025-12-15

### Bandeau stats mobile - Améliorations UX
- **Couleur "À propos"** : cyan (#22d3ee) au lieu de gris - plus joyeux et visible
- **Pause au toucher** : le défilement s'arrête quand on appuie avec le doigt
- **Reprise automatique** : le défilement reprend quand on relâche
- **Cohérence desktop** : même couleur cyan sur la grille desktop

### Technique
- Events : `onTouchStart`, `onTouchEnd`, `onMouseDown`, `onMouseUp`, `onMouseLeave`
- Classe `.paused` toggle pour `animation-play-state: paused`

## [1.7.0] - 2025-12-15

### Cartes d'outils - Responsive complet
- **Badge tier visible** : affiche "Incontournables", "Challengers", etc. au lieu de `undefined`
- **Pas de débordement** : suppression `maxWidth: 100vw` qui causait scrollbar horizontale
- **Padding adaptatif** : 16px sur mobile, 24px sur desktop
- **Logo adaptatif** : 48x48px sur mobile, 56x56px sur desktop
- **Grille responsive** : 1 colonne mobile, auto-fill sur tablette/desktop

### Technique
- Classes CSS : `.tool-card`, `.tier-badge`, `.tool-logo`, `.tool-title`, `.tool-header`, `.tool-description`, `.tool-footer`, `.category-badge`, `.tool-price`
- Remplacement des styles inline par classes CSS
- Utilisation de `.items-grid` pour les grilles d'outils

## [1.6.3] - 2025-12-15

### Mobile - Défilement automatique unifié
- **Boutons stats** : défilement automatique doux (15s loop) avec pause au hover
- **Boutons navigation** : ligne scrollable horizontale (swipe manuel)
- **Couleurs préservées** : chaque stat garde sa couleur distinctive
- **Tablette/Desktop** : grilles inchangées

### Technique
- Animation CSS `@keyframes stats-scroll` avec `translateX(-50%)`
- Double set d'éléments pour boucle infinie seamless
- `.nav-buttons-grid` : flex sur mobile, grid sur tablette/desktop

## [1.6.2] - 2025-12-15

### Stats mobile - Scroll horizontal avec couleurs
- **Ligne scrollable** : 6 boutons stats sur une ligne horizontale (swipe)
- **Couleurs préservées** : violet, jaune, vert, bleu, rose, gris pour chaque stat
- **Position sous tagline** : retour à la position originale (pas en haut)
- **Indicateur de scroll** : flèche → à droite pour indiquer le scroll
- **Même taille que desktop** : boutons compacts mais lisibles

### Technique
- Classes CSS : `.stats-scroll-wrapper`, `.stats-scroll`, `.stat-btn`
- Indicateur via pseudo-élément `::after` avec fade gradient
- Suppression du bandeau marquee animé

## [1.6.1] - 2025-12-15

### Bandeau marquee mobile (v2)
- **Bandeau texte en haut** : déplacé avant le header, style "news ticker"
- **Pause au clic** : toggle classe `.paused` pour arrêter l'animation
- **Pause au hover** : arrêt automatique au survol
- **Style épuré** : texte simple avec séparateurs "•", pas de boutons

### Technique
- Classes CSS : `.stats-marquee`, `.stats-marquee-track`, `.highlight`
- Margin négatif pour bandeau pleine largeur
- Animation 20s avec pause via `animation-play-state`

## [1.6.0] - 2025-12-15

### Corrections
- Tagline : "sans jamais oser le demander" (ajout de "jamais")

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
