import '@hig/fonts/build/ArtifaktElement.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useReRender } from './hooks';
import NotificationsPanel from '@dynamods/notifications-panel';
import { EmptyStateArchiver } from './icons';
import Timestamp from '@hig/timestamp';
import axios from 'axios';

function App() {
  const [APIData, setAPIData] = useState({ loaded: false, notifications: [], title: 'Notifications', bottomButtonText: 'Mark all as read' });
  const forceRender = useReRender();

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
      window.setPopupHeight = setPopupHeight;
    }
  },[]);

  const validateNotificationUrl = (url) => !url.startsWith("https://") ? `https://${url}` : url;

  const setPopupHeight = () => {
    if(chrome.webview === undefined) return;
    chrome.webview.hostObjects.scriptObject.UpdateNotificationWindowSize(document.body.scrollHeight);
  };

  useEffect(() => {
    setPopupHeight();
  });

  const setNotifications = (notifications) => {
    let notificationsData = parseNotifications(notifications);
    setAPIData(prevState => {
      return {
        loaded: true,
        notifications: notificationsData,
        title: prevState.title,
        bottomButtonText: prevState.bottomButtonText
      };
    });
  };

  const notificationChanged = () => {
    forceRender();
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
          <a href={validateNotificationUrl(notifications[i].link)} target="_blank" rel="noreferrer">{notifications[i].linkTitle}</a>
        </div>
      };
      notificationsData.push(notificationItem);
    }
    return notificationsData;
  };

  //This function should receive an array of notifications [N] [1,2,3 ... 4]
  const markAsRead = (markedNotifications) => {
    if (!Array.isArray(markedNotifications)) markedNotifications = [markedNotifications];

    const updatedNotifications = APIData.notifications.map(notification => {
      if(!markedNotifications.includes(notification.id)) return notification;
      return {
        ...notification,
        unread: false
      };
    });

    setAPIData(prevState => {
      return {
        ...prevState,
        notifications: updatedNotifications
      };
    });

    const readNotifications = APIData.notifications.filter( notification => notification.unread !== false);
    const readNotificationsIDs = readNotifications.map(notification => notification.id);

    if(chrome.webview === undefined) return;
    chrome.webview.hostObjects.scriptObject.SetNotificationsAsRead(readNotificationsIDs);
  };

  const setTitle = (titleText) => {
    setAPIData(prevState => {
      return {
        loaded: prevState.loaded,
        notifications: prevState.notifications,
        title: titleText,
        bottomButtonText: prevState.bottomButtonText
      };
    });
  };

  const setBottomButtonText = (buttonText) => {
    setAPIData(prevState => {
      return {
        loaded: prevState.loaded,
        notifications: prevState.notifications,
        title: prevState.title,
        bottomButtonText: buttonText
      };
    });
  };

  return APIData.loaded ?
    <NotificationsPanel
      class="NotificationsFlyout"
      heading={APIData.title}
      markAllAsReadTitle={APIData.bottomButtonText}
      indicatorTitle="View application alerts"
      markAsRead={markAsRead}
      notifications={APIData.notifications}
      emptyImage={<EmptyStateArchiver />}
      emptyTitle={'No notifications'}
      emptyMessage={'You currently have no notifications. New notifications will appear above'}
      onNotificationChanged={notificationChanged}
    />
    : null;
}

export default App;
