// Reference
//https://dev.to/tripathics/creating-an-alert-system-with-context-and-hook-in-react-713
import { createContext, useContext, useRef, useState } from "react";
import { Alert, AlertsWrapper, IAlert } from "../components/mermer_admin/alert/alert";

// Info Murky (20240207) 如何使用AlertHook

// 先import
// import { useAlerts } from "./alerts/alerts-context";

// 取出hook 的 addAlert, clearAlerts
// const { addAlert, clearAlerts } = useAlerts();

// 將 serverity = 'success'| 'error, message = '錯誤訊息', timeout = 到期時間 放入addAlert, handleDismiss可以決定timeout之後要做什麼事，不提供就會在timeout後alert自己消失
// addAlert({ severity, message, timeout });

// 用 useEffect 清除所有alert

// 範例如下，要展現收回去的動畫，要用setTimeout之後再 clearAlerts
// Test Alert
// const { addAlert, clearAlerts } = useAlerts();
// const handleOnclickAlert = () => {
//   addAlert({
//     severity: 'success', message: '成功訊息', timeout: 3000, handleDismiss: () => {
//       setTimeout(() => {
//         clearAlerts();
//       }, 2000);
//     }
//   });
// };


type IAlertOmitId = Omit<IAlert, "id">

export interface IAlertsContext {
  alerts: IAlert[];
  addAlert: (alert: IAlertOmitId) => string;
  dismissAlert: (id: string) => void;
}

export interface IAlertsProvider {
  children: React.ReactNode;
}
const AlertsContext = createContext<IAlertsContext>({
  alerts: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAlert: (alert: IAlertOmitId) => {
    return '';
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dismissAlert: (id: string) => {
    return;
  },
});

export default function AlertsProvider({ children }: IAlertsProvider) {
  const [alerts, setAlerts] = useState<IAlert[]>([]);


  const addAlert = (alert: IAlertOmitId) => {
    // random id
    const id = Math.random().toString(36).slice(2, 9) + new Date().getTime().toString(36);
    setAlerts((prev) => [{ ...alert, id: id }, ...prev]);
    return id;
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }

  const defaltValue = {
    alerts,
    addAlert,
    dismissAlert,
  };

  // // 預設是alert會自動消失
  // const defaltHandleDissmiss = (alert: IAlert) => {
  //   dismissAlert(alert.id)
  // }

  return (
    <AlertsContext.Provider value={defaltValue}>
      <AlertsWrapper>
        {alerts.map((alert) => (
          // <Alert key={alert.id} {...alert} handleDismiss={() => { defaltHandleDissmiss(alert) }} />
          <Alert key={alert.id} {...alert} />
        ))}
      </AlertsWrapper>
      {children}
    </AlertsContext.Provider>
  );
}

// hook
export const useAlerts = () => {
  const [alertIds, setAlertIds] = useState<string[]>([]);
  const alertIdsRef = useRef(alertIds);
  const { addAlert, dismissAlert } = useContext(AlertsContext);

  const addAlertWithId = (alert: IAlertOmitId) => {
    const id = addAlert(alert);
    alertIdsRef.current.push(id);
    setAlertIds(alertIdsRef.current);
  }

  const clearAlerts = () => {
    alertIdsRef.current.forEach((id) => dismissAlert(id));
    alertIdsRef.current = [];
    setAlertIds([]);
  }
  return { addAlert: addAlertWithId, clearAlerts };
}