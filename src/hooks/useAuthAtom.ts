import { atom, useAtom } from 'jotai';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

const userAtom = atom<User>(null);

export function useAuthAtom() {
  const [user, setUser] = useAtom(userAtom);

  return {
    user,
    login: (userData: NonNullable<User>) => setUser(userData),
    logout: () => setUser(null),
  };
}
