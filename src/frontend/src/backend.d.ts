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
export enum ServiceType {
    both = "both",
    laserCutting = "laserCutting",
    pressBrake = "pressBrake"
}
export interface backendInterface {
    getAllRequests(): Promise<Array<ContactRequest>>;
    getRequestByTimestamp(timestamp: bigint): Promise<ContactRequest>;
    getRequestsByServiceType(serviceType: ServiceType): Promise<Array<ContactRequest>>;
    submitRequest(name: string, email: string, phone: string, company: string, serviceType: ServiceType, message: string): Promise<void>;
}
