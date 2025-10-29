interface User {
    idcuenta: number;
    email: string;
    estado: string;
    fechaRegistro: string;
    rol: string;
    token: string;
}

interface UserDataResponse {
    loginData: User;
}

interface Product {
    id: number;
    codproducto: string;
    nombre: string;
    categoria: string;
    stock: number;
    preciocompra: number;
    precioventa: number;
    fechaVencimiento: string;
    imageUrl: string;
}

interface CartItem {
    codproducto: string;
    nombre: string;
    precioventa: number;
    imageUrl: string;
    quantity: number;
}

interface Branch {
    idsucursal?: number;
    direccion: string;
    nombre: string;
}

interface Notify {
    idNotificaciones: number;
    asunto: string;
    descripcion: string;
    fechaHoraEnvio: string;
}

interface ChangePasswordResponse {
    valido: boolean;
    mensaje: string;
}

// ApiRequest
type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface ApiResponse<T = unknown> {
    ok: boolean;
    data?: T;
    message?: string;
    status?: number;
    details?: any;
}

interface ParsedError {
    OK: false;
    message: string;
    status?: number;
    details?: any;
}

// AuthApi Props
type CredentialProps = {
    username: string;
    password: string;
};

type RecoveryProps = {
    email: string;
};

type ChangePasswordProps = {
    email: string;
    token: string;
    nuevaPassword: string;
};

// Stores
type AuthLoadingType =
    | "LOGIN"
    | "REGISTER"
    | "LOGOUT"
    | "VERIFY_SESSION"
    | "RECOVERY"
    | "CHANGE_PASSWORD"
    | null;

interface AuthStore {
    isAuth: boolean;
    user: User | null;
    messageError: string;
    emailRecovery: string;
    isLoading: boolean;
    typeLoading: AuthLoadingType;
    register: (username: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    verifySession: () => Promise<void>;
    setRecoveryPassword: (email: string) => Promise<boolean>;
    setChangePassword: (email: string, password: string, uuid: string) => Promise<boolean>;
    setLoading: (loading: boolean) => void;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (codproducto: string) => void;
    decreaseQuantity: (codproducto: string) => void;
    clearCart: () => void;
    total: () => number;
}
