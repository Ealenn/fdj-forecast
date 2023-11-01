import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {TrainingService} from '../services/training.service';

interface DatasetValidateCommandOptions {
  readonly datasetPath: string;
}

@Command({
  name: 'dataset-validate',
  description: 'Validate dataset before processing',
})
export class DatasetValidateCommand extends CommandRunner {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly trainingService: TrainingService
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: DatasetValidateCommandOptions
  ): Promise<void> {
    this.loggerService.info('Fetch dataset...');
    const dataset = this.trainingService.getDataset(options.datasetPath);

    this.loggerService.info('Read dataset...');
    for (const data of dataset) {
      const filter = dataset.filter(ds => ds.date === data.date);
      if (filter.length > 1) {
        this.loggerService.error('Duplicated data', filter);
      }
    }
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
}
