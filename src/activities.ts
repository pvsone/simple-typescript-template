import { log, sleep } from '@temporalio/activity';

export interface EchoInput {
  val: string;
}

export interface EchoOutput {
  result: string;
}

export const createActivities = (num: number) => ({
  async echo1(input: string): Promise<string> {
    log.info('echo1 activity started', { input });

    await sleep(1000);

    return input;
  },

  async echo2(input: string): Promise<string> {
    log.info('echo2 activity started', { input });

    await sleep(1000);

    return input;
  },

  async echo3(input: string): Promise<string> {
    log.info('echo3 activity started', { input });

    await sleep(1000);

    return input;
  },

  async echo4(input: EchoInput): Promise<EchoOutput> {
    log.info('echo4 activity started', { input });

    await sleep(1000);

    let result = '';
    for (let i = 0; i < num; i++) {
      result += input.val + ', ';
    }

    return { result };
  },
});
