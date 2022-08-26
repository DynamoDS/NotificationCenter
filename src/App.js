import './App.css';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@filipeop/notifications-panel';
import Timestamp from '@hig/timestamp';

function App() {
  const [APIData, setAPIData] = useState({ loaded: false, notifications: [] });
  useEffect(() => {
    window.setNotifications = setNotifications;
  }, []);

  const setNotifications = (notifications) => {
    let notificationsData = [];
    for (let i = 0; i < notifications.length; i++) {
      var notificationItem = {
        id: notifications[i].id,
        featured: false,
        unread: notifications[i].isUnread,
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
    setAPIData(prevState => {
      return {
        loaded: true,
        notifications: [...prevState.notifications, ...notificationsData]
      }
    });


  }

  const markAllAsRead = () => {
    let notificationsData = APIData.notifications;
    for (let i = 0; i < notificationsData.length; i++) {
      notificationsData[i].unread = false;
    }

    setAPIData(() => {
      return {
        loaded: true,
        notifications: notificationsData
      }
    });

    const readIds = notificationsData.map(x => x.id);
    if (chrome.webview !== undefined) {
      chrome.webview.hostObjects.scriptObject.SetNoficationsAsRead(readIds);
    }
  }

  return APIData.loaded ?
    <NotificationsPanel class="NotificationsFlyout"
      heading="Notifications"
      indicatorTitle="View application alerts"
      onClickMarkAllAsRead={markAllAsRead}
      notifications={APIData.notifications}>
    </NotificationsPanel>
    : null;
}
export default App;