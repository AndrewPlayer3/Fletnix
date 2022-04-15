export default function DisplayRating({ rating }) {
    return (
        <div className="star-rating flex rounded-sm">
            {[...Array(5)].map((star, index) => {
                index += 1
                return (
                    <p
                        key={'Star:' + index}
                        className={
                            index <= rating
                                ? 'text-lg text-stone-100'
                                : 'text-lg text-stone-100'
                        }
                    >
                        {index <= rating ? (
                            <span className="star">&#9733;</span>
                        ) : (
                            <span className="star">&#9734;</span>
                        )}
                    </p>
                )
            })}
        </div>
    )
}
