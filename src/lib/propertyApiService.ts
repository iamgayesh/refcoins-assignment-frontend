import ApiManager from "./apiManager";

// API Response interfaces
interface ApiResponse<T> {
  responseCode: string;
  responseMsg: string;
  content: T | null;
  exception: string | null;
}

// Property interfaces matching backend schema
export interface Property {
  propertyId: number;
  propertyTitle: string;
  propertySlug: string;
  propertyLocation: {
    locationId: number;
    locationDescription: string;
  };
  propertyDescription: string;
  propertyPrice: number;
  propertyType: {
    typeId: number;
    typeDescription: string;
  };
  propertyStatus: {
    statusId: number;
    statusDescription: string;
  };
  propertyArea: number;
  propertyImagePath: string;
  imageUrl?: string; // Full URL for image display
  createdAt: string;
  updatedAt: string;
}

// Pagination interface
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Paginated response interface
export interface PaginatedPropertiesResponse {
  data: Property[];
  pagination: PaginationInfo;
}

export interface CreatePropertyData {
  propertyTitle: string;
  propertySlug: string;
  propertyLocation: number;
  propertyDescription: string;
  propertyPrice: number;
  propertyType: number;
  propertyStatus: number;
  propertyArea: number;
  propertyImagePath: string;
}

const PropertyApiService = {
  /**
   * Get all properties
   */
  getAllProperties: async (): Promise<Property[]> => {
    try {
      const response = await ApiManager.apiGet<ApiResponse<Property[]>>(
        "/properties"
      );

      if (response.responseCode === "00" && response.content) {
        return response.content;
      } else {
        console.error("Failed to fetch properties:", response.responseMsg);
        return [];
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  },

  /**
   * Get single property by ID
   */
  getPropertyById: async (id: number): Promise<Property | null> => {
    try {
      const response = await ApiManager.apiGet<ApiResponse<Property>>(
        `/properties/${id}`
      );

      if (response.responseCode === "00" && response.content) {
        return response.content;
      } else {
        console.error("Failed to fetch property:", response.responseMsg);
        return null;
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      return null;
    }
  },

  /**
   * Create new property
   */
  createProperty: async (
    propertyData: CreatePropertyData
  ): Promise<Property | null> => {
    try {
      console.log(
        "🌐 PropertyApiService.createProperty called with:",
        propertyData
      );
      console.log("📡 Making POST request to /properties...");

      const response = await ApiManager.apiPost<ApiResponse<Property>>(
        "/properties",
        propertyData
      );

      console.log("📦 Backend response:", response);

      if (response.responseCode === "00" && response.content) {
        console.log(
          "✅ Property created successfully on backend:",
          response.content
        );
        return response.content;
      } else {
        console.error("❌ Backend returned error:", response.responseMsg);
        console.error("Full response:", response);
        return null;
      }
    } catch (error) {
      console.error("💥 API call failed:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      return null;
    }
  },

  /**
   * Update property
   */
  updateProperty: async (
    id: number,
    propertyData: Partial<CreatePropertyData>
  ): Promise<Property | null> => {
    try {
      const response = await ApiManager.apiPut<ApiResponse<Property>>(
        `/properties/${id}`,
        propertyData
      );

      if (response.responseCode === "00" && response.content) {
        return response.content;
      } else {
        console.error("Failed to update property:", response.responseMsg);
        return null;
      }
    } catch (error) {
      console.error("Error updating property:", error);
      return null;
    }
  },

  /**
   * Get properties with pagination
   */
  getPropertiesPaginated: async (
    page: number = 1,
    limit: number = 3
  ): Promise<PaginatedPropertiesResponse | null> => {
    try {
      interface PaginatedApiResponse {
        responseCode: string;
        responseMsg: string;
        content: Property[];
        pagination: PaginationInfo;
        exception: string | null;
      }

      const response = await ApiManager.apiGet<PaginatedApiResponse>(
        `/properties/paginated?page=${page}&limit=${limit}`
      );

      if (response.responseCode === "00" && response.content) {
        return {
          data: response.content,
          pagination: response.pagination,
        };
      } else {
        console.error(
          "Failed to fetch paginated properties:",
          response.responseMsg
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching paginated properties:", error);
      return null;
    }
  },

  /**
   * Delete property
   */
  deleteProperty: async (id: number): Promise<boolean> => {
    try {
      const response = await ApiManager.apiDelete<
        ApiResponse<{ deleted: boolean }>
      >(`/properties/${id}`);

      if (response.responseCode === "00" && response.content) {
        return response.content.deleted;
      } else {
        console.error("Failed to delete property:", response.responseMsg);
        return false;
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      return false;
    }
  },
};

export default PropertyApiService;
