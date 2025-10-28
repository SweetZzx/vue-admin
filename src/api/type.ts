export interface ApiReponse<T = unknown> {
  code: number;
  data: T;
  message?: string;
}
