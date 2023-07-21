Ce dossier contient les fichiers sources pour le TP2 sur socket.io

Toutes les questions ont été traitées. Il y a du code en commentaire qui contient une version alternative de l'envoi de message depuis le serveur.

En effet, il y a 2 solutions possibles:

- Soit le serveur envoie un nombre différent à chaque client connecté (Cela multiplie le nombre de processus d'envoi)

Pour cela, nous stockons dans une map les ID de tous les interval mis en place pour chaque client. Lorsqu'un client se déconnecte, on utilise clearInterval et on supprime le le client et son interval de la map.

- Soit le serveur envoie le même nombre à tous les clients connectés.

Dans ce cas là, on utilise juste this.#io.emit(...) pour envoyer le même message à tous les clients. Ainsi, il n'y pas de changements à gérer lors de la connexion/déconnexion d'un client.

Pour éxécuter et vérifier le bon fonctionnement de ce projet :

- Cloner ce projet dans le répertoire de votre choix
- Rendez-vous, depuis l'invite de commande, dans le répertoire choisi
- tapez "nodemon" puis entrez (afin de mettre en route le serveur)
- Ouvrez votre navigateur web et rendez-vous à cette adresse URL : "http://localhost:8080/public/chartio.html"
- Ouvrez la console du navigateur pour visualiser les messages reçus par le client.
