import React, { useState } from "react";

const postRating = (video_rating, video_id) => {
    fetch(process.env.HOST_NAME + '/api/videos/' + video_id + '/rate', {
        method: 'POST',
        body: JSON.stringify({
            rating: video_rating,
        })
    }).then((res) => res.json()).then(console.log("Rating finished."));
}

export default function Rating({ video_id }) {

    let [rating, setRating] = useState(0);
    let [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "text-slate-200 text-2xl" : "text-slate-200 text-2xl"}
                        onClick={() => { setRating(index); postRating(index, video_id); }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)} >
                        {index <= (hover || rating) ? <span className="star">&#9733;</span> : <span className="star">&#9734;</span>}
                    </button>
                );
            })}
        </div>
    );
}