# La Bible du Vibe Coding

Le guide ultime du vibe coding : outils, modèles, workflows, tout ce que vous avez toujours voulu savoir sur le code sans oser le demander.

**[labibleduvibecoding.fr](https://labibleduvibecoding.fr)**

## Qu'est-ce que le Vibe Coding ?

Le "vibe coding" est une approche de développement où le programmeur décrit ce qu'il veut en langage naturel et laisse l'IA générer le code. Terme inventé par Andrej Karpathy le 6 février 2025.

> "On avance par intentions, pas par lignes de code."

## Contenu de l'encyclopédie

| Section | Contenu |
|---------|---------|
| **Outils IA** | 67+ outils de vibe coding (Cursor, Windsurf, Lovable, Bolt.new...) |
| **Modèles LLM** | 50+ modèles documentés avec timeline interactive |
| **DevOps & Stack** | 85+ outils (CI/CD, monitoring, déploiement, VPS) |
| **Ressources** | 50+ formations, tutoriels, communautés |
| **Glossaire** | 51 termes expliqués simplement |
| **Benchmarks** | Comparatifs des LLM (SWE-Bench, HumanEval...) |

## Stack technique

- **Framework** : React 18
- **Build** : Vite
- **Routing** : React Router
- **Icons** : Lucide React
- **Styles** : CSS-in-JS (inline) + CSS externe pour le responsive
- **Design** : Thème sombre, gradients, responsive mobile-first

## Installation locale

```bash
# Cloner le repo
git clone https://github.com/entropik/la-bible-du-vibe-coding.git
cd la-bible-du-vibe-coding

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## Structure du projet

```
la-bible-du-vibe-coding/
├── src/
│   ├── App.jsx          # Composant principal + données
│   ├── About.jsx        # Page À propos
│   ├── main.jsx         # Point d'entrée React
│   └── index.css        # Styles globaux + responsive
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── CHANGELOG.md
├── CLAUDE.md            # Instructions pour Claude Code
└── README.md
```

## Déploiement

Le site est une SPA (Single Page Application). Pour le déploiement sur nginx, ajouter cette configuration pour le support des routes React Router :

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Plateformes supportées

- **Netlify** : Fonctionne nativement (détecte automatiquement les SPA)
- **Vercel** : Fonctionne nativement
- **nginx** : Nécessite la config `try_files` ci-dessus
- **GitHub Pages** : Utiliser HashRouter ou un fichier 404.html

## Responsive Design

La navigation utilise une grille responsive mobile-first :

| Écran | Largeur | Colonnes |
|-------|---------|----------|
| Mobile | < 640px | 2 |
| Tablette | 640-1023px | 3 |
| Desktop | ≥ 1024px | 6 |

## Contribuer

Les contributions sont bienvenues ! Pour signaler un bug ou proposer une amélioration :

1. Ouvrir une [issue](https://github.com/entropik/la-bible-du-vibe-coding/issues)
2. Forker le projet
3. Créer une branche (`git checkout -b feature/amelioration`)
4. Commiter (`git commit -m 'Ajout de...'`)
5. Pusher (`git push origin feature/amelioration`)
6. Ouvrir une Pull Request

## Roadmap

- [ ] Version anglaise (biblevibecoding.com)
- [ ] Newsletter "Les nouveautés du vibe coding"
- [ ] Guides avancés (sécurité, DevOps, bonnes pratiques)
- [ ] Générateur d'outils en vibe coding

## Crédits

**Créé par [Marc Tallec](https://ooblik.com)** - Imprimeur, photographe, artisan, geek assumé.

Codé avec Claude Code en vibe coding depuis un atelier de campagne bourguignonne.

## Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

*La Bible du Vibe Coding — Décembre 2025*
