# Javascript Full Stack

- **[Ressources](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/)**

## Auteur

- [Florentin Bugnon](https://github.com/Florenpain)

## TP1

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/toy-server.html)

Le projet consiste en un petit serveur web, à l'aide de NodeJS, qui gère un nombre limité de routes et fournit des réponses simples sous la forme de code HTML ou JSON.
La gestion du serveur est entièrement réalisée à la main (c'est-à-dire sans passer par un framework tel que Express).

## TP2

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/chartio.html)

Ce projet est une première mise en place de socket.io. L'application réalisée dispose d'un serveur qui envoie à intervalle régulier une nouvelle donnée aux clients connectés. 
Dans notre cas, du côté du client, cela se traduit par la mise à jour, après la réception de chaque nouvelle donnée, d'un graphique qui intégre cette nouvelle donnée.

## TP3

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/sellyours.html)

Ce projet est une application qui permet à ses utilisateurs de vendre leurs objets et d'acheter les objets mis en vente par les autres utilisateurs. Le fonctionnement de l'application doit être celui d'une application en page unique (single page application), c'est-à-dire sans rechargement complet de la page pour la modifier lors des interactions de l'utilisateur avec l'application.

Les utilisateurs sont simplement identifiés par leur nom et la somme d'argent dont il dispose. Cette somme d'argent à une valeur par défaut à la création d'un utilisateur.
Les objets mis en vente sont définis par une description et un prix de vente. Chaque objet est mis en vente par un utilisateur, l'information sur cet utilisateur est stockée dans l'objet, sous la forme de l'id de cet utilisateur.

## TP4

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/pong.html)

Ce projet est une version simplifiée de l'historique jeu Pong. Le jeu se joue à deux joueurs, chacun sur un navigateur différent. Le jeu se joue sur une page web, et les deux joueurs doivent se connecter à cette page pour pouvoir jouer. Le jeu se joue en temps réel, c'est-à-dire que les deux joueurs voient la même chose sur leur écran, et que les actions de l'un des joueurs sont visibles immédiatement par l'autre joueur.
