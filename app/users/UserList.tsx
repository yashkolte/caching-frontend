"use client";

import { useUsers } from "@/app/lib/fetchUsers";
import { api } from "@/app/lib/api";

export default function UserList() {
  const { users, isLoading, isError, mutate } = useUsers();

  const handleDelete = async (id: number) => {
    await api.delete(`/users/${id}`);
    mutate(); // Refresh cache
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">User List</h2>
      <ul>
        {users.map((user: { id: number; name: string; email: string }) => (
          <li key={user.id} className="flex justify-between items-center p-2 border-b">
            <span>{user.name} ({user.email})</span>
            <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
