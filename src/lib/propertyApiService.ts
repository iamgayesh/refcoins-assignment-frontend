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
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyData {
  propertyTitle: string;
  propertySlug: string;
  propertyLocation: number;
  propertyDescription?: string;
  propertyPrice: number;
  propertyType: number;
  propertyStatus: number;
  propertyArea: number;
  propertyImagePath?: string;
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
      const response = await ApiManager.apiPost<ApiResponse<Property>>(
        "/properties",
        propertyData
      );

      if (response.responseCode === "00" && response.content) {
        return response.content;
      } else {
        console.error("Failed to create property:", response.responseMsg);
        return null;
      }
    } catch (error) {
      console.error("Error creating property:", error);
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
