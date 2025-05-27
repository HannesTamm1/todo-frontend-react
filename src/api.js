const API_URL = "https://demo2.z-bit.ee";

export async function login(username, password) {
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
    const {
        access_token
    } = await res.json();
    localStorage.setItem("access_token", access_token);
}

export async function register(username, password) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            newPassword: password
        }),
    });
    if (!res.ok) throw new Error("Registration failed");
}

export function logout() {
    localStorage.removeItem("access_token");
}

export function getToken() {
    return localStorage.getItem("access_token");
}

export async function getTasks() {
    const token = getToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${API_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return await res.json();
}

export async function addTask(title) {
    const token = getToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title
        }),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return await res.json();
}

export async function updateTask(id, updates) {
    const token = getToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return await res.json();
}

export async function deleteTask(id) {
    const token = getToken();
    if (!token) throw new Error("Not logged in");
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (!res.ok) throw new Error("Failed to delete task");
}