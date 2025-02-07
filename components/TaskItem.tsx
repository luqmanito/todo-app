const TaskItem = ({ task }: { task: any }) => {
    return (
      <div className="p-4 border rounded-md shadow-sm">
        <h3 className="text-lg font-semibold">{task.name}</h3>
        <p>{task.description}</p>
        <p className="text-gray-600">Status: {task.status}</p>
      </div>
    );
  };
  
  export default TaskItem;
  