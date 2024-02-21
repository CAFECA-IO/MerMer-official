import React, {createContext, useRef} from 'react';
import useState from 'react-usestateref';
import {formatAPIRequest, FormatedTypeRequest, TypeRequest} from '../constants/api_request';

type IJobType = 'API' | 'WS';

export interface IJobTypeConstant {
  API: IJobType;
  WS: IJobType;
}
export const JobType: IJobTypeConstant = {
  API: 'API',
  WS: 'WS',
};

interface IWorkerProvider {
  children: React.ReactNode;
}
interface IWorkerContext {
  requestHandler: (data: TypeRequest) => Promise<unknown>;
}

export const WorkerContext = createContext<IWorkerContext>({
  requestHandler: () => Promise.resolve(),
});

const callbacks = new Map();
/** Deprecated: replaced by pusher (20230502 - tzuhan) 
let wsWorker: WebSocket | null;
*/

export const WorkerProvider = ({children}: IWorkerProvider) => {
  //Info: 使用一个映射表来存儲每个請求的解決（resolve）和拒絕（reject）函數 （20231130 - tzuhan)
  // Info: for the use of useStateRef (20231106 - Shirley)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [apiWorker, setAPIWorker, apiWorkerRef] = useState<Worker | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const jobQueueOfWS = useRef<((...args: []) => Promise<void>)[]>([]);
  const jobQueueOfAPI = useRef<((...args: []) => Promise<void>)[]>([]);

  const createJob = (type: IJobType, callback: () => Promise<unknown>) => {
    const job = () => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          await callback();
          resolve();
        } catch {
          reject();
        }
      });
    };
    switch (type) {
      case JobType.API:
        jobQueueOfAPI.current = [...jobQueueOfAPI.current, job];
        break;
      case JobType.WS:
        jobQueueOfWS.current = [...jobQueueOfWS.current, job];
        break;
      default:
        break;
    }
  };

  const requestHandler = async (data: TypeRequest) => {
    const apiWorker = apiWorkerRef.current;

    if (apiWorker) {
      const request: FormatedTypeRequest = formatAPIRequest(data);

      apiWorker.onmessage = event => {
        const {name, result, error} = event.data;

        //Info: 檢查是否存在對應的回調 （20231130 - tzuhan)
        const {resolve, reject} = callbacks.get(name) || {};

        if (resolve && reject) {
          if (error) reject(error);
          else resolve(result);

          //Info: 完成後移除回調 （20231130 - tzuhan)
          callbacks.delete(name);
        }
      };

      return new Promise((resolve, reject) => {
        //Info: 存儲當前請求的回調 （20231130 - tzuhan)
        callbacks.set(request.name, {resolve, reject});
        apiWorker.postMessage(request.request);
      });
    } else {
      createJob(JobType.API, () => requestHandler(data));
    }
  };

  const defaultValue = {
    requestHandler,
  };

  return <WorkerContext.Provider value={defaultValue}>{children}</WorkerContext.Provider>;
};
