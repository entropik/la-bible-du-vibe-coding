import React, { useState, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Sparkles, Rocket, GitBranch, BookOpen, BarChart3, Wrench,
  Search, Globe, Star, MapPin, Calendar, Grid3X3, LayoutList,
  Trophy, Zap, Code, Brain, Palette, Calculator, Languages, Gauge,
  ExternalLink, X, ChevronRight, Filter, TrendingUp, Users, Building2,
  Cpu, Terminal, Smartphone, PenTool, Puzzle, FolderGit2, Award, RotateCcw,
  Landmark, Plug, Package, Hash, FileCode, Info
} from 'lucide-react';
import About from './About';

// ========================================
// ENCYCLOPÉDIE DU VIBE CODING 2025
// Application React Interactive Enrichie
// ========================================

const VibeCodingEncyclopedia = () => {
  // État pour les filtres et la vue
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedLLM, setSelectedLLM] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'grid', 'timeline', 'list'
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // 'intro', 'llm', 'github', 'glossary' ou null
  const [selectedLLMModel, setSelectedLLMModel] = useState(null);
  const [selectedGlossaryItem, setSelectedGlossaryItem] = useState(null);
  const [selectedGitHubItem, setSelectedGitHubItem] = useState(null); // Modal GitHub
  const [llmViewMode, setLlmViewMode] = useState('timeline'); // 'timeline' ou 'grid'
  const [glossaryFilter, setGlossaryFilter] = useState('tous'); // filtre catégorie glossaire
  const [llmFilter, setLlmFilter] = useState('all'); // filtre entreprise LLM
  const [llmCountryFilter, setLlmCountryFilter] = useState('all'); // filtre pays LLM
  const [llmEraFilter, setLlmEraFilter] = useState('all'); // filtre ère LLM
  const [githubFilter, setGithubFilter] = useState('tous'); // filtre catégorie GitHub
  const [githubSearch, setGithubSearch] = useState(''); // recherche GitHub
  const [glossarySearch, setGlossarySearch] = useState(''); // recherche Ressources

  // Fonction pour toggle une section (ferme les autres)
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // ========================================
  // GLOSSAIRE / DÉFINITIONS
  // ========================================
  const glossary = [
    {
      term: 'Vibe Coding',
      category: 'concept',
      definition: 'Approche de développement où le programmeur décrit ce qu\'il veut en langage naturel et laisse l\'IA générer le code. Inventé par Andrej Karpathy le 6 février 2025.',
      examples: ['Utiliser Cursor avec Claude pour coder à la voix', 'Décrire une app à Lovable et la voir se construire'],
      related: ['Prompt Engineering', 'No-Code', 'Low-Code'],
      emoji: '🌀'
    },
    {
      term: 'LLM',
      category: 'technologie',
      definition: 'Large Language Model (Grand Modèle de Langage). Réseau de neurones entraîné sur d\'immenses corpus de texte capable de comprendre et générer du langage naturel et du code.',
      examples: ['GPT-4 (OpenAI)', 'Claude (Anthropic)', 'Gemini (Google)', 'Llama (Meta)'],
      related: ['Transformer', 'Token', 'Fine-tuning'],
      emoji: '🧠'
    },
    {
      term: 'CLI',
      category: 'interface',
      definition: 'Command Line Interface (Interface en Ligne de Commande). Interface texte où l\'utilisateur tape des commandes au clavier. Préférée des développeurs pour sa puissance et son automatisation.',
      examples: ['Terminal macOS/Linux', 'PowerShell Windows', 'Claude Code', 'Aider'],
      related: ['Terminal', 'Shell', 'Bash'],
      emoji: '⌨️'
    },
    {
      term: 'IDE',
      category: 'interface',
      definition: 'Integrated Development Environment (Environnement de Développement Intégré). Logiciel combinant éditeur de code, débogueur, compilateur et outils de développement.',
      examples: ['VS Code', 'Cursor', 'Windsurf', 'JetBrains IntelliJ'],
      related: ['Éditeur de code', 'Extension', 'Plugin'],
      emoji: '💻'
    },
    {
      term: 'API',
      category: 'technologie',
      definition: 'Application Programming Interface. Ensemble de règles permettant à des logiciels de communiquer entre eux. Les APIs LLM permettent d\'intégrer l\'IA dans ses applications.',
      examples: ['OpenAI API', 'Anthropic API', 'API REST', 'API GraphQL'],
      related: ['Endpoint', 'REST', 'SDK'],
      emoji: '🔌'
    },
    {
      term: 'Token',
      category: 'technologie',
      definition: 'Unité de base traitée par un LLM. Peut être un mot, une partie de mot, ou un caractère. Le contexte d\'un modèle se mesure en tokens (ex: 128k tokens).',
      examples: ['Le mot "bonjour" = 1-2 tokens', '"développement" peut être 2-3 tokens'],
      related: ['Contexte', 'Window', 'Tokenizer'],
      emoji: '🔤'
    },
    {
      term: 'Context Window',
      category: 'technologie',
      definition: 'Fenêtre de contexte. Quantité maximale de texte (en tokens) qu\'un LLM peut traiter en une seule requête. Plus elle est grande, plus le modèle peut "se souvenir".',
      examples: ['GPT-4: 128k tokens', 'Claude: 200k tokens', 'Gemini 1.5: 1M tokens'],
      related: ['Token', 'Mémoire', 'RAG'],
      emoji: '📏'
    },
    {
      term: 'Prompt',
      category: 'concept',
      definition: 'Instruction ou question donnée à un LLM. L\'art du "prompt engineering" consiste à formuler des prompts efficaces pour obtenir les meilleurs résultats.',
      examples: ['"Crée une app de todo list en React"', '"Explique ce code et corrige les bugs"'],
      related: ['Prompt Engineering', 'System Prompt', 'Few-shot'],
      emoji: '💬'
    },
    {
      term: 'Agent',
      category: 'concept',
      definition: 'IA capable d\'agir de manière autonome pour accomplir des tâches. Un agent peut planifier, exécuter des actions, utiliser des outils, et itérer jusqu\'à atteindre son objectif.',
      examples: ['Claude Code', 'Devin', 'Jules (Google)', 'OpenHands'],
      related: ['Autonomie', 'Tool Use', 'Agentic'],
      emoji: '🤖'
    },
    {
      term: 'Agentic',
      category: 'concept',
      definition: 'Qualifie un système IA capable de comportement autonome et proactif. Un workflow "agentic" implique que l\'IA prend des décisions et agit sans intervention humaine constante.',
      examples: ['Cursor Composer mode', 'Windsurf Cascade', 'Claude avec computer use'],
      related: ['Agent', 'Autonomie', 'Loop'],
      emoji: '🔄'
    },
    {
      term: 'MCP',
      category: 'technologie',
      definition: 'Model Context Protocol. Protocole créé par Anthropic permettant aux LLM de se connecter à des sources de données et outils externes de manière standardisée.',
      examples: ['Connexion à une base de données', 'Accès au système de fichiers', 'Intégration GitHub'],
      related: ['Tool Use', 'Plugin', 'Integration'],
      emoji: '🔗'
    },
    {
      term: 'RAG',
      category: 'technologie',
      definition: 'Retrieval-Augmented Generation. Technique combinant recherche d\'information et génération LLM. Le modèle récupère des documents pertinents avant de répondre.',
      examples: ['Chatbot sur documentation interne', 'Recherche dans un codebase', 'Cody de Sourcegraph'],
      related: ['Embedding', 'Vector Database', 'Contexte'],
      emoji: '🔍'
    },
    {
      term: 'Fine-tuning',
      category: 'technologie',
      definition: 'Processus d\'entraînement supplémentaire d\'un LLM pré-entraîné sur des données spécifiques pour le spécialiser sur une tâche ou un domaine.',
      examples: ['Codestral (Mistral fine-tuné pour le code)', 'Modèles médicaux spécialisés'],
      related: ['Training', 'LoRA', 'PEFT'],
      emoji: '🎯'
    },
    {
      term: 'Open Source',
      category: 'concept',
      definition: 'Logiciel dont le code source est librement accessible, modifiable et redistribuable. Favorise la transparence, la collaboration et l\'innovation communautaire.',
      examples: ['Llama (Meta)', 'Mistral', 'Linux', 'VS Code'],
      related: ['MIT License', 'Apache 2.0', 'GitHub'],
      emoji: '🔓'
    },
    {
      term: 'Full-Stack',
      category: 'développement',
      definition: 'Développement couvrant à la fois le frontend (interface utilisateur) et le backend (serveur, base de données). Un développeur full-stack maîtrise les deux.',
      examples: ['React + Node.js + PostgreSQL', 'Lovable génère du full-stack', 'Bolt.new'],
      related: ['Frontend', 'Backend', 'Base de données'],
      emoji: '🏗️'
    },
    {
      term: 'Frontend',
      category: 'développement',
      definition: 'Partie visible d\'une application, l\'interface utilisateur. Inclut HTML, CSS, JavaScript et frameworks comme React, Vue, ou Svelte.',
      examples: ['React', 'Vue.js', 'Tailwind CSS', 'v0.dev'],
      related: ['UI', 'UX', 'Composant'],
      emoji: '🎨'
    },
    {
      term: 'Backend',
      category: 'développement',
      definition: 'Partie serveur d\'une application. Gère la logique métier, les bases de données, l\'authentification et les APIs.',
      examples: ['Node.js', 'Python/Django', 'Supabase', 'Firebase'],
      related: ['API', 'Base de données', 'Serveur'],
      emoji: '⚙️'
    },
    {
      term: 'No-Code',
      category: 'concept',
      definition: 'Approche permettant de créer des applications sans écrire de code, via des interfaces visuelles de glisser-déposer.',
      examples: ['Bubble', 'Glide', 'Webflow', 'Airtable'],
      related: ['Low-Code', 'Visual Builder', 'Drag & Drop'],
      emoji: '🧩'
    },
    {
      term: 'Low-Code',
      category: 'concept',
      definition: 'Approche réduisant le code nécessaire via des outils visuels, tout en permettant d\'ajouter du code personnalisé si besoin.',
      examples: ['Retool', 'OutSystems', 'FlutterFlow'],
      related: ['No-Code', 'RAD', 'Visual Development'],
      emoji: '🔧'
    },
    {
      term: 'SaaS',
      category: 'business',
      definition: 'Software as a Service. Modèle où le logiciel est hébergé dans le cloud et accessible via abonnement, sans installation locale.',
      examples: ['Cursor ($20/mois)', 'Lovable ($20/mois)', 'GitHub Copilot ($10/mois)'],
      related: ['Cloud', 'Abonnement', 'PaaS'],
      emoji: '☁️'
    },
    {
      term: 'ARR',
      category: 'business',
      definition: 'Annual Recurring Revenue (Revenu Annuel Récurrent). Métrique clé des SaaS mesurant le revenu prévisible sur un an.',
      examples: ['Lovable: $100M ARR en 8 mois', 'Cursor: croissance record'],
      related: ['MRR', 'Churn', 'SaaS'],
      emoji: '💰'
    },
    {
      term: 'Reasoning',
      category: 'technologie',
      definition: 'Capacité d\'un LLM à "réfléchir" étape par étape avant de répondre. Les modèles de reasoning (o1, DeepSeek R1) montrent leur processus de pensée.',
      examples: ['OpenAI o1', 'DeepSeek R1', 'Claude avec extended thinking'],
      related: ['Chain-of-Thought', 'Thinking', 'o1'],
      emoji: '🤔'
    },
    {
      term: 'MoE',
      category: 'technologie',
      definition: 'Mixture of Experts. Architecture de modèle où seule une partie des paramètres est activée pour chaque requête, améliorant l\'efficacité.',
      examples: ['Mixtral 8x7B', 'DeepSeek V3', 'GPT-4 (supposé)'],
      related: ['Sparse', 'Efficiency', 'Routing'],
      emoji: '🎛️'
    },
    {
      term: 'Multimodal',
      category: 'technologie',
      definition: 'Capacité d\'un modèle à traiter plusieurs types de données : texte, images, audio, vidéo. GPT-4o et Gemini sont multimodaux.',
      examples: ['GPT-4o (texte + image + audio)', 'Gemini (texte + image + vidéo)', 'Claude Vision'],
      related: ['Vision', 'Audio', 'Image-to-text'],
      emoji: '👁️'
    },
    {
      term: 'Embedding',
      category: 'technologie',
      definition: 'Représentation vectorielle d\'un texte ou d\'une image dans un espace mathématique. Permet de mesurer la similarité sémantique.',
      examples: ['OpenAI text-embedding-3', 'Recherche sémantique', 'Clustering de documents'],
      related: ['Vector', 'Similarity', 'RAG'],
      emoji: '📊'
    },
    {
      term: 'Hallucination',
      category: 'concept',
      definition: 'Erreur d\'un LLM qui génère des informations fausses ou inventées avec confiance. Un défi majeur de l\'IA générative.',
      examples: ['Citations de sources inexistantes', 'Code appelant des APIs qui n\'existent pas'],
      related: ['Grounding', 'Fact-checking', 'RAG'],
      emoji: '👻'
    },
    {
      term: 'Benchmark',
      category: 'évaluation',
      definition: 'Test standardisé pour mesurer et comparer les performances des modèles IA. Permet de suivre les progrès du domaine.',
      examples: ['SWE-Bench (code)', 'HumanEval', 'MMLU', 'ARC-AGI'],
      related: ['Évaluation', 'Leaderboard', 'Metrics'],
      emoji: '📈'
    },
    {
      term: 'SWE-Bench',
      category: 'évaluation',
      definition: 'Software Engineering Benchmark. Test évaluant la capacité des IA à résoudre de vrais bugs GitHub. Référence pour les outils de code.',
      examples: ['Claude Sonnet 4: leader', 'OpenAI Codex', 'Devin AI'],
      related: ['Benchmark', 'Bug fixing', 'GitHub'],
      emoji: '🐛'
    },
    {
      term: 'Transformer',
      category: 'technologie',
      definition: 'Architecture de réseau de neurones inventée par Google en 2017 ("Attention is All You Need"). Base de tous les LLM modernes.',
      examples: ['GPT = Generative Pre-trained Transformer', 'BERT', 'T5'],
      related: ['Attention', 'Self-attention', 'Architecture'],
      emoji: '🔮'
    },
    {
      term: 'Inference',
      category: 'technologie',
      definition: 'Processus d\'utilisation d\'un modèle entraîné pour générer des prédictions ou du contenu. Coût mesuré en tokens/seconde.',
      examples: ['Appeler l\'API Claude', 'Générer du code avec Copilot'],
      related: ['Latence', 'Throughput', 'GPU'],
      emoji: '⚡'
    },
    {
      term: 'Self-hosted',
      category: 'déploiement',
      definition: 'Logiciel installé et géré sur ses propres serveurs plutôt que dans le cloud d\'un tiers. Offre contrôle et confidentialité.',
      examples: ['Tabby (assistant code)', 'Ollama (LLM local)', 'bolt.diy'],
      related: ['On-premise', 'Cloud', 'Privacy'],
      emoji: '🏠'
    },
    {
      term: 'Propriétaire',
      category: 'licence',
      definition: 'Logiciel dont le code source n\'est pas accessible. L\'utilisateur n\'a accès qu\'au produit fini, pas à son fonctionnement interne.',
      examples: ['GPT-4', 'Claude', 'Cursor'],
      related: ['Closed source', 'Commercial', 'License'],
      emoji: '🔒'
    },
    {
      term: 'Fork',
      category: 'développement',
      definition: 'Copie d\'un projet open source pour le développer indépendamment. Permet d\'innover tout en partant d\'une base existante.',
      examples: ['Roo Code (fork de Cline)', 'Void (fork de VS Code)', 'bolt.diy (fork de Bolt.new)'],
      related: ['Branch', 'Clone', 'Open Source'],
      emoji: '🍴'
    },
    {
      term: 'Extension',
      category: 'développement',
      definition: 'Plugin ajoutant des fonctionnalités à un logiciel existant. Les extensions VS Code sont l\'écosystème le plus populaire.',
      examples: ['Cline pour VS Code', 'Continue', 'GitHub Copilot'],
      related: ['Plugin', 'Add-on', 'Marketplace'],
      emoji: '🧩'
    },
    {
      term: 'Asynchrone',
      category: 'concept',
      definition: 'Mode de travail où une tâche s\'exécute en arrière-plan sans bloquer l\'utilisateur. Jules de Google est un agent asynchrone.',
      examples: ['Jules (Google)', 'Background tasks', 'Webhooks'],
      related: ['Synchrone', 'Callback', 'Queue'],
      emoji: '⏳'
    },
    {
      term: 'WebContainer',
      category: 'technologie',
      definition: 'Technologie StackBlitz permettant d\'exécuter Node.js directement dans le navigateur. Révolutionnaire pour les IDE cloud.',
      examples: ['Bolt.new', 'StackBlitz', 'CodeSandbox'],
      related: ['WASM', 'Browser', 'Sandbox'],
      emoji: '📦'
    },
    {
      term: 'Supabase',
      category: 'technologie',
      definition: 'Alternative open source à Firebase. Backend-as-a-Service avec PostgreSQL, authentification, stockage et APIs temps réel.',
      examples: ['Backend de Lovable', 'Auth + Database', 'Realtime subscriptions'],
      related: ['Firebase', 'PostgreSQL', 'BaaS'],
      emoji: '💚'
    },
    {
      term: 'Tailwind CSS',
      category: 'technologie',
      definition: 'Framework CSS "utility-first" très populaire. Classes atomiques directement dans le HTML. Adopté massivement par les outils de vibe coding.',
      examples: ['class="flex items-center gap-4"', 'Lovable', 'v0.dev'],
      related: ['CSS', 'Framework', 'Utility-first'],
      emoji: '🎨'
    },
    {
      term: 'React',
      category: 'technologie',
      definition: 'Bibliothèque JavaScript de Meta pour construire des interfaces utilisateur. Composants réutilisables et DOM virtuel. Standard de l\'industrie.',
      examples: ['Facebook', 'Instagram', 'Lovable génère du React'],
      related: ['Vue', 'Svelte', 'Next.js'],
      emoji: '⚛️'
    },
    {
      term: 'Licorne',
      category: 'business',
      definition: 'Startup valorisée à plus d\'1 milliard de dollars. Le vibe coding a créé plusieurs licornes en 2024-2025.',
      examples: ['Cursor ($2.5B)', 'Lovable ($1.8B)', 'Replit ($1.2B)'],
      related: ['Valorisation', 'VC', 'Startup'],
      emoji: '🦄'
    },
    {
      term: 'YC',
      category: 'business',
      definition: 'Y Combinator. Accélérateur de startups le plus prestigieux de la Silicon Valley. A financé Stripe, Airbnb, et de nombreux outils IA.',
      examples: ['OpenAI (YC)', 'Anthropic', 'Replit', 'Continue'],
      related: ['Accelerator', 'Seed', 'Demo Day'],
      emoji: '🚀'
    },
    // === FORMATION & RESSOURCES ===
    {
      term: 'Andrej Karpathy',
      category: 'formation',
      definition: 'Ex-directeur IA de Tesla et co-fondateur d\'OpenAI. A inventé le terme "Vibe Coding" le 6 février 2025. Sa chaîne YouTube est une référence pour apprendre le deep learning.',
      examples: ['Neural Networks: Zero to Hero', 'Let\'s build GPT', 'Vibe Coding tweet'],
      related: ['OpenAI', 'Tesla', 'YouTube'],
      emoji: '🎓',
      url: 'https://www.youtube.com/@AndrejKarpathy'
    },
    {
      term: 'fast.ai',
      category: 'formation',
      definition: 'Cours gratuits de deep learning par Jeremy Howard. Approche "top-down" : construire d\'abord, comprendre ensuite. Idéal pour les débutants motivés.',
      examples: ['Practical Deep Learning for Coders', 'fastai library', 'Course.fast.ai'],
      related: ['Deep Learning', 'PyTorch', 'MOOC'],
      emoji: '📚',
      url: 'https://www.fast.ai/'
    },
    {
      term: 'Hugging Face',
      category: 'formation',
      definition: 'Plateforme communautaire pour les modèles ML. Hub de modèles, datasets, et cours gratuits. Le "GitHub de l\'IA".',
      examples: ['Transformers Course', 'Model Hub', 'Spaces (démos)'],
      related: ['Transformers', 'Open Source', 'Models'],
      emoji: '🤗',
      url: 'https://huggingface.co/learn'
    },
    {
      term: 'DeepLearning.AI',
      category: 'formation',
      definition: 'Plateforme de cours IA fondée par Andrew Ng. Certifications reconnues sur Coursera. Du débutant au niveau avancé.',
      examples: ['Machine Learning Specialization', 'ChatGPT Prompt Engineering', 'LangChain courses'],
      related: ['Coursera', 'Andrew Ng', 'Certification'],
      emoji: '🧠',
      url: 'https://www.deeplearning.ai/'
    },
    {
      term: 'r/LocalLLaMA',
      category: 'formation',
      definition: 'Subreddit dédié aux LLM open source et à l\'exécution locale. Communauté très active pour Llama, Mistral, et les modèles quantifiés.',
      examples: ['Guides Ollama', 'Comparatifs modèles', 'Optimisation GPU'],
      related: ['Reddit', 'Llama', 'Self-hosted'],
      emoji: '🦙',
      url: 'https://reddit.com/r/LocalLLaMA'
    },
    {
      term: 'r/vibecoding',
      category: 'formation',
      definition: 'Subreddit officiel du vibe coding. Partage d\'expériences, questions débutants, et showcases de projets créés avec l\'IA.',
      examples: ['Project showcases', 'Tool comparisons', 'Tips & tricks'],
      related: ['Reddit', 'Community', 'Vibe Coding'],
      emoji: '✨',
      url: 'https://reddit.com/r/vibecoding'
    },
    {
      term: 'Discord Cursor',
      category: 'formation',
      definition: 'Serveur Discord officiel de Cursor avec 100k+ membres. Support communautaire, partage de tips, et annonces des nouvelles features.',
      examples: ['#help', '#showcase', '#feature-requests'],
      related: ['Cursor', 'Community', 'Discord'],
      emoji: '💬',
      url: 'https://discord.gg/cursor'
    },
    {
      term: 'Discord Claude',
      category: 'formation',
      definition: 'Serveur Discord officiel d\'Anthropic pour Claude. Discussions sur les prompts, cas d\'usage, et retours utilisateurs.',
      examples: ['#claude-help', '#prompt-engineering', '#showcase'],
      related: ['Claude', 'Anthropic', 'Community'],
      emoji: '🤖',
      url: 'https://discord.gg/anthropic'
    },
    {
      term: 'Prompt Engineering Guide',
      category: 'formation',
      definition: 'Guide open source de référence sur le prompt engineering. Techniques avancées, exemples concrets, et research papers expliqués.',
      examples: ['Chain-of-Thought', 'Few-shot learning', 'System prompts'],
      related: ['Prompting', 'LLM', 'Best practices'],
      emoji: '📖',
      url: 'https://www.promptingguide.ai/'
    },
    {
      term: 'LangChain Academy',
      category: 'formation',
      definition: 'Cours officiels de LangChain pour apprendre à construire des applications LLM. Du RAG aux agents autonomes.',
      examples: ['Introduction to LangChain', 'RAG course', 'Agents course'],
      related: ['LangChain', 'RAG', 'Agents'],
      emoji: '🦜',
      url: 'https://academy.langchain.com/'
    }
  ];

  // Base de données enrichie des outils
  const tools = [
    // === GÉNÉRATEURS FULL-STACK ===
    {
      id: 1,
      name: 'Lovable',
      category: 'full-stack',
      tier: 'incontournable',
      launchDate: '2024-01',
      launchYear: 2024,
      price: '$20/mois',
      description: 'Plateforme de création d\'applications complètes par conversation IA',
      url: 'https://lovable.dev',
      stack: 'React, Supabase, Tailwind',
      logo: '💜',
      country: '🇸🇪 Suède',
      countryCode: 'SE',
      company: 'Lovable AB',
      founders: 'Anton Osika, Fabian Hedin',
      headquarters: 'Stockholm',
      valuation: '$1.8B (2025)',
      summary: 'Lovable est le leader européen du vibe coding avec une croissance record : $100M ARR en 8 mois, plus rapide qu\'OpenAI ou Cursor. La plateforme se distingue par son focus sur l\'UX/UI et sa capacité à créer des applications production-ready accessibles aux non-développeurs. Klarna, HubSpot et Photoroom l\'utilisent en entreprise.',
      keyFeatures: ['Agent IA agentique', 'Templates réutilisables', 'Déploiement Netlify intégré', 'GitHub sync']
    },
    {
      id: 2,
      name: 'Bolt.new',
      category: 'full-stack',
      tier: 'incontournable',
      launchDate: '2024-10',
      launchYear: 2024,
      price: '$20/mois',
      description: 'IDE cloud avec prévisualisation instantanée et Node.js dans le navigateur',
      url: 'https://bolt.new',
      stack: 'React, Node.js, WebContainers',
      logo: '⚡',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'StackBlitz Inc.',
      founders: 'Eric Simons, Albert Pai',
      headquarters: 'San Francisco, CA',
      valuation: 'Non divulgué',
      summary: 'Bolt.new est "le succès du jour au lendemain après 7 ans de travail". StackBlitz a pivoté vers l\'IA après avoir frôlé la fermeture. Grâce à la technologie WebContainers (Node.js dans le navigateur), Bolt permet de créer et déployer des apps full-stack sans serveur. Passage de $0 à $40M ARR en 5 mois avec une équipe de 15 personnes.',
      keyFeatures: ['WebContainers', 'Prévisualisation instantanée', 'Déploiement Netlify', 'Claude Sonnet intégré']
    },
    {
      id: 3,
      name: 'Replit',
      category: 'full-stack',
      tier: 'incontournable',
      launchDate: '2016-01',
      launchYear: 2016,
      price: '$25/mois (Core)',
      description: 'IDE cloud collaboratif avec Agent IA pour créer des apps complètes',
      url: 'https://replit.com',
      stack: 'Multi-langage, Python, Node.js',
      logo: '🔄',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Replit Inc.',
      founders: 'Amjad Masad, Haya Odeh, Faris Masad',
      headquarters: 'San Francisco, CA',
      valuation: '$1.2B (2025)',
      summary: 'Fondé par un développeur jordanien qui a appris à coder dans des cybercafés d\'Amman, Replit est devenu une licorne avec 30M+ utilisateurs. L\'Agent Replit lancé en 2024 permet de générer des applications complètes en langage naturel. Vision : "rendre la création logicielle aussi accessible que l\'alphabétisation".',
      keyFeatures: ['Agent IA autonome', '50+ langages', 'Collaboration temps réel', 'Déploiement intégré']
    },
    {
      id: 4,
      name: 'Firebase Studio',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-12',
      launchYear: 2024,
      price: 'Gratuit + usage',
      description: 'IDE cloud de Google avec Gemini pour créer des apps Firebase',
      url: 'https://firebase.studio',
      stack: 'Firebase, React, Angular',
      logo: '🔥',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Google LLC',
      founders: 'Google (Sundar Pichai, CEO)',
      headquarters: 'Mountain View, CA',
      valuation: 'Alphabet: $2T+',
      summary: 'Firebase Studio est la réponse de Google au vibe coding. Intégré à l\'écosystème Firebase/GCP avec Gemini comme moteur IA. Permet de passer du prompt au déploiement Cloud Run en quelques minutes. Idéal pour les développeurs déjà dans l\'écosystème Google.',
      keyFeatures: ['Gemini intégré', 'Cloud Run deployment', 'Firebase Auth/DB', 'Gratuit pour débuter']
    },
    {
      id: 5,
      name: 'Base44',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-06',
      launchYear: 2024,
      price: '$29/mois',
      description: 'Plateforme no-code/low-code avec génération IA d\'applications métier',
      url: 'https://base44.com',
      stack: 'React, PostgreSQL',
      logo: '🏗️',
      country: '🇮🇱 Israël',
      countryCode: 'IL',
      company: 'Base44 Ltd.',
      founders: 'Équipe israélienne',
      headquarters: 'Tel Aviv',
      valuation: 'Seed stage',
      summary: 'Base44 cible les applications métier internes : CRM, dashboards, outils de gestion. Focus sur la productivité entreprise avec une approche pragmatique du vibe coding. Intégration native avec les bases de données et APIs d\'entreprise.',
      keyFeatures: ['Apps métier', 'Intégrations API', 'Base de données intégrée', 'Workflows automatisés']
    },
    {
      id: 6,
      name: 'Emergent',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-08',
      launchYear: 2024,
      price: 'Beta gratuite',
      description: 'Générateur d\'applications SaaS complètes avec architecture moderne',
      url: 'https://emergent.sh',
      stack: 'Next.js, Prisma, tRPC',
      logo: '🌱',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Emergent AI',
      founders: 'Équipe YC',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Emergent se positionne sur la génération de SaaS complets avec une architecture production-ready. Génère du code propre avec les meilleures pratiques (Next.js App Router, Server Components, tRPC pour le typage end-to-end).',
      keyFeatures: ['Architecture SaaS', 'Code exportable', 'Best practices', 'TypeScript strict']
    },
    {
      id: 7,
      name: 'Pythagora',
      category: 'full-stack',
      tier: 'opensource',
      launchDate: '2023-10',
      launchYear: 2023,
      price: 'Open Source + Pro',
      description: 'AI developer qui construit des apps via conversation (GPT Pilot)',
      url: 'https://pythagora.ai',
      stack: 'Python, Node.js, React',
      logo: '🐍',
      country: '🇭🇷 Croatie',
      countryCode: 'HR',
      company: 'Pythagora d.o.o.',
      founders: 'Zvonimir Sabljić, Leon Ostrez, Senko Rašić',
      headquarters: 'Zagreb',
      valuation: 'Seed $4M (YC W24)',
      summary: 'Pythagora est né à Zagreb et a rapidement conquis la communauté open source avec GPT Pilot (32k+ stars GitHub). YC W24. L\'approche unique : un "vrai développeur IA" qui pose des questions, crée l\'architecture, et code étape par étape en collaboration avec l\'humain.',
      keyFeatures: ['GPT Pilot open source', 'Conversation naturelle', 'Apps jusqu\'à 5000 lignes', 'Extension VS Code']
    },
    {
      id: 8,
      name: 'Marblism',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-03',
      launchYear: 2024,
      price: '$49/mois',
      description: 'Générateur de SaaS avec "AI Employees" pour automatiser les tâches',
      url: 'https://marblism.com',
      stack: 'Next.js, Prisma, NestJS',
      logo: '🔮',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Marblism Inc.',
      founders: 'Équipe US',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Marblism propose une approche unique avec ses "AI Employees" : des agents spécialisés qui gèrent des tâches spécifiques (support client, data analysis). Génère des SaaS complets avec authentication, paiements et dashboards.',
      keyFeatures: ['AI Employees', 'SaaS templates', 'Stripe intégré', 'Code propre exportable']
    },
    {
      id: 9,
      name: 'Meku',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-09',
      launchYear: 2024,
      price: '$19/mois',
      description: 'Alternative à Lovable avec focus sur l\'export de code propre',
      url: 'https://meku.ai',
      stack: 'React, Node.js',
      logo: '🎯',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Meku AI',
      founders: 'Équipe indie',
      headquarters: 'Remote',
      valuation: 'Bootstrap',
      summary: 'Meku se différencie par la qualité du code généré et la facilité d\'export. Idéal pour les développeurs qui veulent démarrer rapidement puis prendre le contrôle du code. Interface épurée et workflow simplifié.',
      keyFeatures: ['Code propre', 'Export facile', 'Prix accessible', 'Interface simple']
    },
    {
      id: 10,
      name: 'Floot',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-11',
      launchYear: 2024,
      price: 'Beta',
      description: 'Interface de dessin visuel pour créer des apps (YC S25)',
      url: 'https://floot.dev',
      stack: 'React, Canvas',
      logo: '🎨',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Floot Inc.',
      founders: 'Équipe YC S25',
      headquarters: 'San Francisco, CA',
      valuation: 'YC S25',
      summary: 'Floot propose une approche unique : dessiner l\'interface plutôt que décrire. L\'IA interprète les croquis et génère le code correspondant. Idéal pour les designers et les personnes visuelles. Accepté chez Y Combinator S25.',
      keyFeatures: ['Interface dessin', 'Vision IA', 'Prototypage rapide', 'YC backed']
    },

    // === FRONTEND / UI ===
    {
      id: 11,
      name: 'v0.dev',
      category: 'frontend',
      tier: 'incontournable',
      launchDate: '2023-09',
      launchYear: 2023,
      price: '$20/mois',
      description: 'Générateur de composants UI React par prompt (Vercel)',
      url: 'https://v0.dev',
      stack: 'React, Tailwind, shadcn/ui',
      logo: '▲',
      country: '🇺🇸 États-Unis (🇦🇷 fondateur)',
      countryCode: 'US',
      company: 'Vercel Inc.',
      founders: 'Guillermo Rauch',
      headquarters: 'San Francisco, CA',
      valuation: '$3.25B (2024)',
      summary: 'Créé par Guillermo Rauch, fondateur argentin de Vercel et Next.js. v0 a popularisé le concept de "generative UI" : décrire une interface en anglais et obtenir du code React/Tailwind production-ready. 3M+ utilisateurs. Le pont entre design et code.',
      keyFeatures: ['shadcn/ui', 'Code exportable', 'Iterations rapides', 'Responsive natif']
    },
    {
      id: 12,
      name: 'Framer AI',
      category: 'frontend',
      tier: 'incontournable',
      launchDate: '2023-06',
      launchYear: 2023,
      price: '$15/mois',
      description: 'Création de sites web design-first avec IA générative',
      url: 'https://framer.com',
      stack: 'Framer, React',
      logo: '🖼️',
      country: '🇳🇱 Pays-Bas',
      countryCode: 'NL',
      company: 'Framer B.V.',
      founders: 'Koen Bok, Jorn van Dijk',
      headquarters: 'Amsterdam',
      valuation: '$150M+ (2023)',
      summary: 'Framer a évolué d\'un outil de prototypage vers un constructeur de sites complets avec IA. L\'approche design-first attire designers et créatifs. Génération de copy, images et layouts par IA. Sites publiés directement sur le CDN Framer.',
      keyFeatures: ['Design-first', 'Animations natives', 'CMS intégré', 'Hébergement inclus']
    },
    {
      id: 13,
      name: 'Tempo Labs',
      category: 'frontend',
      tier: 'challenger',
      launchDate: '2024-05',
      launchYear: 2024,
      price: 'Beta gratuite',
      description: 'Éditeur visuel React avec génération IA de composants',
      url: 'https://tempo.new',
      stack: 'React, TypeScript',
      logo: '⏱️',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Tempo Labs',
      founders: 'Équipe ex-Figma',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Tempo Labs propose un éditeur visuel qui génère du vrai code React, pas du code propriétaire. Édition directe dans le navigateur avec preview live. Idéal pour les équipes qui veulent garder le contrôle du code.',
      keyFeatures: ['Éditeur visuel', 'Code React pur', 'Preview live', 'Git integration']
    },
    {
      id: 14,
      name: 'Uizard',
      category: 'frontend',
      tier: 'challenger',
      launchDate: '2021-01',
      launchYear: 2021,
      price: '$19/mois',
      description: 'Transformation de croquis et screenshots en designs UI',
      url: 'https://uizard.io',
      stack: 'Propriétaire',
      logo: '✏️',
      country: '🇩🇰 Danemark',
      countryCode: 'DK',
      company: 'Uizard Technologies',
      founders: 'Tony Beltramelli',
      headquarters: 'Copenhague',
      valuation: '$15M+ raised',
      summary: 'Uizard a été pionnier dans la conversion de croquis en designs UI. Upload une photo de wireframe papier et obtenez un design éditable. Récemment enrichi avec génération par prompt textuel.',
      keyFeatures: ['Sketch-to-UI', 'Screenshot-to-design', 'Templates', 'Export Figma']
    },
    {
      id: 15,
      name: 'Trickle Magic Canvas',
      category: 'frontend',
      tier: 'challenger',
      launchDate: '2024-07',
      launchYear: 2024,
      price: '$12/mois',
      description: 'Canvas IA pour créer des interfaces et workflows',
      url: 'https://trickle.so',
      stack: 'Canvas, React',
      logo: '✨',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Trickle',
      founders: 'Équipe indie',
      headquarters: 'Remote',
      valuation: 'Bootstrap',
      summary: 'Trickle Magic Canvas combine un canvas infini avec la génération IA. Créez des interfaces, workflows, et documents interactifs. Approche unique entre Figma et Notion avec couche IA.',
      keyFeatures: ['Canvas infini', 'Génération IA', 'Workflows', 'Collaboration']
    },

    // === MOBILE ===
    {
      id: 16,
      name: 'FlutterFlow',
      category: 'mobile',
      tier: 'incontournable',
      launchDate: '2021-03',
      launchYear: 2021,
      price: '$30/mois',
      description: 'Builder visuel Flutter avec génération de code natif',
      url: 'https://flutterflow.io',
      stack: 'Flutter, Dart, Firebase',
      logo: '📱',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'FlutterFlow Inc.',
      founders: 'Abel Mengistu, Alex Greaves',
      headquarters: 'San Francisco, CA',
      valuation: '$25M+ raised',
      summary: 'FlutterFlow est le leader du développement mobile visuel. Génère du vrai code Flutter exportable. Intégration Firebase native. Récemment enrichi avec des fonctionnalités IA pour générer des écrans et logique.',
      keyFeatures: ['Code Flutter natif', 'Export complet', 'Firebase intégré', 'IA générative']
    },
    {
      id: 17,
      name: 'Dreamflow',
      category: 'mobile',
      tier: 'challenger',
      launchDate: '2024-04',
      launchYear: 2024,
      price: 'Beta',
      description: 'Générateur d\'apps mobiles par prompt avec React Native',
      url: 'https://dreamflow.ai',
      stack: 'React Native, Expo',
      logo: '💭',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Dreamflow AI',
      founders: 'Équipe indie',
      headquarters: 'Remote',
      valuation: 'Seed stage',
      summary: 'Dreamflow cible la génération d\'apps React Native via prompts. Focus sur l\'écosystème Expo pour un déploiement simplifié iOS/Android. Encore en beta mais prometteur.',
      keyFeatures: ['React Native', 'Expo ready', 'Cross-platform', 'Preview sur device']
    },
    {
      id: 18,
      name: 'Rork',
      category: 'mobile',
      tier: 'challenger',
      launchDate: '2024-08',
      launchYear: 2024,
      price: '$25/mois',
      description: 'Création d\'apps mobiles par conversation IA',
      url: 'https://rork.app',
      stack: 'React Native',
      logo: '🚀',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Rork Inc.',
      founders: 'Équipe YC',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Rork propose une expérience conversationnelle pour créer des apps mobiles. L\'IA pose des questions, génère les écrans, et itère jusqu\'à satisfaction. Approche guidée pour non-développeurs.',
      keyFeatures: ['Conversation IA', 'Guidage étape par étape', 'Preview live', 'Publication app stores']
    },

    // === IDE AI ===
    {
      id: 19,
      name: 'Cursor',
      category: 'ide-ai',
      tier: 'incontournable',
      launchDate: '2023-03',
      launchYear: 2023,
      price: '$20/mois',
      description: 'IDE AI-first basé sur VS Code avec Composer pour édition multi-fichiers',
      url: 'https://cursor.sh',
      stack: 'VS Code, Multi-LLM',
      logo: '🖱️',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Anysphere Inc.',
      founders: 'Michael Truell, Sualeh Asif, Arvid Lunnemark, Aman Sanger',
      headquarters: 'San Francisco, CA',
      valuation: '$29.3B (Nov 2025)',
      summary: 'Cursor est LE phénomène de 2024-2025. Fondé par 4 étudiants MIT qui ont abandonné leurs études. $1B ARR dépassé en novembre 2025. Le Composer mode permet l\'édition intelligente multi-fichiers. Utilisé par la majorité des développeurs AI-forward. Modèles propres développés en interne.',
      keyFeatures: ['Composer multi-fichiers', 'Tab completion IA', 'Modèles internes', 'Chat contextuel']
    },
    {
      id: 20,
      name: 'Windsurf',
      category: 'ide-ai',
      tier: 'incontournable',
      launchDate: '2024-11',
      launchYear: 2024,
      price: '$15/mois',
      description: 'IDE agentique avec Cascade pour workflows autonomes',
      url: 'https://windsurf.ai',
      stack: 'VS Code fork, Multi-LLM',
      logo: '🏄',
      country: '🇺🇸 États-Unis (🇮🇳 fondateur)',
      countryCode: 'US',
      company: 'Codeium / Exafunction',
      founders: 'Varun Mohan, Douglas Chen',
      headquarters: 'Mountain View, CA',
      valuation: '$1.25B (2024)',
      summary: 'Fondé par Varun Mohan, américain d\'origine indienne et diplômé du MIT. Windsurf (ex-Codeium) a atteint 1M utilisateurs en 4 mois. L\'IDE agentique Cascade permet des workflows autonomes complexes. En juillet 2025, Google a recruté les fondateurs tout en gardant Windsurf indépendant via un accord de $2.4B.',
      keyFeatures: ['Cascade agentique', 'Prix agressif', '1M+ utilisateurs', 'Multi-LLM']
    },
    {
      id: 21,
      name: 'GitHub Copilot',
      category: 'ide-ai',
      tier: 'incontournable',
      launchDate: '2021-06',
      launchYear: 2021,
      price: '$10/mois',
      description: 'Le pionnier de l\'assistance IA au code (Microsoft/OpenAI)',
      url: 'https://github.com/features/copilot',
      stack: 'VS Code, JetBrains, Neovim',
      logo: '🐙',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'GitHub / Microsoft',
      founders: 'Microsoft (Satya Nadella, CEO)',
      headquarters: 'San Francisco, CA',
      valuation: 'Microsoft: $3T+',
      summary: 'GitHub Copilot a lancé la révolution de l\'IA dans le code en juin 2021. Premier produit à atteindre l\'adoption massive ($400M+ ARR). Désormais enrichi avec Copilot Chat, Workspace, et l\'agent Copilot. Reste le standard de l\'industrie malgré la concurrence.',
      keyFeatures: ['Autocomplétion IA', 'Copilot Chat', 'Workspace', 'Multi-IDE']
    },
    {
      id: 22,
      name: 'Cline',
      category: 'ide-ai',
      tier: 'opensource',
      launchDate: '2024-07',
      launchYear: 2024,
      price: 'Open Source + API',
      description: 'Agent autonome VS Code open source avec MCP (ex-Claude Dev)',
      url: 'https://cline.bot',
      stack: 'VS Code, Multi-LLM, MCP',
      logo: '🤖',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Cline Bot Inc.',
      founders: 'Saoud Rizwan',
      headquarters: 'Sacramento, CA',
      valuation: '$32M raised (2025)',
      summary: 'Cline (ex-Claude Dev) est l\'agent open source le plus populaire avec 4M+ téléchargements. Créé par Saoud Rizwan d\'origine sud-asiatique. Pionnier du mode Plan/Act et de l\'intégration MCP. Peut créer des fichiers, exécuter des commandes, utiliser un navigateur. Series A de $32M en juillet 2025.',
      keyFeatures: ['Open source', 'Plan/Act mode', 'MCP integration', 'Browser automation']
    },
    {
      id: 23,
      name: 'Zed AI',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2024-08',
      launchYear: 2024,
      price: 'Gratuit + API',
      description: 'Éditeur ultra-rapide en Rust avec assistant IA intégré',
      url: 'https://zed.dev',
      stack: 'Rust, Multi-LLM',
      logo: '⚡',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Zed Industries',
      founders: 'Nathan Sobo (ex-Atom)',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Créé par Nathan Sobo, fondateur d\'Atom chez GitHub. Zed est un éditeur de nouvelle génération écrit en Rust pour des performances maximales. L\'assistant IA intégré supporte Claude et GPT. Focus sur la collaboration en temps réel.',
      keyFeatures: ['Ultra-rapide (Rust)', 'Collaboration native', 'Multi-LLM', 'Open source']
    },
    {
      id: 24,
      name: 'Supermaven',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2024-02',
      launchYear: 2024,
      price: '$10/mois',
      description: 'Complétion de code ultra-rapide avec contexte 1M tokens',
      url: 'https://supermaven.com',
      stack: 'VS Code, JetBrains',
      logo: '🚄',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Supermaven Inc.',
      founders: 'Jacob Jackson (ex-Tabnine)',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Supermaven se différencie par sa vitesse extrême et sa fenêtre de contexte de 1M tokens. Fondé par Jacob Jackson, ancien de Tabnine. Focus sur l\'autocomplétion plutôt que le chat, avec une latence minimale.',
      keyFeatures: ['Latence minimale', '1M tokens contexte', 'Multi-IDE', 'Modèle propriétaire']
    },

    // === CLI AGENTS ===
    {
      id: 25,
      name: 'Claude Code',
      category: 'cli-agent',
      tier: 'incontournable',
      launchDate: '2025-02',
      launchYear: 2025,
      price: 'Inclus Pro $20',
      description: 'Agent terminal d\'Anthropic pour coder via Claude depuis la ligne de commande',
      url: 'https://docs.anthropic.com/claude-code',
      stack: 'Terminal, Claude 4',
      logo: '🧠',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Anthropic',
      founders: 'Dario Amodei, Daniela Amodei',
      headquarters: 'San Francisco, CA',
      valuation: '$60B+ (2025)',
      summary: 'Claude Code a atteint $1B ARR en 6 mois, record absolu. Agent terminal-first utilisant Claude 4 avec contexte 200k tokens. Inclus gratuitement avec l\'abonnement Claude Pro ($20). Approche "agentic coding" avec lecture/écriture de fichiers et exécution de commandes.',
      keyFeatures: ['200k contexte', 'Inclus avec Pro', 'Terminal natif', 'Git integration']
    },
    {
      id: 26,
      name: 'OpenAI Codex CLI',
      category: 'cli-agent',
      tier: 'incontournable',
      launchDate: '2025-04',
      launchYear: 2025,
      price: 'Inclus Plus $20',
      description: 'Agent CLI open source d\'OpenAI pour coder en local',
      url: 'https://github.com/openai/codex-cli',
      stack: 'Terminal, GPT-4',
      logo: '🤖',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'OpenAI',
      founders: 'Sam Altman',
      headquarters: 'San Francisco, CA',
      valuation: '$150B+ (2025)',
      summary: 'OpenAI Codex CLI est la réponse d\'OpenAI à Claude Code. Lancé en avril 2025 comme projet open source. Inclus avec ChatGPT Plus. Codex Cloud (mai 2025) permet l\'exécution parallèle de tâches dans un sandbox ChatGPT.',
      keyFeatures: ['Open source', 'Local first', 'Codex Cloud sandbox', 'GPT-4 powered']
    },
    {
      id: 27,
      name: 'Gemini CLI',
      category: 'cli-agent',
      tier: 'incontournable',
      launchDate: '2025-06',
      launchYear: 2025,
      price: 'Gratuit (quotas)',
      description: 'Agent CLI de Google avec contexte 1M tokens et tier gratuit généreux',
      url: 'https://github.com/google/gemini-cli',
      stack: 'Terminal, Gemini 2',
      logo: '💎',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Google DeepMind',
      founders: 'Google (Demis Hassabis, CEO DeepMind)',
      headquarters: 'Mountain View, CA',
      valuation: 'Alphabet: $2T+',
      summary: 'Gemini CLI est l\'agent CLI de Google avec le contexte le plus large du marché (1M tokens). Tier gratuit très généreux : 60 req/min + 1000 req/jour. Open source sur GitHub. Intégration native avec l\'écosystème Google Cloud.',
      keyFeatures: ['1M tokens contexte', 'Gratuit généreux', 'Open source', 'Google Cloud']
    },
    {
      id: 28,
      name: 'Aider',
      category: 'cli-agent',
      tier: 'opensource',
      launchDate: '2023-05',
      launchYear: 2023,
      price: 'Open Source + API',
      description: 'AI pair programming terminal avec scores top sur SWE-bench',
      url: 'https://aider.chat',
      stack: 'Python, Multi-LLM',
      logo: '🔧',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Aider (Open Source)',
      founders: 'Paul Gauthier (ex-CTO Inktomi)',
      headquarters: 'Remote',
      valuation: 'Open Source',
      summary: 'Aider est créé par Paul Gauthier, CTO fondateur d\'Inktomi (1996-2000). Top scores sur SWE-Bench. Le projet open source le plus mature pour le pair programming terminal. Support multi-LLM : Claude, GPT-4, Gemini, DeepSeek. 38k+ stars GitHub.',
      keyFeatures: ['SWE-bench leader', 'Git-aware', 'Multi-LLM', 'Voice support']
    },
    {
      id: 29,
      name: 'Goose',
      category: 'cli-agent',
      tier: 'opensource',
      launchDate: '2024-09',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Agent IA extensible de Block (ex-Square) avec plugins',
      url: 'https://github.com/block/goose',
      stack: 'Python, Multi-LLM',
      logo: '🪿',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Block Inc. (ex-Square)',
      founders: 'Jack Dorsey (co-fondateur Block)',
      headquarters: 'San Francisco, CA',
      valuation: 'Block: $40B+',
      summary: 'Goose est l\'agent IA open source de Block (ex-Square, Jack Dorsey). Système de plugins extensible pour personnaliser les capacités. Focus sur l\'automatisation des tâches développeur répétitives.',
      keyFeatures: ['Plugins extensibles', 'Block backed', 'Multi-LLM', 'Task automation']
    },
    {
      id: 42,
      name: 'OpenCode',
      category: 'cli-agent',
      tier: 'opensource',
      launchDate: '2025-03',
      launchYear: 2025,
      price: 'Open Source',
      description: 'Agent CLI open source model-agnostique avec TUI avancée (par SST)',
      url: 'https://opencode.ai',
      stack: 'Go, Multi-LLM, Bubble Tea',
      logo: '🟢',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'SST / AnomalyBrand',
      founders: 'Dax Raad (@thdxr), Adam Elmore (@adamdotdev)',
      headquarters: 'Remote (US)',
      valuation: 'Open Source',
      summary: 'OpenCode est l\'alternative open source à Claude Code développée par SST (Serverless Stack). Construit en Go avec Bubble Tea pour une TUI ultra-rapide. Supporte 75+ providers LLM via Models.dev, y compris les modèles locaux. 38k+ stars GitHub, 400k+ développeurs/mois. Architecture client/serveur permettant le contrôle distant.',
      keyFeatures: ['Open source (MIT)', 'TUI Bubble Tea', '75+ LLM providers', 'Sessions multi-agents', 'LSP auto-detect', 'Sessions partageables']
    },

    // === NO-CODE ENHANCED ===
    {
      id: 30,
      name: 'Bubble',
      category: 'no-code',
      tier: 'incontournable',
      launchDate: '2012-01',
      launchYear: 2012,
      price: '$32/mois',
      description: 'Plateforme no-code leader enrichie avec IA pour créer des apps web',
      url: 'https://bubble.io',
      stack: 'Propriétaire, AWS',
      logo: '🫧',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Bubble Group Inc.',
      founders: 'Emmanuel Straschnov, Josh Haas',
      headquarters: 'New York, NY',
      valuation: '$100M+ raised',
      summary: 'Bubble est le leader historique du no-code depuis 2012. Récemment enrichi avec des fonctionnalités IA pour générer des workflows et interfaces. Écosystème massif de templates et plugins. Utilisé par des milliers de startups.',
      keyFeatures: ['No-code visuel', 'IA générative', 'Marketplace plugins', 'Base de données']
    },
    {
      id: 31,
      name: 'Glide',
      category: 'no-code',
      tier: 'challenger',
      launchDate: '2018-01',
      launchYear: 2018,
      price: '$25/mois',
      description: 'Création d\'apps métier à partir de Google Sheets avec IA',
      url: 'https://glideapps.com',
      stack: 'Google Sheets, Airtable',
      logo: '📊',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Glide',
      founders: 'David Siegel, Jason Smith',
      headquarters: 'San Francisco, CA',
      valuation: '$50M+ raised',
      summary: 'Glide transforme des spreadsheets en apps mobiles et web. Approche unique : vos données Google Sheets deviennent une app. IA ajoutée pour suggérer des composants et automatisations.',
      keyFeatures: ['Sheets-to-app', 'Mobile natif', 'IA suggestions', 'PWA']
    },
    {
      id: 32,
      name: 'Retool',
      category: 'no-code',
      tier: 'incontournable',
      launchDate: '2017-01',
      launchYear: 2017,
      price: '$10/utilisateur',
      description: 'Builder d\'outils internes avec IA pour connecter APIs et bases',
      url: 'https://retool.com',
      stack: 'React, SQL, APIs',
      logo: '🔨',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Retool Inc.',
      founders: 'David Hsu',
      headquarters: 'San Francisco, CA',
      valuation: '$3.2B (2022)',
      summary: 'Retool est le leader des outils internes no-code pour entreprises. Connecte facilement bases de données et APIs. IA ajoutée pour générer des requêtes SQL et interfaces. Utilisé par des milliers d\'entreprises tech.',
      keyFeatures: ['Outils internes', 'SQL generator', 'API connections', 'Enterprise ready']
    },
    {
      id: 33,
      name: 'ToolJet',
      category: 'no-code',
      tier: 'opensource',
      launchDate: '2021-06',
      launchYear: 2021,
      price: 'Open Source + Cloud',
      description: 'Alternative open source à Retool pour outils internes',
      url: 'https://tooljet.com',
      stack: 'React, PostgreSQL',
      logo: '🛠️',
      country: '🇮🇳 Inde',
      countryCode: 'IN',
      company: 'ToolJet Inc.',
      founders: 'Navaneeth PK',
      headquarters: 'Bangalore',
      valuation: '$10M+ raised',
      summary: 'ToolJet est l\'alternative open source à Retool, créée en Inde. 25k+ stars GitHub. Self-hostable. Fonctionnalités IA récemment ajoutées pour générer des composants et requêtes.',
      keyFeatures: ['Open source', 'Self-hostable', 'IA intégrée', '25k+ stars']
    },

    // === OPEN SOURCE SUPPLÉMENTAIRES ===
    {
      id: 34,
      name: 'OpenHands',
      category: 'opensource',
      tier: 'opensource',
      launchDate: '2024-03',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Agent IA open source pour automatiser les tâches dev (ex-OpenDevin)',
      url: 'https://github.com/All-Hands-AI/OpenHands',
      stack: 'Python, Docker',
      logo: '🙌',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'All Hands AI',
      founders: 'Communauté open source',
      headquarters: 'Remote',
      valuation: 'Open Source',
      summary: 'OpenHands (ex-OpenDevin) est un agent IA open source qui peut naviguer le web, écrire du code, et interagir avec des environnements. Alternative open source à Devin. Communauté active avec contributions régulières.',
      keyFeatures: ['Agent autonome', 'Browser automation', 'Docker sandbox', 'Multi-LLM']
    },
    {
      id: 35,
      name: 'Continue',
      category: 'opensource',
      tier: 'opensource',
      launchDate: '2023-08',
      launchYear: 2023,
      price: 'Open Source',
      description: 'Copilote IA open source pour VS Code et JetBrains',
      url: 'https://continue.dev',
      stack: 'VS Code, JetBrains',
      logo: '➡️',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Continue Dev',
      founders: 'Ty Dunn, Nate Sesti',
      headquarters: 'San Francisco, CA',
      valuation: 'YC backed',
      summary: 'Continue est le copilote IA open source le plus personnalisable. Support multi-LLM (local ou cloud). Configuration fine des prompts et comportements. Alternative transparente à Copilot.',
      keyFeatures: ['Open source', 'Multi-LLM', 'Personnalisable', 'Local possible']
    },
    {
      id: 36,
      name: 'Tabby',
      category: 'opensource',
      tier: 'opensource',
      launchDate: '2023-06',
      launchYear: 2023,
      price: 'Open Source',
      description: 'Serveur d\'autocomplétion IA self-hosted',
      url: 'https://tabby.tabbyml.com',
      stack: 'Rust, Multi-LLM',
      logo: '🐱',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'TabbyML',
      founders: 'Équipe open source',
      headquarters: 'Remote',
      valuation: 'YC backed',
      summary: 'Tabby est un serveur d\'autocomplétion IA que vous pouvez héberger vous-même. Idéal pour les entreprises avec des contraintes de confidentialité. Support de modèles locaux (StarCoder, CodeLlama).',
      keyFeatures: ['Self-hosted', 'Modèles locaux', 'Enterprise ready', 'Rust performance']
    },

    // === OUTILS ADDITIONNELS ===
    {
      id: 37,
      name: 'Create.xyz',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-05',
      launchYear: 2024,
      price: '$20/mois',
      description: 'Création d\'apps par prompt avec déploiement instantané',
      url: 'https://create.xyz',
      stack: 'React, Node.js',
      logo: '🎯',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Create Labs',
      founders: 'Équipe YC',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed stage',
      summary: 'Create.xyz propose une expérience fluide de prompt-to-app avec déploiement instantané. Interface minimaliste, focus sur la rapidité d\'exécution. Idéal pour le prototypage rapide.',
      keyFeatures: ['Prompt-to-app', 'Déploiement instant', 'Interface simple', 'Export code']
    },
    {
      id: 38,
      name: 'Softgen',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-07',
      launchYear: 2024,
      price: '$25/mois',
      description: 'Générateur d\'applications métier avec IA',
      url: 'https://softgen.ai',
      stack: 'Next.js, PostgreSQL',
      logo: '🏢',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      company: 'Softgen Ltd.',
      founders: 'Équipe UK',
      headquarters: 'Londres',
      valuation: 'Seed stage',
      summary: 'Softgen cible les applications métier B2B : CRM, ERP, dashboards. Génère des interfaces complexes avec logique backend. Focus entreprise avec support et SLAs.',
      keyFeatures: ['Apps B2B', 'Backend inclus', 'Support entreprise', 'Intégrations']
    },
    {
      id: 39,
      name: 'JetBrains AI',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2023-12',
      launchYear: 2023,
      price: 'Inclus IDE',
      description: 'Assistant IA intégré aux IDEs JetBrains (IntelliJ, PyCharm...)',
      url: 'https://jetbrains.com/ai',
      stack: 'JetBrains, Multi-LLM',
      logo: '🧪',
      country: '🇨🇿 Tchéquie',
      countryCode: 'CZ',
      company: 'JetBrains s.r.o.',
      founders: 'Sergey Dmitriev, Valentin Kipiatkov',
      headquarters: 'Prague',
      valuation: '$7B+ (2021)',
      summary: 'JetBrains AI intègre l\'assistance IA directement dans les IDEs professionnels (IntelliJ, PyCharm, WebStorm...). Connaissance profonde du code grâce aux années d\'expertise en analyse statique.',
      keyFeatures: ['Intégré aux IDEs', 'Analyse profonde', 'Multi-langage', 'Refactoring IA']
    },
    {
      id: 40,
      name: 'Amazon Q Developer',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2024-04',
      launchYear: 2024,
      price: '$19/mois',
      description: 'Assistant IA d\'AWS pour le développement cloud',
      url: 'https://aws.amazon.com/q/developer/',
      stack: 'VS Code, JetBrains, AWS',
      logo: '☁️',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Amazon Web Services',
      founders: 'Amazon (Andy Jassy, CEO)',
      headquarters: 'Seattle, WA',
      valuation: 'Amazon: $2T+',
      summary: 'Amazon Q Developer est l\'assistant IA d\'AWS, optimisé pour le développement cloud. Génération de code, debugging, et déploiement sur AWS. Connaissance native des services AWS.',
      keyFeatures: ['AWS natif', 'Debugging avancé', 'Security scanning', 'Code transformation']
    },
    {
      id: 41,
      name: 'Sourcegraph Cody',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2023-07',
      launchYear: 2023,
      price: 'Gratuit + Pro',
      description: 'Assistant IA avec compréhension de l\'ensemble du codebase',
      url: 'https://sourcegraph.com/cody',
      stack: 'VS Code, Multi-LLM',
      logo: '🔍',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Sourcegraph Inc.',
      founders: 'Quinn Slack, Beyang Liu',
      headquarters: 'San Francisco, CA',
      valuation: '$2.6B (2021)',
      summary: 'Cody utilise la technologie de recherche de code Sourcegraph pour comprendre l\'ensemble de votre codebase. Contexte illimité grâce à l\'indexation. Idéal pour les grandes bases de code.',
      keyFeatures: ['Contexte codebase', 'Recherche code', 'Multi-repo', 'Enterprise']
    },

    // === AGENTS ASYNCHRONES ===
    {
      id: 42,
      name: 'Jules',
      category: 'cli-agent',
      tier: 'incontournable',
      launchDate: '2024-12',
      launchYear: 2024,
      price: 'Gratuit + Pro $19.99/mois',
      description: 'Agent de codage asynchrone de Google qui travaille en arrière-plan',
      url: 'https://jules.google',
      stack: 'Gemini 2.5 Pro, GitHub, Cloud VM',
      logo: '🤖',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Google Labs',
      founders: 'Google (Kathy Korevec, Director)',
      headquarters: 'Mountain View, CA',
      valuation: 'Alphabet: $2T+',
      summary: 'Jules est révolutionnaire : c\'est un agent ASYNCHRONE. Vous lancez une tâche et partez. Jules clone votre repo dans une VM cloud, analyse le code, planifie les modifications, et crée une PR. Sorti de beta en 2025 avec 140k+ améliorations de code. Intégration GitHub native, audio changelogs, et Jules Tools CLI.',
      keyFeatures: ['Asynchrone', 'GitHub PR auto', 'Multi-tâches parallèles', 'Audio summaries', 'Jules Tools CLI']
    },
    {
      id: 43,
      name: 'Plandex',
      category: 'cli-agent',
      tier: 'challenger',
      launchDate: '2024-03',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Agent terminal open source pour tâches complexes multi-fichiers',
      url: 'https://github.com/plandex-ai/plandex',
      stack: 'Go, Tree-sitter, Multi-LLM',
      logo: '📋',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Plandex AI',
      founders: 'Dane Sherburn',
      headquarters: 'Remote',
      valuation: 'Open Source (10k+ ⭐)',
      summary: 'Plandex gère des contextes jusqu\'à 2M tokens avec une approche unique : il planifie avant d\'exécuter. Sandbox protégé, versioning Git-like des modifications, et support multi-LLM. Idéal pour les refactorings massifs et les migrations complexes.',
      keyFeatures: ['2M tokens contexte', 'Planification', 'Sandbox', 'Git-like versioning', 'MIT License']
    },
    {
      id: 44,
      name: 'Roo Code',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2024-06',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Fork amélioré de Cline avec modes spécialisés',
      url: 'https://github.com/RooVetGit/Roo-Code',
      stack: 'VS Code, Multi-LLM, MCP',
      logo: '🦘',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Roo Code Community',
      founders: 'Community Fork',
      headquarters: 'Open Source',
      valuation: 'Open Source (649k+ downloads)',
      summary: 'Roo Code est né d\'un fork de Cline avec une vision : des modes spécialisés. Architect mode pour la conception, Coder mode pour l\'implémentation, Debugger mode pour le troubleshooting. Boomerang Tasks pour décomposer automatiquement les projets complexes.',
      keyFeatures: ['Modes spécialisés', 'Boomerang Tasks', 'MCP support', 'Apache 2.0']
    },
    {
      id: 45,
      name: 'Kilo Code',
      category: 'ide-ai',
      tier: 'emergent',
      launchDate: '2025-01',
      launchYear: 2025,
      price: 'Open Source',
      description: 'Superset de Roo Code et Cline avec marketplace MCP',
      url: 'https://kilocode.ai',
      stack: 'VS Code, Multi-LLM, MCP',
      logo: '🎯',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Kilo Code',
      founders: 'Community',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'Kilo Code fusionne le meilleur de Roo Code et Cline dans un superset unifié. Sa killer feature : un marketplace MCP intégré pour installer des outils en un clic. Multi-mode avancé et configuration granulaire.',
      keyFeatures: ['MCP Marketplace', 'Multi-mode', 'Roo+Cline merged', 'Apache 2.0']
    },
    {
      id: 46,
      name: 'Void',
      category: 'ide',
      tier: 'emergent',
      launchDate: '2024-09',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Alternative open source à Cursor, fork de VS Code',
      url: 'https://voideditor.com',
      stack: 'VS Code Fork, Multi-LLM',
      logo: '⬛',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Void (YC W24)',
      founders: 'Andrew Chen, Matt Hamilton',
      headquarters: 'San Francisco, CA',
      valuation: 'YC Backed',
      summary: 'Void est la réponse open source à Cursor. Backed by Y Combinator, l\'éditeur met l\'accent sur la privacy (tout en local) et la liberté de choix des modèles. Fork de VS Code avec toutes vos extensions existantes.',
      keyFeatures: ['Privacy-first', 'Open source', 'VS Code compatible', 'Multi-LLM']
    },
    {
      id: 47,
      name: 'PearAI',
      category: 'ide',
      tier: 'emergent',
      launchDate: '2024-08',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Fork de VS Code + Continue, éditeur IA open source',
      url: 'https://trypear.ai',
      stack: 'VS Code Fork, Continue, Multi-LLM',
      logo: '🍐',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'PearAI',
      founders: 'Duke Pan, Nathan Scharfman',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed Funded',
      summary: 'PearAI combine VS Code et Continue dans un package prêt à l\'emploi. Pas de configuration, tout marche out-of-the-box. La simplicité d\'un produit commercial avec la transparence de l\'open source.',
      keyFeatures: ['Zero config', 'Continue intégré', 'Open source', 'Apache 2.0']
    },
    {
      id: 48,
      name: 'avante.nvim',
      category: 'ide-ai',
      tier: 'challenger',
      launchDate: '2024-05',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Plugin Neovim qui émule Cursor, le plus populaire de l\'écosystème',
      url: 'https://github.com/yetone/avante.nvim',
      stack: 'Neovim, Lua, Multi-LLM',
      logo: '📝',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      company: 'Open Source',
      founders: 'yetone (maintainer)',
      headquarters: 'Open Source',
      valuation: 'Open Source (15.5k+ ⭐)',
      summary: 'avante.nvim apporte l\'expérience Cursor à Neovim. Fast Apply avec 96-98% de précision, chat inline, support multi-LLM. Le plugin IA le plus populaire de l\'écosystème Neovim avec 15k+ stars.',
      keyFeatures: ['Cursor-like', 'Fast Apply 96-98%', 'Chat inline', 'Multi-LLM']
    },
    {
      id: 49,
      name: 'bolt.diy',
      category: 'full-stack',
      tier: 'challenger',
      launchDate: '2024-11',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Version open source de Bolt.new, auto-hébergeable',
      url: 'https://github.com/stackblitz-labs/bolt.diy',
      stack: 'React, Node.js, WebContainers',
      logo: '🔧',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'StackBlitz Labs',
      founders: 'Cole Medin, Community',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'StackBlitz a open-sourcé une version de Bolt.new ! bolt.diy permet d\'auto-héberger votre propre instance, de choisir n\'importe quel LLM, et de personnaliser l\'expérience. La communauté a ajouté le support de 15+ providers.',
      keyFeatures: ['Self-hosted', 'Multi-LLM', 'WebContainers', 'Community driven']
    },
    {
      id: 50,
      name: 'gpt-engineer',
      category: 'cli-agent',
      tier: 'historique',
      launchDate: '2023-06',
      launchYear: 2023,
      price: 'Open Source',
      description: 'Le précurseur open source du vibe coding, ancêtre de Lovable',
      url: 'https://github.com/AntonOsika/gpt-engineer',
      stack: 'Python, OpenAI',
      logo: '🏗️',
      country: '🇸🇪 Suède',
      countryCode: 'SE',
      company: 'Open Source → Lovable',
      founders: 'Anton Osika',
      headquarters: 'Stockholm',
      valuation: 'Open Source (50k+ ⭐)',
      summary: 'gpt-engineer est le projet qui a tout lancé. 50k+ stars GitHub, créé par Anton Osika qui a ensuite fondé Lovable. Le projet a prouvé qu\'un LLM pouvait générer des applications entières à partir de spécifications textuelles.',
      keyFeatures: ['Historique', '50k+ stars', 'Précurseur Lovable', 'MIT License']
    },
    {
      id: 51,
      name: 'Amazon Kiro',
      category: 'ide',
      tier: 'incontournable',
      launchDate: '2025-07',
      launchYear: 2025,
      price: 'Gratuit (preview)',
      description: 'IDE AWS spec-driven pour passer du prototype à la production',
      url: 'https://kiro.dev',
      stack: 'Code OSS, Claude Sonnet 4, MCP',
      logo: '🛸',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Amazon Web Services',
      founders: 'Nikhil Swaminathan, Deepak Singh',
      headquarters: 'Seattle, WA',
      valuation: 'Amazon: $2T+',
      summary: 'IDE agentic d\'AWS lancé juillet 2025. Spec-driven development : transforme le langage naturel en user stories, design technique, puis code. Hooks pour automatisations en arrière-plan. Basé sur Code OSS avec Claude Sonnet 4. Alternative sérieuse à Cursor pour l\'enterprise.',
      keyFeatures: ['Spec-driven', 'Hooks automation', 'Claude Sonnet 4', 'MCP support', 'Production-ready']
    },
    {
      id: 52,
      name: 'Amp',
      category: 'cli-agent',
      tier: 'emergent',
      launchDate: '2025-02',
      launchYear: 2025,
      price: 'Gratuit + Pro',
      description: 'Agent frontier de Sourcegraph pour terminal et éditeur',
      url: 'https://ampcode.com',
      stack: 'Multi-LLM, Terminal, VS Code',
      logo: '⚡',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Sourcegraph Inc.',
      founders: 'Quinn Slack, Beyang Liu',
      headquarters: 'San Francisco, CA',
      valuation: '$2.6B (2021)',
      summary: 'Amp est le nouvel agent "frontier" de Sourcegraph, complémentaire à Cody. Conçu pour les tâches complexes en terminal et éditeur. Exploite la technologie de recherche de code Sourcegraph pour un contexte optimal.',
      keyFeatures: ['Frontier agent', 'Terminal + Editor', 'Code search', 'Multi-LLM']
    },
    {
      id: 53,
      name: 'MyCoder.ai',
      category: 'cli-agent',
      tier: 'emergent',
      launchDate: '2024-10',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Agent CLI avec exécution parallèle et auto-modification',
      url: 'https://mycoder.ai',
      stack: 'TypeScript, Multi-LLM',
      logo: '👤',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'MyCoder',
      founders: 'Community',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'MyCoder se distingue par l\'exécution parallèle de sous-agents et sa capacité d\'auto-modification. Intégration Git/GitHub native, idéal pour les workflows automatisés et les pipelines CI/CD.',
      keyFeatures: ['Parallel execution', 'Self-modification', 'Git native', 'Open source']
    },
    {
      id: 54,
      name: 'RA.Aid',
      category: 'cli-agent',
      tier: 'emergent',
      launchDate: '2024-08',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Agent standalone basé sur LangGraph',
      url: 'https://github.com/ai-christianson/RA.Aid',
      stack: 'Python, LangGraph, Multi-LLM',
      logo: '🤝',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Open Source',
      founders: 'Community',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'RA.Aid utilise LangGraph pour une architecture agent moderne et modulaire. Standalone, il peut s\'intégrer dans n\'importe quel workflow existant.',
      keyFeatures: ['LangGraph', 'Standalone', 'Modulaire', 'Open source']
    },
    {
      id: 55,
      name: 'Qwen-Code',
      category: 'cli-agent',
      tier: 'emergent',
      launchDate: '2025-01',
      launchYear: 2025,
      price: 'Open Source',
      description: 'Agent de codage officiel de QwenLM (Alibaba)',
      url: 'https://github.com/QwenLM/Qwen-Agent',
      stack: 'Python, Qwen LLM',
      logo: '🐧',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      company: 'Alibaba Cloud',
      founders: 'Alibaba DAMO Academy',
      headquarters: 'Hangzhou, Chine',
      valuation: 'Alibaba: $200B+',
      summary: 'L\'agent de codage officiel du projet Qwen. Optimisé pour les modèles Qwen2.5-Coder qui rivalisent avec Claude sur les benchmarks. Une alternative chinoise crédible à Claude Code.',
      keyFeatures: ['Qwen natif', 'Alibaba backed', 'Open source', 'Benchmarks top']
    },
    {
      id: 56,
      name: 'Cloudflare VibeSDK',
      category: 'full-stack',
      tier: 'emergent',
      launchDate: '2025-03',
      launchYear: 2025,
      price: 'Open Source',
      description: 'SDK pour construire votre propre plateforme de vibe coding',
      url: 'https://github.com/cloudflare/vibe-sdk',
      stack: 'Cloudflare Workers, D1, R2',
      logo: '☁️',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Cloudflare Inc.',
      founders: 'Matthew Prince, Michelle Zatlyn',
      headquarters: 'San Francisco, CA',
      valuation: '$25B+ (public)',
      summary: 'Cloudflare démocratise le vibe coding B2B. VibeSDK est un kit open source pour construire votre propre plateforme de génération d\'apps, powered by le stack Cloudflare (Workers, D1, R2).',
      keyFeatures: ['Build your own', 'Cloudflare stack', 'Edge native', 'Open source']
    },
    {
      id: 57,
      name: 'Dyad',
      category: 'full-stack',
      tier: 'emergent',
      launchDate: '2025-02',
      launchYear: 2025,
      price: 'Open Source',
      description: 'Générateur d\'apps IA gratuit, local et open source',
      url: 'https://dyad.dev',
      stack: 'Local LLM, Multi-framework',
      logo: '🔗',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Dyad',
      founders: 'Community',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'Dyad est l\'alternative locale à Lovable/Bolt. 100% gratuit, fonctionne avec des LLM locaux, aucune donnée envoyée dans le cloud. Parfait pour les entreprises avec contraintes de confidentialité.',
      keyFeatures: ['Local LLM', 'Privacy 100%', 'Gratuit', 'Open source']
    },
    {
      id: 58,
      name: 'Forge',
      category: 'full-stack',
      tier: 'emergent',
      launchDate: '2025-01',
      launchYear: 2025,
      price: 'Open Source',
      description: 'Vibe Coding++™ avec kanban multi-agents et MCP',
      url: 'https://github.com/automagik-dev/forge',
      stack: 'Multi-agent, MCP, Kanban',
      logo: '🔨',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Automagik',
      founders: 'Community',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'Forge pousse le vibe coding plus loin avec une approche "Vibe Coding++". Kanban multi-agents, intégration MCP native, et orchestration de plusieurs LLM en parallèle.',
      keyFeatures: ['Multi-agent', 'Kanban', 'MCP native', 'Orchestration']
    },
    {
      id: 59,
      name: 'AutoBE',
      category: 'cli-agent',
      tier: 'emergent',
      launchDate: '2024-11',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Agent TypeScript spécialisé backend avec 40+ agents spécialisés',
      url: 'https://github.com/wrtnlabs/autobe',
      stack: 'TypeScript, NestJS, Multi-agent',
      logo: '🔙',
      country: '🇰🇷 Corée du Sud',
      countryCode: 'KR',
      company: 'Wrtn Labs',
      founders: 'Wrtn Technologies',
      headquarters: 'Séoul, Corée du Sud',
      valuation: 'Open Source',
      summary: 'AutoBE est spécialisé backend TypeScript. 40+ agents spécialisés travaillent ensemble pour générer du code serveur 100% fonctionnel. Focus sur NestJS et les architectures robustes.',
      keyFeatures: ['Backend focus', '40+ agents', 'TypeScript', '100% working code']
    },
    {
      id: 60,
      name: 'Claude Task Master',
      category: 'tools',
      tier: 'emergent',
      launchDate: '2024-09',
      launchYear: 2024,
      price: 'Open Source',
      description: 'Gestionnaire de tâches IA pour Cursor, Lovable, Windsurf, Roo',
      url: 'https://github.com/eyaltoledano/claude-task-master',
      stack: 'Node.js, Multi-platform',
      logo: '📋',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Open Source',
      founders: 'Eyal Toledano',
      headquarters: 'Open Source',
      valuation: 'Open Source',
      summary: 'Claude Task Master orchestre vos outils de vibe coding. Il décompose les projets complexes en tâches, les assigne à différents outils (Cursor, Lovable, Windsurf), et suit la progression.',
      keyFeatures: ['Multi-tool', 'Task decomposition', 'Progress tracking', 'Open source']
    },
    {
      id: 61,
      name: 'CHAI.new',
      category: 'full-stack',
      tier: 'emergent',
      launchDate: '2025-02',
      launchYear: 2025,
      price: 'Gratuit + Pro',
      description: 'Vibe code et déploie des agents IA instantanément',
      url: 'https://chai.new',
      stack: 'Langbase, Multi-LLM',
      logo: '🍵',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Langbase',
      founders: 'Ahmad Awais',
      headquarters: 'San Francisco, CA',
      valuation: 'Seed Funded',
      summary: 'CHAI.new est spécialisé dans la création d\'agents IA. Décrivez votre agent, CHAI génère le code et le déploie. Powered by Langbase, la plateforme serverless pour agents.',
      keyFeatures: ['Agent focused', 'Deploy instant', 'Langbase', 'Serverless']
    },
    {
      id: 62,
      name: 'Napkins.dev',
      category: 'full-stack',
      tier: 'emergent',
      launchDate: '2024-12',
      launchYear: 2024,
      price: 'Gratuit',
      description: 'Screenshot to code powered by Llama 4',
      url: 'https://napkins.dev',
      stack: 'Llama 4, React',
      logo: '🍽️',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Napkins',
      founders: 'Community',
      headquarters: 'Remote',
      valuation: 'Indie',
      summary: 'Prenez une photo de votre wireframe papier ou d\'un design existant, Napkins le transforme en code React fonctionnel. Powered by Llama 4 pour des résultats impressionnants gratuits.',
      keyFeatures: ['Screenshot to code', 'Llama 4', 'Gratuit', 'React output']
    },
    {
      id: 63,
      name: 'Stitch',
      category: 'design-to-code',
      tier: 'emergent',
      launchDate: '2025-05',
      launchYear: 2025,
      price: 'Gratuit',
      description: 'Outil Google pour générer UI et code frontend',
      url: 'https://stitch.withgoogle.com',
      stack: 'Google AI, CSS/HTML, Figma',
      logo: '🧵',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Google',
      founders: 'Google',
      headquarters: 'Mountain View, CA',
      valuation: 'Alphabet: $2T+',
      summary: 'Stitch génère des designs UI de haute qualité ET le code frontend correspondant. Décrire en langage naturel ou uploader une image, itérer conversationnellement, exporter vers CSS/HTML ou Figma.',
      keyFeatures: ['Design + Code', 'Figma export', 'Conversational', 'Google AI']
    },
    {
      id: 64,
      name: 'Google Antigravity',
      category: 'ide',
      tier: 'incontournable',
      launchDate: '2025-11',
      launchYear: 2025,
      price: 'Gratuit (preview)',
      description: 'IDE agent-first de Google propulsé par Gemini 3',
      url: 'https://antigravityai.org',
      stack: 'Gemini 3 Pro, VS Code fork, Browser automation',
      logo: '🚀',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'Google',
      founders: 'Varun Mohan (ex-Windsurf)',
      headquarters: 'Mountain View, CA',
      valuation: 'Alphabet: $2T+',
      summary: 'IDE agent-first révolutionnaire. Contrairement aux outils traditionnels, les agents Antigravity ont accès direct à l\'éditeur, terminal et navigateur. Planification autonome, exécution et validation de features complètes. Fork de Windsurf (équipe rachetée $2.4B). Supporte aussi Claude Sonnet 4.5.',
      keyFeatures: ['Agent-first', 'Browser automation', 'Gemini 3 Pro', 'Multi-agent', 'Self-validation']
    },
    {
      id: 65,
      name: 'OpenRouter',
      category: 'infra',
      tier: 'incontournable',
      launchDate: '2023-01',
      launchYear: 2023,
      price: 'Pay-per-use (+5%)',
      description: 'API unifiée pour 500+ modèles IA de 60+ providers',
      url: 'https://openrouter.ai',
      stack: 'API Gateway, Multi-provider routing',
      logo: '🔀',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'OpenRouter',
      founders: 'Alex Atallah',
      headquarters: 'San Francisco, CA',
      valuation: 'Non divulguée',
      summary: 'Agrégateur d\'API LLM universel. Une seule clé API pour accéder à GPT-5, Claude 4, Gemini, DeepSeek, Llama et 500+ modèles. Routing intelligent avec fallback automatique, facturation consolidée. Compatible OpenAI SDK. Essentiel pour le vibe coding multi-modèle.',
      keyFeatures: ['500+ modèles', 'Une API unique', 'Fallback auto', 'OpenAI compatible', 'Billing unifié']
    },
    {
      id: 66,
      name: 'Dia Browser',
      category: 'assistant',
      tier: 'emergent',
      launchDate: '2025-06',
      launchYear: 2025,
      price: 'Gratuit / $20/mois Pro',
      description: 'Navigateur AI-first avec assistant intégré',
      url: 'https://diabrowser.com',
      stack: 'Chromium, LLM multi-provider',
      logo: '🌐',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      company: 'The Browser Company (Atlassian)',
      founders: 'Josh Miller',
      headquarters: 'New York, NY',
      valuation: 'Acquis $610M par Atlassian',
      summary: 'Navigateur AI-native des créateurs d\'Arc. Chat avec vos onglets ouverts, résumé de pages, rédaction contextuelle. Memory pour continuité entre sessions. Skills personnalisables. Racheté par Atlassian. Concurrent de Perplexity Comet.',
      keyFeatures: ['AI-native browser', 'Tab context', 'Skills', 'Memory', 'Multi-tab chat']
    }
  ];

  // ========================================
  // BASE DE DONNÉES DES LLM
  // La Course Folle des Modèles de Langage
  // ========================================
  const llmModels = [
    // === PRÉHISTOIRE & PROTO-HISTOIRE DE L'IA ===
    // Ces entrées spéciales ne sont pas des LLM mais des jalons historiques
    
    // --- LES PRÉCURSEURS (avant l'informatique) ---
    {
      id: 'ada-lovelace',
      name: 'Ada Lovelace - Premier algorithme',
      company: 'Collaboration avec Charles Babbage',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '1843-01',
      releaseYear: 1843,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Concept',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Augusta Ada King, comtesse de Lovelace, mathématicienne britannique, écrit le premier algorithme destiné à être exécuté par une machine (la Machine Analytique de Babbage). Première programmeuse de l\'histoire et première femme de l\'informatique. Elle prédit que les machines pourront "composer des pièces de musique élaborées".',
      founders: 'Ada Lovelace ♀ (1815-1852)',
      valuation: '👩‍💻 Première programmeuse',
      color: '#14b8a6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Ada_Lovelace'
    },
    {
      id: 'turing-machine',
      name: 'Machine de Turing',
      company: 'Université de Cambridge',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '1936-01',
      releaseYear: 1936,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Concept théorique',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Alan Turing invente le concept de machine universelle capable de simuler n\'importe quel algorithme. Ce concept révolutionnaire est le fondement théorique de TOUS les ordinateurs modernes. Turing est aussi un héros de guerre (décryptage d\'Enigma).',
      founders: 'Alan Turing (1912-1954)',
      valuation: 'Base de l\'informatique',
      color: '#14b8a6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Machine_de_Turing'
    },
    {
      id: 'mcculloch-pitts',
      name: 'Neurone artificiel McCulloch-Pitts',
      company: 'Recherche académique',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1943-01',
      releaseYear: 1943,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Modèle mathématique',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Premier modèle mathématique du neurone. McCulloch & Pitts montrent comment des réseaux de neurones peuvent effectuer des opérations logiques. Naissance du connexionnisme.',
      founders: 'Warren McCulloch, Walter Pitts',
      valuation: 'Premier neurone artificiel',
      color: '#14b8a6',
      isHistorical: true
    },
    {
      id: 'eniac',
      name: 'ENIAC',
      company: 'US Army / Université de Pennsylvanie',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1945-02',
      releaseYear: 1945,
      openSource: false,
      license: 'Militaire',
      parameters: '18 000 tubes à vide, 30 tonnes',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Premier ordinateur entièrement électronique. 5000 additions/seconde. Programmé par 6 femmes mathématiciennes (les "ENIAC Girls"). Occupe 167m², consomme 150kW.',
      founders: 'John Mauchly, J. Presper Eckert',
      valuation: 'Premier ordinateur électronique',
      color: '#14b8a6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/ENIAC'
    },
    {
      id: 'von-neumann',
      name: 'Architecture von Neumann',
      company: 'Institute for Advanced Study',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1945-06',
      releaseYear: 1945,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Architecture',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'John von Neumann formalise l\'architecture des ordinateurs modernes : mémoire unique pour programmes ET données. TOUS les ordinateurs actuels en dérivent.',
      founders: 'John von Neumann (1903-1957)',
      valuation: 'Architecture universelle',
      color: '#14b8a6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Architecture_de_von_Neumann'
    },
    {
      id: 'turing-test',
      name: 'Test de Turing',
      company: 'Alan Turing',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '1950-10',
      releaseYear: 1950,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Concept',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '"Computing Machinery and Intelligence" - Turing pose LA question : "Les machines peuvent-elles penser ?" et invente le jeu de l\'imitation. Prédit des machines intelligentes d\'ici 50 ans.',
      founders: 'Alan Turing (1912-1954)',
      valuation: 'Fondation philosophique',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Test_de_Turing'
    },
    {
      id: 'snarc',
      name: 'SNARC - Premier réseau de neurones',
      company: 'Université de Harvard',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1951-01',
      releaseYear: 1951,
      openSource: true,
      license: 'Académique',
      parameters: '40 neurones (3000 tubes à vide)',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Stochastic Neural Analog Reinforcement Calculator. Premier réseau de neurones PHYSIQUE jamais construit. Simule une souris qui apprend à sortir d\'un labyrinthe.',
      founders: 'Marvin Minsky, Dean Edmonds',
      valuation: 'Premier réseau de neurones',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://en.wikipedia.org/wiki/Stochastic_neural_analog_reinforcement_calculator'
    },
    {
      id: 'first-chess',
      name: 'Premiers programmes d\'échecs',
      company: 'Université de Manchester',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '1951-01',
      releaseYear: 1951,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Ferranti Mark I',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Christopher Strachey (dames) et Dietrich Prinz (échecs) écrivent les premiers programmes de jeu. L\'IA dans les jeux servira d\'étalon des progrès pendant 70 ans.',
      founders: 'Christopher Strachey, Dietrich Prinz',
      valuation: 'IA dans les jeux',
      color: '#8b5cf6',
      isHistorical: true
    },
    {
      id: 'logic-theorist',
      name: 'Logic Theorist',
      company: 'RAND Corporation',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1955-12',
      releaseYear: 1955,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Programme symbolique',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Souvent considéré comme le PREMIER programme d\'IA. Démontre 38 des 52 premiers théorèmes des Principia Mathematica. Trouve même des preuves plus élégantes que les originales !',
      founders: 'Allen Newell, Herbert Simon, Cliff Shaw',
      valuation: 'Premier programme d\'IA',
      color: '#8b5cf6',
      isHistorical: true
    },
    {
      id: 'dartmouth',
      name: 'Conférence de Dartmouth',
      company: 'McCarthy, Minsky, Shannon, Rochester',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1956-06',
      releaseYear: 1956,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - 20 participants, 8 semaines',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '🎂 ACTE DE NAISSANCE DE L\'IA ! John McCarthy invente le terme "Intelligence Artificielle". Thèse : "Tout aspect de l\'intelligence peut être simulé par une machine." Financé $7,500 par Rockefeller.',
      founders: 'John McCarthy, Marvin Minsky, Claude Shannon, Nathaniel Rochester',
      valuation: 'Naissance de l\'IA',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Conf%C3%A9rence_de_Dartmouth'
    },
    {
      id: 'perceptron',
      name: 'Perceptron',
      company: 'Cornell Aeronautical Lab',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1958-01',
      releaseYear: 1958,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Hardware neuronal',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Frank Rosenblatt crée le Perceptron, premier réseau capable d\'APPRENDRE. Prédit qu\'il pourra "apprendre, prendre des décisions, traduire". Sera critiqué par Minsky en 1969.',
      founders: 'Frank Rosenblatt (1928-1971)',
      valuation: 'Apprentissage automatique',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Perceptron'
    },
    {
      id: 'lisp',
      name: 'LISP',
      company: 'MIT',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1958-01',
      releaseYear: 1958,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Langage de programmation',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'John McCarthy crée LISP (List Processing). Deuxième plus vieux langage encore utilisé (après FORTRAN). LE langage de l\'IA pendant 30 ans. Influence majeure sur tous les langages modernes.',
      founders: 'John McCarthy',
      valuation: 'Langage de l\'IA',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Lisp'
    },
    {
      id: 'eliza',
      name: 'ELIZA',
      company: 'MIT',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1966-01',
      releaseYear: 1966,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Pattern matching',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '💬 PREMIER CHATBOT de l\'histoire ! Simule un psychothérapeute. Utilisateurs convaincus de parler à un humain. Weizenbaum voulait montrer les LIMITES de l\'IA, mais prouve l\'inverse.',
      founders: 'Joseph Weizenbaum (1923-2008)',
      valuation: 'Premier chatbot',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/ELIZA'
    },
    {
      id: 'shakey',
      name: 'Shakey le Robot',
      company: 'SRI International',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1969-01',
      releaseYear: 1969,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Robot mobile',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Premier robot mobile "intelligent". Peut percevoir, planifier, agir. Introduit STRIPS (planification). Ancêtre de tous les robots autonomes modernes.',
      founders: 'Charles Rosen, Nils Nilsson (SRI)',
      valuation: 'Premier robot IA',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Shakey_le_robot'
    },
    {
      id: 'perceptrons-book',
      name: 'Livre "Perceptrons" - Hiver de l\'IA',
      company: 'MIT Press',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1969-01',
      releaseYear: 1969,
      openSource: true,
      license: 'Publication',
      parameters: 'N/A - Critique académique',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '❄️ Minsky & Papert démontrent les limites des perceptrons. Effet DÉVASTATEUR : le connexionnisme est abandonné pendant 10 ans. Premier "Hiver de l\'IA" (1974-1980).',
      founders: 'Marvin Minsky, Seymour Papert',
      valuation: 'Premier hiver de l\'IA',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Hiver_de_l%27intelligence_artificielle'
    },
    {
      id: 'prolog',
      name: 'Prolog',
      company: 'Université d\'Aix-Marseille',
      country: '🇫🇷 France',
      countryCode: 'FR',
      releaseDate: '1972-01',
      releaseYear: 1972,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Langage logique',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '🇫🇷 Contribution française majeure ! Alain Colmerauer crée Prolog (PROgrammation LOGique). Langage déclaratif basé sur la logique. Choisi par le Japon pour son projet 5e génération.',
      founders: 'Alain Colmerauer, Philippe Roussel',
      valuation: 'Logique & France',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Prolog'
    },
    {
      id: 'expert-systems',
      name: 'Systèmes Experts (Mycin, Dendral)',
      company: 'Stanford',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1972-01',
      releaseYear: 1972,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Règles logiques',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Dendral (chimie, 1965) et Mycin (médecine, 1972) : premiers "systèmes experts". Règles SI/ALORS codant le savoir d\'experts humains. Boom commercial dans les années 80.',
      founders: 'Edward Feigenbaum, Joshua Lederberg',
      valuation: 'IA commerciale',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Syst%C3%A8me_expert'
    },
    {
      id: 'backprop',
      name: 'Rétropropagation popularisée',
      company: 'Recherche académique',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1986-01',
      releaseYear: 1986,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Algorithme',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '🔥 Renaissance du connexionnisme ! Rumelhart & Hinton popularisent la rétropropagation. L\'algo qui permet ENFIN d\'entraîner des réseaux profonds. Base de TOUT le deep learning moderne.',
      founders: 'David Rumelhart, Geoffrey Hinton, Ronald Williams',
      valuation: 'Base du Deep Learning',
      color: '#8b5cf6',
      isHistorical: true
    },
    {
      id: 'second-ai-winter',
      name: '2ème Hiver de l\'IA',
      company: 'Industrie',
      country: '🌍 Mondial',
      countryCode: 'XX',
      releaseDate: '1987-01',
      releaseYear: 1987,
      openSource: true,
      license: 'N/A',
      parameters: 'N/A - Période',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '❄️❄️ Effondrement du marché des machines LISP. Systèmes experts trop coûteux à maintenir. Projet japonais 5e génération échoue. Financements gelés jusqu\'en 1993.',
      founders: 'N/A',
      valuation: 'Deuxième hiver',
      color: '#8b5cf6',
      isHistorical: true
    },
    {
      id: 'www',
      name: 'World Wide Web',
      company: 'CERN',
      country: '🇨🇭 Suisse',
      countryCode: 'CH',
      releaseDate: '1991-08',
      releaseYear: 1991,
      openSource: true,
      license: 'Domaine public',
      parameters: 'N/A - Protocole',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '🌐 Tim Berners-Lee invente le Web. Pas de l\'IA directement, mais ESSENTIEL : sans le Web, pas de données massives = pas de deep learning = pas de ChatGPT.',
      founders: 'Tim Berners-Lee',
      valuation: 'Données pour l\'IA',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/World_Wide_Web'
    },
    {
      id: 'deep-blue',
      name: 'Deep Blue bat Kasparov',
      company: 'IBM',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '1997-05',
      releaseYear: 1997,
      openSource: false,
      license: 'Propriétaire',
      parameters: '11.38 GFLOPS, 200M positions/sec',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: '♟️ Pour la PREMIÈRE fois, une machine bat le champion du monde d\'échecs ! Match retour après défaite en 1996. Kasparov accuse IBM de tricher. Moment culturel mondial.',
      founders: 'IBM (Feng-hsiung Hsu, Murray Campbell)',
      valuation: 'IA bat l\'humain',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Deep_Blue'
    },
    {
      id: 'lstm',
      name: 'LSTM (Long Short-Term Memory)',
      company: 'TU Munich',
      country: '🇩🇪 Allemagne',
      countryCode: 'DE',
      releaseDate: '1997-01',
      releaseYear: 1997,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Architecture',
      contextWindow: 'N/A',
      speciality: '🦕 Proto-histoire',
      description: 'Hochreiter & Schmidhuber inventent le LSTM. Résout le problème du gradient qui disparaît. Permet aux réseaux de "se souvenir". Base de Siri, Google Translate avant les Transformers.',
      founders: 'Sepp Hochreiter, Jürgen Schmidhuber',
      valuation: 'Mémoire pour les réseaux',
      color: '#8b5cf6',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/R%C3%A9seau_de_neurones_r%C3%A9currents#Long_short-term_memory'
    },
    
    // --- PRÉHISTOIRE DU DEEP LEARNING (2006-2019) ---
    {
      id: 'deep-belief',
      name: 'Deep Belief Networks - Renaissance',
      company: 'Université de Toronto',
      country: '🇨🇦 Canada',
      countryCode: 'CA',
      releaseDate: '2006-01',
      releaseYear: 2006,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Architecture',
      contextWindow: 'N/A',
      speciality: '🦖 Préhistoire',
      description: '🔥 Hinton montre qu\'on peut entraîner des réseaux PROFONDS efficacement. Début officiel de la révolution deep learning. Le terme "deep learning" se popularise.',
      founders: 'Geoffrey Hinton',
      valuation: 'Début Deep Learning',
      color: '#f59e0b',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Apprentissage_profond'
    },
    {
      id: 'imagenet-dataset',
      name: 'ImageNet',
      company: 'Stanford / Princeton',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2009-01',
      releaseYear: 2009,
      openSource: true,
      license: 'Académique',
      parameters: '14M images, 20K catégories',
      contextWindow: 'N/A - Vision',
      speciality: '🦖 Préhistoire',
      description: 'Fei-Fei Li crée ImageNet : base de données MASSIVE d\'images annotées. La compétition annuelle devient LE benchmark de la vision. Sans ImageNet, pas d\'AlexNet.',
      founders: 'Fei-Fei Li (Stanford)',
      valuation: 'Données pour la vision',
      color: '#f59e0b',
      isHistorical: true
    },
    {
      id: 'watson-jeopardy',
      name: 'Watson gagne à Jeopardy!',
      company: 'IBM',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2011-02',
      releaseYear: 2011,
      openSource: false,
      license: 'Propriétaire',
      parameters: '2880 CPU cores, 15TB RAM',
      contextWindow: 'N/A - Q&A',
      speciality: '🦖 Préhistoire',
      description: '🎯 Watson bat les champions humains à Jeopardy! Questions de culture générale, jeux de mots, humour. IBM promet une révolution... qui tarde à venir.',
      founders: 'IBM Research (David Ferrucci)',
      valuation: 'IA culture générale',
      color: '#f59e0b',
      isHistorical: true
    },
    {
      id: 'siri',
      name: 'Siri',
      company: 'Apple (acquis de SRI)',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2011-10',
      releaseYear: 2011,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'N/A - Assistant vocal',
      contextWindow: 'N/A',
      speciality: '🦖 Préhistoire',
      description: '🎙️ Premier assistant vocal grand public. L\'IA entre dans la poche de millions de gens. Suivi par Google Now (2012), Alexa (2014), Cortana (2014).',
      founders: 'Apple (projet DARPA CALO)',
      valuation: 'IA grand public',
      color: '#f59e0b',
      isHistorical: true
    },
    {
      id: 'imagenet-moment',
      name: 'AlexNet - Moment ImageNet',
      company: 'Université de Toronto',
      country: '🇨🇦 Canada',
      countryCode: 'CA',
      releaseDate: '2012-09',
      releaseYear: 2012,
      openSource: true,
      license: 'Académique',
      parameters: '60M paramètres',
      contextWindow: 'N/A - Vision',
      speciality: '🦖 Préhistoire',
      description: '💥 LE "BIG BANG" du Deep Learning ! AlexNet ÉCRASE la compétition ImageNet (erreur 15.3% vs 26.2%). Secret : GPU NVIDIA. Google achète la startup de Hinton peu après.',
      founders: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton',
      valuation: 'Révolution Deep Learning',
      color: '#f59e0b',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/AlexNet'
    },
    {
      id: 'word2vec',
      name: 'Word2Vec',
      company: 'Google',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2013-01',
      releaseYear: 2013,
      openSource: true,
      license: 'Apache 2.0',
      parameters: 'Variable',
      contextWindow: 'N/A - Embeddings',
      speciality: '🦖 Préhistoire',
      description: '✨ Les mots deviennent des VECTEURS ! "Roi - Homme + Femme = Reine". Révolution conceptuelle. Base de tous les embeddings modernes et du NLP neural.',
      founders: 'Tomas Mikolov (Google)',
      valuation: 'Embeddings',
      color: '#f59e0b',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/Word2vec'
    },
    {
      id: 'deepmind-atari',
      name: 'DeepMind joue aux jeux Atari',
      company: 'DeepMind',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '2013-12',
      releaseYear: 2013,
      openSource: true,
      license: 'Académique',
      parameters: 'DQN - Deep Q-Network',
      contextWindow: 'N/A - RL',
      speciality: '🦖 Préhistoire',
      description: '🎮 L\'IA apprend à jouer aux jeux Atari MIEUX que les humains, juste avec les pixels ! Deep Reinforcement Learning. Google achète DeepMind pour $500M en 2014.',
      founders: 'Demis Hassabis, Shane Legg, Mustafa Suleyman',
      valuation: 'RL profond',
      color: '#f59e0b',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/DeepMind'
    },
    {
      id: 'gan',
      name: 'GAN (Generative Adversarial Networks)',
      company: 'Université de Montréal',
      country: '🇨🇦 Canada',
      countryCode: 'CA',
      releaseDate: '2014-06',
      releaseYear: 2014,
      openSource: true,
      license: 'Académique',
      parameters: 'N/A - Architecture',
      contextWindow: 'N/A - Génération',
      speciality: '🦖 Préhistoire',
      description: '🎨 Ian Goodfellow invente les GAN. Deux réseaux qui s\'affrontent : un générateur, un discriminateur. Base de tous les deepfakes et de l\'IA générative d\'images pré-diffusion.',
      founders: 'Ian Goodfellow, Yoshua Bengio et al.',
      valuation: 'IA générative',
      color: '#f59e0b',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/R%C3%A9seaux_antagonistes_g%C3%A9n%C3%A9ratifs'
    },
    {
      id: 'alphago',
      name: 'AlphaGo bat Lee Sedol',
      company: 'DeepMind / Google',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '2016-03',
      releaseYear: 2016,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Réseaux de neurones + MCTS',
      contextWindow: 'N/A - Jeu de Go',
      speciality: '🦖 Préhistoire',
      description: '🎯 L\'IA bat le champion du monde de GO ! Jeu considéré trop complexe pour les machines (10^170 positions). Match 4-1. Le "coup 37" devient légendaire. Le monde réalise : l\'IA progresse VITE.',
      founders: 'DeepMind (David Silver, Demis Hassabis)',
      valuation: 'Moment historique',
      color: '#f59e0b',
      isHistorical: true,
      wikiUrl: 'https://fr.wikipedia.org/wiki/AlphaGo'
    },
    {
      id: 'transformer',
      name: 'Attention Is All You Need',
      company: 'Google Brain',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2017-06',
      releaseYear: 2017,
      openSource: true,
      license: 'Académique',
      parameters: 'Architecture Transformer',
      contextWindow: 'Variable',
      speciality: '🦖 Préhistoire',
      description: '🏆 LE PAPER QUI CHANGE TOUT ! L\'architecture Transformer naît. Mécanisme d\'attention. SANS CE PAPER : pas de GPT, pas de Claude, pas de BERT, pas de vibe coding. Point.',
      founders: 'Vaswani, Shazeer, Parmar et al. (Google)',
      valuation: 'Révolution architecturale',
      color: '#f59e0b',
      isHistorical: true
    },
    {
      id: 'bert',
      name: 'BERT',
      company: 'Google',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2018-10',
      releaseYear: 2018,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '340M (Large)',
      contextWindow: '512 tokens',
      speciality: '🦖 Préhistoire',
      description: 'Premier grand modèle Transformer pré-entraîné bidirectionnel. Révolutionne le NLP. Google l\'intègre dans Search. "BERT-ification" de l\'industrie.',
      founders: 'Jacob Devlin, Ming-Wei Chang (Google)',
      valuation: 'Google: $2T+',
      color: '#f59e0b',
      isHistorical: true
    },
    {
      id: 'gpt-2',
      name: 'GPT-2',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2019-02',
      releaseYear: 2019,
      openSource: true,
      license: 'MIT (release tardive)',
      parameters: '1.5B',
      contextWindow: '1024 tokens',
      speciality: '🦖 Préhistoire',
      description: '⚠️ "Trop dangereux pour être publié" disait OpenAI ! Premier modèle générant du texte cohérent sur plusieurs paragraphes. Déclenche le débat sur les risques de l\'IA générative.',
      founders: 'Alec Radford, Jeffrey Wu (OpenAI)',
      valuation: 'Début de la course',
      color: '#f59e0b',
      isHistorical: true
    },
    
    // --- ÈRE MODERNE (2020+) ---
    {
      id: 'gpt-3',
      name: 'GPT-3',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2020-06',
      releaseYear: 2020,
      openSource: false,
      license: 'API only',
      parameters: '175B',
      contextWindow: '4k tokens',
      speciality: 'Généraliste, Few-shot',
      description: '🚀 Le GÉANT qui change tout ! 175 milliards de paramètres. Démontre l\'ÉMERGENCE : le modèle sait faire des choses qu\'on ne lui a pas apprises. Few-shot learning.',
      founders: 'Tom Brown et al. (OpenAI)',
      valuation: '$1B (2020)',
      color: '#10a37f'
    },
    {
      id: 'github-copilot-launch',
      name: 'GitHub Copilot (preview)',
      company: 'GitHub / OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2021-06',
      releaseYear: 2021,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Codex (12B)',
      contextWindow: '4k tokens',
      speciality: '🌱 Genèse Vibe Coding',
      description: '⌨️ PREMIER OUTIL DE VIBE CODING ! L\'IA code avec vous. Basé sur Codex. 1M+ développeurs en preview. Le monde découvre le pair programming avec l\'IA.',
      founders: 'GitHub + OpenAI',
      valuation: 'Naissance du vibe coding',
      color: '#10a37f',
      isHistorical: true
    },
    {
      id: 'codex',
      name: 'Codex',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2021-08',
      releaseYear: 2021,
      openSource: false,
      license: 'API only',
      parameters: '12B',
      contextWindow: '4k tokens',
      speciality: 'Code (moteur Copilot)',
      description: 'GPT-3 fine-tuné sur du code. Devient le moteur de GitHub Copilot. Peut traduire entre langages, expliquer du code, générer des tests.',
      founders: 'OpenAI + GitHub',
      valuation: 'Base de Copilot',
      color: '#10a37f'
    },
    {
      id: 'dall-e',
      name: 'DALL-E',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2021-01',
      releaseYear: 2021,
      openSource: false,
      license: 'Propriétaire',
      parameters: '12B',
      contextWindow: 'N/A - Image',
      speciality: '🌱 IA Générative',
      description: '🎨 L\'IA qui dessine ! Génère des images à partir de descriptions textuelles. "Un avocat dans un fauteuil". Début de l\'IA créative grand public.',
      founders: 'OpenAI (Aditya Ramesh et al.)',
      valuation: 'IA créative',
      color: '#10a37f',
      isHistorical: true
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2022-11',
      releaseYear: 2022,
      openSource: false,
      license: 'Propriétaire',
      parameters: '~20B (GPT-3.5)',
      contextWindow: '4k tokens',
      speciality: 'Conversation, RLHF',
      description: '🌍 LE MOMENT VIRAL ! 100M utilisateurs en 2 MOIS (record absolu). ChatGPT démocratise l\'IA générative. Déclenche la course aux LLM. Le monde ne sera plus jamais le même.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$29B (Jan 2023)',
      color: '#10a37f'
    },
    {
      id: 'stable-diffusion',
      name: 'Stable Diffusion',
      company: 'Stability AI',
      country: '🇬🇧 Royaume-Uni',
      countryCode: 'GB',
      releaseDate: '2022-08',
      releaseYear: 2022,
      openSource: true,
      license: 'CreativeML Open RAIL-M',
      parameters: '~1B',
      contextWindow: 'N/A - Image',
      speciality: '🌱 IA Générative',
      description: '🎨 DALL-E mais OPEN SOURCE ! Génération d\'images sur GPU consommateur. Explosion de la créativité IA. Fork en centaines de variantes.',
      founders: 'Emad Mostaque (Stability AI)',
      valuation: 'Démocratisation image IA',
      color: '#f59e0b',
      isHistorical: true
    },
    // === OPENAI (à partir de 2023) ===
    {
      id: 'gpt-4',
      name: 'GPT-4',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2023-03',
      releaseYear: 2023,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué (estimé ~1.8T)',
      contextWindow: '128k tokens',
      speciality: 'Multimodal, Généraliste',
      description: 'Le modèle qui a défini l\'ère moderne des LLM. Premier modèle véritablement multimodal grand public.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$150B+ (2025)',
      color: '#10a37f'
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2023-03',
      releaseYear: 2023,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué (estimé ~1.8T)',
      contextWindow: '128k tokens',
      speciality: 'Multimodal, Généraliste',
      description: 'Le modèle qui a défini l\'ère moderne des LLM. Premier modèle véritablement multimodal grand public.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$150B+ (2025)',
      color: '#10a37f'
    },
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-05',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '128k tokens',
      speciality: 'Multimodal (texte, voix, image)',
      description: 'GPT-4 "Omni" - premier modèle avec génération vocale native et traitement temps réel.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$150B+ (2025)',
      color: '#10a37f'
    },
    {
      id: 'o1',
      name: 'OpenAI o1',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-09',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '128k tokens',
      speciality: 'Raisonnement (chain-of-thought)',
      description: 'Premier "reasoning model" d\'OpenAI avec réflexion interne avant réponse. Code name Strawberry.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$150B+ (2025)',
      color: '#10a37f'
    },
    {
      id: 'o3',
      name: 'OpenAI o3',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-12',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '128k tokens',
      speciality: 'Raisonnement avancé, Maths, Code',
      description: 'Successeur de o1 avec performances record sur ARC-AGI. Disponible en o3-mini et o3-pro.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$150B+ (2025)',
      color: '#10a37f'
    },
    {
      id: 'gpt-5',
      name: 'GPT-5',
      company: 'OpenAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-06',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '256k+ tokens',
      speciality: 'Généraliste, Code, Agents',
      description: 'Dernière génération OpenAI unifiant GPT et o-series. Modèle flagship actuel.',
      founders: 'Sam Altman, Greg Brockman',
      valuation: '$150B+ (2025)',
      color: '#10a37f'
    },

    // === ANTHROPIC ===
    {
      id: 'claude-3-sonnet',
      name: 'Claude 3.5 Sonnet',
      company: 'Anthropic',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-06',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '200k tokens',
      speciality: 'Code, Raisonnement, Sécurité',
      description: 'Le modèle qui a déclenché l\'explosion du vibe coding. Best-in-class pour le code en 2024.',
      founders: 'Dario Amodei, Daniela Amodei',
      valuation: '$60B+ (2025)',
      color: '#cc785c'
    },
    {
      id: 'claude-4-opus',
      name: 'Claude 4 Opus',
      company: 'Anthropic',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-03',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '200k tokens',
      speciality: 'Raisonnement profond, Recherche',
      description: 'Modèle le plus puissant d\'Anthropic pour les tâches complexes et la recherche.',
      founders: 'Dario Amodei, Daniela Amodei',
      valuation: '$60B+ (2025)',
      color: '#cc785c'
    },
    {
      id: 'claude-4-5-sonnet',
      name: 'Claude Sonnet 4.5',
      company: 'Anthropic',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-09',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '1M tokens',
      speciality: 'Code agentique, Long contexte',
      description: 'Contexte 1M tokens. Leader sur SWE-Bench. Moteur de Claude Code.',
      founders: 'Dario Amodei, Daniela Amodei',
      valuation: '$60B+ (2025)',
      color: '#cc785c'
    },

    // === GOOGLE ===
    {
      id: 'gemini-1-5-pro',
      name: 'Gemini 1.5 Pro',
      company: 'Google DeepMind',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-02',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué (MoE)',
      contextWindow: '1M tokens',
      speciality: 'Long contexte, Multimodal',
      description: 'Premier modèle avec 1M tokens de contexte. Révolution du traitement long.',
      founders: 'Demis Hassabis, Google',
      valuation: 'Alphabet: $2T+',
      color: '#4285f4'
    },
    {
      id: 'gemini-2-0-flash',
      name: 'Gemini 2.0 Flash',
      company: 'Google DeepMind',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-12',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué (MoE)',
      contextWindow: '1M tokens',
      speciality: 'Multimodal, Agents, Outils natifs',
      description: 'Lancement de l\'ère agentique de Google avec tools natifs et génération d\'images.',
      founders: 'Demis Hassabis, Google',
      valuation: 'Alphabet: $2T+',
      color: '#4285f4'
    },
    {
      id: 'gemini-2-5-pro',
      name: 'Gemini 2.5 Pro',
      company: 'Google DeepMind',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-03',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué (MoE)',
      contextWindow: '1M tokens',
      speciality: 'Thinking mode, Deep Think',
      description: '#1 sur LMArena pendant 6+ mois. Mode "Deep Think" pour raisonnement complexe.',
      founders: 'Demis Hassabis, Google',
      valuation: 'Alphabet: $2T+',
      color: '#4285f4'
    },
    {
      id: 'gemini-3-pro',
      name: 'Gemini 3 Pro',
      company: 'Google DeepMind',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-11',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué (MoE)',
      contextWindow: '1M+ tokens',
      speciality: 'Vibe Coding, Raisonnement SOTA',
      description: 'Modèle le plus intelligent de Google. SOTA sur 19/20 benchmarks. Deep Think mode.',
      founders: 'Demis Hassabis, Google',
      valuation: 'Alphabet: $2T+',
      color: '#4285f4'
    },

    // === META ===
    {
      id: 'llama-3',
      name: 'Llama 3',
      company: 'Meta AI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-04',
      releaseYear: 2024,
      openSource: true,
      license: 'Llama License',
      parameters: '8B, 70B',
      contextWindow: '8k tokens',
      speciality: 'Open source, Fine-tuning',
      description: 'Retour en force de Meta dans l\'open source. Base de nombreux modèles dérivés.',
      founders: 'Mark Zuckerberg, Yann LeCun',
      valuation: 'Meta: $1.5T+',
      color: '#0668e1'
    },
    {
      id: 'llama-3-1',
      name: 'Llama 3.1 405B',
      company: 'Meta AI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-07',
      releaseYear: 2024,
      openSource: true,
      license: 'Llama License',
      parameters: '405B (+ 8B, 70B)',
      contextWindow: '128k tokens',
      speciality: 'Open source frontier',
      description: 'Plus grand modèle open source. Rivalise avec GPT-4 et Claude 3.5.',
      founders: 'Mark Zuckerberg, Yann LeCun',
      valuation: 'Meta: $1.5T+',
      color: '#0668e1'
    },
    {
      id: 'llama-4',
      name: 'Llama 4',
      company: 'Meta AI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-04',
      releaseYear: 2025,
      openSource: true,
      license: 'Llama License',
      parameters: 'Scout, Maverick, Behemoth',
      contextWindow: '10M tokens (Scout)',
      speciality: 'Multimodal natif, MoE',
      description: 'Premier Llama multimodal natif (texte, image, vidéo). Scout: 10M contexte.',
      founders: 'Mark Zuckerberg, Yann LeCun',
      valuation: 'Meta: $1.5T+',
      color: '#0668e1'
    },

    // === MISTRAL AI (FRANCE 🇫🇷) ===
    {
      id: 'mistral-7b',
      name: 'Mistral 7B',
      company: 'Mistral AI',
      country: '🇫🇷 France',
      countryCode: 'FR',
      releaseDate: '2023-09',
      releaseYear: 2023,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '7B',
      contextWindow: '32k tokens',
      speciality: 'Efficacité, Open source',
      description: 'Le modèle qui a lancé Mistral. Performance GPT-3.5 avec 7B paramètres seulement.',
      founders: 'Arthur Mensch, Guillaume Lample, Timothée Lacroix',
      valuation: '$11.7B (Sept 2025)',
      color: '#ff7000'
    },
    {
      id: 'mixtral-8x7b',
      name: 'Mixtral 8x7B',
      company: 'Mistral AI',
      country: '🇫🇷 France',
      countryCode: 'FR',
      releaseDate: '2023-12',
      releaseYear: 2023,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '8x7B (MoE, 12.9B actifs)',
      contextWindow: '32k tokens',
      speciality: 'MoE, Efficacité',
      description: 'Architecture Mixture-of-Experts popularisée. Performance GPT-4 niveau.',
      founders: 'Arthur Mensch, Guillaume Lample, Timothée Lacroix',
      valuation: '$11.7B (Sept 2025)',
      color: '#ff7000'
    },
    {
      id: 'mistral-large-2',
      name: 'Mistral Large 2',
      company: 'Mistral AI',
      country: '🇫🇷 France',
      countryCode: 'FR',
      releaseDate: '2024-07',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: '123B',
      contextWindow: '128k tokens',
      speciality: 'Multilingue (80+ langages code)',
      description: 'Flagship commercial de Mistral. Support de 12+ langues et 80+ langages de code.',
      founders: 'Arthur Mensch, Guillaume Lample, Timothée Lacroix',
      valuation: '$11.7B (Sept 2025)',
      color: '#ff7000'
    },
    {
      id: 'codestral',
      name: 'Codestral',
      company: 'Mistral AI',
      country: '🇫🇷 France',
      countryCode: 'FR',
      releaseDate: '2024-05',
      releaseYear: 2024,
      openSource: false,
      license: 'Non-production',
      parameters: '22B',
      contextWindow: '128k tokens',
      speciality: 'Code uniquement',
      description: 'Modèle dédié au code. Support de 80+ langages. Très populaire pour le vibe coding.',
      founders: 'Arthur Mensch, Guillaume Lample, Timothée Lacroix',
      valuation: '$11.7B (Sept 2025)',
      color: '#ff7000'
    },
    {
      id: 'mistral-medium-3',
      name: 'Mistral Medium 3',
      company: 'Mistral AI',
      country: '🇫🇷 France',
      countryCode: 'FR',
      releaseDate: '2025-05',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '128k tokens',
      speciality: 'Multimodal frontier',
      description: 'Modèle multimodal "frontier-class". Partnership ASML pour les semi-conducteurs.',
      founders: 'Arthur Mensch, Guillaume Lample, Timothée Lacroix',
      valuation: '$11.7B (Sept 2025)',
      color: '#ff7000'
    },

    // === DEEPSEEK (CHINE) ===
    {
      id: 'deepseek-v3',
      name: 'DeepSeek V3',
      company: 'DeepSeek',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2024-12',
      releaseYear: 2024,
      openSource: true,
      license: 'MIT',
      parameters: '671B (MoE, 37B actifs)',
      contextWindow: '128k tokens',
      speciality: 'Efficacité extrême',
      description: 'Base du choc DeepSeek. Entraîné avec $5.6M seulement. MoE ultra-efficient.',
      founders: 'Liang Wenfeng (High-Flyer)',
      valuation: 'Non divulgué (VC-backed)',
      color: '#4d6bfe'
    },
    {
      id: 'deepseek-r1',
      name: 'DeepSeek R1',
      company: 'DeepSeek',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2025-01',
      releaseYear: 2025,
      openSource: true,
      license: 'MIT',
      parameters: '671B (MoE, 37B actifs)',
      contextWindow: '128k tokens',
      speciality: 'Raisonnement, Math, Code',
      description: '"Le moment Sputnik de l\'IA" - Marc Andreessen. Rivalise avec o1 à 5% du coût.',
      founders: 'Liang Wenfeng (High-Flyer)',
      valuation: 'Non divulgué (VC-backed)',
      color: '#4d6bfe'
    },
    {
      id: 'deepseek-v3-1',
      name: 'DeepSeek V3.1',
      company: 'DeepSeek',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2025-08',
      releaseYear: 2025,
      openSource: true,
      license: 'MIT',
      parameters: '840B (MoE)',
      contextWindow: '128k tokens',
      speciality: 'Hybrid thinking/non-thinking',
      description: 'Mode dual thinking/non-thinking. Agent capabilities améliorées.',
      founders: 'Liang Wenfeng (High-Flyer)',
      valuation: 'Non divulgué (VC-backed)',
      color: '#4d6bfe'
    },

    // === QWEN / ALIBABA (CHINE) ===
    {
      id: 'qwen-2-5',
      name: 'Qwen 2.5',
      company: 'Alibaba Cloud',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2024-09',
      releaseYear: 2024,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '0.5B à 72B',
      contextWindow: '128k tokens',
      speciality: 'Multilingue (119 langues)',
      description: 'Famille de modèles open source très populaire. 300M+ téléchargements.',
      founders: 'Alibaba Cloud (Jack Ma fondateur)',
      valuation: 'Alibaba: $200B+',
      color: '#ff6a00'
    },
    {
      id: 'qwen-3',
      name: 'Qwen 3',
      company: 'Alibaba Cloud',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2025-04',
      releaseYear: 2025,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '0.6B à 235B (MoE)',
      contextWindow: '128k tokens',
      speciality: 'Hybrid reasoning (thinking/non-thinking)',
      description: 'Premiers modèles "hybrid reasoning" open source. Mode thinking activable.',
      founders: 'Alibaba Cloud (Jack Ma fondateur)',
      valuation: 'Alibaba: $200B+',
      color: '#ff6a00'
    },
    {
      id: 'qwen-3-coder',
      name: 'Qwen3-Coder 480B',
      company: 'Alibaba Cloud',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2025-07',
      releaseYear: 2025,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '480B (MoE, 35B actifs)',
      contextWindow: '256k (1M extensible)',
      speciality: 'Code agentique',
      description: 'SOTA open source pour le code agentique. Rival de Claude Sonnet sur SWE-Bench.',
      founders: 'Alibaba Cloud (Jack Ma fondateur)',
      valuation: 'Alibaba: $200B+',
      color: '#ff6a00'
    },

    // === MOONSHOT / KIMI (CHINE) ===
    {
      id: 'kimi-k2',
      name: 'Kimi K2',
      company: 'Moonshot AI',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2025-07',
      releaseYear: 2025,
      openSource: true,
      license: 'MIT modifié',
      parameters: '1T (MoE, 32B actifs)',
      contextWindow: '256k tokens',
      speciality: 'Agentique, Code',
      description: 'Plus grand modèle open weight (1 trillion params). SOTA sur coding benchmarks.',
      founders: 'Yang Zhilin (ex-Tsinghua)',
      valuation: '$3.8B (Oct 2025)',
      color: '#6366f1'
    },
    {
      id: 'kimi-k2-thinking',
      name: 'Kimi K2 Thinking',
      company: 'Moonshot AI',
      country: '🇨🇳 Chine',
      countryCode: 'CN',
      releaseDate: '2025-11',
      releaseYear: 2025,
      openSource: true,
      license: 'MIT modifié',
      parameters: '1T (MoE, 32B actifs)',
      contextWindow: '256k tokens',
      speciality: 'Raisonnement, Tool-calling (200-300 outils)',
      description: 'Entraîné pour $4.6M. INT4 natif. 200-300 tool calls séquentiels autonomes.',
      founders: 'Yang Zhilin (ex-Tsinghua)',
      valuation: '$3.8B (Oct 2025)',
      color: '#6366f1'
    },

    // === XAI / GROK ===
    {
      id: 'grok-2',
      name: 'Grok 2',
      company: 'xAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-08',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '128k tokens',
      speciality: 'Vision, Accès X/Twitter temps réel',
      description: 'Intégré à X (Twitter). Accès données temps réel. Style "rebellious".',
      founders: 'Elon Musk',
      valuation: '$24B (2024)',
      color: '#1d9bf0'
    },
    {
      id: 'grok-3',
      name: 'Grok 3',
      company: 'xAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-02',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '128k tokens',
      speciality: 'Think mode, DeepSearch',
      description: 'Entraîné sur 200k GPUs (Colossus). Modes Think et DeepSearch.',
      founders: 'Elon Musk',
      valuation: '$24B (2024)',
      color: '#1d9bf0'
    },
    {
      id: 'grok-4',
      name: 'Grok 4',
      company: 'xAI',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2025-07',
      releaseYear: 2025,
      openSource: false,
      license: 'Propriétaire',
      parameters: 'Non divulgué',
      contextWindow: '256k tokens',
      speciality: 'Raisonnement, Math/Physics',
      description: 'Record sur Humanity\'s Last Exam (44%). "Never gets math wrong" - Musk.',
      founders: 'Elon Musk',
      valuation: '$50B+ (2025)',
      color: '#1d9bf0'
    },

    // === IBM ===
    {
      id: 'granite-3',
      name: 'IBM Granite 3',
      company: 'IBM',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-10',
      releaseYear: 2024,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '2B, 8B',
      contextWindow: '128k tokens',
      speciality: 'Enterprise, Sécurité',
      description: 'Modèles enterprise-first 100% open source. Focus compliance et sécurité.',
      founders: 'IBM (Arvind Krishna, CEO)',
      valuation: 'IBM: $150B+',
      color: '#0530ad'
    },

    // === NVIDIA ===
    {
      id: 'nemotron-4',
      name: 'Nemotron-4 340B',
      company: 'NVIDIA',
      country: '🇺🇸 États-Unis',
      countryCode: 'US',
      releaseDate: '2024-06',
      releaseYear: 2024,
      openSource: true,
      license: 'NVIDIA Open License',
      parameters: '340B, 70B, 15B',
      contextWindow: '128k tokens',
      speciality: 'Data synthesis, Enterprise',
      description: 'Basé sur Llama-3. Optimisé pour génération de données synthétiques.',
      founders: 'NVIDIA (Jensen Huang, CEO)',
      valuation: 'NVIDIA: $3T+',
      color: '#76b900'
    },

    // === COHERE ===
    {
      id: 'command-r-plus',
      name: 'Command R+',
      company: 'Cohere',
      country: '🇨🇦 Canada',
      countryCode: 'CA',
      releaseDate: '2024-04',
      releaseYear: 2024,
      openSource: false,
      license: 'Propriétaire (C4AI CC-BY-NC)',
      parameters: '104B',
      contextWindow: '128k tokens',
      speciality: 'RAG, Multilingue (10 langues)',
      description: 'Optimisé pour RAG et entreprises. 10 langues business natives.',
      founders: 'Aidan Gomez, Ivan Zhang, Nick Chicken',
      valuation: '$5.5B+ (2024)',
      color: '#39594d'
    },

    // === AI21 ===
    {
      id: 'jamba-1-5',
      name: 'Jamba 1.5',
      company: 'AI21 Labs',
      country: '🇮🇱 Israël',
      countryCode: 'IL',
      releaseDate: '2024-08',
      releaseYear: 2024,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '52B (Mini), 398B (Large)',
      contextWindow: '256k tokens',
      speciality: 'Architecture hybride SSM-Transformer',
      description: 'Architecture révolutionnaire Mamba + Transformer. Très efficace en mémoire.',
      founders: 'Yoav Shoham, Ori Goshen, Amnon Shashua',
      valuation: '$1.4B (2024)',
      color: '#ff3366'
    },

    // === FALCON ===
    {
      id: 'falcon-180b',
      name: 'Falcon 180B',
      company: 'Technology Innovation Institute',
      country: '🇦🇪 Émirats Arabes Unis',
      countryCode: 'AE',
      releaseDate: '2023-09',
      releaseYear: 2023,
      openSource: true,
      license: 'Apache 2.0',
      parameters: '180B',
      contextWindow: '2k tokens',
      speciality: 'Open source efficient',
      description: 'Premier grand modèle du monde arabe. Initiative d\'Abu Dhabi.',
      founders: 'TII (Abu Dhabi)',
      valuation: 'Gouvernement UAE',
      color: '#c4a000'
    }
  ];

  // ========================================
  // RESSOURCES GITHUB & OPEN SOURCE
  // Listes Awesome et Projets Communautaires
  // ========================================
  const githubResources = {
    awesomeLists: [
      {
        id: 'awesome-vibe-coding-1',
        name: 'awesome-vibe-coding',
        author: 'filipecalegario',
        stars: '1.5k+',
        description: 'La liste de référence la plus complète. Catégorise les outils par type : Browser, IDEs, Mobile, Plugins, CLI, Task Management, Documentation.',
        url: 'https://github.com/filipecalegario/awesome-vibe-coding',
        contributors: 14,
        categories: ['Browser tools', 'IDEs', 'Mobile', 'Plugins', 'CLI', 'Documentation'],
        type: 'awesome'
      },
      {
        id: 'awesome-vibe-coding-2',
        name: 'Awesome-Vibe-Coding',
        author: '0xWelt',
        stars: '200+',
        description: 'Collection curatée de projets, outils et ressources d\'apprentissage avec descriptions détaillées.',
        url: 'https://github.com/0xWelt/Awesome-Vibe-Coding',
        contributors: 5,
        categories: ['Projects', 'Tools', 'Learning'],
        type: 'awesome'
      },
      {
        id: 'awesome-vibe-coding-guide',
        name: 'awesome-vibe-coding-guide',
        author: 'analyticalrohit',
        stars: '100+',
        description: 'Guide des best practices et conseils pour le vibe coding efficace.',
        url: 'https://github.com/analyticalrohit/awesome-vibe-coding-guide',
        contributors: 3,
        categories: ['Best practices', 'Tips', 'Guides'],
        type: 'awesome'
      },
      {
        id: 'vibe-coding-prompt-template',
        name: 'vibe-coding-prompt-template',
        author: 'KhazP',
        stars: '50+',
        description: 'Templates pour PRDs, Tech Designs et MVP code. Méthodologie structurée.',
        url: 'https://github.com/KhazP/vibe-coding-prompt-template',
        contributors: 2,
        categories: ['Templates', 'PRD', 'Tech Design'],
        type: 'awesome'
      },
      {
        id: 'awesome-chatgpt-prompts',
        name: 'awesome-chatgpt-prompts',
        author: 'f',
        stars: '115k+',
        description: 'Collection massive de prompts créatifs et utiles pour ChatGPT et autres LLM.',
        url: 'https://github.com/f/awesome-chatgpt-prompts',
        contributors: 200,
        categories: ['Prompts', 'ChatGPT', 'Creative'],
        type: 'awesome'
      },
      {
        id: 'awesome-llm',
        name: 'awesome-llm',
        author: 'Hannibal046',
        stars: '18k+',
        description: 'Liste exhaustive des ressources LLM : papers, outils, datasets, et tutoriels.',
        url: 'https://github.com/Hannibal046/Awesome-LLM',
        contributors: 50,
        categories: ['LLM', 'Papers', 'Research'],
        type: 'awesome'
      },
      {
        id: 'awesome-generative-ai',
        name: 'awesome-generative-ai-guide',
        author: 'aishwaryanr',
        stars: '8k+',
        description: 'Guide complet de l\'IA générative : concepts, outils, et applications pratiques.',
        url: 'https://github.com/aishwaryanr/awesome-generative-ai-guide',
        contributors: 25,
        categories: ['GenAI', 'Guide', 'Applications'],
        type: 'awesome'
      },
      {
        id: 'awesome-ai-agents',
        name: 'awesome-ai-agents',
        author: 'e2b-dev',
        stars: '12k+',
        description: 'Liste des agents IA autonomes, frameworks, et ressources pour construire des agents.',
        url: 'https://github.com/e2b-dev/awesome-ai-agents',
        contributors: 40,
        categories: ['Agents', 'Autonomous', 'Frameworks'],
        type: 'awesome'
      }
    ],
    frameworks: [
      {
        id: 'langchain',
        name: 'LangChain',
        author: 'langchain-ai',
        stars: '95k+',
        description: 'Framework #1 pour construire des applications LLM. Chaînes, agents, RAG, et plus.',
        url: 'https://github.com/langchain-ai/langchain',
        language: 'Python/JS',
        categories: ['Chains', 'Agents', 'RAG', 'Memory'],
        type: 'framework'
      },
      {
        id: 'llamaindex',
        name: 'LlamaIndex',
        author: 'run-llama',
        stars: '37k+',
        description: 'Framework de data pour LLM. Connecte vos données à des modèles de langage.',
        url: 'https://github.com/run-llama/llama_index',
        language: 'Python',
        categories: ['RAG', 'Data', 'Indexing', 'Query'],
        type: 'framework'
      },
      {
        id: 'vercel-ai-sdk',
        name: 'Vercel AI SDK',
        author: 'vercel',
        stars: '15k+',
        description: 'SDK TypeScript pour construire des apps IA. Streaming, React hooks, multi-provider.',
        url: 'https://github.com/vercel/ai',
        language: 'TypeScript',
        categories: ['React', 'Streaming', 'Hooks', 'Edge'],
        type: 'framework'
      },
      {
        id: 'semantic-kernel',
        name: 'Semantic Kernel',
        author: 'microsoft',
        stars: '22k+',
        description: 'SDK Microsoft pour intégrer des LLM dans vos apps. Plugins, planners, et mémoire.',
        url: 'https://github.com/microsoft/semantic-kernel',
        language: 'C#/Python',
        categories: ['Enterprise', 'Plugins', 'Azure', 'Copilot'],
        type: 'framework'
      },
      {
        id: 'haystack',
        name: 'Haystack',
        author: 'deepset-ai',
        stars: '18k+',
        description: 'Framework open source pour construire des pipelines NLP et applications RAG.',
        url: 'https://github.com/deepset-ai/haystack',
        language: 'Python',
        categories: ['NLP', 'RAG', 'Pipelines', 'Search'],
        type: 'framework'
      },
      {
        id: 'dspy',
        name: 'DSPy',
        author: 'stanfordnlp',
        stars: '20k+',
        description: 'Framework Stanford pour programmer (pas prompter) les LLM. Optimisation automatique.',
        url: 'https://github.com/stanfordnlp/dspy',
        language: 'Python',
        categories: ['Programming', 'Optimization', 'Research', 'Stanford'],
        type: 'framework'
      },
      {
        id: 'autogen',
        name: 'AutoGen',
        author: 'microsoft',
        stars: '35k+',
        description: 'Framework Microsoft pour créer des agents IA conversationnels multi-agents.',
        url: 'https://github.com/microsoft/autogen',
        language: 'Python',
        categories: ['Multi-Agent', 'Conversation', 'Collaboration'],
        type: 'framework'
      },
      {
        id: 'crewai',
        name: 'CrewAI',
        author: 'crewAIInc',
        stars: '25k+',
        description: 'Framework pour orchestrer des équipes d\'agents IA autonomes avec des rôles définis.',
        url: 'https://github.com/crewAIInc/crewAI',
        language: 'Python',
        categories: ['Multi-Agent', 'Roles', 'Orchestration', 'Teams'],
        type: 'framework'
      }
    ],
    mcpServers: [
      {
        id: 'mcp-servers',
        name: 'MCP Servers (Official)',
        author: 'modelcontextprotocol',
        stars: '15k+',
        description: 'Collection officielle de serveurs MCP par Anthropic : filesystem, GitHub, Postgres, Slack, etc.',
        url: 'https://github.com/modelcontextprotocol/servers',
        servers: ['Filesystem', 'GitHub', 'Postgres', 'Slack', 'Google Drive'],
        type: 'mcp'
      },
      {
        id: 'mcp-filesystem',
        name: 'Filesystem MCP',
        author: 'modelcontextprotocol',
        stars: '2k+',
        description: 'Accès sécurisé au système de fichiers local pour Claude et autres LLM.',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
        servers: ['Read', 'Write', 'Search', 'Watch'],
        type: 'mcp'
      },
      {
        id: 'mcp-github',
        name: 'GitHub MCP',
        author: 'modelcontextprotocol',
        stars: '3k+',
        description: 'Intégration GitHub complète : repos, issues, PRs, et actions.',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
        servers: ['Repos', 'Issues', 'Pull Requests', 'Actions'],
        type: 'mcp'
      },
      {
        id: 'mcp-postgres',
        name: 'PostgreSQL MCP',
        author: 'modelcontextprotocol',
        stars: '1.5k+',
        description: 'Connectez Claude à vos bases PostgreSQL. Requêtes SQL naturelles.',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
        servers: ['Query', 'Schema', 'Tables', 'Analytics'],
        type: 'mcp'
      },
      {
        id: 'mcp-browser',
        name: 'Puppeteer MCP',
        author: 'modelcontextprotocol',
        stars: '2.5k+',
        description: 'Contrôle de navigateur headless. Web scraping et automation.',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer',
        servers: ['Navigate', 'Screenshot', 'Click', 'Extract'],
        type: 'mcp'
      },
      {
        id: 'mcp-memory',
        name: 'Memory MCP',
        author: 'modelcontextprotocol',
        stars: '1k+',
        description: 'Mémoire persistante pour Claude. Stockage de connaissances entre sessions.',
        url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
        servers: ['Store', 'Retrieve', 'Search', 'Graph'],
        type: 'mcp'
      }
    ],
    standards: [
      {
        id: 'agents-md',
        name: 'AGENTS.md',
        description: 'Format standard ouvert pour guider les agents de codage IA. Adopté par plusieurs outils.',
        url: 'https://github.com/humaans/agents-md',
        status: 'Émergent',
        type: 'standard'
      },
      {
        id: 'mcp-spec',
        name: 'Model Context Protocol (MCP)',
        description: 'Protocole Anthropic pour connecter les LLM à des sources de données externes. Standard ouvert.',
        url: 'https://github.com/modelcontextprotocol/specification',
        status: 'Standard',
        type: 'standard'
      },
      {
        id: 'openai-function-calling',
        name: 'Function Calling',
        description: 'Standard OpenAI pour permettre aux LLM d\'appeler des fonctions. Adopté par la plupart des providers.',
        url: 'https://platform.openai.com/docs/guides/function-calling',
        status: 'Standard',
        type: 'standard'
      },
      {
        id: 'cursor-rules',
        name: '.cursorrules',
        description: 'Fichier de configuration pour personnaliser le comportement de Cursor AI dans un projet.',
        url: 'https://docs.cursor.com/context/rules-for-ai',
        status: 'Standard',
        type: 'standard'
      }
    ],
    topicsGitHub: [
      { tag: '#vibe-coding', repos: '500+', description: 'Tag principal' },
      { tag: '#ai-coding-assistant', repos: '2k+', description: 'Assistants IA généralistes' },
      { tag: '#ai-agents', repos: '5k+', description: 'Agents autonomes' },
      { tag: '#cursor-ai', repos: '300+', description: 'Écosystème Cursor' },
      { tag: '#langchain', repos: '8k+', description: 'Écosystème LangChain' },
      { tag: '#mcp', repos: '400+', description: 'Model Context Protocol' },
      { tag: '#rag', repos: '3k+', description: 'Retrieval Augmented Generation' }
    ],
    openSourceStars: [
      { name: 'LangChain', stars: '95k+', category: 'Framework', license: 'MIT', url: 'https://github.com/langchain-ai/langchain' },
      { name: 'gpt-engineer', stars: '50k+', category: 'CLI Agent', license: 'MIT', url: 'https://github.com/gpt-engineer-org/gpt-engineer' },
      { name: 'AutoGen', stars: '35k+', category: 'Multi-Agent', license: 'MIT', url: 'https://github.com/microsoft/autogen' },
      { name: 'Aider', stars: '38k+', category: 'CLI Agent', license: 'Apache 2.0', url: 'https://github.com/paul-gauthier/aider' },
      { name: 'LlamaIndex', stars: '37k+', category: 'RAG Framework', license: 'MIT', url: 'https://github.com/run-llama/llama_index' },
      { name: 'Cline', stars: '30k+', category: 'VS Code Extension', license: 'Apache 2.0', url: 'https://github.com/cline/cline' },
      { name: 'CrewAI', stars: '25k+', category: 'Multi-Agent', license: 'MIT', url: 'https://github.com/crewAIInc/crewAI' },
      { name: 'Semantic Kernel', stars: '22k+', category: 'Enterprise SDK', license: 'MIT', url: 'https://github.com/microsoft/semantic-kernel' },
      { name: 'DSPy', stars: '20k+', category: 'LLM Programming', license: 'MIT', url: 'https://github.com/stanfordnlp/dspy' },
      { name: 'Haystack', stars: '18k+', category: 'NLP Pipeline', license: 'Apache 2.0', url: 'https://github.com/deepset-ai/haystack' },
      { name: 'avante.nvim', stars: '15.5k+', category: 'Neovim Plugin', license: 'MIT', url: 'https://github.com/yetone/avante.nvim' },
      { name: 'Vercel AI SDK', stars: '15k+', category: 'Web Framework', license: 'Apache 2.0', url: 'https://github.com/vercel/ai' },
      { name: 'Continue', stars: '12k+', category: 'VS Code Extension', license: 'Apache 2.0', url: 'https://github.com/continuedev/continue' },
      { name: 'Plandex', stars: '10k+', category: 'CLI Agent', license: 'MIT', url: 'https://github.com/plandex-ai/plandex' },
      { name: 'OpenHands', stars: '8k+', category: 'Agent Platform', license: 'MIT', url: 'https://github.com/All-Hands-AI/OpenHands' }
    ],
    // Stack & Technologies pour le vibe coding
    stack: {
      languages: [
        { name: 'TypeScript', description: 'Langage typé par défaut pour le vibe coding. Génération IA plus précise grâce aux types.', url: 'https://github.com/microsoft/TypeScript', stars: '102k+', icon: '🔷', useCase: 'Frontend, Backend, Full-stack' },
        { name: 'Python', description: 'Langage #1 pour l\'IA/ML. Scripts, backends, data science. Très bien supporté par les LLM.', url: 'https://github.com/python/cpython', stars: '65k+', icon: '🐍', useCase: 'Backend, AI/ML, Scripts' },
        { name: 'JavaScript', description: 'Langage universel du web. Tous les outils de vibe coding le supportent nativement.', url: 'https://developer.mozilla.org/docs/Web/JavaScript', stars: 'N/A', icon: '💛', useCase: 'Frontend, Backend, Full-stack' },
        { name: 'Rust', description: 'Performance et sécurité mémoire. Utilisé par Bun, SWC, Turbopack. Génération IA en progrès.', url: 'https://github.com/rust-lang/rust', stars: '100k+', icon: '🦀', useCase: 'CLI, Performance, Tooling' },
        { name: 'Go', description: 'Backend performant et simple. Compilation rapide, concurrence native. Idéal pour les APIs.', url: 'https://github.com/golang/go', stars: '125k+', icon: '🐹', useCase: 'Backend, CLI, DevOps' }
      ],
      frontendFrameworks: [
        { name: 'React', description: 'Bibliothèque UI #1. Tous les outils de vibe coding génèrent du React par défaut.', url: 'https://github.com/facebook/react', stars: '232k+', icon: '⚛️', stack: 'Meta' },
        { name: 'Next.js', description: 'Framework React full-stack. SSR, API routes, App Router. Standard pour le vibe coding.', url: 'https://github.com/vercel/next.js', stars: '128k+', icon: '▲', stack: 'Vercel' },
        { name: 'Vue.js', description: 'Alternative React plus accessible. Syntaxe intuitive, excellente DX.', url: 'https://github.com/vuejs/vue', stars: '208k+', icon: '💚', stack: 'Evan You' },
        { name: 'Svelte', description: 'Compile en JS vanilla, pas de virtual DOM. Performance optimale, syntaxe élégante.', url: 'https://github.com/sveltejs/svelte', stars: '80k+', icon: '🔥', stack: 'Vercel' },
        { name: 'Astro', description: 'Framework content-first. Zero JS par défaut, islands architecture. Parfait pour les sites statiques.', url: 'https://github.com/withastro/astro', stars: '48k+', icon: '🚀', stack: 'Astro' },
        { name: 'Nuxt', description: 'Framework Vue full-stack. Équivalent Next.js pour l\'écosystème Vue.', url: 'https://github.com/nuxt/nuxt', stars: '56k+', icon: '💎', stack: 'NuxtLabs' }
      ],
      uiLibraries: [
        { name: 'shadcn/ui', description: 'Components React copiables. Tailwind + Radix UI. Standard du vibe coding 2024-2025.', url: 'https://github.com/shadcn-ui/ui', stars: '78k+', icon: '🎨', stack: 'shadcn' },
        { name: 'Tailwind CSS', description: 'Framework CSS utility-first. Classes atomiques, design system intégré. Omniprésent.', url: 'https://github.com/tailwindlabs/tailwindcss', stars: '85k+', icon: '🌊', stack: 'Tailwind Labs' },
        { name: 'Radix UI', description: 'Primitives accessibles et non-stylés. Base de shadcn/ui. Headless components.', url: 'https://github.com/radix-ui/primitives', stars: '16k+', icon: '🔘', stack: 'WorkOS' },
        { name: 'Framer Motion', description: 'Bibliothèque d\'animations React. Transitions fluides, gestures, layout animations.', url: 'https://github.com/framer/motion', stars: '25k+', icon: '✨', stack: 'Framer' },
        { name: 'Magic UI', description: 'Components animés pour landing pages. Effets visuels, backgrounds, text animations.', url: 'https://github.com/magicuidesign/magicui', stars: '12k+', icon: '🪄', stack: 'Magic UI' }
      ],
      packageManagers: [
        { name: 'pnpm', description: 'Package manager performant. Hard links, espace disque -70%. Standard entreprise 2025.', url: 'https://github.com/pnpm/pnpm', stars: '30k+', icon: '📦', speed: '4x npm' },
        { name: 'Bun', description: 'Runtime + package manager + bundler. Écrit en Zig, 20x plus rapide que npm.', url: 'https://github.com/oven-sh/bun', stars: '75k+', icon: '🍞', speed: '20x npm' },
        { name: 'npm', description: 'Package manager par défaut de Node.js. Le plus utilisé, compatible universelle.', url: 'https://github.com/npm/cli', stars: '8k+', icon: '📥', speed: 'Baseline' },
        { name: 'Yarn', description: 'Alternative Facebook à npm. Workspaces, PnP mode. Mature et stable.', url: 'https://github.com/yarnpkg/berry', stars: '7k+', icon: '🧶', speed: '2x npm' }
      ],
      databases: [
        { name: 'Supabase', description: 'Firebase open source. PostgreSQL + Auth + Storage + Realtime. Backend-as-a-Service #1.', url: 'https://github.com/supabase/supabase', stars: '75k+', icon: '💚', type: 'BaaS' },
        { name: 'PostgreSQL', description: 'Base de données relationnelle #1. ACID, extensible, performante. Standard industrie.', url: 'https://github.com/postgres/postgres', stars: '16k+', icon: '🐘', type: 'SQL' },
        { name: 'Drizzle ORM', description: 'ORM TypeScript léger. Type-safe, proche du SQL, migrations automatiques.', url: 'https://github.com/drizzle-team/drizzle-orm', stars: '25k+', icon: '💧', type: 'ORM' },
        { name: 'Prisma', description: 'ORM TypeScript populaire. Schema declaratif, migrations, Prisma Studio.', url: 'https://github.com/prisma/prisma', stars: '40k+', icon: '🔺', type: 'ORM' },
        { name: 'Neon', description: 'PostgreSQL serverless. Branching, scale-to-zero. Parfait pour le développement.', url: 'https://github.com/neondatabase/neon', stars: '15k+', icon: '⚡', type: 'Serverless' },
        { name: 'Turso', description: 'SQLite distribué. Edge computing, réplication globale. LibSQL sous le capot.', url: 'https://github.com/tursodatabase/libsql', stars: '12k+', icon: '🦅', type: 'Edge DB' },
        { name: 'MongoDB', description: 'Base NoSQL document. Flexible, scalable. Atlas pour le cloud.', url: 'https://github.com/mongodb/mongo', stars: '26k+', icon: '🍃', type: 'NoSQL' },
        { name: 'Redis', description: 'Cache et base in-memory. Pub/sub, sessions, rate limiting.', url: 'https://github.com/redis/redis', stars: '67k+', icon: '🔴', type: 'Cache' }
      ],
      deployment: [
        { name: 'Vercel', description: 'Plateforme #1 pour Next.js. Edge functions, preview deployments. DX exceptionnelle.', url: 'https://vercel.com', stars: 'N/A', icon: '▲', pricing: 'Freemium' },
        { name: 'Netlify', description: 'Plateforme JAMstack. Forms, identity, edge functions. Excellent pour sites statiques.', url: 'https://netlify.com', stars: 'N/A', icon: '🌐', pricing: 'Freemium' },
        { name: 'Railway', description: 'Plateforme full-stack. Databases, Docker, scaling. Alternative Heroku moderne.', url: 'https://railway.app', stars: 'N/A', icon: '🚂', pricing: '$5/mois' },
        { name: 'Cloudflare Pages', description: 'Déploiement edge ultra-rapide. Workers, KV, D1. Bandwidth illimité gratuit.', url: 'https://pages.cloudflare.com', stars: 'N/A', icon: '☁️', pricing: 'Gratuit généreux' },
        { name: 'Fly.io', description: 'Déploiement global. Containers, edge, Postgres distribué. Multi-région facile.', url: 'https://fly.io', stars: 'N/A', icon: '🪁', pricing: 'Usage-based' },
        { name: 'Render', description: 'Alternative Heroku. Services managés, auto-scaling. Simple et prévisible.', url: 'https://render.com', stars: 'N/A', icon: '🎯', pricing: 'Freemium' }
      ],
      tooling: [
        { name: 'Vite', description: 'Build tool ultra-rapide. HMR instantané, ESM natif. Remplace Webpack.', url: 'https://github.com/vitejs/vite', stars: '70k+', icon: '⚡', category: 'Bundler' },
        { name: 'Turbopack', description: 'Bundler Rust par Vercel. Successeur de Webpack. Intégré à Next.js.', url: 'https://github.com/vercel/turbo', stars: '26k+', icon: '🚀', category: 'Bundler' },
        { name: 'ESLint', description: 'Linter JavaScript/TypeScript. Détection erreurs, style code. Indispensable.', url: 'https://github.com/eslint/eslint', stars: '25k+', icon: '🔍', category: 'Linter' },
        { name: 'Prettier', description: 'Formateur de code opinioné. Formatage automatique, intégration IDE.', url: 'https://github.com/prettier/prettier', stars: '50k+', icon: '💅', category: 'Formatter' },
        { name: 'Biome', description: 'Linter + Formatter Rust. Remplace ESLint + Prettier. Ultra-rapide.', url: 'https://github.com/biomejs/biome', stars: '16k+', icon: '🌿', category: 'All-in-one' },
        { name: 'Vitest', description: 'Test runner Vite-native. Compatible Jest, ultra-rapide. UI intégrée.', url: 'https://github.com/vitest-dev/vitest', stars: '14k+', icon: '🧪', category: 'Testing' },
        { name: 'Playwright', description: 'E2E testing moderne. Multi-browser, auto-wait, codegen.', url: 'https://github.com/microsoft/playwright', stars: '68k+', icon: '🎭', category: 'Testing' }
      ],
      devops: [
        // Version Control
        { name: 'Git', description: 'Système de contrôle de version distribué. Créé par Linus Torvalds. Indispensable.', url: 'https://github.com/git/git', stars: '53k+', icon: '📚', category: 'Version Control' },
        { name: 'GitHub', description: 'Plateforme Git #1. Repos, Issues, PRs, Actions, Copilot. Microsoft.', url: 'https://github.com', stars: 'N/A', icon: '🐙', category: 'Git Platform' },
        { name: 'GitLab', description: 'Plateforme DevOps complète. CI/CD intégré, self-hosted possible.', url: 'https://gitlab.com/gitlab-org/gitlab', stars: '24k+', icon: '🦊', category: 'Git Platform' },
        { name: 'Gitea', description: 'Forge Git légère self-hosted. Alternative GitHub/GitLab simple.', url: 'https://github.com/go-gitea/gitea', stars: '46k+', icon: '🍵', category: 'Git Platform' },
        { name: 'Forgejo', description: 'Fork communautaire de Gitea. Governance ouverte, auto-hébergé.', url: 'https://codeberg.org/forgejo/forgejo', stars: '5k+', icon: '🔨', category: 'Git Platform' },
        // IDE & Éditeurs
        { name: 'VS Code', description: 'Éditeur #1 des développeurs. Extensions, Git intégré, Copilot. Microsoft.', url: 'https://github.com/microsoft/vscode', stars: '165k+', icon: '💙', category: 'IDE' },
        { name: 'Cursor', description: 'Fork VS Code avec IA native. Claude/GPT intégré, Tab autocomplete.', url: 'https://cursor.com', stars: 'N/A', icon: '🖱️', category: 'IDE' },
        { name: 'Windsurf', description: 'IDE IA par Codeium. Cascade AI, flows automatisés, agents.', url: 'https://codeium.com/windsurf', stars: 'N/A', icon: '🏄', category: 'IDE' },
        { name: 'Zed', description: 'Éditeur ultra-rapide en Rust. Collaboration temps réel, IA intégrée.', url: 'https://github.com/zed-industries/zed', stars: '51k+', icon: '⚡', category: 'IDE' },
        { name: 'Neovim', description: 'Vim modernisé. Lua config, LSP natif, extensible. Terminal-based.', url: 'https://github.com/neovim/neovim', stars: '84k+', icon: '📟', category: 'IDE' },
        { name: 'JetBrains Fleet', description: 'IDE léger JetBrains. Multi-langage, remote dev, collaboration.', url: 'https://www.jetbrains.com/fleet/', stars: 'N/A', icon: '🚀', category: 'IDE' },
        { name: 'WebStorm', description: 'IDE JavaScript/TypeScript pro. Refactoring avancé, debugging.', url: 'https://www.jetbrains.com/webstorm/', stars: 'N/A', icon: '🌐', category: 'IDE' },
        { name: 'Sublime Text', description: 'Éditeur rapide et léger. Multi-curseur, Goto Anything.', url: 'https://www.sublimetext.com', stars: 'N/A', icon: '🧡', category: 'IDE' },
        // Terminaux
        { name: 'Warp', description: 'Terminal moderne avec IA. Autocomplétion, blocks, workflows. Mac/Linux.', url: 'https://www.warp.dev', stars: 'N/A', icon: '🌀', category: 'Terminal' },
        { name: 'iTerm2', description: 'Terminal macOS avancé. Split panes, search, profiles.', url: 'https://github.com/gnachman/iTerm2', stars: '15k+', icon: '🖥️', category: 'Terminal' },
        { name: 'Alacritty', description: 'Terminal GPU-accelerated. Ultra-rapide, cross-platform.', url: 'https://github.com/alacritty/alacritty', stars: '57k+', icon: '🚄', category: 'Terminal' },
        { name: 'Kitty', description: 'Terminal GPU moderne. Ligatures, images, scriptable.', url: 'https://github.com/kovidgoyal/kitty', stars: '25k+', icon: '🐱', category: 'Terminal' },
        { name: 'Windows Terminal', description: 'Terminal Windows moderne. Tabs, GPU rendering, WSL.', url: 'https://github.com/microsoft/terminal', stars: '96k+', icon: '🪟', category: 'Terminal' },
        { name: 'Hyper', description: 'Terminal Electron extensible. Themes, plugins JavaScript.', url: 'https://github.com/vercel/hyper', stars: '43k+', icon: '⚫', category: 'Terminal' },
        { name: 'Ghostty', description: 'Terminal natif ultra-rapide par Mitchell Hashimoto. Zig-based.', url: 'https://github.com/ghostty-org/ghostty', stars: '25k+', icon: '👻', category: 'Terminal' },
        // Shell & CLI
        { name: 'Oh My Zsh', description: 'Framework Zsh avec plugins et themes. 300+ plugins disponibles.', url: 'https://github.com/ohmyzsh/ohmyzsh', stars: '175k+', icon: '🎨', category: 'Shell' },
        { name: 'Starship', description: 'Prompt shell minimal et rapide. Cross-shell, personnalisable.', url: 'https://github.com/starship/starship', stars: '46k+', icon: '🚀', category: 'Shell' },
        { name: 'Fish', description: 'Shell user-friendly. Autosuggestions, syntax highlighting natif.', url: 'https://github.com/fish-shell/fish-shell', stars: '26k+', icon: '🐟', category: 'Shell' },
        { name: 'Zoxide', description: 'cd intelligent. Apprend vos habitudes, jump rapide.', url: 'https://github.com/ajeetdsouza/zoxide', stars: '24k+', icon: '📂', category: 'CLI Tool' },
        { name: 'fzf', description: 'Fuzzy finder universel. Recherche fichiers, historique, git.', url: 'https://github.com/junegunn/fzf', stars: '66k+', icon: '🔍', category: 'CLI Tool' },
        { name: 'ripgrep', description: 'grep ultra-rapide en Rust. Récursif, respect .gitignore.', url: 'https://github.com/BurntSushi/ripgrep', stars: '49k+', icon: '🔎', category: 'CLI Tool' },
        { name: 'bat', description: 'cat avec syntax highlighting. Git integration, pager.', url: 'https://github.com/sharkdp/bat', stars: '50k+', icon: '🦇', category: 'CLI Tool' },
        { name: 'eza', description: 'ls moderne en Rust. Couleurs, icônes, git status. Fork exa.', url: 'https://github.com/eza-community/eza', stars: '12k+', icon: '📁', category: 'CLI Tool' },
        { name: 'htop', description: 'Moniteur processus interactif. Meilleur que top.', url: 'https://github.com/htop-dev/htop', stars: '6k+', icon: '📊', category: 'CLI Tool' },
        { name: 'btop', description: 'Moniteur ressources moderne. CPU, RAM, disques, réseau.', url: 'https://github.com/aristocratos/btop', stars: '21k+', icon: '📈', category: 'CLI Tool' },
        { name: 'lazygit', description: 'Interface Git terminal. Staging, commits, branches visuels.', url: 'https://github.com/jesseduffield/lazygit', stars: '54k+', icon: '😴', category: 'Git Tool' },
        { name: 'lazydocker', description: 'Interface Docker terminal. Containers, images, logs.', url: 'https://github.com/jesseduffield/lazydocker', stars: '39k+', icon: '🐋', category: 'Docker Tool' },
        { name: 'tldr', description: 'Man pages simplifiées. Exemples pratiques, communautaire.', url: 'https://github.com/tldr-pages/tldr', stars: '52k+', icon: '📖', category: 'CLI Tool' },
        { name: 'Homebrew', description: 'Package manager macOS/Linux. The missing package manager.', url: 'https://github.com/Homebrew/brew', stars: '42k+', icon: '🍺', category: 'Package Manager' },
        { name: 'Chocolatey', description: 'Package manager Windows. Installe apps via CLI.', url: 'https://github.com/chocolatey/choco', stars: '10k+', icon: '🍫', category: 'Package Manager' },
        { name: 'Scoop', description: 'Package manager Windows minimaliste. Pas besoin admin.', url: 'https://github.com/ScoopInstaller/Scoop', stars: '21k+', icon: '🥄', category: 'Package Manager' },
        { name: 'winget', description: 'Package manager Windows officiel Microsoft. Intégré Win11.', url: 'https://github.com/microsoft/winget-cli', stars: '23k+', icon: '🪟', category: 'Package Manager' },
        // Containers & Orchestration
        { name: 'Docker', description: 'Containerisation standard. Images reproductibles, déploiement uniforme.', url: 'https://github.com/docker/docker-ce', stars: '25k+', icon: '🐳', category: 'Container' },
        { name: 'Docker Desktop', description: 'Docker GUI pour Mac/Windows. Kubernetes local inclus.', url: 'https://www.docker.com/products/docker-desktop/', stars: 'N/A', icon: '🖥️', category: 'Container' },
        { name: 'Podman', description: 'Alternative Docker sans daemon. Rootless, compatible Docker CLI.', url: 'https://github.com/containers/podman', stars: '24k+', icon: '🦭', category: 'Container' },
        { name: 'Rancher Desktop', description: 'Alternative Docker Desktop open source. K8s/containerd.', url: 'https://github.com/rancher-sandbox/rancher-desktop', stars: '6k+', icon: '🤠', category: 'Container' },
        { name: 'OrbStack', description: 'Docker/Linux ultra-rapide pour Mac. 2x plus rapide que Desktop.', url: 'https://orbstack.dev', stars: 'N/A', icon: '🔮', category: 'Container' },
        { name: 'Kubernetes', description: 'Orchestration containers à grande échelle. Standard industrie.', url: 'https://github.com/kubernetes/kubernetes', stars: '112k+', icon: '☸️', category: 'Orchestration' },
        { name: 'k3s', description: 'Kubernetes léger. Parfait pour edge, IoT, dev local.', url: 'https://github.com/k3s-io/k3s', stars: '28k+', icon: '🎯', category: 'Orchestration' },
        { name: 'minikube', description: 'Kubernetes local en un click. Dev et test K8s.', url: 'https://github.com/kubernetes/minikube', stars: '30k+', icon: '🚗', category: 'Orchestration' },
        { name: 'kind', description: 'Kubernetes in Docker. Clusters K8s dans containers.', url: 'https://github.com/kubernetes-sigs/kind', stars: '14k+', icon: '📦', category: 'Orchestration' },
        { name: 'Lens', description: 'IDE Kubernetes. Dashboard, logs, shell, multi-cluster.', url: 'https://github.com/lensapp/lens', stars: '22k+', icon: '🔭', category: 'K8s Tool' },
        { name: 'k9s', description: 'Dashboard K8s terminal. Navigation rapide, logs temps réel.', url: 'https://github.com/derailed/k9s', stars: '28k+', icon: '🐕', category: 'K8s Tool' },
        { name: 'Helm', description: 'Package manager Kubernetes. Charts, releases, rollbacks.', url: 'https://github.com/helm/helm', stars: '27k+', icon: '⎈', category: 'K8s Tool' },
        // Infrastructure as Code
        { name: 'Terraform', description: 'Infrastructure as Code par HashiCorp. Multi-cloud, déclaratif.', url: 'https://github.com/hashicorp/terraform', stars: '43k+', icon: '🏗️', category: 'IaC' },
        { name: 'OpenTofu', description: 'Fork open source de Terraform. Linux Foundation.', url: 'https://github.com/opentofu/opentofu', stars: '23k+', icon: '🧱', category: 'IaC' },
        { name: 'Pulumi', description: 'IaC avec vrais langages (TypeScript, Python, Go). Alternative Terraform.', url: 'https://github.com/pulumi/pulumi', stars: '22k+', icon: '🌐', category: 'IaC' },
        { name: 'Ansible', description: 'Automatisation IT sans agent. Playbooks YAML, idempotent.', url: 'https://github.com/ansible/ansible', stars: '64k+', icon: '🔧', category: 'Automation' },
        // CI/CD
        { name: 'GitHub Actions', description: 'CI/CD intégré à GitHub. Workflows YAML, marketplace actions.', url: 'https://github.com/features/actions', stars: 'N/A', icon: '⚙️', category: 'CI/CD' },
        { name: 'GitLab CI', description: 'CI/CD intégré à GitLab. Pipelines, runners, artifacts.', url: 'https://docs.gitlab.com/ee/ci/', stars: 'N/A', icon: '🦊', category: 'CI/CD' },
        { name: 'Jenkins', description: 'Serveur CI/CD open source classique. Plugins, pipelines.', url: 'https://github.com/jenkinsci/jenkins', stars: '23k+', icon: '🎩', category: 'CI/CD' },
        { name: 'Drone', description: 'CI/CD container-native. Config YAML, self-hosted.', url: 'https://github.com/harness/drone', stars: '32k+', icon: '🚁', category: 'CI/CD' },
        { name: 'Act', description: 'Run GitHub Actions localement. Test workflows sans push.', url: 'https://github.com/nektos/act', stars: '56k+', icon: '🎬', category: 'CI/CD' },
        // Web Servers & Proxy
        { name: 'Nginx', description: 'Serveur web / reverse proxy haute performance. Load balancing.', url: 'https://github.com/nginx/nginx', stars: '26k+', icon: '🌐', category: 'Web Server' },
        { name: 'Traefik', description: 'Reverse proxy cloud-native. Auto-discovery, Let\'s Encrypt intégré.', url: 'https://github.com/traefik/traefik', stars: '52k+', icon: '🚦', category: 'Proxy' },
        { name: 'Caddy', description: 'Serveur web avec HTTPS automatique. Config simple, performant.', url: 'https://github.com/caddyserver/caddy', stars: '60k+', icon: '🔒', category: 'Web Server' },
        // Outils Dev & API
        { name: 'Insomnia', description: 'Client API REST/GraphQL. Alternative Postman open source.', url: 'https://github.com/Kong/insomnia', stars: '35k+', icon: '🌙', category: 'API Tool' },
        { name: 'Postman', description: 'Client API populaire. Collections, tests, mock servers.', url: 'https://www.postman.com', stars: 'N/A', icon: '🧑‍🚀', category: 'API Tool' },
        { name: 'HTTPie', description: 'Client HTTP CLI user-friendly. Syntax intuitive, JSON.', url: 'https://github.com/httpie/cli', stars: '34k+', icon: '🥧', category: 'API Tool' },
        { name: 'Bruno', description: 'Client API open source. Git-friendly, pas de cloud.', url: 'https://github.com/usebruno/bruno', stars: '28k+', icon: '🐶', category: 'API Tool' },
        { name: 'Hoppscotch', description: 'Client API open source web-based. Alternative Postman légère.', url: 'https://github.com/hoppscotch/hoppscotch', stars: '66k+', icon: '👽', category: 'API Tool' },
        { name: 'ngrok', description: 'Tunnels publics vers localhost. Webhooks, démo, debug.', url: 'https://ngrok.com', stars: 'N/A', icon: '🕳️', category: 'Tunnel' },
        { name: 'localtunnel', description: 'Alternative ngrok open source. Expose localhost facilement.', url: 'https://github.com/localtunnel/localtunnel', stars: '19k+', icon: '🚇', category: 'Tunnel' },
        { name: 'Cloudflare Tunnel', description: 'Tunnels sécurisés Cloudflare. Zero Trust, gratuit.', url: 'https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/', stars: 'N/A', icon: '☁️', category: 'Tunnel' },
        { name: 'mkcert', description: 'Certificats HTTPS localhost. Zero config, trusted CA local.', url: 'https://github.com/FiloSottile/mkcert', stars: '51k+', icon: '🔐', category: 'Security' },
        // DB Tools
        { name: 'DBeaver', description: 'Client DB universel. PostgreSQL, MySQL, MongoDB, etc.', url: 'https://github.com/dbeaver/dbeaver', stars: '41k+', icon: '🦫', category: 'DB Tool' },
        { name: 'TablePlus', description: 'Client DB moderne Mac/Windows. Interface native rapide.', url: 'https://tableplus.com', stars: 'N/A', icon: '📊', category: 'DB Tool' },
        { name: 'pgAdmin', description: 'Admin PostgreSQL officiel. Web-based, requêtes, visualisation.', url: 'https://github.com/pgadmin-org/pgadmin4', stars: '2k+', icon: '🐘', category: 'DB Tool' },
        { name: 'Redis Insight', description: 'GUI Redis officiel. Visualisation données, CLI intégré.', url: 'https://github.com/RedisInsight/RedisInsight', stars: '6k+', icon: '🔴', category: 'DB Tool' },
        // WSL & Virtualisation
        { name: 'WSL2', description: 'Linux natif sur Windows. Kernel Linux complet, Docker.', url: 'https://github.com/microsoft/WSL', stars: '17k+', icon: '🐧', category: 'Virtualisation' },
        { name: 'Multipass', description: 'VMs Ubuntu instantanées. Dev cloud-like local. Canonical.', url: 'https://github.com/canonical/multipass', stars: '6k+', icon: '☁️', category: 'Virtualisation' },
        { name: 'Vagrant', description: 'Environnements dev reproductibles. VMs déclaratives.', url: 'https://github.com/hashicorp/vagrant', stars: '26k+', icon: '📦', category: 'Virtualisation' },
        { name: 'UTM', description: 'Virtualisation macOS (Apple Silicon). QEMU frontend.', url: 'https://github.com/utmapp/UTM', stars: '27k+', icon: '🖥️', category: 'Virtualisation' },
        { name: 'VirtualBox', description: 'Virtualisation gratuite Oracle. Cross-platform, snapshots.', url: 'https://www.virtualbox.org', stars: 'N/A', icon: '📦', category: 'Virtualisation' },
        { name: 'Parallels', description: 'Virtualisation Mac premium. Windows sur Mac, performance.', url: 'https://www.parallels.com', stars: 'N/A', icon: '🔲', category: 'Virtualisation' },
        // Monitoring & Logs
        { name: 'Grafana', description: 'Dashboards et visualisation. Prometheus, Loki, alerting.', url: 'https://github.com/grafana/grafana', stars: '65k+', icon: '📊', category: 'Monitoring' },
        { name: 'Prometheus', description: 'Monitoring et alerting. Time series DB, PromQL.', url: 'https://github.com/prometheus/prometheus', stars: '56k+', icon: '🔥', category: 'Monitoring' },
        { name: 'Loki', description: 'Agrégation de logs par Grafana. Like Prometheus for logs.', url: 'https://github.com/grafana/loki', stars: '24k+', icon: '📝', category: 'Logging' },
        { name: 'Uptime Kuma', description: 'Monitoring uptime self-hosted. Alternative StatusCake.', url: 'https://github.com/louislam/uptime-kuma', stars: '61k+', icon: '📈', category: 'Monitoring' }
      ],
      selfHostedPaas: [
        { name: 'Dokploy', description: 'Alternative Vercel/Netlify self-hosted. Docker, Traefik, multi-node. Interface simple.', url: 'https://github.com/Dokploy/dokploy', stars: '12k+', icon: '🚀', features: ['Docker Compose', 'Databases', 'Backups', 'Traefik'] },
        { name: 'Coolify', description: 'PaaS self-hosted open source. Deploy apps, databases, services. Alternative Heroku.', url: 'https://github.com/coollabsio/coolify', stars: '35k+', icon: '❄️', features: ['Git Deploy', 'Databases', 'S3 Storage', 'Monitoring'] },
        { name: 'Dokku', description: 'PaaS Docker minimaliste. Heroku-like sur votre serveur. Buildpacks.', url: 'https://github.com/dokku/dokku', stars: '29k+', icon: '📦', features: ['Git Push', 'Plugins', 'SSL Auto', 'Scaling'] },
        { name: 'CapRover', description: 'PaaS avec interface web. One-click apps, clusters Docker Swarm.', url: 'https://github.com/caprover/caprover', stars: '13k+', icon: '🚢', features: ['Web UI', 'One-Click Apps', 'Clustering', 'SSL'] },
        { name: 'Portainer', description: 'Interface de gestion Docker/Kubernetes. Visualisation, déploiement facile.', url: 'https://github.com/portainer/portainer', stars: '31k+', icon: '🎛️', features: ['Docker UI', 'K8s Support', 'Templates', 'RBAC'] },
        { name: 'Kamal', description: 'Déploiement zero-downtime par 37signals. Simple, SSH-based, Docker.', url: 'https://github.com/basecamp/kamal', stars: '11k+', icon: '🎯', features: ['Zero Downtime', 'SSH Deploy', 'Multi-host', 'Traefik'] }
      ],
      vpsProviders: [
        { name: 'Hetzner', description: 'VPS européen rapport qualité/prix imbattable. Datacenters Allemagne/Finlande.', url: 'https://www.hetzner.com', icon: '🇩🇪', pricing: 'Dès 3.49€/mois', location: 'Europe', highlight: 'Best Value' },
        { name: 'Hostinger', description: 'VPS accessible avec assistant IA Kodee. Interface simple, bon support.', url: 'https://www.hostinger.com', icon: '🌍', pricing: 'Dès 5.99$/mois', location: 'Global', highlight: 'Beginner Friendly' },
        { name: 'OVHcloud', description: 'Géant français du cloud. VPS, bare metal, anti-DDoS inclus.', url: 'https://www.ovhcloud.com', icon: '🇫🇷', pricing: 'Dès 5.50€/mois', location: 'Europe/Global', highlight: 'French Cloud' },
        { name: 'DigitalOcean', description: 'Cloud simple pour développeurs. Droplets, App Platform, Kubernetes managé.', url: 'https://www.digitalocean.com', icon: '🌊', pricing: 'Dès 4$/mois', location: 'Global', highlight: 'Developer Favorite' },
        { name: 'Vultr', description: '30+ datacenters mondiaux. Bare metal, cloud compute, edge.', url: 'https://www.vultr.com', icon: '⚡', pricing: 'Dès 2.50$/mois', location: 'Global', highlight: 'Global Network' },
        { name: 'Linode (Akamai)', description: 'VPS fiable depuis 2003. Racheté par Akamai. Kubernetes, Object Storage.', url: 'https://www.linode.com', icon: '🟢', pricing: 'Dès 5$/mois', location: 'Global', highlight: 'Reliable' },
        { name: 'Scaleway', description: 'Cloud français éco-responsable. Instances, Kubernetes, bare metal.', url: 'https://www.scaleway.com', icon: '🇫🇷', pricing: 'Dès 7€/mois', location: 'Europe', highlight: 'Green Cloud' },
        { name: 'Contabo', description: 'VPS haute capacité à petit prix. Beaucoup de RAM/stockage pour le prix.', url: 'https://contabo.com', icon: '💪', pricing: 'Dès 4.99€/mois', location: 'Europe/US', highlight: 'High Specs' },
        { name: 'Infomaniak', description: 'Hébergeur suisse éthique. RGPD, énergie verte, support francophone.', url: 'https://www.infomaniak.com', icon: '🇨🇭', pricing: 'Dès 5.75€/mois', location: 'Suisse', highlight: 'Swiss Privacy' },
        { name: 'Gandi', description: 'Hébergeur français historique. Domaines, VPS, email. "No bullshit".', url: 'https://www.gandi.net', icon: '🦊', pricing: 'Dès 7€/mois', location: 'France', highlight: 'French Pioneer' }
      ]
    }
  };

  // Ères de l'IA pour les banners contextuels
  const aiEras = [
    {
      id: 'pre-chatgpt',
      name: 'Ère Pré-ChatGPT',
      years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      color: '#6b7280',
      description: 'Les fondations du no-code et premiers outils',
      keyEvents: ['Bubble (2012)', 'GitHub Copilot (2021)']
    },
    {
      id: 'gpt-4-era',
      name: 'Ère GPT-4',
      years: [2023],
      color: '#10a37f',
      description: 'GPT-4 révolutionne les capacités des LLM',
      keyEvents: ['GPT-4 (Mars)', 'Claude 2 (Juillet)', 'Mistral 7B (Sept)', 'Mixtral (Déc)']
    },
    {
      id: 'sonnet-era',
      name: 'Ère Claude 3.5 Sonnet',
      years: [2024],
      color: '#cc785c',
      description: 'Explosion du vibe coding - Sonnet devient la référence pour le code',
      keyEvents: ['Llama 3 (Avril)', 'Claude 3.5 Sonnet (Juin)', 'o1 (Sept)', 'DeepSeek V3 (Déc)']
    },
    {
      id: 'agents-era',
      name: 'Ère des Agents',
      years: [2025],
      color: '#6366f1',
      description: 'Les modèles deviennent agentiques - CLI coding & reasoning',
      keyEvents: ['DeepSeek R1 (Jan)', 'Claude Code (Fév)', 'Llama 4 (Avril)', 'Qwen3-Coder (Juil)', 'Gemini 3 (Nov)']
    }
  ];

  // ========================================
  // DONNÉES BENCHMARKS LLM
  // ========================================
  const benchmarkData = {
    // Classement Arena ELO (Chatbot Arena - Décembre 2025)
    arenaElo: [
      { model: 'Gemini 2.0 Pro', company: 'Google', elo: 1380, color: '#4285f4' },
      { model: 'GPT-4.5', company: 'OpenAI', elo: 1372, color: '#10a37f' },
      { model: 'Claude 3.5 Sonnet', company: 'Anthropic', elo: 1365, color: '#cc785c' },
      { model: 'Grok 3', company: 'xAI', elo: 1358, color: '#e11d48' },
      { model: 'Claude Opus 4.5', company: 'Anthropic', elo: 1352, color: '#cc785c' },
      { model: 'DeepSeek V3', company: 'DeepSeek', elo: 1345, color: '#0066ff' },
      { model: 'GPT-4o', company: 'OpenAI', elo: 1338, color: '#10a37f' },
      { model: 'Gemini 1.5 Pro', company: 'Google', elo: 1320, color: '#4285f4' },
      { model: 'Llama 3.3 70B', company: 'Meta', elo: 1305, color: '#0668e1' },
      { model: 'Mistral Large', company: 'Mistral', elo: 1295, color: '#ff7000' },
      { model: 'Qwen 2.5 72B', company: 'Alibaba', elo: 1288, color: '#ff6a00' },
      { model: 'Claude 3 Haiku', company: 'Anthropic', elo: 1275, color: '#cc785c' }
    ],
    
    // Scores par catégorie (radar chart)
    modelCapabilities: [
      { 
        model: 'GPT-4o', 
        company: 'OpenAI',
        color: '#10a37f',
        scores: { code: 90, raisonnement: 88, créativité: 92, math: 77, multilingue: 89, vitesse: 75 }
      },
      { 
        model: 'Claude 3.5 Sonnet', 
        company: 'Anthropic',
        color: '#cc785c',
        scores: { code: 94, raisonnement: 90, créativité: 95, math: 71, multilingue: 92, vitesse: 82 }
      },
      { 
        model: 'Gemini 2.0 Pro', 
        company: 'Google',
        color: '#4285f4',
        scores: { code: 88, raisonnement: 92, créativité: 85, math: 82, multilingue: 94, vitesse: 88 }
      },
      { 
        model: 'DeepSeek V3', 
        company: 'DeepSeek',
        color: '#0066ff',
        scores: { code: 91, raisonnement: 89, créativité: 78, math: 85, multilingue: 75, vitesse: 90 }
      },
      { 
        model: 'Llama 3.3 70B', 
        company: 'Meta',
        color: '#0668e1',
        scores: { code: 82, raisonnement: 80, créativité: 75, math: 68, multilingue: 78, vitesse: 95 }
      }
    ],

    // Benchmarks détaillés
    benchmarks: {
      MMLU: [
        { model: 'GPT-4o', score: 88.7, color: '#10a37f' },
        { model: 'Claude 3.5 Sonnet', score: 88.3, color: '#cc785c' },
        { model: 'Gemini 2.0 Pro', score: 89.1, color: '#4285f4' },
        { model: 'Llama 3.1 405B', score: 88.6, color: '#0668e1' },
        { model: 'DeepSeek V3', score: 87.5, color: '#0066ff' },
        { model: 'Mistral Large', score: 84.0, color: '#ff7000' }
      ],
      HumanEval: [
        { model: 'Claude 3.5 Sonnet', score: 93.7, color: '#cc785c' },
        { model: 'GPT-4o', score: 90.2, color: '#10a37f' },
        { model: 'DeepSeek V3', score: 89.5, color: '#0066ff' },
        { model: 'Gemini 2.0 Pro', score: 85.0, color: '#4285f4' },
        { model: 'Qwen 2.5 Coder', score: 92.7, color: '#ff6a00' },
        { model: 'Llama 3.1 405B', score: 80.5, color: '#0668e1' }
      ],
      MATH: [
        { model: 'GPT-4o', score: 76.6, color: '#10a37f' },
        { model: 'DeepSeek V3', score: 78.5, color: '#0066ff' },
        { model: 'Gemini 2.0 Pro', score: 80.2, color: '#4285f4' },
        { model: 'Claude 3.5 Sonnet', score: 71.1, color: '#cc785c' },
        { model: 'Llama 3.1 405B', score: 73.8, color: '#0668e1' },
        { model: 'Qwen 2.5 72B', score: 75.2, color: '#ff6a00' }
      ],
      GPQA: [
        { model: 'Claude 3.5 Sonnet', score: 59.4, color: '#cc785c' },
        { model: 'GPT-4o', score: 53.6, color: '#10a37f' },
        { model: 'Gemini 2.0 Pro', score: 58.0, color: '#4285f4' },
        { model: 'DeepSeek V3', score: 55.2, color: '#0066ff' },
        { model: 'Llama 3.1 405B', score: 48.5, color: '#0668e1' }
      ]
    },

    // Prix par million de tokens (input/output)
    pricing: [
      { model: 'GPT-4o', input: 2.50, output: 10.00, quality: 88, color: '#10a37f' },
      { model: 'Claude 3.5 Sonnet', input: 3.00, output: 15.00, quality: 90, color: '#cc785c' },
      { model: 'Gemini 1.5 Pro', input: 1.25, output: 5.00, quality: 85, color: '#4285f4' },
      { model: 'DeepSeek V3', input: 0.27, output: 1.10, quality: 86, color: '#0066ff' },
      { model: 'Llama 3.1 405B', input: 0.90, output: 0.90, quality: 82, color: '#0668e1' },
      { model: 'Mistral Large', input: 2.00, output: 6.00, quality: 80, color: '#ff7000' },
      { model: 'GPT-4o mini', input: 0.15, output: 0.60, quality: 75, color: '#10a37f' },
      { model: 'Claude 3 Haiku', input: 0.25, output: 1.25, quality: 72, color: '#cc785c' },
      { model: 'Gemini 1.5 Flash', input: 0.075, output: 0.30, quality: 70, color: '#4285f4' }
    ],

    // Évolution historique ELO (pour racing chart)
    eloHistory: [
      { date: '2023-03', models: { 'GPT-4': 1280, 'Claude 2': 1150, 'PaLM 2': 1042 }},
      { date: '2023-06', models: { 'GPT-4': 1290, 'Claude 2': 1175, 'PaLM 2': 1055 }},
      { date: '2023-11', models: { 'GPT-4 Turbo': 1310, 'Claude 2.1': 1195, 'Gemini Pro': 1200 }},
      { date: '2024-03', models: { 'Claude 3 Opus': 1340, 'GPT-4 Turbo': 1320, 'Gemini Pro': 1210 }},
      { date: '2024-06', models: { 'Claude 3.5 Sonnet': 1365, 'GPT-4o': 1338, 'Gemini 1.5 Pro': 1290 }},
      { date: '2024-09', models: { 'o1-preview': 1350, 'Claude 3.5 Sonnet': 1365, 'GPT-4o': 1340 }},
      { date: '2024-12', models: { 'Gemini 2.0 Pro': 1380, 'Claude 3.5 Sonnet': 1365, 'DeepSeek V3': 1345 }},
      { date: '2025-03', models: { 'GPT-4.5': 1372, 'Claude Opus 4.5': 1352, 'Grok 3': 1358 }}
    ]
  };

  // Catégories avec métadonnées (sans emojis - style moderne)
  const categories = {
    'all': { label: 'Catégorie', color: '#6366f1' },
    'full-stack': { label: 'Full-Stack', color: '#8b5cf6' },
    'frontend': { label: 'Frontend/UI', color: '#ec4899' },
    'mobile': { label: 'Mobile', color: '#14b8a6' },
    'ide': { label: 'IDE', color: '#3b82f6' },
    'ide-ai': { label: 'IDE AI', color: '#f59e0b' },
    'cli-agent': { label: 'CLI Agents', color: '#10b981' },
    'no-code': { label: 'No-Code', color: '#6366f1' },
    'tools': { label: 'Outils', color: '#64748b' },
    'design-to-code': { label: 'Design→Code', color: '#f472b6' },
    'opensource': { label: 'Open Source', color: '#ef4444' }
  };

  // Tiers avec métadonnées (sans emojis - style moderne)
  const tiers = {
    'all': { label: 'Niveau', color: '#9ca3af' },
    'incontournable': { label: 'Incontournables', color: '#fbbf24' },
    'challenger': { label: 'Challengers', color: '#f97316' },
    'emergent': { label: 'Émergents', color: '#22c55e' },
    'historique': { label: 'Historique', color: '#8b5cf6' },
    'opensource': { label: 'Open Source', color: '#ef4444' }
  };

  // Pays uniques (outils + LLM)
  const countries = useMemo(() => {
    const toolCountries = [...new Set(tools.map(t => t.countryCode))];
    const llmCountries = [...new Set(llmModels.map(l => l.countryCode))];
    const uniqueCountries = [...new Set([...toolCountries, ...llmCountries])];
    const countryMap = {
      'US': { label: 'États-Unis', flag: '🇺🇸' },
      'SE': { label: 'Suède', flag: '🇸🇪' },
      'NL': { label: 'Pays-Bas', flag: '🇳🇱' },
      'IL': { label: 'Israël', flag: '🇮🇱' },
      'HR': { label: 'Croatie', flag: '🇭🇷' },
      'DK': { label: 'Danemark', flag: '🇩🇰' },
      'IN': { label: 'Inde', flag: '🇮🇳' },
      'GB': { label: 'Royaume-Uni', flag: '🇬🇧' },
      'CZ': { label: 'Tchéquie', flag: '🇨🇿' },
      'FR': { label: 'France', flag: '🇫🇷' },
      'CN': { label: 'Chine', flag: '🇨🇳' },
      'CA': { label: 'Canada', flag: '🇨🇦' },
      'AE': { label: 'Émirats Arabes Unis', flag: '🇦🇪' },
      'KR': { label: 'Corée du Sud', flag: '🇰🇷' }
    };
    return { all: { label: 'Pays', flag: '' }, ...Object.fromEntries(uniqueCountries.filter(c => countryMap[c]).map(c => [c, countryMap[c]])) };
  }, []);

  // Liste des compagnies LLM uniques pour le filtre
  const llmCompanies = useMemo(() => {
    const companies = [...new Set(llmModels.map(l => l.company))];
    return ['all', ...companies.sort()];
  }, []);

  // Années uniques
  const years = useMemo(() => {
    const uniqueYears = [...new Set(tools.map(t => t.launchYear))].sort((a, b) => b - a);
    return ['all', ...uniqueYears];
  }, []);

  // Filtrage des outils
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchTier = selectedTier === 'all' || tool.tier === selectedTier;
      const matchCountry = selectedCountry === 'all' || tool.countryCode === selectedCountry;
      const matchYear = selectedYear === 'all' || tool.launchYear === selectedYear;
      const matchSearch = searchTerm === '' || 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.founders.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.company.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchTier && matchCountry && matchYear && matchSearch;
    });
  }, [selectedCategory, selectedTier, selectedCountry, selectedYear, searchTerm]);

  // Statistiques
  const stats = useMemo(() => ({
    total: tools.length,
    incontournables: tools.filter(t => t.tier === 'incontournable').length,
    cliAgents: tools.filter(t => t.category === 'cli-agent').length,
    opensource: tools.filter(t => t.tier === 'opensource').length,
    countries: new Set(tools.map(t => t.countryCode)).size
  }), []);

  // Composant Modal pour les détails d'un outil
  const ToolModal = ({ tool, onClose }) => {
    if (!tool) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        backdropFilter: 'blur(5px)'
      }} onClick={onClose}>
        <div style={{
          backgroundColor: '#1a1a2e',
          borderRadius: '24px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }} onClick={e => e.stopPropagation()}>
          {/* Header avec logo et infos principales */}
          <div style={{
            background: `linear-gradient(135deg, ${categories[tool.category]?.color || '#6366f1'}22, transparent)`,
            padding: '32px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                fontSize: '64px',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px'
              }}>
                {tool.logo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h2 style={{ margin: 0, fontSize: '28px', color: '#fff' }}>{tool.name}</h2>
                  <span style={{
                    backgroundColor: tool.tier === 'incontournable' ? '#fbbf24' : tool.tier === 'opensource' ? '#10b981' : '#6366f1',
                    color: tool.tier === 'incontournable' ? '#000' : '#fff',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {tiers[tool.tier]?.icon} {tiers[tool.tier]?.label}
                  </span>
                </div>
                <p style={{ color: '#9ca3af', margin: '8px 0', fontSize: '16px' }}>{tool.description}</p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>{tool.country}</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {tool.launchDate}</span>
                  <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>{tool.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corps avec détails */}
          <div style={{ padding: '24px 32px' }}>
            {/* Résumé */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PenTool size={16} color="#a5b4fc" /> À propos
              </h3>
              <p style={{ color: '#d1d5db', lineHeight: '1.7', fontSize: '15px' }}>
                {tool.summary}
              </p>
            </div>

            {/* Informations entreprise */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><Building2 size={12} /> Entreprise</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{tool.company}</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12} /> Fondateur(s)</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{tool.founders}</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} /> Siège</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{tool.headquarters}</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={12} /> Valorisation</div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{tool.valuation}</div>
              </div>
            </div>

            {/* Stack technique */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={16} color="#a5b4fc" /> Stack technique
              </h3>
              <div style={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                color: '#a5b4fc',
                fontSize: '14px'
              }}>
                {tool.stack}
              </div>
            </div>

            {/* Features clés */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✨</span> Fonctionnalités clés
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tool.keyFeatures.map((feature, idx) => (
                  <span key={idx} style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#6ee7b7',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px'
                  }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  backgroundColor: categories[tool.category]?.color || '#6366f1',
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'transform 0.2s, opacity 0.2s'
                }}
                onMouseOver={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
              >
                🔗 Visiter {tool.name}
              </a>
              <button
                onClick={onClose}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '15px'
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant Introduction Vibe Coding
  const VibeCodingIntro = () => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      borderRadius: '20px',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <button
        onClick={() => setActiveSection(null)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: 'none',
          color: '#9ca3af',
          cursor: 'pointer',
          fontSize: '18px',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          zIndex: 25
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
      >
        ✕
      </button>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderRadius: '24px',
          flexShrink: 0
        }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#a5b4fc" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="42" stroke="#c4b5fd" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="36" stroke="#e9d5ff" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="30" stroke="#f0abfc" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="24" stroke="#f5d0fe" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="18" stroke="#fcd34d" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="12" stroke="#fbbf24" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="6" fill="#fbbf24"/>
            <path d="M50 2 L50 8" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M50 14 L50 20" stroke="#c4b5fd" strokeWidth="1.5"/>
            <path d="M50 26 L50 32" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M50 38 L50 44" stroke="#fbbf24" strokeWidth="1.5"/>
            <path d="M98 50 L92 50" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M86 50 L80 50" stroke="#c4b5fd" strokeWidth="1.5"/>
            <path d="M74 50 L68 50" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M2 50 L8 50" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M14 50 L20 50" stroke="#c4b5fd" strokeWidth="1.5"/>
            <path d="M26 50 L32 50" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M50 98 L50 92" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M50 86 L50 80" stroke="#c4b5fd" strokeWidth="1.5"/>
            <path d="M50 74 L50 68" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M15 15 L22 22" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M28 28 L35 35" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M85 15 L78 22" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M72 28 L65 35" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M15 85 L22 78" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M28 72 L35 65" stroke="#f0abfc" strokeWidth="1.5"/>
            <path d="M85 85 L78 78" stroke="#a5b4fc" strokeWidth="1.5"/>
            <path d="M72 72 L65 65" stroke="#f0abfc" strokeWidth="1.5"/>
          </svg>
        </div>
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ 
            color: '#fff', 
            margin: '0 0 16px 0',
            fontSize: '28px',
            background: 'linear-gradient(90deg, #a5b4fc, #f0abfc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Qu'est-ce que le Vibe Coding ?
          </h2>
          
          <p style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '15px', marginBottom: '16px' }}>
            Le terme <strong style={{ color: '#a5b4fc' }}>"Vibe Coding"</strong> a été inventé par <strong style={{ color: '#fbbf24' }}>Andrej Karpathy</strong> 
            le <strong>6 février 2025</strong> dans un tweet viral. Co-fondateur d'OpenAI et ancien directeur IA chez Tesla, 
            Karpathy a décrit cette nouvelle approche comme : <em>"se laisser porter par les vibes, embrasser les exponentielles, 
            et oublier que le code existe"</em>.
          </p>
          
          <p style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '15px', marginBottom: '16px' }}>
            Le concept fait référence à une technique où le développeur décrit ce qu'il veut en langage naturel, 
            l'IA génère le code, et le développeur accepte les changements sans forcément lire les diffs. 
            Karpathy utilisait Cursor Composer avec Claude Sonnet et SuperWhisper pour coder uniquement à la voix.
          </p>

          <div style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: '16px 20px',
            borderRadius: '12px',
            borderLeft: '4px solid #a5b4fc',
            marginBottom: '16px'
          }}>
            <p style={{ color: '#e5e7eb', fontStyle: 'italic', margin: 0, fontSize: '14px' }}>
              "Je construis un projet ou une webapp, mais ce n'est pas vraiment coder – je regarde des trucs, 
              je dis des trucs, j'exécute des trucs, et je copie-colle des trucs, et ça marche la plupart du temps."
            </p>
            <p style={{ color: '#9ca3af', margin: '8px 0 0 0', fontSize: '12px' }}>
              — Andrej Karpathy, février 2025
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              color: '#fbbf24',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Calendar size={14} /> Février 2025
            </span>
            <span style={{
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#6ee7b7',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <BookOpen size={14} /> Merriam-Webster (mars 2025)
            </span>
            <span style={{
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <TrendingUp size={14} /> 25% des startups YC W25 : 95% code IA
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant Section Course aux LLM
  const LLMSection = () => {
    const filteredLLMs = useMemo(() => {
      return llmModels.filter(llm => {
        const matchCompany = llmFilter === 'all' || llm.company === llmFilter;
        const matchCountry = llmCountryFilter === 'all' || llm.countryCode === llmCountryFilter;
        
        // Filtre par ère
        let matchEra = true;
        if (llmEraFilter !== 'all') {
          const year = llm.releaseYear;
          switch(llmEraFilter) {
            case 'precurseurs': matchEra = year >= 1843 && year <= 1949; break;
            case 'proto': matchEra = year >= 1950 && year <= 1999; break;
            case 'prehistoire': matchEra = year >= 2006 && year <= 2019; break;
            case 'emergence': matchEra = year >= 2020 && year <= 2022; break;
            case 'gpt4': matchEra = year === 2023; break;
            case 'sonnet': matchEra = year === 2024; break;
            case 'agents': matchEra = year === 2025; break;
            default: matchEra = true;
          }
        }
        
        return matchCompany && matchCountry && matchEra;
      }).sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }, [llmFilter, llmCountryFilter, llmEraFilter]);

    const llmStats = useMemo(() => ({
      total: llmModels.length,
      openSource: llmModels.filter(l => l.openSource).length,
      proprietary: llmModels.filter(l => !l.openSource).length,
      countries: new Set(llmModels.map(l => l.countryCode)).size,
      companies: new Set(llmModels.map(l => l.company)).size
    }), []);

    return (
      <div id="llm-section" style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(234, 179, 8, 0.05) 100%)',
        borderRadius: '20px',
        marginBottom: '32px',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        position: 'relative',
        minHeight: '85vh',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header STICKY - reste fixe en haut */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
          padding: '24px 32px 16px',
          borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '20px 20px 0 0'
        }}>
          <button
            onClick={() => setActiveSection(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '18px',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 25
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            ✕
          </button>
          {/* Header avec Dinosaure animé */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <h2 style={{ 
                color: '#fff', 
                fontSize: '24px', 
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Rocket size={28} color="#f87171" /> La Course Folle des LLM
              </h2>
              {/* Dinosaure pixel art animé */}
              <div style={{
                animation: 'dinoWalk 0.6s steps(2) infinite',
                fontSize: '28px',
                lineHeight: 1
              }}>
                🦖
              </div>
              <style>{`
                @keyframes dinoWalk {
                  0%, 100% { transform: translateY(0) scaleX(1); }
                  50% { transform: translateY(-3px) scaleX(1); }
                }
              `}</style>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
              De Turing (1950) à DeepSeek R1, la saga complète de l'intelligence artificielle.
              {' '}<strong style={{ color: '#fbbf24' }}>{llmStats.total} jalons</strong> de{' '}
              <strong style={{ color: '#a5b4fc' }}>{llmStats.companies} organisations</strong> dans{' '}
              <strong style={{ color: '#6ee7b7' }}>{llmStats.countries} pays</strong>.
            </p>
          </div>

          {/* Navigation par ères - cliquable pour scroller */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '8px',
            marginBottom: '16px'
          }}>
            {[
              { id: 'all', label: 'Tous', years: 'Toutes ères', color: '#9ca3af', filterValue: 'all' },
              { id: 'era-1843', label: 'Précurseurs', years: '1843-1949', color: '#14b8a6', filterValue: 'precurseurs' },
              { id: 'era-1950', label: 'Proto-histoire', years: '1950-1999', color: '#8b5cf6', filterValue: 'proto' },
              { id: 'era-2006', label: 'Préhistoire', years: '2006-2019', color: '#f59e0b', filterValue: 'prehistoire' },
              { id: 'era-2020', label: 'Émergence', years: '2020-2022', color: '#10b981', filterValue: 'emergence' },
              { id: 'era-2023', label: 'Ère GPT-4', years: '2023', color: '#ef4444', filterValue: 'gpt4' },
              { id: 'era-2024', label: 'Ère Sonnet', years: '2024', color: '#ec4899', filterValue: 'sonnet' },
              { id: 'era-2025', label: 'Ère Agents', years: '2025', color: '#06b6d4', filterValue: 'agents' }
            ].map(era => (
              <button
                key={era.id}
                onClick={() => setLlmEraFilter(era.filterValue)}
                style={{
                  backgroundColor: llmEraFilter === era.filterValue ? `${era.color}40` : `${era.color}15`,
                  border: llmEraFilter === era.filterValue ? `2px solid ${era.color}` : `1px solid ${era.color}44`,
                  padding: '10px 6px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: llmEraFilter === era.filterValue ? 'scale(1.02)' : 'scale(1)'
                }}
                onMouseOver={e => {
                  if (llmEraFilter !== era.filterValue) {
                    e.currentTarget.style.backgroundColor = `${era.color}30`;
                    e.currentTarget.style.borderColor = era.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseOut={e => {
                  if (llmEraFilter !== era.filterValue) {
                    e.currentTarget.style.backgroundColor = `${era.color}15`;
                    e.currentTarget.style.borderColor = `${era.color}44`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ color: era.color, fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>
                  {era.label}
                </div>
                <div style={{ color: '#6b7280', fontSize: '10px' }}>
                  {era.years}
                </div>
              </button>
            ))}
          </div>

          {/* Filtres LLM */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={llmFilter}
              onChange={e => setLlmFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: '#1a1a2e',
                color: '#fff',
                fontSize: '13px'
              }}
            >
              <option value="all">Toutes les entreprises</option>
              {llmCompanies.filter(c => c !== 'all').map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <select
              value={llmCountryFilter}
              onChange={e => setLlmCountryFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: '#1a1a2e',
                color: '#fff',
                fontSize: '13px'
              }}
            >
              <option value="all">Pays</option>
              <option value="US">🇺🇸 États-Unis</option>
              <option value="FR">🇫🇷 France</option>
              <option value="CN">🇨🇳 Chine</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="GB">🇬🇧 Royaume-Uni</option>
              <option value="DE">🇩🇪 Allemagne</option>
              <option value="IL">🇮🇱 Israël</option>
              <option value="AE">🇦🇪 Émirats</option>
            </select>

            {/* Bouton Reset LLM */}
            {(llmFilter !== 'all' || llmCountryFilter !== 'all' || llmEraFilter !== 'all') && (
              <button
                onClick={() => {
                  setLlmFilter('all');
                  setLlmCountryFilter('all');
                  setLlmEraFilter('all');
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#f87171',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                }}
              >
                <RotateCcw size={14} />
                Reset
              </button>
            )}

            {/* Toggle Timeline / Grille */}
            <div style={{ 
              display: 'flex', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px',
              marginLeft: 'auto'
            }}>
              <button
                onClick={() => setLlmViewMode('timeline')}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: llmViewMode === 'timeline' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
                  color: llmViewMode === 'timeline' ? '#fca5a5' : '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: llmViewMode === 'timeline' ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <Calendar size={14} /> Timeline
              </button>
              <button
                onClick={() => setLlmViewMode('grid')}
                style={{
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: llmViewMode === 'grid' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
                  color: llmViewMode === 'grid' ? '#fca5a5' : '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: llmViewMode === 'grid' ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                <Grid3X3 size={14} /> Grille
              </button>
            </div>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 32px 32px'
        }}>

        {/* Vue Timeline des LLM - Style chronologique centré */}
        {llmViewMode === 'timeline' && (() => {
          // Grouper les LLM par année, triés du plus ancien au plus récent
          const llmsByYear = {};
          filteredLLMs.forEach(llm => {
            if (!llmsByYear[llm.releaseYear]) llmsByYear[llm.releaseYear] = [];
            llmsByYear[llm.releaseYear].push(llm);
          });
          // Trier les années et trier les LLM par date au sein de chaque année
          const sortedYears = Object.entries(llmsByYear)
            .sort((a, b) => a[0] - b[0])
            .map(([year, llms]) => [
              year, 
              llms.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
            ]);
          let globalIdx = 0;

          return (
            <div style={{ 
              position: 'relative',
              maxWidth: '1100px',
              margin: '0 auto 24px',
              paddingBottom: '24px'
            }}>
              {/* Ligne verticale centrale */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: '0',
                bottom: '0',
                width: '4px',
                background: 'linear-gradient(180deg, #14b8a6, #8b5cf6, #f59e0b, #10b981, #ef4444, #ec4899, #06b6d4)',
                borderRadius: '2px'
              }} />

              {sortedYears.map(([year, yearLLMs]) => {
                // Déterminer l'ère pour la couleur du badge année
                const yearNum = parseInt(year);
                let eraColor = '#06b6d4'; // cyan par défaut (2025 - Ère Agents)
                if (yearNum <= 1949) {
                  eraColor = '#14b8a6'; // teal précurseurs
                } else if (yearNum <= 1999) {
                  eraColor = '#8b5cf6'; // violet proto-histoire
                } else if (yearNum <= 2019) {
                  eraColor = '#f59e0b'; // orange préhistoire
                } else if (yearNum <= 2022) {
                  eraColor = '#10b981'; // vert émergence
                } else if (yearNum === 2023) {
                  eraColor = '#ef4444'; // rouge GPT-4
                } else if (yearNum === 2024) {
                  eraColor = '#ec4899'; // rose Sonnet
                }
                
                return (
                <div key={year} id={`llm-year-${year}`} style={{ marginBottom: '40px' }}>
                  {/* Marqueur année centré */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    position: 'relative',
                    zIndex: 10
                  }}>
                    <div style={{
                      backgroundColor: eraColor,
                      color: '#fff',
                      padding: '10px 28px',
                      borderRadius: '30px',
                      fontSize: '22px',
                      fontWeight: '700',
                      boxShadow: `0 4px 20px ${eraColor}66`,
                      border: '4px solid #0f0f23',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {year}
                    </div>
                  </div>

                  {/* LLM de l'année en alternance gauche/droite */}
                  {yearLLMs.map((llm) => {
                    const isLeft = globalIdx % 2 === 0;
                    globalIdx++;
                    const isHistorical = llm.isHistorical;
                    
                    return (
                      <div 
                        key={llm.id} 
                        style={{
                          display: 'flex',
                          justifyContent: isLeft ? 'flex-start' : 'flex-end',
                          position: 'relative',
                          marginBottom: '20px',
                          paddingLeft: isLeft ? '0' : '52%',
                          paddingRight: isLeft ? '52%' : '0'
                        }}
                      >
                        {/* Point simple sur la timeline */}
                        <div style={{
                          position: 'absolute',
                          left: '50%',
                          top: '24px',
                          transform: 'translateX(-50%)',
                          width: '14px',
                          height: '14px',
                          backgroundColor: llm.color,
                          borderRadius: '50%',
                          border: '3px solid #0f0f23',
                          zIndex: 5,
                          boxShadow: `0 0 10px ${llm.color}66`
                        }} />
                        
                        {/* Ligne de connexion vers la carte */}
                        <div style={{
                          position: 'absolute',
                          top: '29px',
                          left: isLeft ? 'auto' : 'calc(50% + 10px)',
                          right: isLeft ? 'calc(50% + 10px)' : 'auto',
                          width: '80px',
                          height: '2px',
                          backgroundColor: `${llm.color}66`
                        }} />

                        {/* Carte LLM */}
                        <div
                          onClick={() => setSelectedLLMModel(llm)}
                          style={{
                            backgroundColor: `${llm.color}11`,
                            borderRadius: '14px',
                            padding: '16px 18px',
                            border: `1px solid ${llm.color}44`,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            maxWidth: '400px',
                            position: 'relative'
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = `0 15px 30px -10px ${llm.color}44`;
                            e.currentTarget.style.borderColor = llm.color;
                            e.currentTarget.style.backgroundColor = `${llm.color}22`;
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = `${llm.color}44`;
                            e.currentTarget.style.backgroundColor = `${llm.color}11`;
                          }}
                        >
                          {/* Badge Open/Closed ou Historique */}
                          <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: isHistorical 
                              ? (llm.releaseYear < 1950 ? 'rgba(20, 184, 166, 0.3)' : 'rgba(139, 92, 246, 0.3)')
                              : (llm.openSource ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'),
                            color: isHistorical
                              ? (llm.releaseYear < 1950 ? '#5eead4' : '#a78bfa')
                              : (llm.openSource ? '#6ee7b7' : '#fca5a5'),
                            padding: '3px 8px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {isHistorical 
                              ? (llm.releaseYear < 1950 ? <><Landmark size={10} /> Jalon</> : <><Cpu size={10} /> Jalon</>)
                              : (llm.openSource ? '🔓 Open' : '🔒 Proprio')}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: `${llm.color}22`,
                              borderRadius: '10px',
                              fontSize: '20px'
                            }}>
                              {isHistorical 
                                ? (llm.releaseYear < 1950 ? <Landmark size={22} color={llm.color} /> : <Cpu size={22} color={llm.color} />)
                                : <Brain size={22} color={llm.color} />}
                            </div>
                            <div>
                              <h3 style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: '700' }}>{llm.name}</h3>
                              <span style={{ color: llm.color, fontSize: '12px', fontWeight: '500' }}>
                                {llm.company}
                              </span>
                            </div>
                          </div>

                          <p style={{ 
                            color: '#9ca3af', 
                            fontSize: '12px', 
                            lineHeight: '1.5',
                            marginBottom: '10px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {llm.description}
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                            <span style={{ color: '#6b7280' }}>
                              {llm.country.split(' ')[0]} • {llm.releaseDate}
                            </span>
                            {!isHistorical && (
                              <span style={{ 
                                backgroundColor: 'rgba(165, 180, 252, 0.15)',
                                color: '#a5b4fc',
                                padding: '3px 8px',
                                borderRadius: '8px'
                              }}>
                                {llm.contextWindow}
                              </span>
                            )}
                            {isHistorical && (
                              <span style={{ 
                                backgroundColor: `${llm.color}22`,
                                color: llm.color,
                                padding: '3px 8px',
                                borderRadius: '8px'
                              }}>
                                {llm.valuation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
              })}
            </div>
          );
        })()}

        {/* Vue Grille simple des LLM */}
        {llmViewMode === 'grid' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '16px',
            marginBottom: '24px'
          }}>
            {filteredLLMs.map(llm => (
              <div
                key={llm.id}
                onClick={() => setSelectedLLMModel(llm)}
                style={{
                  backgroundColor: `${llm.color}11`,
                  borderRadius: '12px',
                  padding: '20px',
                  border: `1px solid ${llm.color}44`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = llm.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 25px -5px ${llm.color}33`;
                  e.currentTarget.style.backgroundColor = `${llm.color}22`;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = `${llm.color}44`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = `${llm.color}11`;
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '16px', marginBottom: '4px' }}>{llm.name}</div>
                    <div style={{ color: llm.color, fontSize: '13px', fontWeight: '500' }}>{llm.company}</div>
                  </div>
                  <span style={{
                    backgroundColor: llm.openSource ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: llm.openSource ? '#6ee7b7' : '#fca5a5',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px'
                  }}>
                    {llm.openSource ? '🔓 Open' : '🔒 Proprio'}
                  </span>
                </div>
                
                <p style={{ 
                  color: '#9ca3af', 
                  fontSize: '12px', 
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {llm.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                  <span style={{ color: '#6b7280' }}>{llm.country.split(' ')[0]} {llm.releaseDate}</span>
                  <span style={{ color: '#a5b4fc' }}>{llm.contextWindow}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note de bas */}
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280', 
          textAlign: 'center',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          💡 Cliquez sur un modèle pour voir les détails • Les outils de vibe coding utilisent ces LLM comme moteur
        </div>
        </div>
      </div>
    );
  };

  // Modal pour les détails d'un LLM
  const LLMModal = ({ llm, onClose }) => {
    if (!llm) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        backdropFilter: 'blur(5px)'
      }} onClick={onClose}>
        <div style={{
          backgroundColor: '#1a1a2e',
          borderRadius: '24px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          border: `2px solid ${llm.color}`,
          boxShadow: `0 25px 50px -12px ${llm.color}33`
        }} onClick={e => e.stopPropagation()}>
          <div style={{
            background: `linear-gradient(135deg, ${llm.color}22, transparent)`,
            padding: '32px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '28px', color: '#fff' }}>{llm.name}</h2>
                <div style={{ color: '#9ca3af', marginTop: '8px' }}>{llm.company} • {llm.country}</div>
              </div>
              <span style={{
                backgroundColor: llm.openSource ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: llm.openSource ? '#6ee7b7' : '#fca5a5',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {llm.openSource ? '🔓 Open Source' : '🔒 Propriétaire'}
              </span>
            </div>
          </div>
          
          <div style={{ padding: '24px 32px' }}>
            <p style={{ color: '#d1d5db', lineHeight: '1.7', marginBottom: '24px' }}>{llm.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={12} /> Date de sortie</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{llm.releaseDate}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Cpu size={12} /> Paramètres</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{llm.parameters}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><LayoutList size={12} /> Contexte</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{llm.contextWindow}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={12} /> Licence</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{llm.license}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={12} /> Spécialité</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{llm.speciality}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Building2 size={12} /> Valorisation</div>
                <div style={{ color: '#fff', fontWeight: '500' }}>{llm.valuation}</div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12} /> Fondateur(s)</div>
              <div style={{ color: '#a5b4fc', fontWeight: '500' }}>{llm.founders}</div>
            </div>

            {/* Lien Wikipedia si disponible */}
            {llm.wikiUrl && (
              <a
                href={llm.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                  padding: '12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginBottom: '16px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
                  e.currentTarget.style.borderColor = '#6366f1';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                }}
              >
                <ExternalLink size={14} style={{ marginRight: '8px' }} /> Plus d'informations sur Wikipedia
              </a>
            )}
            
            <button
              onClick={onClose}
              style={{
                width: '100%',
                backgroundColor: llm.color,
                color: '#fff',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Composant carte d'outil
  const ToolCard = ({ tool }) => (
    <div
      onClick={() => setSelectedTool(tool)}
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 20px 40px -15px ${categories[tool.category]?.color}33`;
        e.currentTarget.style.borderColor = categories[tool.category]?.color;
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      {/* Badge tier */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: tool.tier === 'incontournable' ? '#fbbf24' : tool.tier === 'opensource' ? '#10b981' : '#6366f1',
        color: tool.tier === 'incontournable' ? '#000' : '#fff',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: '600'
      }}>
        {tiers[tool.tier]?.icon}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <div style={{
          fontSize: '36px',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${categories[tool.category]?.color}22`,
          borderRadius: '12px'
        }}>
          {tool.logo}
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>{tool.name}</h3>
          <span style={{ color: '#9ca3af', fontSize: '12px' }}>
            {tool.country} • {tool.launchYear}
          </span>
        </div>
      </div>

      <p style={{ 
        color: '#9ca3af', 
        fontSize: '13px', 
        lineHeight: '1.5',
        marginBottom: '12px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {tool.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          backgroundColor: `${categories[tool.category]?.color}22`,
          color: categories[tool.category]?.color,
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '11px'
        }}>
          {categories[tool.category]?.icon} {categories[tool.category]?.label}
        </span>
        <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>
          {tool.price}
        </span>
      </div>
    </div>
  );

  // Vue Timeline centrée avec alternance gauche/droite
  const TimelineView = () => {
    const toolsByYear = useMemo(() => {
      const grouped = {};
      filteredTools.forEach(tool => {
        if (!grouped[tool.launchYear]) grouped[tool.launchYear] = [];
        grouped[tool.launchYear].push(tool);
      });
      return Object.entries(grouped).sort((a, b) => a[0] - b[0]);
    }, [filteredTools]);

    let globalIndex = 0;

    return (
      <div style={{ 
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Ligne verticale centrale */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '0',
          bottom: '0',
          width: '4px',
          background: 'linear-gradient(180deg, #6366f1, #ec4899, #10b981, #fbbf24)',
          borderRadius: '2px'
        }} />

        {toolsByYear.map(([year, yearTools]) => (
          <div key={year} style={{ marginBottom: '48px' }}>
            {/* Marqueur année centré */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '32px',
              position: 'relative',
              zIndex: 10
            }}>
              <div style={{
                backgroundColor: '#6366f1',
                color: '#fff',
                padding: '12px 32px',
                borderRadius: '30px',
                fontSize: '24px',
                fontWeight: '700',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                border: '4px solid #0f0f23'
              }}>
                {year}
              </div>
            </div>

            {/* Outils de l'année en alternance */}
            {yearTools.map((tool, idx) => {
              const isLeft = globalIndex % 2 === 0;
              globalIndex++;
              
              return (
                <div 
                  key={tool.id} 
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    position: 'relative',
                    marginBottom: '24px',
                    paddingLeft: isLeft ? '0' : '52%',
                    paddingRight: isLeft ? '52%' : '0'
                  }}
                >
                  {/* Point sur la timeline */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '30px',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '16px',
                    backgroundColor: categories[tool.category]?.color || '#6366f1',
                    borderRadius: '50%',
                    border: '4px solid #0f0f23',
                    zIndex: 5,
                    boxShadow: `0 0 12px ${categories[tool.category]?.color || '#6366f1'}66`
                  }} />
                  
                  {/* Ligne de connexion */}
                  <div style={{
                    position: 'absolute',
                    top: '36px',
                    left: isLeft ? 'auto' : 'calc(50% + 10px)',
                    right: isLeft ? 'calc(50% + 10px)' : 'auto',
                    width: '80px',
                    height: '2px',
                    backgroundColor: `${categories[tool.category]?.color || '#6366f1'}66`
                  }} />

                  {/* Carte */}
                  <div
                    onClick={() => setSelectedTool(tool)}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      maxWidth: '450px',
                      position: 'relative'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 20px 40px -15px ${categories[tool.category]?.color}44`;
                      e.currentTarget.style.borderColor = categories[tool.category]?.color;
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    {/* Badge tier */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: tool.tier === 'incontournable' ? '#fbbf24' : tool.tier === 'opensource' ? '#10b981' : '#6366f1',
                      color: tool.tier === 'incontournable' ? '#000' : '#fff',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      {tiers[tool.tier]?.icon}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                      <div style={{
                        fontSize: '32px',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${categories[tool.category]?.color}22`,
                        borderRadius: '12px'
                      }}>
                        {tool.logo}
                      </div>
                      <div>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '17px' }}>{tool.name}</h3>
                        <span style={{ color: '#9ca3af', fontSize: '12px' }}>
                          {tool.country} • {tool.launchDate}
                        </span>
                      </div>
                    </div>

                    <p style={{ 
                      color: '#9ca3af', 
                      fontSize: '13px', 
                      lineHeight: '1.5',
                      marginBottom: '10px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {tool.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        backgroundColor: `${categories[tool.category]?.color}22`,
                        color: categories[tool.category]?.color,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px'
                      }}>
                        {categories[tool.category]?.icon} {categories[tool.category]?.label}
                      </span>
                      <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>
                        {tool.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f23',
      color: '#fff',
      fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        {/* Logo Labyrinthe style Chartres */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="42" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="36" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="30" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="24" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="18" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="12" stroke="url(#grad1)" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="50" r="6" fill="url(#grad1)"/>
            {/* Chemins du labyrinthe */}
            <path d="M50 2 L50 8" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M50 14 L50 20" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M50 26 L50 32" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M50 38 L50 44" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M98 50 L92 50" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M86 50 L80 50" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M74 50 L68 50" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M2 50 L8 50" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M14 50 L20 50" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M26 50 L32 50" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M50 98 L50 92" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M50 86 L50 80" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M50 74 L50 68" stroke="url(#grad1)" strokeWidth="1.5"/>
            {/* Croix traversantes */}
            <path d="M15 15 L22 22" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M28 28 L35 35" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M85 15 L78 22" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M72 28 L65 35" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M15 85 L22 78" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M28 72 L35 65" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M85 85 L78 78" stroke="url(#grad1)" strokeWidth="1.5"/>
            <path d="M72 72 L65 65" stroke="url(#grad1)" strokeWidth="1.5"/>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a5b4fc"/>
                <stop offset="50%" stopColor="#f0abfc"/>
                <stop offset="100%" stopColor="#fbbf24"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: '700',
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          La Bible du Vibe Coding
        </h1>
        <p style={{ 
          color: '#e0e7ff', 
          fontSize: 'clamp(18px, 2.5vw, 22px)',
          maxWidth: '850px',
          margin: '0 auto 20px',
          fontStyle: 'italic',
          lineHeight: '1.6',
          fontWeight: '400'
        }}>
          Le guide ultime du vibe coding : outils, modèles, workflows, tout ce que vous avez toujours voulu savoir sur le code sans oser le demander...
        </p>
        
        {/* Stats accrocheuses */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#a78bfa', fontSize: '28px', fontWeight: '700' }}>{stats.total}+</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Outils IA</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(251, 191, 36, 0.15)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#fbbf24', fontSize: '28px', fontWeight: '700' }}>50+</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Modèles LLM</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#10b981', fontSize: '28px', fontWeight: '700' }}>85+</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DevOps Tools</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(96, 165, 250, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#60a5fa', fontSize: '28px', fontWeight: '700' }}>50+</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ressources</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(244, 114, 182, 0.15)',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#f472b6', fontSize: '28px', fontWeight: '700' }}>10</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>VPS Providers</div>
          </div>
          <Link to="/a-propos" style={{
            backgroundColor: 'rgba(156, 163, 175, 0.15)',
            border: '1px solid rgba(156, 163, 175, 0.3)',
            borderRadius: '12px',
            padding: '12px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s'
          }}>
            <div style={{ color: '#9ca3af', fontSize: '28px', fontWeight: '700' }}>?</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>À propos</div>
          </Link>
        </div>

        {/* Tagline */}
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Du prompt à la production • Mis à jour Décembre 2025
        </p>
      </header>

      {/* Introduction Vibe Coding */}
      {activeSection === 'intro' && <VibeCodingIntro />}

      {/* Grille des 6 boutons de sections (onglets) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '12px',
        marginBottom: '32px'
      }}>
        {/* Bouton Vibe Coding Intro */}
        <button
          onClick={() => toggleSection('intro')}
          style={{
            background: activeSection === 'intro' 
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.35) 100%)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)',
            border: activeSection === 'intro' 
              ? '2px solid rgba(99, 102, 241, 0.8)'
              : '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '16px',
            padding: '16px 12px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            if (activeSection !== 'intro') {
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={e => {
            if (activeSection !== 'intro') {
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}>
            <Sparkles size={26} color="#a5b4fc" strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px', textAlign: 'center' }}>
            Vibe Coding ?
          </span>
          <span style={{ color: '#9ca3af', fontSize: '11px', textAlign: 'center' }}>
            Karpathy 2025
          </span>
        </button>

        {/* Bouton LLM */}
        <button
          onClick={() => {
            toggleSection('llm');
            setTimeout(() => {
              const el = document.getElementById('llm-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          style={{
            background: activeSection === 'llm'
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(249, 115, 22, 0.35) 100%)'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.15) 100%)',
            border: activeSection === 'llm'
              ? '2px solid rgba(239, 68, 68, 0.8)'
              : '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '16px 12px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            if (activeSection !== 'llm') {
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={e => {
            if (activeSection !== 'llm') {
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(249, 115, 22, 0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
          }}>
            <Rocket size={26} color="#fca5a5" strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px', textAlign: 'center' }}>
            Course des LLM
          </span>
          <span style={{ color: '#9ca3af', fontSize: '11px', textAlign: 'center' }}>
            {llmModels.length} modèles
          </span>
        </button>

        {/* Bouton GitHub */}
        <button
          onClick={() => {
            toggleSection('github');
            setTimeout(() => {
              const el = document.getElementById('github-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          style={{
            background: activeSection === 'github'
              ? 'linear-gradient(135deg, rgba(88, 166, 255, 0.3) 0%, rgba(35, 134, 54, 0.35) 100%)'
              : 'linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(35, 134, 54, 0.15) 100%)',
            border: activeSection === 'github'
              ? '2px solid rgba(88, 166, 255, 0.8)'
              : '1px solid rgba(88, 166, 255, 0.3)',
            borderRadius: '16px',
            padding: '16px 12px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            if (activeSection !== 'github') {
              e.currentTarget.style.borderColor = 'rgba(88, 166, 255, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={e => {
            if (activeSection !== 'github') {
              e.currentTarget.style.borderColor = 'rgba(88, 166, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.3) 0%, rgba(35, 134, 54, 0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(88, 166, 255, 0.3)'
          }}>
            <GitBranch size={26} color="#7dd3fc" strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '11px', textAlign: 'center' }}>
            GitHub et Open Source
          </span>
          <span style={{ color: '#9ca3af', fontSize: '10px', textAlign: 'center' }}>
            Stack & DevOps
          </span>
        </button>

        {/* Bouton Glossaire */}
        <button
          onClick={() => {
            toggleSection('glossary');
            setTimeout(() => {
              const el = document.getElementById('glossary-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          style={{
            background: activeSection === 'glossary'
              ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.35) 100%)'
              : 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.15) 100%)',
            border: activeSection === 'glossary'
              ? '2px solid rgba(251, 191, 36, 0.8)'
              : '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '16px',
            padding: '16px 12px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            if (activeSection !== 'glossary') {
              e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={e => {
            if (activeSection !== 'glossary') {
              e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
          }}>
            <BookOpen size={26} color="#fcd34d" strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>
            Ressources & Formations
          </span>
          <span style={{ color: '#9ca3af', fontSize: '11px', textAlign: 'center' }}>
            {glossary.length} termes
          </span>
        </button>

        {/* Bouton Benchmarks */}
        <button
          onClick={() => {
            toggleSection('benchmarks');
            setTimeout(() => {
              const el = document.getElementById('benchmarks-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          style={{
            background: activeSection === 'benchmarks'
              ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.35) 100%)'
              : 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)',
            border: activeSection === 'benchmarks'
              ? '2px solid rgba(168, 85, 247, 0.8)'
              : '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '16px',
            padding: '16px 12px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            if (activeSection !== 'benchmarks') {
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={e => {
            if (activeSection !== 'benchmarks') {
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
          }}>
            <BarChart3 size={26} color="#c4b5fd" strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px', textAlign: 'center' }}>
            Benchmarks
          </span>
          <span style={{ color: '#9ca3af', fontSize: '11px', textAlign: 'center' }}>
            Comparer LLM
          </span>
        </button>

        {/* Bouton Tools - Scrolle vers la section outils */}
        <button
          onClick={() => {
            setActiveSection(null);
            setTimeout(() => {
              const el = document.getElementById('tools-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.15) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '16px',
            padding: '16px 12px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.6)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(52, 211, 153, 0.4) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}>
            <Wrench size={26} color="#6ee7b7" strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px', textAlign: 'center' }}>
            Outils
          </span>
          <span style={{ color: '#9ca3af', fontSize: '11px', textAlign: 'center' }}>
            {stats.total} tools
          </span>
        </button>
      </div>

      {/* Section LLM */}
      {activeSection === 'llm' && <LLMSection />}

      {/* Modal LLM */}
      {selectedLLMModel && <LLMModal llm={selectedLLMModel} onClose={() => setSelectedLLMModel(null)} />}

      {/* Section Glossaire */}
      {activeSection === 'glossary' && (
        <div 
          id="glossary-section"
          style={{
            backgroundColor: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '20px',
            marginBottom: '32px',
            position: 'relative',
            minHeight: '85vh',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header sticky */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%)',
            backdropFilter: 'blur(10px)',
            padding: '24px 32px 16px',
            borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '20px 20px 0 0'
          }}>
            <button
              onClick={() => setActiveSection(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '18px',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 25
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BookOpen size={28} color="#fbbf24" /> Glossaire du Vibe Coding
            </h2>
            <p style={{ margin: '8px 0 0', color: '#9ca3af', fontSize: '14px' }}>
              {glossaryFilter === 'tous' 
                ? `${glossary.length} définitions pour comprendre l'écosystème IA et développement`
                : `${glossary.filter(item => item.category.toLowerCase() === glossaryFilter).length} définition(s) dans "${glossaryFilter}"`}
            </p>

            {/* Barre de recherche */}
            <div style={{ marginTop: '16px', marginBottom: '12px', position: 'relative' }}>
              <Search 
                size={18} 
                color="#6b7280" 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} 
              />
              <input
                type="text"
                placeholder="Rechercher un terme, concept, ressource..."
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 48px',
                  borderRadius: '12px',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  backgroundColor: 'rgba(251, 191, 36, 0.05)',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
              {glossarySearch && (
                <button
                  onClick={() => setGlossarySearch('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filtres par catégorie */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px', alignItems: 'center' }}>
              {['tous', 'concept', 'technologie', 'interface', 'développement', 'business', 'évaluation', 'licence', 'déploiement', 'formation'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setGlossaryFilter(cat)}
                  style={{
                    backgroundColor: glossaryFilter === cat ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255,255,255,0.1)',
                    color: glossaryFilter === cat ? '#fbbf24' : '#d1d5db',
                    border: glossaryFilter === cat ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid transparent',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
              
              {/* Bouton Reset */}
              {glossaryFilter !== 'tous' && (
                <button
                  onClick={() => setGlossaryFilter('tous')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#f87171',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s',
                    marginLeft: '8px'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                  }}
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Contenu scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 32px' }}>
            {/* Compteur */}
            <div style={{ marginBottom: '16px', color: '#9ca3af', fontSize: '14px' }}>
              {glossary.filter(item => {
                const matchCategory = glossaryFilter === 'tous' || item.category.toLowerCase() === glossaryFilter;
                const matchSearch = glossarySearch === '' || 
                  item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  item.examples.some(ex => ex.toLowerCase().includes(glossarySearch.toLowerCase()));
                return matchCategory && matchSearch;
              }).length} définition{glossary.filter(item => {
                const matchCategory = glossaryFilter === 'tous' || item.category.toLowerCase() === glossaryFilter;
                const matchSearch = glossarySearch === '' || 
                  item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  item.examples.some(ex => ex.toLowerCase().includes(glossarySearch.toLowerCase()));
                return matchCategory && matchSearch;
              }).length > 1 ? 's' : ''}
              {glossarySearch && <span style={{ color: '#fbbf24' }}> pour "{glossarySearch}"</span>}
            </div>
            
            {/* Grille des définitions */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              maxWidth: '1600px'
            }}>
              {glossary
                .filter(item => {
                  const matchCategory = glossaryFilter === 'tous' || item.category.toLowerCase() === glossaryFilter;
                  const matchSearch = glossarySearch === '' || 
                    item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                    item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                    item.examples.some(ex => ex.toLowerCase().includes(glossarySearch.toLowerCase()));
                  return matchCategory && matchSearch;
                })
                .map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGlossaryItem(item)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '20px',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '200px'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(251, 191, 36, 0.15)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Header avec emoji et badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ 
                        fontSize: '28px',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(251, 191, 36, 0.15)',
                        borderRadius: '12px'
                      }}>{item.emoji}</span>
                      <div>
                        <h3 style={{ margin: 0, color: '#fbbf24', fontSize: '16px', fontWeight: '700' }}>
                          {item.term}
                        </h3>
                        <span style={{
                          color: '#9ca3af',
                          fontSize: '11px',
                          textTransform: 'capitalize'
                        }}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          color: '#10b981',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={10} /> Lien
                      </a>
                    )}
                  </div>
                  
                  {/* Définition */}
                  <p style={{ 
                    color: '#d1d5db', 
                    lineHeight: '1.6', 
                    margin: '0 0 12px', 
                    fontSize: '13px',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.definition}
                  </p>

                  {/* Exemples */}
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#6b7280', fontSize: '11px' }}>Ex: </span>
                    <span style={{ color: '#a5b4fc', fontSize: '11px' }}>
                      {item.examples.slice(0, 2).join(' • ')}
                    </span>
                  </div>

                  {/* Tags related */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {item.related.slice(0, 3).map((rel, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: 'rgba(165, 180, 252, 0.1)',
                          color: '#a5b4fc',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '10px'
                        }}
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Définition */}
      {selectedGlossaryItem && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedGlossaryItem(null)}
        >
          <div 
            style={{
              backgroundColor: '#1a1a2e',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setSelectedGlossaryItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>

            {/* Header avec emoji */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <span style={{ 
                fontSize: '56px',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(251, 191, 36, 0.15)',
                borderRadius: '20px',
                border: '2px solid rgba(251, 191, 36, 0.3)'
              }}>
                {selectedGlossaryItem.emoji}
              </span>
              <div>
                <h2 style={{ margin: 0, color: '#fbbf24', fontSize: '28px', fontWeight: '700' }}>
                  {selectedGlossaryItem.term}
                </h2>
                <span style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  color: '#fcd34d',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  textTransform: 'capitalize'
                }}>
                  {selectedGlossaryItem.category}
                </span>
              </div>
            </div>

            {/* Définition complète */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              borderRadius: '16px', 
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ margin: '0 0 12px', color: '#e5e7eb', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Définition
              </h3>
              <p style={{ 
                color: '#f3f4f6', 
                lineHeight: '1.8', 
                margin: 0, 
                fontSize: '16px'
              }}>
                {selectedGlossaryItem.definition}
              </p>
            </div>

            {/* Exemples */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 12px', color: '#a5b4fc', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Exemples
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedGlossaryItem.examples.map((ex, i) => (
                  <div 
                    key={i}
                    style={{
                      backgroundColor: 'rgba(165, 180, 252, 0.1)',
                      border: '1px solid rgba(165, 180, 252, 0.2)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#c7d2fe',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ color: '#a5b4fc' }}>→</span>
                    {ex}
                  </div>
                ))}
              </div>
            </div>

            {/* Termes liés */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 12px', color: '#9ca3af', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Voir aussi
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedGlossaryItem.related.map((rel, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: 'rgba(107, 114, 128, 0.2)',
                      color: '#d1d5db',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      border: '1px solid rgba(107, 114, 128, 0.3)'
                    }}
                  >
                    {rel}
                  </span>
                ))}
              </div>
            </div>

            {/* Lien externe si disponible */}
            {selectedGlossaryItem.url && (
              <a
                href={selectedGlossaryItem.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '14px 20px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={18} />
                Accéder à la ressource
              </a>
            )}
          </div>
        </div>
      )}

      {/* Modal GitHub Item */}
      {selectedGitHubItem && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedGitHubItem(null)}
        >
          <div 
            style={{
              backgroundColor: '#1a1a2e',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '1px solid rgba(88, 166, 255, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header avec fermeture */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button 
                onClick={() => setSelectedGitHubItem(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Icône et Nom */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.2), rgba(139, 92, 246, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid rgba(88, 166, 255, 0.4)',
                fontSize: '48px'
              }}>
                {selectedGitHubItem.icon}
              </div>
              <h2 style={{ color: '#fff', fontSize: '28px', margin: '0 0 8px', fontWeight: '700' }}>
                {selectedGitHubItem.name}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {selectedGitHubItem.stars && selectedGitHubItem.stars !== 'N/A' && (
                  <span style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                    ⭐ {selectedGitHubItem.stars}
                  </span>
                )}
                {selectedGitHubItem.category && (
                  <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                    {selectedGitHubItem.category}
                  </span>
                )}
                {selectedGitHubItem.stack && (
                  <span style={{ backgroundColor: 'rgba(96, 165, 250, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                    {selectedGitHubItem.stack}
                  </span>
                )}
                {selectedGitHubItem.highlight && (
                  <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                    {selectedGitHubItem.highlight}
                  </span>
                )}
                {selectedGitHubItem.pricing && (
                  <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                    💰 {selectedGitHubItem.pricing}
                  </span>
                )}
                {selectedGitHubItem.location && (
                  <span style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                    📍 {selectedGitHubItem.location}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              borderRadius: '16px', 
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ margin: '0 0 12px', color: '#e5e7eb', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Description
              </h3>
              <p style={{ color: '#f3f4f6', lineHeight: '1.8', margin: 0, fontSize: '16px' }}>
                {selectedGitHubItem.description}
              </p>
            </div>

            {/* Features si disponibles */}
            {selectedGitHubItem.features && selectedGitHubItem.features.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px', color: '#a78bfa', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Fonctionnalités
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedGitHubItem.features.map((f, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.15)',
                      color: '#c4b5fd',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features si disponibles */}
            {selectedGitHubItem.keyFeatures && selectedGitHubItem.keyFeatures.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px', color: '#60a5fa', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Points Clés
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedGitHubItem.keyFeatures.map((f, i) => (
                    <div key={i} style={{
                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      color: '#93c5fd',
                      fontSize: '14px'
                    }}>
                      → {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories/Tags si disponibles */}
            {selectedGitHubItem.categories && selectedGitHubItem.categories.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px', color: '#fbbf24', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Catégories
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedGitHubItem.categories.map((cat, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(251, 191, 36, 0.1)',
                      color: '#fcd34d',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      border: '1px solid rgba(251, 191, 36, 0.2)'
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Servers MCP si disponibles */}
            {selectedGitHubItem.servers && selectedGitHubItem.servers.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px', color: '#22d3ee', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Serveurs Inclus
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedGitHubItem.servers.map((srv, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(34, 211, 238, 0.1)',
                      color: '#67e8f9',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      border: '1px solid rgba(34, 211, 238, 0.2)'
                    }}>
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lien externe */}
            {selectedGitHubItem.url && (
              <a
                href={selectedGitHubItem.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: 'rgba(88, 166, 255, 0.15)',
                  color: '#58a6ff',
                  borderRadius: '12px',
                  border: '1px solid rgba(88, 166, 255, 0.3)',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(88, 166, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(88, 166, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={18} />
                {selectedGitHubItem.url.includes('github.com') ? 'Voir sur GitHub' : 'Accéder au site'}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Section Benchmarks */}
      {activeSection === 'benchmarks' && (
        <div 
          id="benchmarks-section"
          style={{
            backgroundColor: 'rgba(168, 85, 247, 0.05)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '20px',
            marginBottom: '32px',
            position: 'relative',
            minHeight: '85vh',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header sticky */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%)',
            backdropFilter: 'blur(10px)',
            padding: '24px 32px 16px',
            borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '20px 20px 0 0'
          }}>
            <button
              onClick={() => setActiveSection(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '18px',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 25
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BarChart3 size={28} color="#a78bfa" /> Benchmarks LLM
            </h2>
            <p style={{ margin: '8px 0 0', color: '#9ca3af', fontSize: '14px' }}>
              Comparez les performances des modèles • Sources : Chatbot Arena, HuggingFace, Artificial Analysis
            </p>
          </div>

          {/* Contenu scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 32px' }}>
            
            {/* 1. PODIUM - Top 3 par catégorie */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#a78bfa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trophy size={20} color="#a78bfa" /> Podium par Catégorie
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {[
                  { cat: 'Code', icon: 'code', models: ['Claude 3.5 Sonnet', 'Qwen 2.5 Coder', 'GPT-4o'], scores: [93.7, 92.7, 90.2], colors: ['#cc785c', '#ff6a00', '#10a37f'] },
                  { cat: 'Raisonnement', icon: 'brain', models: ['Gemini 2.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o'], scores: [92, 90, 88], colors: ['#4285f4', '#cc785c', '#10a37f'] },
                  { cat: 'Créativité', icon: 'palette', models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 2.0 Pro'], scores: [95, 92, 85], colors: ['#cc785c', '#10a37f', '#4285f4'] },
                  { cat: 'Math', icon: 'calculator', models: ['Gemini 2.0 Pro', 'DeepSeek V3', 'GPT-4o'], scores: [80.2, 78.5, 76.6], colors: ['#4285f4', '#0066ff', '#10a37f'] }
                ].map((podium, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid rgba(168, 85, 247, 0.2)'
                  }}>
                    <h4 style={{ color: '#fff', margin: '0 0 16px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {podium.icon === 'code' && <Code size={16} color="#a78bfa" />}
                      {podium.icon === 'brain' && <Brain size={16} color="#a78bfa" />}
                      {podium.icon === 'palette' && <Palette size={16} color="#a78bfa" />}
                      {podium.icon === 'calculator' && <Calculator size={16} color="#a78bfa" />}
                      {podium.cat}
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px' }}>
                      {/* 2ème place */}
                      <div style={{ textAlign: 'center', flex: 1, maxWidth: '100px' }}>
                        <div style={{ 
                          backgroundColor: podium.colors[1] + '33',
                          borderRadius: '8px 8px 0 0',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTop: `3px solid ${podium.colors[1]}`
                        }}>
                          <span style={{ fontSize: '20px' }}>🥈</span>
                        </div>
                        <div style={{ fontSize: '10px', color: podium.colors[1], fontWeight: '600', marginTop: '8px', lineHeight: '1.3' }}>
                          {podium.models[1]}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>{podium.scores[1]}%</div>
                      </div>
                      {/* 1ère place */}
                      <div style={{ textAlign: 'center', flex: 1, maxWidth: '110px' }}>
                        <div style={{ 
                          backgroundColor: podium.colors[0] + '44',
                          borderRadius: '8px 8px 0 0',
                          height: '90px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTop: `3px solid ${podium.colors[0]}`,
                          boxShadow: `0 0 20px ${podium.colors[0]}44`
                        }}>
                          <span style={{ fontSize: '28px' }}>🥇</span>
                        </div>
                        <div style={{ fontSize: '11px', color: podium.colors[0], fontWeight: '700', marginTop: '8px', lineHeight: '1.3' }}>
                          {podium.models[0]}
                        </div>
                        <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>{podium.scores[0]}%</div>
                      </div>
                      {/* 3ème place */}
                      <div style={{ textAlign: 'center', flex: 1, maxWidth: '100px' }}>
                        <div style={{ 
                          backgroundColor: podium.colors[2] + '22',
                          borderRadius: '8px 8px 0 0',
                          height: '45px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTop: `3px solid ${podium.colors[2]}`
                        }}>
                          <span style={{ fontSize: '16px' }}>🥉</span>
                        </div>
                        <div style={{ fontSize: '10px', color: podium.colors[2], fontWeight: '600', marginTop: '8px', lineHeight: '1.3' }}>
                          {podium.models[2]}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>{podium.scores[2]}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CLASSEMENT ARENA ELO - Style leaderboard horizontal */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#a78bfa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={20} color="#a78bfa" /> Classement Arena ELO
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>• 5M+ votes humains sur lmarena.ai</span>
              </h3>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                {benchmarkData.arenaElo.slice(0, 10).map((item, idx) => {
                  const maxElo = benchmarkData.arenaElo[0].elo;
                  const minElo = 1250;
                  const barWidth = ((item.elo - minElo) / (maxElo - minElo)) * 100;
                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        padding: '12px 16px',
                        marginBottom: idx < 9 ? '8px' : 0,
                        backgroundColor: idx < 3 ? `${item.color}11` : 'transparent',
                        borderRadius: '12px',
                        border: idx < 3 ? `1px solid ${item.color}33` : '1px solid transparent',
                        transition: 'all 0.2s'
                      }}
                    >
                      {/* Rang avec médaille */}
                      <div style={{ 
                        width: '40px', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {idx < 3 ? (
                          <span style={{ fontSize: '24px' }}>{['🥇', '🥈', '🥉'][idx]}</span>
                        ) : (
                          <span style={{ 
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: '#9ca3af'
                          }}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      
                      {/* Logo company + Nom modèle */}
                      <div style={{ width: '180px' }}>
                        <div style={{ 
                          color: '#fff', 
                          fontWeight: '600', 
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: item.color
                          }} />
                          {item.model}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '11px', marginLeft: '16px' }}>{item.company}</div>
                      </div>
                      
                      {/* Barre de progression */}
                      <div style={{ flex: 1, position: 'relative' }}>
                        <div style={{ 
                          height: '24px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: `${barWidth}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${item.color}88 0%, ${item.color} 100%)`,
                            borderRadius: '12px',
                            transition: 'width 1s ease-out',
                            boxShadow: idx < 3 ? `0 0 20px ${item.color}44` : 'none'
                          }} />
                        </div>
                        {/* Indicateurs de référence */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          left: '0',
                          right: '0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0 8px',
                          pointerEvents: 'none'
                        }}>
                          {[1300, 1350].map(mark => (
                            <div 
                              key={mark}
                              style={{
                                position: 'absolute',
                                left: `${((mark - minElo) / (maxElo - minElo)) * 100}%`,
                                height: '24px',
                                borderLeft: '1px dashed rgba(255,255,255,0.2)'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Score ELO */}
                      <div style={{ 
                        width: '70px',
                        textAlign: 'right'
                      }}>
                        <span style={{ 
                          color: item.color, 
                          fontWeight: '700', 
                          fontSize: '18px'
                        }}>
                          {item.elo}
                        </span>
                        <div style={{ color: '#6b7280', fontSize: '10px' }}>ELO</div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Légende */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '24px', 
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '11px',
                  color: '#6b7280'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BarChart3 size={14} /> Comparaisons A/B anonymes
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <TrendingUp size={14} /> Plus le score est haut, mieux c'est
                  </span>
                </div>
              </div>
            </div>

            {/* 3. RADAR CHART - Comparaison multi-dimensions */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#a78bfa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Gauge size={20} color="#a78bfa" /> Comparaison Multi-Critères
              </h3>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                borderRadius: '16px', 
                padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden', 
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                {/* Légende */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', justifyContent: 'center' }}>
                  {benchmarkData.modelCapabilities.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: m.color }} />
                      <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>{m.model}</span>
                    </div>
                  ))}
                </div>
                
                {/* Barres groupées par critère */}
                <div style={{ display: 'grid', gap: '20px' }}>
                  {['code', 'raisonnement', 'créativité', 'math', 'multilingue', 'vitesse'].map(critere => (
                    <div key={critere}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        {critere === 'code' && <Code size={14} color="#a78bfa" />}
                        {critere === 'raisonnement' && <Brain size={14} color="#a78bfa" />}
                        {critere === 'créativité' && <Palette size={14} color="#a78bfa" />}
                        {critere === 'math' && <Calculator size={14} color="#a78bfa" />}
                        {critere === 'multilingue' && <Languages size={14} color="#a78bfa" />}
                        {critere === 'vitesse' && <Zap size={14} color="#a78bfa" />}
                        <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>
                          {critere === 'code' ? 'Code (HumanEval)' : 
                           critere === 'raisonnement' ? 'Raisonnement (GPQA)' :
                           critere === 'créativité' ? 'Créativité' :
                           critere === 'math' ? 'Math (MATH)' :
                           critere === 'multilingue' ? 'Multilingue (MGSM)' : 'Vitesse (t/s)'}
                        </span>
                      </div>
                      {/* Barres horizontales pour chaque modèle */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {benchmarkData.modelCapabilities.map((m, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              width: '80px', 
                              fontSize: '10px', 
                              color: m.color,
                              fontWeight: '500',
                              textAlign: 'right'
                            }}>
                              {m.model.split(' ').slice(-1)[0]}
                            </div>
                            <div style={{ 
                              flex: 1, 
                              height: '18px', 
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              position: 'relative'
                            }}>
                              <div style={{
                                width: `${m.scores[critere]}%`,
                                height: '100%',
                                backgroundColor: m.color,
                                borderRadius: '4px',
                                transition: 'width 0.8s ease-out',
                                boxShadow: `0 0 10px ${m.color}44`
                              }} />
                            </div>
                            <span style={{ 
                              fontSize: '11px', 
                              color: '#fff', 
                              fontWeight: '600',
                              minWidth: '35px'
                            }}>
                              {m.scores[critere]}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. FACE-À-FACE - Comparateur */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#a78bfa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={20} color="#a78bfa" /> Face-à-Face : Claude vs GPT-4o vs Gemini
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '16px',
                backgroundColor: 'rgba(255,255,255,0.03)', 
                borderRadius: '16px', 
                padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden', 
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                {[
                  { model: 'Claude 3.5 Sonnet', company: 'Anthropic', color: '#cc785c', stats: { code: 93.7, math: 71.1, raisonnement: 90, prix: '$$', vitesse: '82 t/s' }},
                  { model: 'GPT-4o', company: 'OpenAI', color: '#10a37f', stats: { code: 90.2, math: 76.6, raisonnement: 88, prix: '$$', vitesse: '75 t/s' }},
                  { model: 'Gemini 2.0 Pro', company: 'Google', color: '#4285f4', stats: { code: 85.0, math: 80.2, raisonnement: 92, prix: '$', vitesse: '88 t/s' }}
                ].map((m, idx) => (
                  <div key={idx} style={{
                    backgroundColor: `${m.color}11`,
                    borderRadius: '12px',
                    padding: '20px',
                    border: `1px solid ${m.color}44`,
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: m.color,
                      margin: '0 auto 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Cpu size={20} color="#fff" />
                    </div>
                    <h4 style={{ color: m.color, margin: '0 0 4px', fontSize: '16px' }}>{m.model}</h4>
                    <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '16px' }}>{m.company}</div>
                    
                    <div style={{ textAlign: 'left', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={12} /> Code</span>
                        <span style={{ color: m.stats.code >= 92 ? '#10b981' : '#fff', fontWeight: '600' }}>{m.stats.code}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Calculator size={12} /> Math</span>
                        <span style={{ color: m.stats.math >= 78 ? '#10b981' : '#fff', fontWeight: '600' }}>{m.stats.math}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Brain size={12} /> Raison.</span>
                        <span style={{ color: m.stats.raisonnement >= 90 ? '#10b981' : '#fff', fontWeight: '600' }}>{m.stats.raisonnement}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={12} /> Prix</span>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{m.stats.prix}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                        <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={12} /> Vitesse</span>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{m.stats.vitesse}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. RAPPORT QUALITÉ/PRIX */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#a78bfa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={20} color="#a78bfa" /> Rapport Qualité / Prix
              </h3>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                borderRadius: '16px', 
                padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden', 
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', color: '#9ca3af' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} /> Moins cher</span>
                  <span>Prix ($/1M tokens output)</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Plus cher <Award size={12} /></span>
                </div>
                <div style={{ position: 'relative', height: '200px', marginBottom: '16px' }}>
                  {/* Grille de fond */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {[100, 80, 60].map(val => (
                      <div key={val} style={{ borderBottom: '1px dashed rgba(255,255,255,0.1)', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '-30px', fontSize: '10px', color: '#6b7280' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  {/* Points */}
                  {benchmarkData.pricing.map((item, idx) => {
                    const x = Math.min((Math.log10(item.output + 0.1) + 1) * 25, 95);
                    const y = 100 - item.quality;
                    return (
                      <div
                        key={idx}
                        style={{
                          position: 'absolute',
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: item.color + '44',
                          border: `2px solid ${item.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          zIndex: 10
                        }}
                        title={`${item.model}: $${item.output}/1M tokens, Qualité: ${item.quality}%`}
                      >
                        <span style={{ fontSize: '10px', color: '#fff', fontWeight: '700' }}>
                          {item.model.split(' ').slice(-1)[0].substring(0, 3)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Légende */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', fontSize: '11px' }}>
                  {benchmarkData.pricing.slice(0, 6).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                      <span style={{ color: '#9ca3af' }}>{item.model}</span>
                      <span style={{ color: item.color }}>${item.output}</span>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Trophy size={16} color="#10b981" />
                  <span style={{ color: '#10b981', fontSize: '13px' }}>
                    Meilleur rapport Q/P : <strong>DeepSeek V3</strong> ($1.10/1M) et <strong>Gemini 1.5 Flash</strong> ($0.30/1M)
                  </span>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div style={{ 
              fontSize: '11px', 
              color: '#6b7280', 
              textAlign: 'center',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexWrap: 'wrap'
            }}>
              <ExternalLink size={12} /> Sources : <a href="https://lmarena.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}>Chatbot Arena</a> • 
              <a href="https://artificialanalysis.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}> Artificial Analysis</a> • 
              <a href="https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}> HuggingFace</a> •
              Données décembre 2025
            </div>
          </div>
        </div>
      )}

      {/* Section GitHub */}
      {activeSection === 'github' && (
        <div 
          id="github-section"
          style={{
            backgroundColor: 'rgba(88, 166, 255, 0.05)',
            border: '1px solid rgba(88, 166, 255, 0.2)',
            borderRadius: '20px',
            marginBottom: '32px',
            position: 'relative',
            minHeight: '85vh',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header sticky */}
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%)',
            backdropFilter: 'blur(10px)',
            padding: '24px 32px 16px',
            borderBottom: '1px solid rgba(88, 166, 255, 0.2)',
            borderRadius: '20px 20px 0 0'
          }}>
            <button
              onClick={() => setActiveSection(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '18px',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 25
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>
            <h2 style={{ margin: 0, color: '#fff', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <GitBranch size={28} color="#58a6ff" /> GitHub & Open Source
            </h2>
            <p style={{ margin: '8px 0 16px', color: '#9ca3af', fontSize: '14px' }}>
              Frameworks, serveurs MCP, Awesome Lists et projets open source pour le vibe coding
            </p>
            
            {/* Barre de recherche */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <Search 
                size={18} 
                color="#6b7280" 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }} 
              />
              <input
                type="text"
                placeholder="Rechercher une techno, framework, outil..."
                value={githubSearch}
                onChange={e => setGithubSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 48px',
                  borderRadius: '12px',
                  border: '1px solid rgba(88, 166, 255, 0.3)',
                  backgroundColor: 'rgba(88, 166, 255, 0.05)',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
              {githubSearch && (
                <button
                  onClick={() => setGithubSearch('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Filtres par catégorie */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              {[
                { id: 'tous', label: 'Tous', icon: '📚', color: '#6b7280' },
                { id: 'languages', label: 'Langages', icon: '💻', color: '#f472b6' },
                { id: 'frontend', label: 'Frameworks Frontend', icon: '⚛️', color: '#60a5fa' },
                { id: 'ui', label: 'UI & Styling', icon: '🎨', color: '#a78bfa' },
                { id: 'packages', label: 'Package Managers', icon: '📦', color: '#f97316' },
                { id: 'databases', label: 'Bases de données', icon: '🗄️', color: '#22c55e' },
                { id: 'deployment', label: 'Déploiement', icon: '🚀', color: '#06b6d4' },
                { id: 'tooling', label: 'Tooling & DevX', icon: '🔧', color: '#8b5cf6' },
                { id: 'devops', label: 'DevOps', icon: '⚙️', color: '#f97316' },
                { id: 'paas', label: 'Self-Hosted PaaS', icon: '☁️', color: '#10b981' },
                { id: 'vps', label: 'VPS', icon: '🖥️', color: '#3b82f6' },
                { id: 'awesome', label: 'Awesome Lists', icon: '⭐', color: '#58a6ff' },
                { id: 'framework', label: 'Frameworks IA', icon: '🤖', color: '#10b981' },
                { id: 'mcp', label: 'MCP Servers', icon: '🔌', color: '#a855f7' },
                { id: 'standard', label: 'Standards', icon: '📋', color: '#f59e0b' },
                { id: 'top', label: 'Top Stars', icon: '🏆', color: '#facc15' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setGithubFilter(cat.id)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    border: githubFilter === cat.id ? `2px solid ${cat.color}` : '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: githubFilter === cat.id ? `${cat.color}33` : 'rgba(255,255,255,0.05)',
                    color: githubFilter === cat.id ? cat.color : '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: githubFilter === cat.id ? '600' : '400',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
              {githubFilter !== 'tous' && (
                <button
                  onClick={() => setGithubFilter('tous')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Contenu scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 32px' }}>
            
            {/* Langages */}
            {(githubFilter === 'tous' || githubFilter === 'languages') && githubResources.stack.languages.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#f472b6', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  💻 Langages de Programmation
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.languages.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.languages.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item, itemType: 'language'})}
                      style={{
                        backgroundColor: 'rgba(244, 114, 182, 0.08)',
                        border: '1px solid rgba(244, 114, 182, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#f472b6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(244, 114, 182, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        {item.stars !== 'N/A' && <span style={{ color: '#fbbf24', fontSize: '11px' }}>⭐ {item.stars}</span>}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frameworks Frontend */}
            {(githubFilter === 'tous' || githubFilter === 'frontend') && githubResources.stack.frontendFrameworks.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#60a5fa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  ⚛️ Frameworks Frontend
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.frontendFrameworks.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.frontendFrameworks.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item, itemType: 'frontend'})}
                      style={{
                        backgroundColor: 'rgba(96, 165, 250, 0.08)',
                        border: '1px solid rgba(96, 165, 250, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#60a5fa'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(96, 165, 250, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        <span style={{ color: '#fbbf24', fontSize: '11px' }}>⭐ {item.stars}</span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UI & Styling */}
            {(githubFilter === 'tous' || githubFilter === 'ui') && githubResources.stack.uiLibraries.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#a78bfa', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🎨 UI & Styling
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.uiLibraries.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.uiLibraries.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(167, 139, 250, 0.08)',
                        border: '1px solid rgba(167, 139, 250, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#a78bfa'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(167, 139, 250, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        <span style={{ color: '#fbbf24', fontSize: '11px' }}>⭐ {item.stars}</span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Package Managers */}
            {(githubFilter === 'tous' || githubFilter === 'packages') && githubResources.stack.packageManagers.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#f97316', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  📦 Package Managers
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.packageManagers.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.packageManagers.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(249, 115, 22, 0.08)',
                        border: '1px solid rgba(249, 115, 22, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        {item.speed && <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>{item.speed}</span>}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bases de données & ORM */}
            {(githubFilter === 'tous' || githubFilter === 'databases') && githubResources.stack.databases.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#22c55e', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🗄️ Bases de Données & ORM
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.databases.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.databases.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        {item.type && <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>{item.type}</span>}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Déploiement & Hosting */}
            {(githubFilter === 'tous' || githubFilter === 'deployment') && githubResources.stack.deployment.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#06b6d4', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🚀 Déploiement & Hosting
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.deployment.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.deployment.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.08)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#06b6d4'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        {item.pricing && <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>{item.pricing}</span>}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tooling & DevX */}
            {(githubFilter === 'tous' || githubFilter === 'tooling') && githubResources.stack.tooling.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#8b5cf6', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🔧 Tooling & DevX
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.tooling.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.tooling.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(139, 92, 246, 0.08)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        {item.category && <span style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>{item.category}</span>}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DevOps & Infrastructure */}
            {(githubFilter === 'tous' || githubFilter === 'devops') && githubResources.stack.devops.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
              (item.category && item.category.toLowerCase().includes(githubSearch.toLowerCase()))
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#f97316', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  ⚙️ DevOps & Infrastructure
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.devops.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      (item.category && item.category.toLowerCase().includes(githubSearch.toLowerCase()))
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.devops.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    (item.category && item.category.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(249, 115, 22, 0.08)',
                        border: '1px solid rgba(249, 115, 22, 0.2)',
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.name}</span>
                        {item.category && <span style={{ backgroundColor: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>{item.category}</span>}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Self-Hosted PaaS */}
            {(githubFilter === 'tous' || githubFilter === 'paas') && githubResources.stack.selfHostedPaas.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#10b981', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  ☁️ Self-Hosted PaaS (Alternative Vercel/Heroku)
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.selfHostedPaas.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.selfHostedPaas.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{item.icon}</span>
                        <div>
                          <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px', display: 'block' }}>{item.name}</span>
                          {item.stars && <span style={{ color: '#fbbf24', fontSize: '11px' }}>⭐ {item.stars}</span>}
                        </div>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 10px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {item.features && item.features.slice(0, 4).map((f, i) => (
                          <span key={i} style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>{f}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fournisseurs VPS */}
            {(githubFilter === 'tous' || githubFilter === 'vps') && githubResources.stack.vpsProviders.filter(item => 
              githubSearch === '' || 
              item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
              item.location.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#3b82f6', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🖥️ Fournisseurs VPS
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>
                    ({githubResources.stack.vpsProviders.filter(item => 
                      githubSearch === '' || 
                      item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                      item.location.toLowerCase().includes(githubSearch.toLowerCase())
                    ).length})
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                  {githubResources.stack.vpsProviders.filter(item => 
                    githubSearch === '' || 
                    item.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    item.location.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedGitHubItem({...item})}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.2)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '24px' }}>{item.icon}</span>
                          <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>{item.name}</span>
                        </div>
                        <span style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: '8px', fontSize: '11px' }}>{item.highlight}</span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 10px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>{item.pricing}</span>
                        <span style={{ color: '#6b7280', fontSize: '11px' }}>📍 {item.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awesome Lists */}
            {(githubFilter === 'tous' || githubFilter === 'awesome') && githubResources.awesomeLists.filter(list => 
              githubSearch === '' || 
              list.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              list.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
              list.categories.some(c => c.toLowerCase().includes(githubSearch.toLowerCase()))
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#58a6ff', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FolderGit2 size={20} color="#58a6ff" /> Awesome Lists Curatées
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>({githubResources.awesomeLists.filter(list => 
                    githubSearch === '' || 
                    list.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    list.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    list.categories.some(c => c.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).length})</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                  {githubResources.awesomeLists.filter(list => 
                    githubSearch === '' || 
                    list.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    list.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    list.categories.some(c => c.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).map(list => (
                    <div
                      key={list.id}
                      onClick={() => setSelectedGitHubItem({...list, icon: '📚', stars: list.stars})}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.borderColor = '#58a6ff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(88, 166, 255, 0.2)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{list.name}</h4>
                        <span style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', color: '#facc15', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={12} /> {list.stars}
                        </span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{list.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {list.categories.slice(0, 4).map((cat, idx) => (
                          <span key={idx} style={{
                            backgroundColor: 'rgba(88, 166, 255, 0.2)',
                            color: '#58a6ff',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}>
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '12px' }}>
                        by @{list.author} • {list.contributors} contributeurs
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frameworks */}
            {(githubFilter === 'tous' || githubFilter === 'framework') && githubResources.frameworks.filter(fw => 
              githubSearch === '' || 
              fw.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              fw.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
              fw.categories.some(c => c.toLowerCase().includes(githubSearch.toLowerCase()))
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#10b981', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Package size={20} color="#10b981" /> Frameworks & SDKs
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>({githubResources.frameworks.filter(fw => 
                    githubSearch === '' || 
                    fw.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    fw.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    fw.categories.some(c => c.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).length})</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                  {githubResources.frameworks.filter(fw => 
                    githubSearch === '' || 
                    fw.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    fw.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    fw.categories.some(c => c.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).map(fw => (
                    <div
                      key={fw.id}
                      onClick={() => setSelectedGitHubItem({...fw, icon: '🤖', stars: fw.stars, categories: fw.categories})}
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.borderColor = '#10b981';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.2)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{fw.name}</h4>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', padding: '2px 8px', borderRadius: '8px', fontSize: '11px' }}>
                            {fw.language}
                          </span>
                          <span style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', color: '#facc15', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={12} /> {fw.stars}
                          </span>
                        </div>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{fw.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {fw.categories.slice(0, 4).map((cat, idx) => (
                          <span key={idx} style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            color: '#10b981',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}>
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '12px' }}>
                        by @{fw.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MCP Servers */}
            {(githubFilter === 'tous' || githubFilter === 'mcp') && githubResources.mcpServers.filter(mcp => 
              githubSearch === '' || 
              mcp.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              mcp.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
              mcp.servers.some(s => s.toLowerCase().includes(githubSearch.toLowerCase()))
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#a855f7', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Plug size={20} color="#a855f7" /> Serveurs MCP (Model Context Protocol)
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>({githubResources.mcpServers.filter(mcp => 
                    githubSearch === '' || 
                    mcp.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    mcp.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    mcp.servers.some(s => s.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).length})</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                  {githubResources.mcpServers.filter(mcp => 
                    githubSearch === '' || 
                    mcp.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    mcp.description.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    mcp.servers.some(s => s.toLowerCase().includes(githubSearch.toLowerCase()))
                  ).map(mcp => (
                    <div
                      key={mcp.id}
                      onClick={() => setSelectedGitHubItem({...mcp, icon: '🔌', stars: mcp.stars, servers: mcp.servers})}
                      style={{
                        backgroundColor: 'rgba(168, 85, 247, 0.08)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.borderColor = '#a855f7';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 85, 247, 0.2)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{mcp.name}</h4>
                        <span style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', color: '#facc15', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={12} /> {mcp.stars}
                        </span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{mcp.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {mcp.servers.slice(0, 5).map((srv, idx) => (
                          <span key={idx} style={{
                            backgroundColor: 'rgba(168, 85, 247, 0.2)',
                            color: '#a855f7',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}>
                            {srv}
                          </span>
                        ))}
                        {mcp.servers.length > 5 && <span style={{ color: '#6b7280', fontSize: '11px' }}>+{mcp.servers.length - 5}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Open Source par Stars */}
            {(githubFilter === 'tous' || githubFilter === 'top') && githubResources.openSourceStars.filter(project => 
              githubSearch === '' || 
              project.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              project.category.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#facc15', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Trophy size={20} color="#facc15" /> Top Open Source par Stars
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>({githubResources.openSourceStars.filter(project => 
                    githubSearch === '' || 
                    project.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    project.category.toLowerCase().includes(githubSearch.toLowerCase())
                  ).length})</span>
                </h3>
                <div style={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden'
                }}>
                  {githubResources.openSourceStars.filter(project => 
                    githubSearch === '' || 
                    project.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    project.category.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map((project, idx, arr) => (
                    <div
                      key={project.name}
                      onClick={() => setSelectedGitHubItem({...project, icon: '⭐', stars: project.stars, category: project.category})}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 20px',
                        borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ 
                          color: idx < 3 ? '#facc15' : '#6b7280', 
                          fontSize: '14px', 
                          fontWeight: '700',
                          width: '24px'
                        }}>
                          #{idx + 1}
                        </span>
                        <div>
                          <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>{project.name}</span>
                          <span style={{ 
                            marginLeft: '10px',
                            backgroundColor: 'rgba(88, 166, 255, 0.2)',
                            color: '#58a6ff',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}>
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#6b7280', fontSize: '12px' }}>{project.license}</span>
                        <span style={{ 
                          backgroundColor: 'rgba(250, 204, 21, 0.2)', 
                          color: '#facc15', 
                          padding: '4px 10px', 
                          borderRadius: '12px', 
                          fontSize: '13px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Star size={14} /> {project.stars}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topics GitHub */}
            {(githubFilter === 'tous') && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#f97316', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Hash size={20} color="#f97316" /> Topics GitHub Populaires
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {githubResources.topicsGitHub.map((topic, idx) => (
                    <a
                      key={idx}
                      href={`https://github.com/topics/${topic.tag.replace('#', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        borderRadius: '20px',
                        padding: '10px 18px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.borderColor = '#f97316';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={{ color: '#f97316', fontWeight: '600', fontSize: '14px' }}>{topic.tag}</span>
                      <span style={{ color: '#6b7280', fontSize: '11px' }}>{topic.repos} repos</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Standards */}
            {(githubFilter === 'tous' || githubFilter === 'standard') && githubResources.standards.filter(standard => 
              githubSearch === '' || 
              standard.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
              standard.description.toLowerCase().includes(githubSearch.toLowerCase())
            ).length > 0 && (
              <div>
                <h3 style={{ color: '#34d399', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileCode size={20} color="#34d399" /> Standards & Spécifications
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400' }}>({githubResources.standards.filter(standard => 
                    githubSearch === '' || 
                    standard.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    standard.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).length})</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {githubResources.standards.filter(standard => 
                    githubSearch === '' || 
                    standard.name.toLowerCase().includes(githubSearch.toLowerCase()) ||
                    standard.description.toLowerCase().includes(githubSearch.toLowerCase())
                  ).map(standard => (
                    <a
                      key={standard.id}
                      href={standard.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: 'rgba(52, 211, 153, 0.1)',
                        border: '1px solid rgba(52, 211, 153, 0.3)',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#34d399'}
                      onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{standard.name}</h4>
                        <span style={{
                          backgroundColor: standard.status === 'Standard' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                          color: standard.status === 'Standard' ? '#34d399' : '#fbbf24',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          fontSize: '11px'
                        }}>
                          {standard.status}
                        </span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>{standard.description}</p>
                      </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section Outils - Affichée seulement quand aucune autre section n'est ouverte */}
      {!activeSection && (
        <div style={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        {/* Section Outils - Barre de filtres STICKY */}
        <div 
          id="tools-section"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: 'rgba(15, 15, 35, 0.98)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          {/* Recherche */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <Search 
              size={18} 
              color="#6b7280" 
              style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              placeholder="Rechercher un outil, fondateur, entreprise..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 48px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none'
              }}
            />
        </div>

        {/* Filtres */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Catégorie */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: `1px solid ${categories[selectedCategory]?.color || 'rgba(255,255,255,0.2)'}`,
              backgroundColor: '#1a1a2e',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px'
            }}
          >
            {Object.entries(categories).map(([key, val]) => (
              <option key={key} value={key} style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>{val.label}</option>
            ))}
          </select>

          {/* Tier */}
          <select
            value={selectedTier}
            onChange={e => setSelectedTier(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: `1px solid ${tiers[selectedTier]?.color || 'rgba(255,255,255,0.2)'}`,
              backgroundColor: '#1a1a2e',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px'
            }}
          >
            {Object.entries(tiers).map(([key, val]) => (
              <option key={key} value={key} style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>{val.label}</option>
            ))}
          </select>

          {/* Pays */}
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: '#1a1a2e',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px'
            }}
          >
            {Object.entries(countries).map(([key, val]) => (
              <option key={key} value={key} style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>{val.flag} {val.label}</option>
            ))}
          </select>

          {/* Année */}
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: '#1a1a2e',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px'
            }}
          >
            <option value="all" style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>Année</option>
            {years.filter(y => y !== 'all').map(year => (
              <option key={year} value={year} style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>{year}</option>
            ))}
          </select>

          {/* Bouton Reset */}
          {(selectedCategory !== 'all' || selectedTier !== 'all' || selectedCountry !== 'all' || selectedYear !== 'all' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTier('all');
                setSelectedCountry('all');
                setSelectedYear('all');
                setSearchTerm('');
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}

          {/* Séparateur */}
          <div style={{ flex: 1 }} />

          {/* Boutons vue */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '4px' }}>
            {[
              { mode: 'grid', label: 'Grille' },
              { mode: 'timeline', label: 'Timeline' }
            ].map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: viewMode === mode ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                  color: viewMode === mode ? '#a5b4fc' : '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
              >
                {mode === 'grid' ? <Grid3X3 size={14} /> : <LayoutList size={14} />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Résultats */}
        <div style={{ marginTop: '16px', color: '#9ca3af', fontSize: '14px' }}>
          {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} trouvé{filteredTools.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Contenu principal */}
      {viewMode === 'timeline' ? (
        <div style={{ flex: 1 }}>
          <TimelineView />
        </div>
      ) : (
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
        </div>
      )}

      {/* Modal détails */}
      {selectedTool && <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}

      {/* Footer */}
      <footer style={{
        marginTop: '60px',
        padding: '24px',
      maxWidth: '100vw',
      overflowX: 'hidden',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="#6b7280" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="50" r="36" stroke="#6b7280" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="50" r="26" stroke="#6b7280" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="50" r="16" stroke="#6b7280" strokeWidth="3" fill="none"/>
            <circle cx="50" cy="50" r="6" fill="#6b7280"/>
            <path d="M50 4 L50 14" stroke="#6b7280" strokeWidth="3"/>
            <path d="M50 24 L50 34" stroke="#6b7280" strokeWidth="3"/>
            <path d="M96 50 L86 50" stroke="#6b7280" strokeWidth="3"/>
            <path d="M76 50 L66 50" stroke="#6b7280" strokeWidth="3"/>
            <path d="M4 50 L14 50" stroke="#6b7280" strokeWidth="3"/>
            <path d="M24 50 L34 50" stroke="#6b7280" strokeWidth="3"/>
            <path d="M50 96 L50 86" stroke="#6b7280" strokeWidth="3"/>
            <path d="M50 76 L50 66" stroke="#6b7280" strokeWidth="3"/>
          </svg>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            La Bible du Vibe Coding — Décembre 2025
          </p>
        </div>
        <p style={{ color: '#4b5563', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Sur une idée de Marc Tallec - <a href="https://ooblik.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', textDecoration: 'none' }}>OOBLIK</a> • codé avec 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ec4899" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          par Claude Code
        </p>
        <Link to="/a-propos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: '#9ca3af', textDecoration: 'none', fontSize: '13px', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(156, 163, 175, 0.3)', backgroundColor: 'rgba(156, 163, 175, 0.1)' }}>
          <Info size={14} />
          À propos
        </Link>
      </footer>
    </div>
  );
};



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VibeCodingEncyclopedia />} />
      <Route path="/a-propos" element={<About />} />
    </Routes>
  );
};

export { App as default };
