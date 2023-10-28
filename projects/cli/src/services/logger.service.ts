import {red, gray, bold} from 'colorette';
import {Injectable} from '@nestjs/common';

@Injectable()
export class LoggerService {
  public info(...write: unknown[]): void {
    write.forEach(text => {
      console.log(bold('[INFO] ') + text);
    });
  }

  public debug(...write: unknown[]): void {
    if (process.env.DEBUG) {
      write.forEach(text => {
        console.log(gray(bold('[DEBUG] ') + text));
      });
    }
  }

  public error(...write: unknown[]): void {
    write.forEach(text => {
      console.log(red(bold('[ERROR] ') + text));
    });
  }

  public fatal(write: unknown, exitCode = -1): never {
    console.log(red(bold('[FATAL] ') + write));
    // eslint-disable-next-line no-process-exit
    process.exit(exitCode);
  }
}
