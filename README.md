# Zzzelp
Archive for the Zzzelp Website

# Notice d'install rapide

* Clonez le projet dans un repo privé
* Modifiez Class\Zzzelp::$sel_hash par une suite de caractères aléatoires
* Lancez la commande suivante à la racine de de votre projet (PSEUDO est votre pseudo)
```shell
find . -type f  -exec sed -i "s#delangle#PSEUDO#g" {} \;
```
* Ca va aussi modifier Zzzelp::$pseudo_admin au passage
* Importez les fichiers SQL de la branche dev dans une DB
* Modifiez le tableau $BDD ligne 16 dans Class\Zzzelp.php avec vos infos
* Ne pas oublier ligne 29 le MOTDEPASSE
* Assez fastidieux : modifiez les url codées en dur (ADRESSE est l'url de votre site)
```shell
find . -type f -exec sed -i 's#http://zzzelp.fr#http://ADRESSE#g' {} \;
find . -type f -exec sed -i 's#zzzelp.fr#ADRESSE#g' {} \;
```
