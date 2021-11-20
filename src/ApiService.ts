import axios, { AxiosInstance } from "axios";

const API_BASE = "https://newonce-api.herokuapp.com/";

class ApiService {
  service: AxiosInstance;

  constructor() {
    let service = axios.create({
      baseURL: API_BASE,
      headers: {
        Accept: "application/json text/plain",
        "Content-Type": "application/json;charset=UTF=8",
      },
    });
    this.service = service;
  }

  get<T>(url: string) {
    return this.service.get<T>(url);
  }

  patch<T>(url: string, data: any) {
    return this.service.request<T>({
      method: "PATCH",
      url,
      responseType: "json",
      data,
    });
  }

  post<T>(url: string, data: any) {
    return this.service.request<T>({
      method: "POST",
      url,
      responseType: "json",
      data,
    });
  }
}

export default new ApiService();
