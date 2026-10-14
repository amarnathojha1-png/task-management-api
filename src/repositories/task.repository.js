
const tasks = [];

let nextId = 1;

export function findAll() {
  return tasks;
}

export function findById(id) {
  return tasks.find((task) => task.id === id);
}

export function create(taskData) {
  const now = new Date().toISOString();

  const task = {
    id: String(nextId++),
    title: taskData.title,
    description: taskData.description ?? '',
    status: taskData.status ?? 'pending',
    priority: taskData.priority ?? 'medium',
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);

  return task;
}

export function update(id, changes) {
  const task = findById(id);

  if (!task) {
    return undefined;
  }

  Object.assign(task, changes);
  task.updatedAt = new Date().toISOString();

  return task;
}

export function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
}
