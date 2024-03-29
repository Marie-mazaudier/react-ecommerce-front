import React from "react";
import StarRating from 'react-star-ratings'

export const showAverage = (p) => {
    if(p && p.ratings) {
        let ratingsArray = p && p.ratings
        let total = []
        let length = ratingsArray.length
        console.log(ratingsArray)
        ratingsArray.map((r) => total.push(r.star) )
        //check docs mozilla function reduce()
        let totalReduced = total.reduce((previousValue, nextValue) => previousValue + nextValue, 0 )
        console.log(totalReduced)
        let highest = length * 5
        console.log(highest)
        let result = (totalReduced * 5) / highest
        console.log(result)

        return(
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating 
                    starDimension= "20px"
                    starSpacing= "2px"
                    starRatedColor="red"
                    editing={false}
                    rating={result} />{" "}
                    ({p.ratings.length})
                </span>
            </div>
        )
    }
}
