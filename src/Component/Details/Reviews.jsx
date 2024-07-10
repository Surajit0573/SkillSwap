import Review from './Review';
export default function Reviews() {
    return (
        <>
          <div className="reviews">
            <h2>Class Reviews</h2>
            <Review name={"Hinata"}/>
            <Review name={"Naruto"}/>
            <Review name={"Sasuke"}/>

          </div>
        </>
    )
}