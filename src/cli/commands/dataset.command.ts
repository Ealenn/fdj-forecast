import {Command, CommandRunner, Option} from 'nest-commander';
import * as fs from 'fs';
import {LoggerService} from '../services/logger.service';
import {CsvService} from '../services/csv-service';

interface DatasetCommandOptions {
  readonly path: string;
  readonly outPut: string;
  readonly delimiter: string;
  readonly dateColomnIndex: number | string;
  readonly dateFormat: string;
  readonly rollColomnIndex1: number | string;
  readonly rollColomnIndex2: number | string;
  readonly rollColomnIndex3: number | string;
  readonly rollColomnIndex4: number | string;
  readonly rollColomnIndex5: number | string;
  readonly rollMagicColomnIndex: number | string;
}

@Command({
  name: 'dataset',
  description: 'Dataset processing',
})
export class DatasetCommand extends CommandRunner {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly csvService: CsvService
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: DatasetCommandOptions
  ): Promise<void> {
    this.loggerService.info(`Parse CSV File ${options.path}...`);
    const unifiedDataSet = this.csvService.parse(options.path, {
      delimiter: options.delimiter,
      date: {
        colomnIndex: options.dateColomnIndex,
        format: options.dateFormat,
      },
      roll: {
        colomnIndex1: options.rollColomnIndex1,
        colomnIndex2: options.rollColomnIndex2,
        colomnIndex3: options.rollColomnIndex3,
        colomnIndex4: options.rollColomnIndex4,
        colomnIndex5: options.rollColomnIndex5,
      },
      magic: {
        colomnIndex: options.rollMagicColomnIndex,
      },
    });

    this.loggerService.info(`Save unified data in ${options.outPut}`);
    this.csvService.save(options.outPut, unifiedDataSet);

    this.loggerService.info(
      `${unifiedDataSet.length} unified lotto draw. Done.`
    );
  }

  @Option({
    flags: '-p, --path [string]',
    description: 'Path of CSV dataset',
    required: true,
  })
  parsePath(path: string): string {
    if (fs.existsSync(path)) {
      return path;
    }

    this.loggerService.fatal(`File in path ${path} do not exist.`);
  }

  @Option({
    flags: '-o, --outPut [string]',
    description: 'Path of Output (unified) CSV dataset',
    required: true,
  })
  parseOutput(path: string): string {
    if (fs.existsSync(path)) {
      this.loggerService.fatal(`File in path ${path} already exist.`);
    }

    return path;
  }

  @Option({
    flags: '-d, --delimiter [string]',
    description: 'CSV delimiter',
    defaultValue: ';',
    required: false,
  })
  parseDelimiter(delimiter: string): string {
    return delimiter;
  }

  @Option({
    flags: '-df, --dateFormat [string]',
    description: 'CSV Date Format',
    defaultValue: 'DD-MM-YYYY',
    required: false,
  })
  parseDateFormat(dateFormat: string): string {
    return dateFormat;
  }

  @Option({
    flags: '-dc, --dateColomnIndex [number|string]',
    description: 'CSV Date Colomn Index',
    required: true,
  })
  parseDateColomnIndex(dateColomnIndex: string): number | string {
    const numberDateColomnIndex = Number(dateColomnIndex);
    if (Number.isNaN(numberDateColomnIndex)) {
      return dateColomnIndex;
    }

    return numberDateColomnIndex;
  }

  @Option({
    flags: '-ri1, --rollColomnIndex1 [number|string]',
    description: 'CSV Roll colomn index 1',
    required: true,
  })
  parseRollColomnIndex1(rollColomnIndex: string): number | string {
    const numberColomnIndex = Number(rollColomnIndex);
    if (Number.isNaN(numberColomnIndex)) {
      return rollColomnIndex;
    }

    return numberColomnIndex;
  }

  @Option({
    flags: '-ri2, --rollColomnIndex2 [number|string]',
    description: 'CSV Roll colomn index 2',
    required: true,
  })
  parseRollColomnIndex2(rollColomnIndex: string): number | string {
    const numberColomnIndex = Number(rollColomnIndex);
    if (Number.isNaN(numberColomnIndex)) {
      return rollColomnIndex;
    }

    return numberColomnIndex;
  }

  @Option({
    flags: '-ri3, --rollColomnIndex3 [number|string]',
    description: 'CSV Roll colomn index 3',
    required: true,
  })
  parseRollColomnIndex3(rollColomnIndex: string): number | string {
    const numberColomnIndex = Number(rollColomnIndex);
    if (Number.isNaN(numberColomnIndex)) {
      return rollColomnIndex;
    }

    return numberColomnIndex;
  }

  @Option({
    flags: '-ri4, --rollColomnIndex4 [number|string]',
    description: 'CSV Roll colomn index 4',
    required: true,
  })
  parseRollColomnIndex4(rollColomnIndex: string): number | string {
    const numberColomnIndex = Number(rollColomnIndex);
    if (Number.isNaN(numberColomnIndex)) {
      return rollColomnIndex;
    }

    return numberColomnIndex;
  }

  @Option({
    flags: '-ri5, --rollColomnIndex5 [number|string]',
    description: 'CSV Roll colomn index 5',
    required: true,
  })
  parseRollColomnIndex5(rollColomnIndex: string): number | string {
    const numberColomnIndex = Number(rollColomnIndex);
    if (Number.isNaN(numberColomnIndex)) {
      return rollColomnIndex;
    }

    return numberColomnIndex;
  }

  @Option({
    flags: '-rmi, --rollMagicColomnIndex [number|string]',
    description: 'CSV Roll magic number colomn index',
    required: true,
  })
  parseRollMagicColomnIndex(rollColomnIndex: string): number | string {
    const numberColomnIndex = Number(rollColomnIndex);
    if (Number.isNaN(numberColomnIndex)) {
      return rollColomnIndex;
    }

    return numberColomnIndex;
  }
}
