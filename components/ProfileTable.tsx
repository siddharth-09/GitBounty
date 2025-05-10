import React from 'react';


const ProfileTable = () => {
  return (
    <div className="profileTableContainer">
      <table className="customTable">
        <thead>
          <tr>
            <th>Issues Created</th>
            <th>Tags</th>
            <th>Bounty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="xd-icon.png" alt="XD" className="icon" />
              Chakra Soft UI Version
            </td>
            <td>
              <div className="avatars">
                <img src="user1.png" alt="User 1" />
                <img src="user2.png" alt="User 2" />
                <img src="user3.png" alt="User 3" />
              </div>
            </td>
            <td>$14,000</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>Add Progress Track</td>
            <td>
              <div className="avatars">
                <img src="user4.png" alt="User 4" />
                <img src="user5.png" alt="User 5" />
              </div>
            </td>
            <td>$3,000</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <img src="slack-icon.png" alt="Slack" className="icon" />
              Fix Platform Errors
            </td>
            <td>
              <div className="avatars">
                <img src="user6.png" alt="User 6" />
              </div>
            </td>
            <td>Not set</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <img src="spotify-icon.png" alt="Spotify" className="icon" />
              Launch our Mobile App
            </td>
            <td>
              <div className="avatars">
                <img src="user7.png" alt="User 7" />
                <img src="user8.png" alt="User 8" />
              </div>
            </td>
            <td>$32,000</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <img src="diamond-icon.png" alt="Diamond" className="icon" />
              Add the New Pricing Page
            </td>
            <td>
              <div className="avatars">
                <img src="user9.png" alt="User 9" />
                <img src="user10.png" alt="User 10" />
              </div>
            </td>
            <td>$400</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <img src="invision-icon.png" alt="Invision" className="icon" />
              Redesign New Online Shop
            </td>
            <td>
              <div className="avatars">
                <img src="user11.png" alt="User 11" />
              </div>
            </td>
            <td>$7,600</td>
            <td className="status">Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;

