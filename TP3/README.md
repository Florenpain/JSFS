# TP3

## Auteur de ce rapport.

- Florentin Bugnon

## Sujet

Un site pour acheter et vendre des objets.
Vous pouvez retrouver le sujet complet a l'adresse suivante :

https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/sellyours.html

## Installation des modules

Pour installer le projet il faut aller dans le dossier VendezLesVotre et faire :
> npm install

## Lancement de la base de données

Pour lancer la base de données, il suffit d'aller dans le dossier VendezLesVotre et faire :
> mongod --dbpath dbData

## Lancement du serveur

Pour lancer le serveur il suffit d'aller dans le dossier VendezLesVotre et faire :
> npm run start

Puis il suffit d'aller sur http://localhost:3000/login.html, et si vous voulez jouer avec un autre ordinateur si faut remplacer localhost par l'ip du serveur.

## Fonctionnalités

- On peut créer un compte en fournissant nom, login et mot de passe.

- Ensuite, on peut se connecter avec son login et son mot de passe, on a ainsi accès aux objets en vente.

- On peut également mettre en vente des objets avec une description et un prix.

- Une fois le compte créé on peut se deconnecter avec le bouton logout ou changer son nom, et acheter des objets si on a l'argent pour le faire, sinon un message d'erreur s'affiche.
