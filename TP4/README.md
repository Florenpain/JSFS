# HowTo :

## installer les modules (dossier client) :

> npm install webpack webpack-cli --save-dev

## installer les modules (dossier server) :

> npm install socket.io --save

> npm install nodemon --global

----------------------------------------

## Pour jouer à pong !  **(installer les modules en amont)**

### Produire le bundle (dossier client) :

> npm run build

### Lancer le serveur :

> npm run start

### Lancer le client :

Se rendre à l'adresse suivante : http://localhost:8081/public/index.html

La partie se lancera lorsque les 2 joueurs auront cliqué sur "jouer"

Le premier joueur à avoir cliqué sur "jouer" peut relancer la partie à chaque point marqué en appuyant sur la touche "r"

-----------

# Remarques :

Lorsqu'un des 2 joueurs se déconnectent, un message d'erreur apparait à l'écran avant de rafraichir la page.
Pour relancer une partie lorsqu'un joueur est partie, il faut recharger les pages dans le navigateur.
On constate un très léger décalage entre le déplacement des raquettes sur chaque client, ce qui peut amener à des résultats différents.