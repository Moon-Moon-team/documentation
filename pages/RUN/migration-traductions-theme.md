# Migrer les traductions de contenu de thème vers un nouveau thème

***

Procédure à suivre quand un nouveau thème (refonte, duplication) doit reprendre les traductions faites via Translate & Adapt sur l'ancien thème, sur la même boutique.

## Pourquoi ça arrive

Translate & Adapt stocke deux types de traductions très différents :

- Les **traductions de contenu boutique** (produits, pages, collections, articles de blog, metafields, politiques...). Elles sont rattachées à la ressource elle-même, pas au thème. Elles s'appliquent automatiquement au nouveau thème, aucune action nécessaire.
- Les **traductions de contenu de thème** (logo, favicon, textes de sections et blocs du personnalisateur, réglages généraux). Elles sont rattachées à l'ID numérique du thème. Changer de thème, même sur la même boutique, casse ce lien : il faut les reporter manuellement.

C'est ce deuxième type qui pose problème à chaque nouveau thème.

## Pré-requis

- Accès admin à la boutique Shopify
- L'ancien thème doit encore être publié au moment de l'export (Translate & Adapt ne travaille que sur le thème actif)
- Python 3 disponible en local (déjà présent sur macOS)

## Étape 1 : exporter les traductions

Dans l'admin Shopify : **Paramètres > Langues**, exporter les traductions.

Point d'attention : cet export est englobant, il n'y a pas de filtre par type de ressource au moment de l'export. Pour une boutique avec beaucoup de produits, Shopify découpe l'export en plusieurs fichiers CSV volumineux (`nom_1.csv`, `nom_2.csv`, etc.), envoyés par email ou déposés dans les téléchargements. Le contenu de thème peut se trouver dans n'importe lequel de ces fichiers, pas forcément dans le premier.

## Étape 2 : repérer le bon fichier

Chercher, parmi tous les fichiers exportés, celui qui contient des lignes `Type,ONLINE_STORE_THEME`. Depuis un terminal, dans le dossier des exports :

```bash
for f in *.csv; do
  c=$(grep -c '^ONLINE_STORE_THEME' "$f")
  echo "$f: $c"
done
```

Le fichier avec un nombre de lignes élevé est le bon.

## Étape 3 : extraire les lignes de thème et changer l'ID

Toutes les lignes `ONLINE_STORE_THEME` partagent la même valeur dans la colonne `Identification` : c'est l'ID numérique de l'ancien thème (celui qui était publié au moment de l'export). Il faut extraire ces lignes et remplacer cet ID par celui du nouveau thème.

Pour trouver l'ID du nouveau thème : `shopify theme list` depuis le projet, ou l'URL du thème dans l'admin (`/admin/themes/<ID>/editor`).

Script Python (à adapter : nom du fichier source, ancien ID, nouveau ID) :

```python
import csv, sys
csv.field_size_limit(sys.maxsize)

SOURCE = "nom_du_fichier_avec_le_theme.csv"
DEST = "theme_content_ready_to_import.csv"
OLD_THEME_ID = "190487232839"   # ID de l'ancien thème
NEW_THEME_ID = "200819114311"   # ID du nouveau thème

with open(SOURCE, newline="", encoding="utf-8") as fh_in, \
     open(DEST, "w", newline="", encoding="utf-8") as fh_out:
    r = csv.DictReader(fh_in)
    w = csv.DictWriter(fh_out, fieldnames=r.fieldnames)
    w.writeheader()
    n = 0
    for row in r:
        if row.get("Type") == "ONLINE_STORE_THEME":
            row["Identification"] = NEW_THEME_ID
            w.writerow(row)
            n += 1

print(f"{n} lignes écrites dans {DEST}")
```

Vérification utile avant d'aller plus loin : `grep -c "ANCIEN_ID" theme_content_ready_to_import.csv` doit renvoyer `0`.

## Étape 4 : publier le nouveau thème

Translate & Adapt n'accepte les imports que sur le thème actuellement publié. Le nouveau thème doit donc être mis en ligne avant l'import, à traiter comme une étape de bascule en production plutôt qu'un essai.

## Étape 5 : importer

Retour dans **Paramètres > Langues > Translate & Adapt**, importer `theme_content_ready_to_import.csv`.

## Étape 6 : vérifier

Contrôler quelques pages clés (logo, favicon, une section de texte traduite) dans chaque langue concernée. Si des sections ou des blocs ont été modifiés ou réorganisés pendant la refonte, les lignes correspondantes ne matcheront pas (le matching se fait sur le chemin exact du champ) et resteront à retraduire à la main.

## À retenir

- Rien à faire pour les traductions produits, pages, collections, articles, metafields : elles suivent déjà le nouveau thème automatiquement.
- Seul le contenu de thème (`Type = ONLINE_STORE_THEME`) est concerné par cette procédure.
- Plus la structure du nouveau thème est proche de l'ancien (mêmes sections, mêmes blocs), plus le report est complet.
