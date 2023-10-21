# Dataset

> https://www.fdj.fr/jeux-de-tirage/loto/historique

- [Dataset](#dataset)
  - [1976-2008.csv](#1976-2008csv)
  - [2008-2017.csv](#2008-2017csv)
  - [2017-2019.csv](#2017-2019csv)
  - [2019-2019.csv](#2019-2019csv)
  - [2020-2023.csv](#2020-2023csv)

## 1976-2008.csv

```sh
$ fdj-forecast dataset -p ./dataset/raw/1976-2008.csv -o ./dataset/unified/1976-2008.json -dc date_de_tirage -df YYYYMMDD -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi boule_complementaire
```

## 2008-2017.csv

```sh
$ fdj-forecast dataset -p ./dataset/raw/2008-2017.csv -o ./dataset/unified/2008-2017.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
```

## 2017-2019.csv

```sh
$ fdj-forecast dataset -p ./dataset/raw/2017-2019.csv -o ./dataset/unified/2017-2019.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
```

## 2019-2019.csv

```sh
$ fdj-forecast dataset -p ./dataset/raw/2019-2019.csv -o ./dataset/unified/2019-2019.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
```

## 2020-2023.csv

```sh
$ fdj-forecast dataset -p ./dataset/raw/2020-2023.csv -o ./dataset/unified/2020-2023.json -dc date_de_tirage -df DD/MM/YYYY -ri1 boule_1 -ri2 boule_2 -ri3 boule_3 -ri4 boule_4 -ri5 boule_5 -rmi numero_chance
```
