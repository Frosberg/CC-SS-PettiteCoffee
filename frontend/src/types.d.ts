// Stores
interface AuthStore {
    token: string | null;
    user: string | null;
    error: string | null;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    setSession: ({ user: User, token: string }) => void;
}
