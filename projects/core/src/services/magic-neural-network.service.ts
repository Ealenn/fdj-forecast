import {DatasetUnified} from '../models/dataset-unified';
import * as Brain from 'brain.js';
import {INeuralNetworkJSON} from 'brain.js/dist/neural-network';
import {NeuralNetworkRollInput, NeuralNetworkRollOutput} from '../models';

export class MagicNeuralNetworkService {
  private readonly network: Brain.NeuralNetwork<
    NeuralNetworkRollInput,
    NeuralNetworkRollOutput
  >;

  constructor() {
    this.network = new Brain.NeuralNetwork({});
  }

  public train(
    dataset: DatasetUnified[],
    statusCallback?: (str: string) => void
  ): unknown {
    this.network.train(
      dataset.map(data => ({
        input: this.getNeuralNetworkInput(new Date(data.date)),
        output: this.getNeuralNetworkOutput(data),
      })),
      {
        log: status => {
          if (statusCallback) {
            statusCallback(
              `Learning iteration ${status.iterations.toString()} - ${status.error.toString()}`
            );
          }
        },
      }
    );

    return this.network.toJSON();
  }

  public load(json: unknown): void {
    this.network.fromJSON(json as INeuralNetworkJSON);
  }

  public forecast(date: Date): number {
    const result = this.network.run({
      dd: date.getDate(),
      mm: date.getMonth(),
      yyyy: date.getFullYear(),
    });

    const forecast = [];
    for (const number in result) {
      forecast.push([number, result[number]]);
    }

    const sortedForecast = forecast.sort((a, b) => {
      return (a[1] as number) - (b[1] as number);
    });

    return sortedForecast
      .slice(sortedForecast.length - 1)
      .map(x => x[0])[0] as number;
  }

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
    for (let number = 1; number <= 10; number++) {
      if (dataset.magic === number) {
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
