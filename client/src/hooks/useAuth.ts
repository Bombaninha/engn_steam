import { useContext } from 'react';
import { Context } from '../contexts/AuthContext';

export function useAuth() {
    const { user, authenticated } = useContext(Context);

    return { user, authenticated };
}
