import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {RollNeuralNetworkService} from 'fdj-forecast-core';

interface PredictRollCommandOptions {
  readonly modelPath: string;
}

@Command({
  name: 'predict-roll',
  description: 'Predict Roll from Neural Network',
})
export class PredictRollCommand extends CommandRunner {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly rollNeuralNetworkService: RollNeuralNetworkService
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: PredictRollCommandOptions
  ): Promise<void> {
    this.loggerService.info('Load model...');
    const model = JSON.parse(
      fs.readFileSync(options.modelPath, {encoding: 'utf-8'})
    );
    this.rollNeuralNetworkService.load(model);
    this.loggerService.info('Generate prediction...');
    const prediction = this.rollNeuralNetworkService.forecast(new Date());
    this.loggerService.info(`Roll Number : ${prediction}`);
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
