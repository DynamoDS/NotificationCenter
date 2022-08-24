import './App.css';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@dynamods/notifications-panel';
import Timestamp from '@hig/timestamp';
import axios from 'axios';

function App() {

  const [APIData, setAPIData] = useState({ loaded: false, notifications: [] });


  useEffect(() => {

    if (process.env.NOTIFICATION_URL) {
      axios.get(process.env.NOTIFICATION_URL)
        .then((response) => {

          let notificationsData = parseNotifications(response.data.notifications);
          setAPIData(() => {
            return {
              loaded: true,
              notifications: notificationsData
            }
          });

        });
    }
    else {
      window.setNotifications = setNotifications;
    }

  }, []);

  const setNotifications = (notifications) => {
    let notificationsData = parseNotifications(notifications);
    setAPIData(prevState => {
      return {
        loaded: true,
        notifications: [...prevState.notifications, ...notificationsData]
      }
    });
  }

  function parseNotifications(notifications) {
    let notificationsData = [];
    for (let i = 0; i < notifications.length; i++) {
      var notificationItem = {
        id: notifications[i].id,
        featured: true,
        unread: true,
        image: <img width={40} src={notifications[i].thumbnail}></img>,
        message: notifications[i].title,
        href: notifications[i].linkTitle,
        timestamp: <Timestamp timestamp={notifications[i].created} />,
        content: <div>
          <b>{notifications[i].title}</b>
          <p>{notifications[i].longDescription}</p>
          <a href={notifications[i].link} target="_blank">{notifications[i].linkTitle}</a>
        </div>
      };
      notificationsData.push(notificationItem);
    }
    return notificationsData;
  };


  return APIData.loaded ?
      <NotificationsPanel class="NotificationsFlyout"
      heading="Notifications"
      indicatorTitle="View application alerts"
      notifications={APIData.notifications}>
    </NotificationsPanel>
    : null;
}
export default App;
