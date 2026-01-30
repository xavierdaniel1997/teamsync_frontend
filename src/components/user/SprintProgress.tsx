const SprintProgress = () => {
  const progress = 65;

  return (
    <div className="col-span-2 p-5 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a]">
      <h3 className="text-lg font-semibold mb-4">Sprint Progress</h3>

      <div className="mb-2 flex justify-between text-sm text-gray-400">
        <span>SCRUM Sprint 9</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full bg-[#2a2a2a] h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-3">
        12 of 18 tasks completed
      </p>
    </div>
  );
};

export default SprintProgress;
