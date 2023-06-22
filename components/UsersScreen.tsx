import React, { FormEvent, useEffect, useRef, useState } from 'react';
import anime, { AnimeInstance } from 'animejs';
import Button from '@/components/Button';

interface UserScreenProps {
  onUsersConfirmed: (users: string[]) => void;
}

const UsersScreen = ({ onUsersConfirmed }: UserScreenProps) => {
  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState<string>('');
  const animationRef = useRef<AnimeInstance>();

  useEffect(() => {
    animationRef.current = anime({
      targets: ['.user', '.split-button'],
      opacity: [0, 1],
      translateY: ['50px', '0px'],
    });
  }, [users]);

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();

    if (user.length >= 2 && user.length <= 20 && !users.includes(user) && users.length < 6) {
      console.log(user);
      setUsers([...users, user]);
      setUser('');
    }
  };

  const handleRemoveUser = (index: number) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  return (
    <div className="w-full flex items-center justify-center flex-col gap-8">
      <div>
        <p className="text-neutral-500 font-light text-center text-sm">
          Please add users that will split the receipt. Minimum two users are required.
        </p>
      </div>
      <form onSubmit={handleAddUser} className="w-5/6 flex flex-col">
        <label htmlFor="user" className="text-sm text-neutral-500 font-light">
          User:
        </label>
        <input
          id="user"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          minLength={2}
          maxLength={20}
          className="h-8 px-2 text-xl rounded-md shadow-md"
        />
        <div className="w-full flex items-center justify-center mt-4">
          <button
            type="submit"
            className="w-1/2 h-8 flex items-center justify-center bg-gradient-to-r from-pink-500 to-violet-500 px-12 py-3 text-bold text-white text-sm rounded-xl shadow-xl"
          >
            ADD
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-3">
        {users.map((user, index) => (
          <div key={index} className="user w-80 flex justify-between bg-stone-200 rounded-xl shadow-sm [&>*]:flex [&>*]:items-center">
            <div className="px-2 py-1 text-lg">{user}</div>
            <button
              onClick={() => handleRemoveUser(index)}
              className="w-20 h-auto justify-center rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-xs font-bold text-white"
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>
      {users.length >= 2 && (
        <div className="split-button">
          <Button primary func={() => onUsersConfirmed(users)}>
            SPLIT RECEIPT
          </Button>
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
