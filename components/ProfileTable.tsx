import React from 'react';
import Image from 'next/image';

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
              <Image src="xd-icon.png" alt="XD" className="icon" />
              Chakra Soft UI Version
            </td>
            <td>
              <div className="avatars">
                <Image src="user1.png" alt="User 1" />
                <Image src="user2.png" alt="User 2" />
                <Image src="user3.png" alt="User 3" />
              </div>
            </td>
            <td>$14,000</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>Add Progress Track</td>
            <td>
              <div className="avatars">
                <Image src="user4.png" alt="User 4" />
                <Image src="user5.png" alt="User 5" />
              </div>
            </td>
            <td>$3,000</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <Image src="slack-icon.png" alt="Slack" className="icon" />
              Fix Platform Errors
            </td>
            <td>
              <div className="avatars">
                <Image src="user6.png" alt="User 6" />
              </div>
            </td>
            <td>Not set</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <Image src="spotify-icon.png" alt="Spotify" className="icon" />
              Launch our Mobile App
            </td>
            <td>
              <div className="avatars">
                <Image src="user7.png" alt="User 7" />
                <Image src="user8.png" alt="User 8" />
              </div>
            </td>
            <td>$32,000</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <Image src="diamond-icon.png" alt="Diamond" className="icon" />
              Add the New Pricing Page
            </td>
            <td>
              <div className="avatars">
                <Image src="user9.png" alt="User 9" />
                <Image src="user10.png" alt="User 10" />
              </div>
            </td>
            <td>$400</td>
            <td className="status">Completed</td>
          </tr>
          <tr>
            <td>
              <Image src="invision-icon.png" alt="Invision" className="icon" />
              Redesign New Online Shop
            </td>
            <td>
              <div className="avatars">
                <Image src="user11.png" alt="User 11" />
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

