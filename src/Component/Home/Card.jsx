import { useNavigate } from "react-router-dom"
export default function Card({data}) {
    const navigate = useNavigate()
    function clickHandeler(){
        navigate("/details");
    }
    return (
        <>
            <div className="card" onClick={clickHandeler}>

                <img src={data.thumbnail} alt="" />
                <div className="info">
                    <p>32000 Students</p>
                    <p>3h 50m</p>
                </div>
              <h4>{data.title}</h4>
              <div className="detail">
              <p>Rating: 4.5 (5000)</p>
              <p>Price:{data.price}</p>
              </div>
              <div className="info">
                <p>Surajit Maity</p>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>

        </>
    )
}