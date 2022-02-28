import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import UserEdit from '../components/user-edit';

export default function CollaborativeEdit() {
  const [users, setUsers] = useState([1]);
  const addUser = () => {
    setUsers([...users, users.length + 1]);
  };
  return (
    <div>
      <div className="action-region">
        <Button type="primary" onClick={addUser}>
          增加用户
        </Button>
      </div>
      {users.map((user) => (
        <UserEdit key={user} user={user} />
      ))}
    </div>
  );
}
