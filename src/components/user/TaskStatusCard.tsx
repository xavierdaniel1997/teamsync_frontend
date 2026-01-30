const TaskStatusCard = () => {
  const statuses = [
    { label: 'To Do', count: 6 },
    { label: 'In Progress', count: 8 },
    { label: 'In Review', count: 4 },
    { label: 'Done', count: 12 },
  ];

  return (
    <div className="p-5 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a]">
      <h3 className="text-lg font-semibold mb-4">Task Status</h3>

      <div className="space-y-3">
        {statuses.map((s) => (
          <div key={s.label} className="flex justify-between text-sm">
            <span className="text-gray-400">{s.label}</span>
            <span className="font-medium">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusCard;
