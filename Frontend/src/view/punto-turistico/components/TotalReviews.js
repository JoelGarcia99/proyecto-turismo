const TotalReviews = () => {
	return <div className="w-full px-4 py-4 mb-1 tracking-wide">
    <h2 className="mt-1 font-semibold text-gray-800">106 usuarios dejaron reviews</h2>
    <div className="px-8 pb-3 -mx-8 border-b">
      <div className="flex items-center mt-1">
        <div className="w-1/5 tracking-tighter text-gray-500">
          <span>5 star</span>
        </div>
        <div className="w-3/5">
          <div className="w-full h-2 bg-gray-300 rounded-lg">
            <div className="w-7/12 h-2 bg-yellow-600 rounded-lg"></div>
          </div>
        </div>
        <div className="w-1/5 pl-3 text-gray-700">
          <span className="text-sm">51%</span>
        </div>
      </div>
      <div className="flex items-center mt-1">
        <div className="w-1/5 tracking-tighter text-gray-500">
          <span>4 star</span>
        </div>
        <div className="w-3/5">
          <div className="w-full h-2 bg-gray-300 rounded-lg">
            <div className="w-1/5 h-2 bg-yellow-600 rounded-lg"></div>
          </div>
        </div>
        <div className="w-1/5 pl-3 text-gray-700">
          <span className="text-sm">17%</span>
        </div>
      </div>
      <div className="flex items-center mt-1">
        <div className="w-1/5 tracking-tighter text-gray-500">
          <span>3 star</span>
        </div>
        <div className="w-3/5">
          <div className="w-full h-2 bg-gray-300 rounded-lg">
            <div className="w-3/12 h-2 bg-yellow-600 rounded-lg"></div>
          </div>
        </div>
        <div className="w-1/5 pl-3 text-gray-700">
          <span className="text-sm">19%</span>
        </div>
      </div>
      <div className="flex items-center mt-1">
        <div className="w-1/5 tracking-tighter text-gray-500">
          <span>2 star</span>
        </div>
        <div className="w-3/5">
          <div className="w-full h-2 bg-gray-300 rounded-lg">
            <div className="w-1/5 h-2 bg-yellow-600 rounded-lg"></div>
          </div>
        </div>
        <div className="w-1/5 pl-3 text-gray-700">
          <span className="text-sm">8%</span>
        </div>
      </div>
      <div className="flex items-center mt-1">
        <div className="w-1/5 tracking-tighter text-gray-500">
          <span>1 star</span>
        </div>
        <div className="w-3/5">
          <div className="w-full h-2 bg-gray-300 rounded-lg">
            <div className="w-2/12 h-2 bg-yellow-600 rounded-lg"></div>
          </div>
        </div>
        <div className="w-1/5 pl-3 text-gray-700">
          <span className="text-sm">5%</span>
        </div>
      </div>
    </div>
  </div>
}

export default TotalReviews
