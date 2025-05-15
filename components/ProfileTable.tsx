import React from 'react';
import Image from 'next/image';
import xd from "@/public/xd-icon.jpg"

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
          {/* Row 1 */}
          <tr>
            <td>
              <Image src={xd} alt="XD" className="icon" width={40} height={40} />
              Chakra Soft UI Version
            </td>
            <td>
              <div className="avatars">
                <Image src={xd} alt="User 1" width={40} height={40} />
                <Image src={xd} alt="User 2" width={40} height={40} />
                <Image src={xd} alt="User 3" width={40} height={40} />
              </div>
            </td>
            <td>$14,000</td>
            <td className="status">Completed</td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td>Add Progress Track</td>
            <td>
              <div className="avatars">
                <Image src={xd} alt="User 4" width={40} height={40} />
                <Image src={xd} alt="User 5" width={40} height={40} />
              </div>
            </td>
            <td>$3,000</td>
            <td className="status">Completed</td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td>
              <Image src={xd} alt="Slack" className="icon" width={40} height={40} />
              Fix Platform Errors
            </td>
            <td>
              <div className="avatars">
                <Image src={xd} alt="User 6" width={40} height={40} />
              </div>
            </td>
            <td>Not set</td>
            <td className="status">Completed</td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td>
              <Image src={xd} alt="Spotify" className="icon" width={40} height={40} />
              Launch our Mobile App
            </td>
            <td>
              <div className="avatars">
                <Image src={xd} alt="User 7" width={40} height={40} />
                <Image src={xd} alt="User 8" width={40} height={40} />
              </div>
            </td>
            <td>$32,000</td>
            <td className="status">Completed</td>
          </tr>

          {/* Row 5 */}
          <tr>
            <td>
              <Image src={xd} alt="Diamond" className="icon" width={40} height={40} />
              Add the New Pricing Page
            </td>
            <td>
              <div className="avatars">
                <Image src={xd} alt="User 9" width={40} height={40} />
                <Image src={xd} alt="User 10" width={40} height={40} />
              </div>
            </td>
            <td>$400</td>
            <td className="status">Completed</td>
          </tr>

          {/* Row 6 */}
          <tr>
            <td>
              <Image src={xd} alt="Invision" className="icon" width={40} height={40} />
              Redesign New Online Shop
            </td>
            <td>
              <div className="avatars">
                <Image src={xd} alt="User 11" width={40} height={40} />
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
