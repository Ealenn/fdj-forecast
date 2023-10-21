import {Injectable} from '@nestjs/common';
import {DatasetUnified} from '../../core/models/dataset-unified';
import {
  NeuralNetworkRollInput,
  NeuralNetworkRollOutput,
} from '../../core/models';

@Injectable()
export class NeuralNetworkDatasetService {
  public getNeuralNetworkInput(date: Date): NeuralNetworkRollInput {
    return {
      dd: date.getDate(),
      mm: date.getMonth(),
      yyyy: date.getFullYear(),
    };
  }

  public getNeuralNetworkOutput(
    dataset: DatasetUnified
  ): NeuralNetworkRollOutput {
    const result = {};
    for (let number = 1; number <= 49; number++) {
      if (
        dataset.roll[0] === number ||
        dataset.roll[1] === number ||
        dataset.roll[2] === number ||
        dataset.roll[3] === number ||
        dataset.roll[4] === number
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[number + ''] = 1;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[number + ''] = 0;
      }
    }

    return result;
  }
}
