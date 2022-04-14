export default function DisplayRating({ rating }) {
    return (
        <div className="star-rating flex h-full w-auto items-end justify-center rounded-sm">
            {[...Array(5)].map((star, index) => {
                index += 1
                return (
                    <div
                        key={'Div:' + index}
                        className="mb-1 h-full w-auto items-end justify-center shadow-xl"
                    >
                        <button
                            type="button"
                            key={'Star:' + index}
                            className={
                                index <= rating
                                    ? 'text-2xl text-stone-100'
                                    : 'text-2xl text-stone-100'
                            }
                        >
                            {index <= rating ? (
                                <span className="star drop-shadow-xl">
                                    &#9733;
                                </span>
                            ) : (
                                <span className="star">&#9734;</span>
                            )}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
