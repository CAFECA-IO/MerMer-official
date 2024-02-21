export type INotificationLevel = 'INFO' | 'NOTE' | 'CAUTION' | 'CRITICAL';

export type INotificationLevelConstant = {
  INFO: INotificationLevel;
  NOTE: INotificationLevel;
  CAUTION: INotificationLevel;
  CRITICAL: INotificationLevel;
};

export const NotificationLevel: INotificationLevelConstant = {
  INFO: 'INFO', // The notification is not serious.
  NOTE: 'NOTE', // The notification is not very serious.
  CAUTION: 'CAUTION', // The notification is somewhat serious.
  CRITICAL: 'CRITICAL', //The notification is very serious.
};
