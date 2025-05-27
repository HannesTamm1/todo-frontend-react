import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getTasks, addTask, updateTask, deleteTask } from "../../api";
import { Button, Input, List, Checkbox, message, Space } from "antd";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const data = await getTasks();
        setTasks(data.map(t => ({
          id: t.id,
          title: t.title,
          completed: t.marked_as_done,
        })));
      } catch {
        message.error("Failed to fetch tasks");
      }
      setLoading(false);
    })();
  }, [navigate]);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    try {
      const t = await addTask(newTask);
      setTasks([...tasks, { id: t.id, title: t.title, completed: t.marked_as_done }]);
      setNewTask("");
    } catch {
      message.error("Failed to add task");
    }
  };

  const handleToggle = async (task) => {
    try {
      await updateTask(task.id, { marked_as_done: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    } catch {
      message.error("Failed to update task");
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteTask(task.id);
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch {
      message.error("Failed to delete task");
    }
  };

  // --- Editing logic ---
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const saveEdit = async (task) => {
    try {
      await updateTask(task.id, { title: editingText });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, title: editingText } : t));
      setEditingId(null);
      setEditingText("");
    } catch {
      message.error("Failed to update task text");
    }
  };

  const handleEditKeyDown = (e, task) => {
    if (e.key === "Enter") {
      saveEdit(task);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", marginTop: "5vh" }}>
      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="New task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>Add</Button>
        <Button onClick={() => navigate("/logout")}>Logout</Button>
      </Space>
      <List
        loading={loading}
        bordered
        dataSource={tasks}
        renderItem={task => (
          <List.Item
            actions={[
              <Button danger onClick={() => handleDelete(task)} size="small">Delete</Button>
            ]}
          >
            <Checkbox checked={task.completed} onChange={() => handleToggle(task)} />
            {editingId === task.id ? (
              <Input
                style={{ marginLeft: 8, width: "60%" }}
                value={editingText}
                onChange={handleEditChange}
                onBlur={() => saveEdit(task)}
                onKeyDown={e => handleEditKeyDown(e, task)}
                autoFocus
              />
            ) : (
              <span
                style={{ marginLeft: 8, textDecoration: task.completed ? "line-through" : undefined, cursor: "pointer" }}
                onClick={() => startEdit(task)}
                title="Click to edit"
              >
                {task.title}
              </span>
            )}
          </List.Item>
        )}
      />
    </div>
  );
}