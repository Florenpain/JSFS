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

[Lien du sujet](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/tdtp/toy-mongo.html)


Ce projet est une application (très rudimentaire) pour gérer une todo list à partir des données stockées dans une base de données. 
Dans cette application on visualise la liste des tâches et on peut créer des nouvelles tâches ou en supprimer.

Ce projet permet de prendre en main MongoDB :

    - établir la connexion entre le serveur http et le serveur de base de données,
    - établir un schéma de données simple et générer son modèle, 
    côté serveur, construire quelques interactions simples avec le serveur de base de données en installant une interface type API REST et, côté client, faire des requêtes asynchrones vers vette API.

L'application est mise à disposition au travers d'une page HTML qui fonctionne en mode single page application : les opérations de création ou de suppression d'une tâche ne donne pas lieu à un rechargement de la page. Les interactions entre l'application (la page client) et le serveur se font à l'aide de requêtes asynchrones (fetch).

