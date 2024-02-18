import { proxyActivities, log, sleep } from '@temporalio/workflow';
import { createActivities } from './activities';

const { echo1, echo2, echo3, echo4 } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '5 seconds',
  retry: {
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumInterval: '30s',
  },
});

interface SimpleInput {
  val: string;
}

interface SimpleOutput {
  result: string;
}

export async function simple(input: SimpleInput): Promise<SimpleOutput> {
  log.info('Simple workflow started', { input });

  const result1 = await echo1(input.val);

  const result2 = await echo2(result1);

  const result3 = await echo3(result2);

  log.info('Sleeping for 1 second...');
  await sleep(1000);

  const echoInput = { val: result3 };
  const echo4Promise = echo4(echoInput);
  const echoOutput = await echo4Promise;

  return { result: echoOutput.result };
}
