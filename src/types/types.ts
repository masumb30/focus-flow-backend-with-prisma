export interface UniversalResponseDataType<T>{
    message: string;
    success: boolean;
    data: T;
}
