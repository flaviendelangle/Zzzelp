# Zzzelp
Archive for the Zzzelp Website

# Notice d'adaptation rapide du code

* Clonez le projet dans un repo privé
* Modifiez Class\Zzzelp::$sel_hash par une suite de caractères aléatoires
* Lancez la commande suivante à la racine de de votre projet (PSEUDO est votre pseudo)
```shell
find . -type f  -exec sed -i "s#delangle#PSEUDO#g" {} \;
```
* Ca va aussi modifier Zzzelp::$pseudo_admin au passage
* Importez les fichiers SQL de la branche dev dans une DB
* Modifiez le tableau $BDD ligne 16 dans Class\Zzzelp.php avec vos infos
* Ne pas oublier ligne 40 le MOTDEPASSE, et éventuellement l'adresse de votre serveur de DB
* Assez fastidieux : modifiez les url codées en dur (ADRESSE est l'url de votre site)
```shell
find . -type f -exec sed -i 's#http://zzzelp.fr#http://ADRESSE#g' {} \;
find . -type f -exec sed -i 's#zzzelp.fr#ADRESSE#g' {} \;
```

# Paramétrage serveur

* PHP (cgi ou fpm) >= 5.4 (testé sous 5.4 FPM et 5.5 FPM)
* Apache HTTPD avec l'url rewriting activé et AllowOverride à ALL
* Désactiver le directory listing
* MySQL / MariaDB

# Vérifications

* Vous pouvez rechercher récursivement dans le repo pour vérifier qu'il n'y a pas de coquilles :
```shell
grep -rnw . -e "delangle"
grep -rnw . -e "zzzelp.fr"
grep -rnw . -e "http://"
```
