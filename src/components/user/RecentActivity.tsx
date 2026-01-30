const RecentActivity = () => {
  const activities = [
    'AL moved SCRUM-54 to In Progress',
    'LI completed SCRUM-60',
    'Sprint 9 started',
  ];

  return (
    <div className="p-5 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a]">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

      <ul className="space-y-3 text-sm text-gray-400">
        {activities.map((a, i) => (
          <li key={i} className="border-b border-[#2a2a2a] pb-2">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
