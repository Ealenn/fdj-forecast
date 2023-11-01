import {DatasetUnified} from '../models/dataset-unified';
import * as Brain from 'brain.js';
import {NeuralNetworkMagicInput, NeuralNetworkMagicOutput} from '../models';

export class MagicNeuralNetworkService {
  private readonly network: Brain.NeuralNetworkGPU<
    NeuralNetworkMagicInput,
    NeuralNetworkMagicOutput
  >;

  constructor() {
    this.network = new Brain.NeuralNetworkGPU({
      hiddenLayers: [3],
    });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.network.fromJSON(json as any);
  }

  public forecast(date: Date): number {
    const result = this.network.run(this.getNeuralNetworkInput(date));

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

  public getNeuralNetworkInput(date: Date): NeuralNetworkMagicInput {
    const day = date.getDay();
    const month = date.getMonth() + 1;

    return [
      Number.parseFloat(`0.${date.getFullYear()}`),
      Number.parseFloat(`0.${month < 10 ? '0' + month : month}`),
      Number.parseFloat(`0.${day < 10 ? '0' + day : day}`),
    ];
  }

  public getNeuralNetworkOutput(
    dataset: DatasetUnified
  ): NeuralNetworkMagicOutput {
    const result = {};
    for (let number = 1; number <= 10; number++) {
      if (dataset.magic === number) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[number + ''] = 1;
      }
    }

    return result;
  }
}
