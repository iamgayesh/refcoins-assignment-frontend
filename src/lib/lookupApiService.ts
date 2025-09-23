import ApiManager from "./apiManager";
import { LookupItem } from "../redux/slices/lookupSlice";

// API response wrapper interface
export interface ApiResponse<T> {
  responseCode: string;
  responseMsg: string;
  content: T[];
  exception: string | null;
}

// Raw API data interfaces
export interface RawStatusItem {
  _id: string;
  statusId: number;
  statusDescription: string;
  __v: number;
}

export interface RawLocationItem {
  _id: string;
  locationId: number;
  locationDescription: string;
  __v: number;
}

export interface RawTypeItem {
  _id: string;
  typeId: number;
  typeDescription: string;
  __v: number;
}

/**
 * API service for common lookup endpoints
 * Handles fetching types, locations, and statuses from the backend
 */
export class LookupApiService {
  /**
   * Transform raw type data to LookupItem format
   */
  private static transformTypeData(rawTypes: RawTypeItem[]): LookupItem[] {
    return rawTypes.map((type) => ({
      id: type.typeId,
      description: type.typeDescription,
    }));
  }

  /**
   * Transform raw location data to LookupItem format
   */
  private static transformLocationData(
    rawLocations: RawLocationItem[]
  ): LookupItem[] {
    return rawLocations.map((location) => ({
      id: location.locationId,
      description: location.locationDescription,
    }));
  }

  /**
   * Transform raw status data to LookupItem format
   */
  private static transformStatusData(
    rawStatuses: RawStatusItem[]
  ): LookupItem[] {
    return rawStatuses.map((status) => ({
      id: status.statusId,
      description: status.statusDescription,
    }));
  }

  /**
   * Fetch all property types
   * @returns Promise<LookupItem[]>
   */
  static async getTypes(): Promise<LookupItem[]> {
    try {
      console.log("Fetching types from:", "/types");
      const response = await ApiManager.apiGet<ApiResponse<RawTypeItem>>(
        "/types"
      );
      console.log("Types response:", response);

      // Check if response is successful
      if (response.responseCode !== "00") {
        throw new Error(response.responseMsg || "Failed to fetch types");
      }

      const transformedData = this.transformTypeData(response.content || []);
      console.log("Transformed types data:", transformedData);
      return transformedData;
    } catch (error) {
      console.error("Failed to fetch types:", error);
      throw new Error("Failed to fetch property types");
    }
  }

  /**
   * Fetch all locations
   * @returns Promise<LookupItem[]>
   */
  static async getLocations(): Promise<LookupItem[]> {
    try {
      const response = await ApiManager.apiGet<ApiResponse<RawLocationItem>>(
        "/locations"
      );

      // Check if response is successful
      if (response.responseCode !== "00") {
        throw new Error(response.responseMsg || "Failed to fetch locations");
      }

      return this.transformLocationData(response.content || []);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      throw new Error("Failed to fetch locations");
    }
  }

  /**
   * Fetch all statuses
   * @returns Promise<LookupItem[]>
   */
  static async getStatuses(): Promise<LookupItem[]> {
    try {
      const response = await ApiManager.apiGet<ApiResponse<RawStatusItem>>(
        "/statuses"
      );

      // Check if response is successful
      if (response.responseCode !== "00") {
        throw new Error(response.responseMsg || "Failed to fetch statuses");
      }

      return this.transformStatusData(response.content || []);
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
      throw new Error("Failed to fetch statuses");
    }
  }

  /**
   * Test backend connection
   * @returns Promise<boolean>
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log("Testing backend connection...");
      const response = await ApiManager.apiGet<
        ApiResponse<{ message: string }>
      >("/test");
      console.log("Test response:", response);
      return response.responseCode === "00";
    } catch (error) {
      console.error("Backend connection test failed:", error);
      return false;
    }
  }

  /**
   * Fetch all lookup data at once
   * @returns Promise with all lookup data
   */
  static async getAllLookupData(): Promise<{
    types: LookupItem[];
    locations: LookupItem[];
    statuses: LookupItem[];
  }> {
    try {
      const [types, locations, statuses] = await Promise.all([
        this.getTypes(),
        this.getLocations(),
        this.getStatuses(),
      ]);

      return {
        types,
        locations,
        statuses,
      };
    } catch (error) {
      console.error("Failed to fetch lookup data:", error);
      throw new Error("Failed to fetch lookup data");
    }
  }
}

export default LookupApiService;
