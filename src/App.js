import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';

function App() {

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`http://demo9540080.mockable.io/notifications`)
      .then((response) => {
        setAPIData(response.data.notifications);
      })
  }, []);

  return (
    <div className="App">
      <div className='App-header'>Notification<button className="btn"><span class="fa fa-filter"></span></button>
      </div>
      <hr />
      {APIData.map((data) => {
        return (
          <div key={data.id}>
            <div className='row'>
              <div className='newNotification'></div>
              <div className='imageColumn'>
                <img className='notificationImage' alt='' src={data.thumbnail} />
              </div>
              <div className='column'>
                <strong>{data.title}</strong>
                <div><a href={data.link} target="_blank">Register link</a></div>
                <div name="notificationDate">{Moment(data.created).format("MMM Do YYYY")}</div>
              </div>
            </div>
            <hr />
          </div>
        )
      })}
      <footer className='notificationsFooter'>
        <button className='markReadButton'>
          Mark all as read
        </button>
        <a className='seeAllLink' href="#">See all</a>
      </footer>
    </div>
  );
}

export default App;
