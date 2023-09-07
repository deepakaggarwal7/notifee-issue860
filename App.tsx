/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import notifee, {AndroidImportance, TriggerType} from '@notifee/react-native';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const CHANNEL_ID = 'alarm';

  useEffect(() => {
    const bootstrap = async () => {
      const channel = await notifee.getChannel(CHANNEL_ID);
      if (channel == null) {
        console.log('creating channel ' + CHANNEL_ID);
        await notifee.createChannel({
          id: CHANNEL_ID,
          name: 'Firing alarms & timers',
          lights: false,
          vibration: true,
          importance: AndroidImportance.DEFAULT,
        });
      }

      const notificationId = await notifee.createTriggerNotification(
        {
          title: 'Wake up',
          body: 'Time to go for a jogging!!',
          android: {
            channelId: CHANNEL_ID,
          },
        },
        {
          timestamp: new Date(new Date().getTime() + 30000).getTime(),
          type: TriggerType.TIMESTAMP,
        },
      );
      console.log('Scheduled:', notificationId);
    };
    bootstrap().then(() => {
      console.log('initialized notifications');
    });
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View>
          <Button
            title="Create Channel"
            onPress={async () => {
              await notifee.createChannel({
                id: 'alarm',
                name: 'Firing alarms & timers',
                lights: false,
                vibration: true,
                importance: AndroidImportance.DEFAULT,
              });
            }}
          />
          <Button
            title="Show Alert"
            onPress={async () => {
              // Display a notification
              await notifee.displayNotification({
                title: 'Wake up',
                body: 'Time to go for a jogging!!',
                android: {
                  channelId: 'alarm',
                },
              });
            }}
          />
          <Button
            title="Schedule Alert"
            onPress={async () => {
              // Display a notification
              await notifee.createTriggerNotification(
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
              );
            }}
          />
          <Button
            title="Reset"
            onPress={async () => {
              notifee.deleteChannel('alarm');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
