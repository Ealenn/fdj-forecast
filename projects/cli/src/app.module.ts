import {Module} from '@nestjs/common';
import {DatasetCommand} from './commands/dataset.command';
import {LoggerService} from './services/logger.service';
import {CsvService} from './services/csv-service';
import {PredictRollCommand} from './commands/predict-roll.command';
import {PredictMagicCommand} from './commands/predict-magic.command';
import {ModelsCommand} from './commands/models.command';
import {
  RollNeuralNetworkService,
  MagicNeuralNetworkService,
} from 'fdj-forecast-core/dist/src';
import {TrainingService} from './services/training.service';

@Module({
  imports: [],
  providers: [
    LoggerService,
    CsvService,
    TrainingService,
    DatasetCommand,
    PredictRollCommand,
    PredictMagicCommand,
    ModelsCommand,
    RollNeuralNetworkService,
    MagicNeuralNetworkService,
  ],
})
export class AppModule {}
