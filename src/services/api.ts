import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
};

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      const request = error.request as XMLHttpRequest;
      if (
        request &&
        request.responseURL ===
          'https://camera-shop.accelerator.pages.academy/coupons'
      ) {
        if (request.status === 400) {
          return;
        }
      }
      if (error.message) {
        toast.error(error.message);
      }

      throw error;
    }
  );

  return api;
};
