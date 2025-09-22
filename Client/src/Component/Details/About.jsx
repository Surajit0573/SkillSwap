export default function About({ data }) {
  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <i className="fa-solid fa-info-circle text-cyan-400"></i>
          About This Course
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
      </div>

      <div className="space-y-8">
        {/* Description */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10">
          <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
            {data?.description || "No description available."}
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fa-solid fa-clipboard-check text-cyan-400"></i>
            Prerequisites
          </h3>
          {Array.isArray(data?.requirements) ? (
            <ul className="space-y-3">
              {data.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-300 bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
              {data?.requirements || "No specific requirements provided."}
            </p>
          )}
        </div>

        {/* Learning Outcomes */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fa-solid fa-graduation-cap text-cyan-400"></i>
            What You'll Learn
          </h3>
          {Array.isArray(data?.benefits) ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-300 bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
                  <i className="fa-solid fa-check text-green-400 mt-1 flex-shrink-0"></i>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-300 bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
              {data?.benefits || "No specific benefits listed."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}