/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType, TriggerType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('notifee.onBackgroundEvent', EventType[type]);
  if (type == EventType.DELIVERED)
    notifee
      .createTriggerNotification(
        {
          title: 'Wake up',
          body: 'Time to go for a jogging!!',
          android: {
            channelId: 'alarm',
          },
        },
        {
          timestamp: new Date(new Date().getTime() + 30000).getTime(),
          type: TriggerType.TIMESTAMP,
        },
      )
      .then(v => console.log('Scheduled:', v));
});
AppRegistry.registerComponent(appName, () => App);
