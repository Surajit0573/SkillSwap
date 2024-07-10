import * as React from 'react';
import Button from '@mui/material/Button';
export default function Teacher() {
    return (
        <>
            <div className='teacher'>
                <h2>Meet Your Teacher</h2>
                <div className="profile-card">
                    <img src="https://picsum.photos/200/300" alt="teacher" />
                    <div className="info">
                        <h4>Teacher Name <Button variant="outlined" className='info-button'>Follow</Button></h4>
                        <p>Research Scientist</p>
                    </div>
                </div>
                <div className='teacher-about'>
                    Hi, I'm Alvin. I was formerly a computer science lecturer at UC Berkeley, where I served on various course staffs for 5 years. I'm now a research scientist at a large tech company, working on cutting edge AI. I've got courses to get you started -- not just to teach the basics, but also to get you excited to learn more. For more, see my Guide to Coding or YouTube.
                </div>
            </div>
        </>
    )
}