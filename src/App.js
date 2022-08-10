import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@filipeop/notifications-panel';
import Timestamp from '@hig/timestamp';

function App() {
    let notificationData = [];
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(process.env.NOTIFICATION_URL)
            .then((response) => {
                setAPIData(response.data.notifications);
            });
    }, []);

  for (let i = 0; i < APIData.length; i++) {
    var notificationItem = {
      id: APIData[i].id,
      featured: true,
      unread: true,
      image: <img width={40} src={APIData[i].thumbnail}></img>,
      message: APIData[i].title,
      href: APIData[i].linkTitle,
      timestamp: <Timestamp timestamp={APIData[i].created} />,
      content: <div>                
        <b>{APIData[i].title}</b>
        <p>{APIData[i].longDescription}</p>
        <a href={APIData[i].link}>{APIData[i].linkTitle}</a>
      </div>
    };
    notificationData.push(notificationItem);
  }

  return (
    <NotificationsPanel class="NotificationsFlyout"
      heading="Notifications"
      indicatorTitle="View application alerts"
      notifications={notificationData}>
    </NotificationsPanel>
  );
}

export default App;
