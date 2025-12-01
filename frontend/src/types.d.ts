interface User {
    idcuenta: number;
    email: string;
    estado: string;
    fechaRegistro: string;
    rol: string;
    token: string;
    alias?: string;
    direccion?: string;
    pais?: string;
    fechaNacimiento?: string;
    telefono?: string;
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
    idProducto?: number;
    codproducto: string;
    nombre: string;
    precioventa: number;
    imageUrl: string;
    quantity: number;
    customizations?: CartItemCustomization[];
    customKey?: string;
}

type CartItemCustomization = {
    id: string;
    label: string;
    value: string;
};

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

interface PurchaseProduct {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

interface Purchase {
    id?: number;
    cityDelivery?: string;
    addressDelivery: number;
    total: string;
    detalles: PurchaseProduct[];
}

interface Review {
    idReview: number;
    nombre: string;
    email: string;
    cuerpo: string;
    puntuacion: number;
    verified: boolean;
}

interface ChangePasswordResponse {
    valido: boolean;
    mensaje: string;
}

type IAProduct = {
    codproducto: string;
    nombre: string;
    categoria?: string;
    precioventa: string | number;
    stock?: number;
};

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
    products?: IAProduct[];
};

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

type UpdateProfilePayload = {
    alias: string;
    direccion: string;
    pais: string;
    telefono: string;
    fechaNacimiento: string;
};

// Purchase Api
type NewPurchaseProduct = {
    idProducto: number;
    quantity: number;
};

type NewPurchasePayload = {
    montoProcesado: number;
    productos: NewPurchaseProduct[];
    cityDelivery: string;
    addressDelivery: string;
};

// Review Api
type ReviewGuestPayload = {
    nombre: string;
    email: string;
    cuerpo: string;
    puntuacion: number;
};

type ReviewPayload = {
    cuerpo: string;
    puntuacion: number;
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
    updateUserData: (data: Partial<User>) => void;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (codproducto: string, customKey?: string) => void;
    decreaseQuantity: (codproducto: string, customKey?: string) => void;
    clearCart: () => void;
    total: () => number;
}

type ToastType = "success" | "warning" | "error";

type ToastPayload = {
    title: string;
    message: string;
    type?: ToastType;
    duration?: number;
};

type ToastStore = {
    isOpen: boolean;
    title: string;
    message: string;
    type: ToastType;
    duration: number;
    showToast: (payload: ToastPayload) => void;
    closeToast: () => void;
};
