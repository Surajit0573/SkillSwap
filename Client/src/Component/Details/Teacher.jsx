import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

export default function Teacher({ data }) {
  return (
    <div className="teacher p-6 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-100 mb-4">Meet Your Teacher</h2>
      {data && (
        <NavLink to={`/profile/${data.username}`} className="block">
          <div className="profile-card bg-gray-800 dark:bg-gray-900 p-4 rounded-lg shadow-md flex items-center">
            <img
              src={data.profile.dp}
              alt="teacher"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div className="info">
              <h4 className="text-xl font-semibold text-gray-100 flex items-center">
                {data.profile.fullname}
                <Button
                  variant="outlined"
                  className="ml-2 border-gray-500 text-gray-100 hover:bg-gray-700 dark:border-gray-400 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Follow
                </Button>
              </h4>
              <p className="text-gray-400">{data.teacher.domain}</p>
            </div>
          </div>
        </NavLink>
      )}
      <div className="teacher-about mt-4">
        <p className="text-gray-300">{data?.profile.about || "No information available."}</p>
      </div>
    </div>
  );
}
