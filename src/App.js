import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationsFlyout, { anchorPoints }  from "@hig/notifications-flyout";
import Timestamp from "@hig/timestamp";

function App() {
  let notificationData = [];
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`http://demo9540080.mockable.io/notifications`)
      .then((response) => {
        setAPIData(response.data.notifications);
      })
  }, []);
  
  for (let i = 0; i < APIData.length; i++) 
  {
	var notificationItem = {
							  id: APIData[i].id,
							  featured: true,
							  unread: true,
							  message: APIData[i].title,
							  href: APIData[i].linkTitle,
							  timestamp: <Timestamp timestamp= {APIData[i].created} />,
							  content: <div>
											<a style={{marginRight:'15px', marginTop:'-2px'}}><img width="20" src={APIData[i].thumbnail}/></a>
											<b>{APIData[i].title}</b>
											<br/><br/>
											<p>{APIData[i].longDescription}</p>
											<a href={APIData[i].link}>{APIData[i].linkTitle}</a>
									   </div>
						   };
	notificationData.push(notificationItem);
  } 
  
  return (
    <div className="App">
	  <NotificationsFlyout class="NotificationsFlyout"
				heading="Notifications"
				indicatorTitle="View application alerts"
				anchorPoint={anchorPoints.TOP_LEFT}
				notifications={notificationData}>
      </NotificationsFlyout>
    </div>
  );
}

export default App;