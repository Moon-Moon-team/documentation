# Documentation Shopify - Moon Moon

Ce projet contient la documentation technique pour les développements Shopify, construite avec [Nextra](https://nextra.site).

## 📋 Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Développement local](#développement-local)
- [Structure du projet](#structure-du-projet)
- [Comment faire des modifications](#comment-faire-des-modifications)
- [Commandes disponibles](#commandes-disponibles)
- [Dépannage](#dépannage)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 16.13 ou supérieure
- **pnpm** (gestionnaire de paquets)

### Vérifier Node.js

Pour vérifier votre version de Node.js, exécutez :

```bash
node -v
```

Si vous n'avez pas Node.js installé, téléchargez-le depuis [nodejs.org](https://nodejs.org/).

## Installation

### Étape 1 : Cloner le repository

```bash
git clone https://github.com/Moon-Moon-team/documentation.git
cd documentation
```

### Étape 2 : Installer pnpm (si nécessaire)

Si vous obtenez l'erreur `zsh: command not found: pnpm` lors de l'installation :

1. Vérifiez que Node.js est installé (version 16.13 ou supérieure) :
   ```bash
   node -v
   ```

2. Activez Corepack (inclus avec Node.js 16.13+) :
   ```bash
   corepack enable
   ```

3. Installez pnpm via Corepack :
   ```bash
   corepack prepare pnpm@latest --activate
   ```

4. Vérifiez l'installation :
   ```bash
   pnpm -v
   ```

### Étape 3 : Installer les dépendances

Une fois pnpm installé, installez les dépendances du projet :

```bash
pnpm install
```

Cette commande va installer toutes les dépendances nécessaires listées dans `package.json`.

## Développement local

### Démarrer le serveur de développement

Pour lancer le serveur de développement et voir vos modifications en temps réel :

```bash
pnpm dev
```

Le site sera accessible à l'adresse : **http://localhost:3000**

Le serveur de développement supporte le rechargement automatique (hot reload), donc toute modification dans les fichiers sera automatiquement reflétée dans le navigateur.

### Arrêter le serveur

Pour arrêter le serveur, utilisez `Ctrl + C` dans le terminal.

## Structure du projet

```
documentation/
├── pages/              # Pages de documentation (fichiers .mdx)
│   ├── Apps/          # Documentation des applications
│   ├── Installations/ # Guides d'installation
│   ├── Liquid/        # Documentation Liquid
│   ├── Markdown/      # Documentation Markdown
│   ├── Script_JS/     # Scripts JavaScript
│   ├── Sections/      # Sections Shopify
│   ├── Splide/        # Documentation Splide
│   └── Tutos/         # Tutoriels
├── components/        # Composants React réutilisables
├── theme.config.tsx   # Configuration du thème Nextra
├── next.config.js     # Configuration Next.js
└── package.json       # Dépendances et scripts
```

## Comment faire des modifications

### Ajouter une nouvelle page de documentation

1. **Créer un fichier `.mdx`** dans le dossier approprié sous `pages/` :
   ```bash
   # Exemple : créer une nouvelle page dans Liquid/
   touch pages/Liquid/nouvelle_page.mdx
   ```

2. **Ajouter le fichier au menu** en modifiant `_meta.json` dans le dossier parent :
   ```json
   {
     "nouvelle_page": "Titre de la page"
   }
   ```

3. **Écrire le contenu** en utilisant la syntaxe Markdown et MDX :
   ```mdx
   # Titre de la page

   Contenu de votre documentation...

   ## Sous-section

   Plus de contenu...
   ```

### Modifier une page existante

1. Ouvrez le fichier `.mdx` correspondant dans `pages/`
2. Modifiez le contenu selon vos besoins
3. Sauvegardez le fichier
4. Les modifications apparaîtront automatiquement dans le navigateur (si le serveur de développement est actif)

### Ajouter un nouveau composant

1. Créez votre composant dans `components/` :
   ```bash
   touch components/mon_composant.tsx
   ```

2. Importez et utilisez-le dans vos pages `.mdx` :
   ```mdx
   import MonComposant from '../components/mon_composant'

   <MonComposant />
   ```

### Modifier la configuration du thème

Le fichier `theme.config.tsx` contient la configuration du thème Nextra. Vous pouvez modifier :

- Le logo
- Les liens du projet
- Le footer
- Et d'autres options de personnalisation

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Démarre le serveur de développement sur http://localhost:3000 |
| `pnpm build` | Construit la version de production du site |
| `pnpm start` | Démarre le serveur de production (après `pnpm build`) |

## Dépannage

### Erreur "command not found: pnpm"

Voir la section [Installation - Étape 2](#étape-2--installer-pnpm-si-nécessaire).

### Erreur lors de l'installation des dépendances

1. Supprimez le dossier `node_modules` et le fichier `pnpm-lock.yaml` :
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   ```

2. Réinstallez les dépendances :
   ```bash
   pnpm install
   ```

### Le serveur ne démarre pas

1. Vérifiez qu'aucun autre processus n'utilise le port 3000
2. Essayez de changer le port :
   ```bash
   pnpm dev -- -p 3001
   ```

### Les modifications ne s'affichent pas

1. Vérifiez que le serveur de développement est bien démarré
2. Rafraîchissez la page dans le navigateur (Ctrl+R ou Cmd+R)
3. Vérifiez la console du navigateur pour d'éventuelles erreurs

## License

Ce projet est sous licence MIT.
