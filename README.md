# Javascript Full Stack

- **[Ressources](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/)**

## Auteur

- [Florentin Bugnon](https://github.com/Florenpain)

## Description

Ce dépôt contient les fichiers des TPs réalisés dans le cadre de l'UE "Javascript Full Stack" de l'Université de Lille.

## TP1

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/toy-server.html)

##### Dans ce tp les objectifs sont nombreux , à savoir :
    - Revoir la syntaxe Javascript.
    - Se familiariser avec Node.js.
    - Et enfin l'objectif principal içi, est de réaliser avec Node.js un petit serveur web qui gère un nombre limité de routes et fournit des réponses simples sous la forme de code HTML ou JSON.

## TP2

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/chartio.html)

- tapez "nodemon" puis entrez (afin de mettre en route le serveur)
- Ouvrez votre navigateur web et rendez-vous à cette adresse URL : "http://localhost:8080/public/chartio.html"
- Ouvrez la console du navigateur pour visualiser les messages reçus par le client.

#### Question 5 , 6

Pour envoyer à tous les clients le meme message,
il suffit de créer un interval qui emit à partir de l'io,
et qui va donc envoyer à chaque client le même nombre au même moment .
Si on veut que chaque client recoivent un nombre différent à un moment différent,
il faut créer l'interval pour chaque client et la fonction associé envoie seulemtn à ce cleint.
Donc on créer une map qui associe son id à un interval et si il se deconnecte,
on clear son interval.

## TP3

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/toy-mongo.html)

Pour éxécuter et vérifier le bon fonctionnement de ce projet :

- Cloner ce projet dans le répertoire de votre choix
- Rendez-vous, depuis l'invite de commande, dans le répertoire choisi
- tapez "nodemon" puis entrez (afin de mettre en route le serveur)
- Ouvrez votre navigateur web et rendez-vous à cette adresse URL : "http://localhost:8080/publicl"
- Ouvrez la console du navigateur pour visualiser les messages reçus par le client.
