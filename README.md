# FDJ Forecast

- [FDJ Forecast](#fdj-forecast)
  - [Roadmap](#roadmap)
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
- [ ] Neural Network
- [ ] Serialize neural network to json
- [ ] Predictions
- [x] CLI Command
- [ ] Web Interface

## Local environment

### System dependencies

#### Ubuntu/Debian

```sh
$ sudo apt-get install -y build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config
```

### CLI

#### Usage

```sh
Usage: node dist/src/cli/main.js [options] [command]

Options:
  -h, --help                display help for command

Commands:
  dataset [options]         Dataset processing
  neural-network [options]  Generate Neural Network
  help [command]            display help for command
```

#### Debug

```sh
$ DEBUG=* node dist/src/cli/main.js [options] [command]
```

#### Example

```sh
$ node dist/src/cli/main.js neural-network -m ./dataset/model.json

[INFO] Generate forecast...
[ '22', '30', '7', '48', '26' ]
```
