const MyTasks = () => {
  const tasks = [
    'Fix auth bug',
    'Review sprint tasks',
    'Update backlog priorities',
  ];

  return (
    <div className="p-5 bg-[#1f1f1f] rounded-lg border border-[#2a2a2a]">
      <h3 className="text-lg font-semibold mb-4">My Tasks</h3>

      <ul className="space-y-3 text-sm">
        {tasks.map((task, i) => (
          <li
            key={i}
            className="p-3 bg-[#2a2a2a] rounded hover:bg-[#333]"
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasks;
