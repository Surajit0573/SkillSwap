import * as React from 'react';
import Rating from '@mui/material/Rating';
export default function Review({data}){
    return(
        <>
            <div className="review">
                <div className="title">
                    <img src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"></img>
                    <h3>Surajit</h3>
                </div>
                <h3 className="text-xl mb-2 flex items-center">{data&&data.rating} {data&&<Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />}(4500)</h3>
                <p>{data&&data.comment}</p>
            </div>
        </>
    )
}