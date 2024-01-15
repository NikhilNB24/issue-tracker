"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = async () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await axios.get("/api/users");
        setUsers(data);
    };

    return (
        <Select.Root>
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) => (
                        <Select.Item key={user!.id} value={user!.id}>
                            {user!.email}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
