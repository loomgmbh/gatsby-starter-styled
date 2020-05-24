import React from 'react';
import './styles.scss';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Moment from 'react-moment';
import { since, epochToSeconds } from '../../hooks';

JavascriptTimeAgo.locale(en);

const UserTeaser = props => {
  const { uid, name, csrf_token, logout_token, startTime } = props;
  return (
    <div className="user-teaser">
      <span>
        <h4>uid:</h4>
        <h2>{uid}</h2>
      </span>
      <span>
        <h4>name:</h4>
        <h2>{name}</h2>
      </span>
      <span>
        <h3>You logged in: </h3>
        <h5>
          <Moment fromNow>{startTime}</Moment>
        </h5>
      </span>
      <span />
    </div>
  );
};
export default UserTeaser;
