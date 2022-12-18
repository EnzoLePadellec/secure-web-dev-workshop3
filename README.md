Documentation. Comment se lance le code, comment se lancent les tests, infos générales sur ce que le code fait. Infos sur les données attendues dans le fichier `.env`. Si vous mettez des features particulières, documentez-les. Mettez ça dans le README.md (vous pouvez override celui qui existe déjà)

-> Comment se lance le code ?

Pour lancer, le code il faut faire tourner le programme sur sa machine avant d'utiliser Insomnia. Sur Insomnia il faudra tout d'abord se connecter à un utilisateur sans quoi toutes vos requêtes se verront refuser.
Vous pouvez donc vous register (mais vous n'aurez accès uniquement au rôle "user") ou vous login à un utilisateur déjà existant.
Une fois votre token obtenu mettez le dans "Bearer token", vous pouvez maintenant accéder à tous les liens auquel votre rôle vous permet d'accéder.

-> Comment se lancent les tests ?

Sur VSCode les test se lancent en entrant la commande suivante dans un terminal : "npm test -- locations.service.test.js".

-> Comment le code est fait ?

Le dossier 'auth' contient tous les stratégies. La statégie locale est dans le fichier local.strategy.js et la stratégie jwt dans jwt.strategy.js.
Le dossier locations contient tous les fichiers liés aux locations (controller, model, service et test).
Le dossier users contient tous les fichiers liés aux users (controller, model, service).

-> Contenu du fichier '.env' ?

MONGO_URI=mongodb+srv://EnzoLP:cecinestpasmonmdp@cluster0.h2ysiqm.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET = my-32-character-ultra-secure-and-ultra-long-secret