# FDJ Forecast

- [FDJ Forecast](#fdj-forecast)
  - [Roadmap](#roadmap)
  - [Makefile](#makefile)
  - [Local environment](#local-environment)
    - [System dependencies](#system-dependencies)
      - [Ubuntu/Debian](#ubuntudebian)
    - [CLI](#cli)
      - [Usage](#usage)
      - [Debug](#debug)
      - [Example](#example)

This GitHub project is an artificial intelligence and neural networks to generate forecasts and predictions for lottery numbers.

It's important to note that using neural networks or any form of AI to predict lottery numbers is for educational and entertainment purposes only.

The lottery is a game of chance, and no prediction system can guarantee winning numbers.

## Roadmap

- [x] Metadata / Dataset
- [x] Neural Network
- [x] Serialize neural network to json
- [ ] Predictions
- [ ] CLI Command
- [ ] Web Interface

## Makefile

```
usage: make [target]

dataset:
  dataset                         Unify all dataset CSV/JSON files.
  models                          Generate Neural Network models from dataset.

other:
  help                            Show this help.

project:
  init                            Initialize local environment.
  upgrade                         Reinstall all Node Packages with Latest version (upgrade packages).
  build                           Build local sources.
  lint                            Lint and fix local sources.

run:
  roll                            Run prediction.
```

## Local environment

### System dependencies

#### Ubuntu/Debian

```sh
$ sudo apt-get install -y build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config
```

### CLI

#### Usage

```sh
Usage: node projects/cli/dist/src/main.js [options] [command]

Options:
  -h, --help               display help for command

Commands:
  dataset [options]        Dataset processing
  predict-roll [options]   Predict Roll from Neural Network
  predict-magic [options]  Predict Magic Number from Neural Network
  models [options]         Generate Neural Network models
  help [command]           display help for command
```

#### Debug

```sh
$ DEBUG=* node projects/cli/dist/src/main.js [options] [command]
```

#### Example

```sh
$ node projects/cli/dist/src/main.js predict-roll -m ./dataset/roll.model.json

[INFO] Load model...
[INFO] Generate prediction...
[INFO] Roll Number : 22,30,7,48,26
```

```sh
$ node projects/cli/dist/src/main.js predict-magic -m ./dataset/magic.model.json

[INFO] Load model...
[INFO] Generate prediction...
[INFO] Magic Number : 9
```
