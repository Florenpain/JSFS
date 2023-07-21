# TP1

## Lancer le serveur :

> npm run start

## Routes disponibles :

- [localhost:8080/](http://localhost:8080/) : affiche un message de bienvenue
- [localhost:8080/first](http://localhost:8080/first) : la réponse à cette requête est une page HTML, le contenu sera un texte statique propre à cette page.
- [localhost:8080/second](http://localhost:8080/second) : la réponse à cette requête est une page HTML, le contenu sera un texte statique propre à cette page.
- [localhost:8080/json](http://localhost:8080/json) : la réponse à cette requête est au format JSON. Cette requête accepte des paramètres. Les paramètres et leurs valeurs constitueront une partie des données renvoyées dans la réponse au format JSON.
- [localhost:8080/random](http://localhost:8080/random) : la réponse est au format JSON et de la forme { "randomValue" : some_int} où some_int est un entier aléatoire entre 0 et 100

## Gestion d'erreur :

Une classe 'Error' s'occupe de la gestion d'erreur, notamment lorsqu'une route non existante est demandée.