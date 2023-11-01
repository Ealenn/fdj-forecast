import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {RollNeuralNetworkService} from 'fdj-forecast-core/dist/src';
import * as moment from 'moment';

interface PredictRollCommandOptions {
  readonly modelPath: string;
  readonly date?: string;
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
    const date = options.date
      ? moment(options.date, 'YYYY-MM-DD').toDate()
      : new Date();
    const prediction = this.rollNeuralNetworkService.forecast(date);
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

  @Option({
    flags: '-d, --date [string]',
    description: 'Date with YYYY-MM-DD format',
    required: false,
  })
  parseDate(date?: string): string | null {
    return date || null;
  }
}
