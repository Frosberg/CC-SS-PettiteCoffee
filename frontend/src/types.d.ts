interface User {
    email: string;
    estado: string;
    fechaRegistro: string;
    rol: string;
    token: string;
}

interface Product {
    codproducto: string;
    nombre: string;
    categoria: string;
    stock: number;
    precioventa: number;
    fechaVencimiento: string;
    imageUrl: string;
}

interface Branch {
    direccion: string;
    idsucursal?: number;
    nombre: string;
}

interface Notify {
    idNotificaciones: number;
    asunto: string;
    descripcion: string;
    fechaHoraEnvio: string;
}

// Stores
interface AuthStore {
    user: User | null;
    email: string | null;
    error: string | null;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    setSession: (user: User) => void;
    setRecovery: (recovery: { email: string | null }) => Promise<boolean>;
    setChangePassword: ({
        password,
        token,
    }: {
        password: string;
        token: string;
    }) => Promise<boolean>;
}

interface ProductStore {
    products: Product[];
    getProducts: () => void;
}

interface BranchStore {
    branchs: Branch[];
    getBranchs: () => void;
    createBranch: (Branch) => void;
}

interface NotifyStore {
    notifys: Notify[];
    getNotifys: () => void;
}
