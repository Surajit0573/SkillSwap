import * as React from 'react';
import Button from '@mui/material/Button';
export default function Teacher({data}) {
    return (
        <>
            <div className='teacher'>
                <h2 className='text-2xl my-4 font-semibold '>Meet Your Teacher</h2>
                <div className="profile-card">
                    <img src={data&&data.profile.dp} alt="teacher" />
                    <div className="info">
                        <h4 className='font-semibold text-xl '>{data&&data.profile.fullname}<Button variant="outlined" className='info-button ml-2'>Follow</Button></h4>
                        <p>{data&&data.teacher.domain}</p>
                    </div>
                </div>
                <div className='teacher-about'>
                   <p>{data&&data.profile.about}</p>
                   </div>
            </div>
        </>
    )
}