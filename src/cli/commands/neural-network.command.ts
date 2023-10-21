import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {DatasetUnified} from '../../core/models/dataset-unified';
import * as Path from 'path';
import {NeutralNetworkService} from '../services/neutral-network.service';

interface NeuralNetworkOptions {
  readonly path?: string;
  readonly model?: unknown;
}

@Command({
  name: 'neural-network',
  description: 'Generate Neural Network',
})
export class NeuralNetworkCommand extends CommandRunner {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly neutralNetworkService: NeutralNetworkService
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: NeuralNetworkOptions
  ): Promise<void> {
    if (options.model) {
      this.loadFromJsonModel(options.model);
    } else if (options.path) {
      this.loadFromTraining(options.path);
    } else {
      this.loggerService.fatal(
        'Path of Dataset files or JSON Model must be provided.'
      );
    }

    this.loggerService.info('Generate forecast...');
    const forecast = this.neutralNetworkService.forecast(new Date());
    console.log(forecast);
  }

  private loadFromTraining(path: string): void {
    const dataset: DatasetUnified[] = [];

    this.loggerService.info(`Load JSON Files in ${path}...`);
    const files = fs.readdirSync(path, {
      recursive: false,
      withFileTypes: true,
      encoding: 'utf8',
    });
    for (const file of files) {
      if (!file.name.endsWith('.json')) {
        this.loggerService.debug(`Ignore file ${file.name}`);
        continue;
      }
      const fileContent = fs.readFileSync(Path.join(path, file.name), {
        encoding: 'utf-8',
      });
      const jsonContent = JSON.parse(fileContent);
      dataset.push(...jsonContent);
    }
    this.loggerService.info(
      `${files.length} files with ${dataset.length} dataset loaded.`
    );

    this.loggerService.info('Generate Neural Network...');
    this.neutralNetworkService.train(dataset);
  }

  private loadFromJsonModel(model: unknown): void {
    this.neutralNetworkService.load(model);
  }

  @Option({
    flags: '-p, --path [string]',
    description: 'Path of JSON Unified Dataset',
    required: false,
  })
  parsePath(path?: string): string | null {
    if (!path) {
      return null;
    }

    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
      return path;
    }

    this.loggerService.fatal(
      `Folder ${path} do not exist or is not directory path.`
    );
  }

  @Option({
    flags: '-m, --model [json]',
    description: 'JSON Model Path',
    required: false,
  })
  parseModel(path?: string): unknown | null {
    if (!path) {
      return null;
    }

    if (!fs.existsSync(path)) {
      this.loggerService.fatal(`Model in path ${path} do not exist.`);
    }

    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
}
