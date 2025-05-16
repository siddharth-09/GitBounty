'use client';

import Image from 'next/image';
import xd from '@/public/image.png';
import auth from '@/public/auth2.png'

const tableData = [
  {
    icon: null,
    issue: 'Implement OAuth2 Authentication',
    tags: [auth],
    bounty: '$1500',
    status: 'Completed',
  },
  {
    icon: null,
    issue: 'Develop Cross-Platform Notification System',
    tags: [xd],
    bounty: '$3200',
    status: 'Completed',
  },
 
];


export default function ProfileTable() {
  return (
    <div className="max-w-7xl mx-auto mt-12 px-6 py-10 rounded-3xl border border-white/10 backdrop-blur-lg bg-white/5 shadow-2xl relative overflow-x-auto">
      {/* Gradient Border Layer */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-tr from-cyan-300/20 via-white/10 to-transparent mask-border" />

      <table className="min-w-[800px] w-full border-separate border-spacing-y-4 text-white relative z-10">
        <thead>
          <tr className=" text-cyan-300 uppercase text-sm font-semibold tracking-wide h-14 ">
            <th className="px-6 text-left w-2/5 ">Issue</th>
            <th className="px-6 text-left w-1/4">Tags</th>
            <th className="px-6 text-left w-1/6">Bounty</th>
            <th className="px-6 text-center w-1/5">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="transition-all duration-300 rounded-xl  hover:shadow-cyan-500/20 hover:scale-[1.01] hover:bg-cyan-500/10 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <td className="flex items-center gap-4 px-6 py-5 font-semibold text-white rounded-xl">
                {row.icon && (
                  <Image
                    src={row.icon}
                    alt="Issue Icon"
                    width={45}
                    height={45}
                    className="rounded-xl object-cover w-[45px] h-[45px] shadow-cyan-500/20 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110"
                  />
                )}
                <span>{row.issue}</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex -space-x-4">
                  {row.tags.map((tag, i) => (
                    <Image
                      key={i}
                      src={tag}
                      alt={`Tag ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-cyan-400/40 bg-neutral-900 w-[40px] h-[40px] object-cover transition-all hover:scale-110 hover:z-10 shadow-md"
                    />
                  ))}
                </div>
              </td>
              <td className="px-6 py-5 text-white/90">{row.bounty}</td>
              <td className="px-6 py-5 text-center">
                <span className="inline-block px-4 py-1 rounded-full border border-cyan-300/30 bg-white/10 text-cyan-200 font-semibold text-sm transition-all hover:bg-cyan-300/20 hover:scale-105 cursor-pointer shadow-inner">
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Keyframe animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        .mask-border {
          mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          z-index: -1;
          position: absolute;
          content: '';
        }
      `}</style>
    </div>
  );
}
