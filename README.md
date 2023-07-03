# Projet Alyra 3 : Voting DApp

## Table of Contents

-  [Projet Alyra 3 : Voting DApp](#projet-alyra-3--voting-dapp)
   -  [Table of Contents](#table-of-contents)
   -  [Presentation](#presentation)
   -  [Spécification](#spécification)
   -  [Technologie](#technologie)
   -  [Installation](#installation)
   -  [Deploiement](#deploiement)
   -  [Stratégie de test](#stratégie-de-test)

## Presentation

Ce projet fait suite aux cours Alyra portant sur les tests unitaires d'un code Solidity.
Les tests sont réalisés sur la correction du projet 1 du système de Vote.
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
npx hardhat test
```

Obtention de la couverture de tests

```
npx hardhat coverage
```

Lancement du serveur en local, dans le repertoire frontend :

```
yarn next dev
```

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
