import React from 'react';
import Image from 'next/image';
import xd from '@/public/xd-icon.jpg';
import './ProfileTable.css';

const tableData = [
  {
    icon: xd,
    issue: 'Chakra Soft UI Version',
    tags: [xd, xd, xd],
    bounty: '$14,000',
    status: 'Completed',
  },
  {
    icon: null,
    issue: 'Add Progress Track',
    tags: [xd, xd],
    bounty: '$3,000',
    status: 'Completed',
  },
  {
    icon: xd,
    issue: 'Fix Platform Errors',
    tags: [xd],
    bounty: 'Not set',
    status: 'Completed',
  },
  {
    icon: xd,
    issue: 'Launch our Mobile App',
    tags: [xd, xd],
    bounty: '$32,000',
    status: 'Completed',
  },
  {
    icon: xd,
    issue: 'Add the New Pricing Page',
    tags: [xd, xd],
    bounty: '$400',
    status: 'Completed',
  },
  {
    icon: xd,
    issue: 'Redesign New Online Shop',
    tags: [xd],
    bounty: '$7,600',
    status: 'Completed',
  },
];

const ProfileTable = () => {
  return (
    <div className="profileTableContainer">      <table className="customTable">
        <thead>
          <tr>
            <th>Issue</th>
            <th>Tags</th>
            <th>Bounty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} style={{ '--index': index } as React.CSSProperties}>
              <td>
                {row.icon && (
                  <Image
                    src={row.icon}
                    alt="Issue Icon"
                    className="icon"
                    width={45}
                    height={45}
                  />
                )}
                {row.issue}
              </td>
              <td>
                <div className="avatars">
                  {row.tags.map((tag, i) => (
                    <Image
                      key={i}
                      src={tag}
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
              </td>
              <td>{row.bounty}</td>
              <td className="status">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
