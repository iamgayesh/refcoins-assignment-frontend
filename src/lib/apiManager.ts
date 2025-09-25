import axios, { AxiosRequestHeaders } from "axios";

const BASE_URL = "http://localhost:7000";

type OptionalHeaders = AxiosRequestHeaders | undefined;

const ApiManager = {
  /**
   * Generic POST request
   * @param endpoint API endpoint (e.g., "/users")
   * @param data Request body
   * @param headers Optional headers
   */
  apiPost: async <T, D = unknown>(
    endpoint: string,
    data: D,
    headers?: OptionalHeaders
  ): Promise<T> => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token;

      const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data, {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("POST request failed:", error);
      throw error;
    }
  },

  /**
   * Generic GET request
   * @param endpoint API endpoint (e.g., "/users")
   * @param params Query parameters
   * @param headers Optional headers
   */
  apiGet: async <T = unknown>(
    endpoint: string,
    params: Record<string, unknown> = {},
    headers?: OptionalHeaders
  ): Promise<T> => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token;

      const fullUrl = `${BASE_URL}${endpoint}`;
      console.log("Making GET request to:", fullUrl);
      console.log("With params:", params);
      console.log("With headers:", {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      });

      const response = await axios.get<T>(fullUrl, {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
        params,
      });

      console.log("GET Response received:", response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("GET request failed:", error);

      // Check for CORS issues
      if (error instanceof Error) {
        if (
          error.message.includes("CORS") ||
          error.message.includes("Access-Control")
        ) {
          console.error(
            "🚨 CORS Error detected! Make sure backend CORS is configured properly."
          );
        }
        if (error.message.includes("Network Error")) {
          console.error(
            "🚨 Network Error! Make sure backend is running on http://localhost:7000"
          );
        }
      }

      throw error;
    }
  },

  /**
   * Generic PUT request
   * @param endpoint API endpoint (e.g., "/users/1")
   * @param data Request body
   * @param headers Optional headers
   */
  apiPut: async <T, D = unknown>(
    endpoint: string,
    data: D,
    headers?: OptionalHeaders
  ): Promise<T> => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token;

      const response = await axios.put<T>(`${BASE_URL}${endpoint}`, data, {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("PUT request failed:", error);
      throw error;
    }
  },

  /**
   * Generic DELETE request
   * @param endpoint API endpoint (e.g., "/users/1")
   * @param headers Optional headers
   */
  apiDelete: async <T = unknown>(
    endpoint: string,
    headers?: OptionalHeaders
  ): Promise<T> => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token;

      const response = await axios.delete<T>(`${BASE_URL}${endpoint}`, {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  },
};

export default ApiManager;
