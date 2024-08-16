export default function About({ data }) {
    return (
      <div className="about p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold my-4 text-gray-100">About This Class</h2>
        <p className="text-lg text-gray-300 mb-6">
          {data?.description || "No description available."}
        </p>
  
        <h3 className="text-2xl font-semibold my-4 text-gray-100">What You Need</h3>
        {Array.isArray(data?.requirements) ? (
          <ul className="list-disc list-inside text-lg text-gray-300 mb-6">
            {data.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-300 mb-6">
            {data?.requirements || "No specific requirements provided."}
          </p>
        )}
  
        <h3 className="text-2xl font-semibold my-4 text-gray-100">What You'll Learn</h3>
        {Array.isArray(data?.benefits) ? (
          <ul className="list-disc list-inside text-lg text-gray-300">
            {data.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-300">
            {data?.benefits || "No specific benefits listed."}
          </p>
        )}
      </div>
    );
  }
  