const API_URL = "https://demo2.z-bit.ee/tasks";

function getToken() {
    return localStorage.getItem("token");
}

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return await res.json();
}

export async function addTask(title) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            title
        }),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return await res.json();
}

export async function updateTask(id, updates) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updates),
    });
    return await res.json();
}

export async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function login({
    username,
    password
}) {
    const res = await fetch(`${API_URL}/users/get-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("userId", data.id);
    return data;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
}