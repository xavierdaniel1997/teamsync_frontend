const ShimmerUserPlanCard = () => {
    return (
      <div className="w-full sm:w-[250px] md:w-[250px] lg:w-[250px] relative bg-[#101010] p-6 rounded-md border border-[#444] animate-pulse">
        <div>
          {/* Title Placeholder */}
          <div className="h-6 w-32 bg-gray-700 rounded-md"></div>
  
          {/* Price Placeholder */}
          <div className="h-5 w-24 bg-gray-700 rounded-md mt-3"></div>
  
          {/* Features List */}
          <ul className="mt-4 space-y-3">
            {[1, 2, 3, 4].map((_, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
                <div className="h-5 w-32 bg-gray-700 rounded-md"></div>
              </li>
            ))}
          </ul>
  
          {/* Button Placeholder */}
          <div className="w-full mt-6 py-3 bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerUserPlanCard;
  