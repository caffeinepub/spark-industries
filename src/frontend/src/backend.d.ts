import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRequest {
    serviceType: ServiceType;
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum ServiceType {
    both = "both",
    laserCutting = "laserCutting",
    pressBrake = "pressBrake"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimFirstAdmin(): Promise<boolean>;
    getAllRequests(): Promise<Array<ContactRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRequestByTimestamp(timestamp: bigint): Promise<ContactRequest>;
    getRequestsByServiceType(serviceType: ServiceType): Promise<Array<ContactRequest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isAdminClaimed(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRequest(name: string, email: string, phone: string, company: string, serviceType: ServiceType, message: string): Promise<void>;
}
