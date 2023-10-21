import {Module} from '@nestjs/common';
import {DatasetCommand} from './commands/dataset.command';
import {LoggerService} from './services/logger.service';
import {CsvService} from './services/csv-service';
import {NeuralNetworkCommand} from './commands/neural-network.command';
import {NeutralNetworkService} from './services/neutral-network.service';
import {NeutralNetworkDatasetService} from './services/neutral-network-dataset.service';

@Module({
  imports: [],
  providers: [
    LoggerService,
    CsvService,
    NeutralNetworkService,
    NeutralNetworkDatasetService,
    DatasetCommand,
    NeuralNetworkCommand,
  ],
})
export class AppModule {}
