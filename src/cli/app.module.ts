import {Module} from '@nestjs/common';
import {DatasetCommand} from './commands/dataset.command';
import {LoggerService} from './services/logger.service';
import {CsvService} from './services/csv-service';
import {NeuralNetworkCommand} from './commands/neural-network.command';
import {NeuralNetworkService} from './services/neural-network.service';
import {NeuralNetworkDatasetService} from './services/neural-network-dataset.service';

@Module({
  imports: [],
  providers: [
    LoggerService,
    CsvService,
    NeuralNetworkService,
    NeuralNetworkDatasetService,
    DatasetCommand,
    NeuralNetworkCommand,
  ],
})
export class AppModule {}
