interface StatCardProps {
  title: string;
  value: number;
  highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, highlight }) => {
  return (
    <div className={`p-5 rounded-lg bg-[#1f1f1f] border ${
      highlight ? 'border-red-500' : 'border-[#2a2a2a]'
    }`}>
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
};

export default StatCard;
