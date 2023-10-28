import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {TrainingService} from '../services/training.service';

interface ModelsCommandOptions {
  readonly datasetPath: string;
  readonly rollModelOutPutPath: string;
  readonly magicModelOutPutPath: string;
}

@Command({
  name: 'models',
  description: 'Generate Neural Network models',
})
export class ModelsCommand extends CommandRunner {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly trainingService: TrainingService
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: ModelsCommandOptions
  ): Promise<void> {
    this.loggerService.info('Fetch dataset...');
    const dataset = this.trainingService.getDataset(options.datasetPath);

    this.loggerService.info('Run training for roll model...');
    const rollModel = this.trainingService.getModelForRoll(dataset);
    this.loggerService.info(`Write file ${options.rollModelOutPutPath}...`);
    fs.writeFileSync(options.rollModelOutPutPath, JSON.stringify(rollModel), {
      encoding: 'utf-8',
    });

    this.loggerService.info('Run training for magic model...');
    const magicModel = this.trainingService.getModelForMagic(dataset);
    this.loggerService.info(`Write file ${options.magicModelOutPutPath}...`);
    fs.writeFileSync(options.magicModelOutPutPath, JSON.stringify(magicModel), {
      encoding: 'utf-8',
    });
  }

  @Option({
    flags: '-p, --datasetPath [string]',
    description: 'Path of CSV dataset folder',
    required: true,
  })
  parseDatasetPath(datasetPath: string): string {
    if (fs.existsSync(datasetPath)) {
      return datasetPath;
    }

    this.loggerService.fatal(`File in path ${datasetPath} do not exist.`);
  }

  @Option({
    flags: '-r, --rollModelOutPutPath [string]',
    description: 'Path of roll neural network model',
    required: true,
  })
  parseRollModelOutPutPath(rollModelOutPutPath: string): string {
    if (fs.existsSync(rollModelOutPutPath)) {
      this.loggerService.fatal(
        `File in path ${rollModelOutPutPath} already exist.`
      );
    }

    return rollModelOutPutPath;
  }

  @Option({
    flags: '-m, --magicModelOutPutPath [string]',
    description: 'Path of magic neural network model',
    required: true,
  })
  parsemagicModelOutPutPath(magicModelOutPutPath: string): string {
    if (fs.existsSync(magicModelOutPutPath)) {
      this.loggerService.fatal(
        `File in path ${magicModelOutPutPath} already exist.`
      );
    }

    return magicModelOutPutPath;
  }
}
