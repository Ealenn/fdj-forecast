import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {MagicNeuralNetworkService} from 'fdj-forecast-core';

interface PredictMagicCommandOptions {
  readonly modelPath: string;
}

@Command({
  name: 'predict-magic',
  description: 'Predict Magic Number from Neural Network',
})
export class PredictMagicCommand extends CommandRunner {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly magicNeuralNetworkService: MagicNeuralNetworkService
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: PredictMagicCommandOptions
  ): Promise<void> {
    this.loggerService.info('Load model...');
    const model = JSON.parse(
      fs.readFileSync(options.modelPath, {encoding: 'utf-8'})
    );
    this.magicNeuralNetworkService.load(model);
    this.loggerService.info('Generate prediction...');
    const prediction = this.magicNeuralNetworkService.forecast(new Date());
    this.loggerService.info(`Magic Number : ${prediction}`);
  }

  @Option({
    flags: '-m, --modelPath [string]',
    description: 'Path of JSON Unified Dataset',
    required: false,
  })
  parseModelPath(modelPath: string): string | null {
    if (fs.existsSync(modelPath) && !fs.lstatSync(modelPath).isDirectory()) {
      return modelPath;
    }

    this.loggerService.fatal(
      `Folder ${modelPath} do not exist or is not valid JSON file.`
    );
  }
}
