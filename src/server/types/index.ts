export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse extends ApiResponse<User> {}

export interface DashboardData {
    totalUsers: number;
    totalSales: number;
    totalRevenue: number;
}