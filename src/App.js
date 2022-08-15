import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@filipeop/notifications-panel';
import Timestamp from '@hig/timestamp';

function App() {
  const [APIData, setAPIData] = useState(false);
  useEffect(() => {
    window.RequestNotifications = RequestNotifications;
  }, []);
  
  const RequestNotifications = (url) => {
    axios.get(url)
    .then((response) => {
      const notifications = response.data.notifications;
      let notificationData = [];
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
            <a href={notifications[i].link}>{notifications[i].linkTitle}</a>
          </div>
        };
        notificationData.push(notificationItem);
      }
      setAPIData(notificationData);
    });
  }
  return APIData ?
  <NotificationsPanel class="NotificationsFlyout"
      heading="Notifications"
      indicatorTitle="View application alerts"
      notifications={APIData}>
  </NotificationsPanel>
  : null;
}
export default App;