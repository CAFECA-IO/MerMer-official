import EventEmitter from 'events';
import React, {createContext} from 'react';
import useState from 'react-usestateref';
import {KmEvent} from '../constants/km_event';
import {
  INotificationItem,
  dummyNotifications,
  dummyUnReadNotifications,
} from '../interfaces/notification_item';

export interface INotificationProvider {
  children: React.ReactNode;
}

export interface INotificationContext {
  emitter: EventEmitter;
  notifications: INotificationItem[];
  unreadNotifications: INotificationItem[];
}

export const NotificationContext = createContext<INotificationContext>({
  emitter: new EventEmitter(),
  notifications: [],
  unreadNotifications: [],
});

export const NotificationProvider = ({children}: INotificationProvider) => {
  const emitter = React.useMemo(() => new EventEmitter(), []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications, notificationsRef] =
    useState<INotificationItem[]>(dummyNotifications);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [unreadNotifications, setUnreadNotifications, unreadNotificationsRef] =
    useState<INotificationItem[]>(dummyUnReadNotifications);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 

  const updateNotifications = (notifications: INotificationItem[]) => {
    const updateNotifications: INotificationItem[] = [...notifications];
    setNotifications(updateNotifications);
    setUnreadNotifications(updateNotifications.filter(n => !n.isRead));
  };

  

  // Event: Logout
  const clearPrivateNotification = () => {
    let updateNotifications: INotificationItem[] = notificationsRef.current
      ? [...notificationsRef.current]
      : [];
    let updateUnreadNotifications: INotificationItem[] = [];
    updateNotifications = updateNotifications.filter(n => n.public);
    updateUnreadNotifications = updateNotifications.filter(n => !n.isRead);
    setNotifications(updateNotifications);
    setUnreadNotifications(updateUnreadNotifications);
  };

  React.useMemo(() => emitter.on(KmEvent.DISCONNECTED, clearPrivateNotification), []);
  React.useMemo(
    () => emitter.on(KmEvent.UPDATE_READ_NOTIFICATIONS_RESULT, updateNotifications),
    []
  );
  React.useMemo(() => emitter.on(KmEvent.NOTIFICATIONS, updateNotifications), []);

  const defaultValue = {
    emitter,
    notifications,
    unreadNotifications,
  };

  return (
    <NotificationContext.Provider value={defaultValue}>{children}</NotificationContext.Provider>
  );
};
