import './App.css';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@dynamods/notifications-panel';
import Timestamp from '@hig/timestamp';
import axios from 'axios';

function App() {
  const [APIData, setAPIData] = useState({ loaded: false, notifications: [], title: 'Notifications', bottomButtonText: 'Mark all as read' });
  useEffect(() => {
    if (process.env.NOTIFICATION_URL) {
      axios.get(process.env.NOTIFICATION_URL)
        .then((response) => {
          let notificationsData = parseNotifications(response.data.notifications);
          setAPIData(() => {
            return {
              loaded: true,
              notifications: notificationsData
            };
          });
        });
    } else {
      window.setNotifications = setNotifications;
      window.setTitle = setTitle;
      window.setBottomButtonText = setBottomButtonText;
    }
  }, []);

  const setNotifications = (notifications) => {
    let notificationsData = parseNotifications(notifications);
    setAPIData(prevState => {
      return {
        loaded: true,
        notifications: [...prevState.notifications, ...notificationsData],
        title: prevState.title,
        bottomButtonText: prevState.bottomButtonText
      };
    });
  };

  const parseNotifications = (notifications) => {
    let notificationsData = [];
    for (let i = 0; i < notifications.length; i++) {
      var notificationItem = {
        id: notifications[i].id,
        featured: true,
        unread: !notifications[i].isRead,
        image: <img width={40} src={notifications[i].thumbnail}></img>,
        message: notifications[i].title,
        href: notifications[i].linkTitle,
        timestamp: <Timestamp timestamp={notifications[i].created} />,
        content: <div>
          <b>{notifications[i].title}</b>
          <p>{notifications[i].longDescription}</p>
          <a href={notifications[i].link} target="_blank" rel="noreferrer">{notifications[i].linkTitle}</a>
        </div>
      };
      notificationsData.push(notificationItem);
    }
    return notificationsData;
  };

  const markAllAsRead = () => {
    let notificationsData = APIData.notifications;
    for (let i = 0; i < notificationsData.length; i++) {
      notificationsData[i].unread = false;
    }

    setAPIData(() => {
      return {
        loaded: true,
        notifications: notificationsData,
        title: APIData.title,
        bottomButtonText: APIData.bottomButtonText
      };
    });

    const readIds = notificationsData.map(x => x.id);
    if (chrome.webview !== undefined) {
      chrome.webview.hostObjects.scriptObject.SetNoficationsAsRead(readIds);
    }
  };

  const setTitle = (titleText) => {
    setAPIData( prevState => {
      return {
        loaded: prevState.loaded,
        notifications: prevState.notifications,
        title: titleText,
        bottomButtonText: prevState.bottomButtonText,
      };
    });
  };

  const setBottomButtonText = (buttonText) => {
    setAPIData( prevState => {
      return {
        loaded: prevState.loaded,
        notifications: prevState.notifications,
        title: prevState.title,
        bottomButtonText: buttonText,
      };
    });
  };

  return APIData.loaded ?
    <NotificationsPanel class="NotificationsFlyout"
      heading={APIData.title}
      markAllAsReadTitle={APIData.bottomButtonText}
      indicatorTitle="View application alerts"
      onClickMarkAllAsRead={markAllAsRead}
      notifications={APIData.notifications}>
    </NotificationsPanel>
    : null;
}

export default App;
