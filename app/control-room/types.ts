// Shared fetch-wrapper type used by ControlRoomClient.tsx and every *Tab.tsx
// component. Attaches the Bearer token and returns a parsed status+body pair
// so tabs don't each re-implement fetch/JSON error handling.
export type ApiFn = (path: string, opts?: RequestInit) => Promise<{ status: number; data: any }>;
