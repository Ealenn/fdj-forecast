import {
  MagicNeuralNetworkService,
  RollNeuralNetworkService,
  DatasetUnified,
} from 'fdj-forecast-core';
import {LoggerService} from './logger.service';
import * as fs from 'fs';
import * as Path from 'path';
import {Injectable} from '@nestjs/common';

@Injectable()
export class TrainingService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly rollNeuralNetworkService: RollNeuralNetworkService,
    private readonly magicNeuralNetworkService: MagicNeuralNetworkService
  ) {}

  public getDataset(unifiedDatasetPath: string): DatasetUnified[] {
    const dataset: DatasetUnified[] = [];

    this.loggerService.info(`Load JSON Files in ${unifiedDatasetPath}...`);
    const files = fs.readdirSync(unifiedDatasetPath, {
      recursive: false,
      withFileTypes: true,
      encoding: 'utf8',
    });
    for (const file of files) {
      if (!file.name.endsWith('.json')) {
        this.loggerService.debug(`Ignore file ${file.name}`);
        continue;
      }
      const fileContent = fs.readFileSync(
        Path.join(unifiedDatasetPath, file.name),
        {
          encoding: 'utf-8',
        }
      );
      const jsonContent = JSON.parse(fileContent);
      dataset.push(...jsonContent);
    }
    this.loggerService.info(
      `${files.length} files with ${dataset.length} dataset loaded.`
    );

    return dataset;
  }

  public getModelForRoll(dataset: DatasetUnified[]): unknown {
    this.loggerService.info('Generate Roll Neural Network...');
    return this.rollNeuralNetworkService.train(
      dataset,
      this.loggerService.info
    );
  }

  public getModelForMagic(dataset: DatasetUnified[]): unknown {
    this.loggerService.info('Generate Magic Neural Network...');
    return this.magicNeuralNetworkService.train(
      dataset,
      this.loggerService.info
    );
  }
}
