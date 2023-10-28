/* eslint-disable @typescript-eslint/no-namespace */
import {DatasetUnified} from 'fdj-forecast-core';
import * as CSVParser from 'papaparse';
import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as moment from 'moment';
import * as Path from 'path';

@Injectable()
export class CsvService {
  public parse(
    path: string,
    options: CsvService.parseOptions
  ): DatasetUnified[] {
    const fileContent = fs.readFileSync(path, 'utf8');
    const csvParseRows = CSVParser.parse(fileContent, {
      skipEmptyLines: true,
      delimiter: options.delimiter,
      header: true,
    });

    const result: DatasetUnified[] = [];
    for (const csvRow of csvParseRows.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const row = csvRow as any;
      result.push({
        date: moment(
          row[options.date.colomnIndex],
          options.date.format
        ).toDate(),
        roll: [
          parseInt(row[options.roll.colomnIndex1]),
          parseInt(row[options.roll.colomnIndex2]),
          parseInt(row[options.roll.colomnIndex3]),
          parseInt(row[options.roll.colomnIndex4]),
          parseInt(row[options.roll.colomnIndex5]),
        ],
        magic: parseInt(row[options.magic.colomnIndex]),
      });
    }

    return result;
  }

  public save(path: string, dataset: DatasetUnified[]): void {
    const parentfolder = Path.dirname(path);
    if (!fs.existsSync(parentfolder)) {
      fs.mkdirSync(path, {recursive: true});
    }
    fs.writeFileSync(path, JSON.stringify(dataset), {encoding: 'utf8'});
  }
}

export namespace CsvService {
  export interface parseOptions {
    readonly delimiter: string;
    readonly date: {
      readonly colomnIndex: number | string;
      readonly format: string;
    };
    readonly roll: {
      readonly colomnIndex1: number | string;
      readonly colomnIndex2: number | string;
      readonly colomnIndex3: number | string;
      readonly colomnIndex4: number | string;
      readonly colomnIndex5: number | string;
    };
    readonly magic: {
      readonly colomnIndex: number | string;
    };
  }
}
