# Projet Alyra 3 : Voting DApp

## Table of Contents

-  [Projet Alyra 3 : Voting DApp](#projet-alyra-3--voting-dapp)
   -  [Table of Contents](#table-of-contents)
   -  [Presentation](#presentation)
   -  [Spécification](#spécification)
   -  [Technologie](#technologie)
   -  [Installation](#installation)
   -  [Variables d'environnement](#variables-denvironnement)
   -  [Deploiement](#deploiement)
   -  [Stratégie de test](#stratégie-de-test)
   -  [Note](#note)

## Presentation

Ce projet fait suite aux cours Alyra portant sur le developpement d'applications décentralisées.
Le frontend a été développé avec Next et chakra-ui, et la librairie web3 utilisée est wagmi (avec viem).

## Spécification

L'application permet :

-  l’enregistrement d’une liste blanche d'électeurs.

-  à l'administrateur de commencer la session d'enregistrement de la proposition.
-  aux électeurs inscrits d’enregistrer leurs propositions.
-  à l'administrateur de mettre fin à la session d'enregistrement des propositions.
-  à l'administrateur de commencer la session de vote.
-  aux électeurs inscrits de voter pour leurs propositions préférées.
-  à l'administrateur de mettre fin à la session de vote.
-  à l'administrateur de comptabiliser les votes.
-  à tout le monde de consulter le résultat.

## Technologie

Versions des outils utilisés :

-  node : 16.16.0
-  hardhat : 2.14.1
-  solc : 0.8.13
-  react: 18.2.0
-  rainbowkit : 1.0.2
-  next: 13.4.7
-  wagmi 1.2.1
-  viem : 1.1.4
-  chakra-ui : 2.7.1

## Installation

Installation initial :

Backend, dans le repertoire backend :

```
yarn install
```

Frontend, dans le repertoire frontend :

```
yarn install
```

Lancement des tests dans le repertoire backend :

```
yarn hardhat test
```

Obtention de la couverture de tests

```
yarn hardhat coverage
```

Lancement du serveur en local, dans le repertoire frontend :

```
yarn next dev
```

## Variables d'environnement

Sur le frontend, la variable d'environnement à renseigner dans /fontend/.env.local est l'addresse du smartcontract, dans NEXT_PUBLIC_CONTRACT_ADDRESS.

Sur le backend, il ya 3 variables à renseigner dans /backend/.env:

-  ETHERSCAN_API_KEY : pour la vérification du smart contract sur etherscan
-  DEPLOYER_PRIVATE_KEY : pour la clé privée du compte qui déploie le smart contract
-  INFURA_KEY : qui est clé la Infura pour l'accès au noeud

## Deploiement

Le smart contrat Voting a été déployé sur Sepolia à cette adresse :

```
0x669414c4df6e1458453030871aceAAE381B22d94
```

Le code a été vérifié sur etherscan :

```
https://sepolia.etherscan.io/address/0x669414c4df6e1458453030871aceAAE381B22d94#code
```

## Stratégie de test

Les tests couvrent 100% des instructions/branches/fonctions/lignes
![](capture.png)

Les suites de tests sont divisés en 4 groupes (describe) pour vérifier le fonctionnement de chaque étape du workflow de Vote:

-  L'enregistrement des votants (Test register voters)
-  L'enregistrement des propositions de votes (Test register a proposal)
-  L'ajout de votes (Test adding a vote)
-  Le compte des votes (Test count votes)

Un cinquième groupe permet de vérifier le fonctionnement du workflow (Test workflow)

## Note

Le déploiement du smart contract sur sepolia est lancé avec la commande :

```
cd backend
yarn hardhat run ./scripts/deploy.js --network sepolia
```

Pour utiliser l'application en local, faut :

-  remplacer sepolia par hardhat dans les fichiers layout.js:12 et client.jsx:13
-  remplacer l'adresse du contract dans un fichier /frontend/.env dans une variable NEXT_PUBLIC_CONTRACT_ADDRESS
-  passer fromBlock à 0 dans fetchData.jsx:4

Ou utiliser la branche localhost de ce projet.
