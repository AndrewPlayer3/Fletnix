export default function DisplayRating({ rating }) {
    return (
        <div className="flex w-auto h-full items-end justify-center star-rating rounded-sm">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <div className='w-auto h-full mb-1 items-end justify-center shadow-xl'>
                        <button
                            type="button"
                            key={index}
                            className={index <= (rating) ? "text-stone-100 text-2xl" : "text-stone-100 text-2xl"} >
                            {index <= (rating) ? <span className="star drop-shadow-xl">&#9733;</span> : <span className="star">&#9734;</span>}
                        </button>
                    </div>
                );
            })}
        </div>
    )
}