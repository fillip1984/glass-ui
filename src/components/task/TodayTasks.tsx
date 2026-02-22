export default function TodayTasks() {
  return (
    <div className="glass-card rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Today Tasks</h2>
      <ul className="mt-4 space-y-2">
        <li className="flex items-center">
          <input type="checkbox" className="mr-3" />
          <span>Review pull requests</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" className="mr-3" />
          <span>Update documentation</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" className="mr-3" />
          <span>Fix reported bugs</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" className="mr-3" />
          <span>Team standup meeting</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" className="mr-3" />
          <span>Code refactoring</span>
        </li>
      </ul>
    </div>
  );
}
