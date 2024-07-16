export default function About({data}) {
    return (<>
    <div className="about">
        <h2 className="text-2xl font-semibold my-4 ">About This Class</h2>
        <p className="text-xl">{data&&data.description}</p>
        <h3 className="text-2xl font-semibold my-4 ">What You Need</h3>
        <p className="text-xl">{data&&data.requirements}</p>
        <h3 className="text-2xl font-semibold my-4 ">What You'll Learn</h3>
        <p className="text-xl">{data&&data.benefits}</p>
        </div>
    </>)
}