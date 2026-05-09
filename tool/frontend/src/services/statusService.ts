import { RTIStatus } from '../types/db';
import { config } from '../config';
import { ListResponse } from '../types/api';

const BASE_URL = config.RTI_TRACKER_SERVER_URL;

const handleApiError = (error: any) => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw error;
};

export const statusService = {
  /**
   * Fetches the list of RTI statuses with pagination.
   */
  async list(page: number, pageSize: number, search?: string, httpClient?: any): Promise<ListResponse<RTIStatus>> {
    if (!httpClient) throw new Error('Asgardeo HTTP client is required');

    try {
      const response = await httpClient.request({
        url: `${BASE_URL}/api/v1/rti_statuses`,
        params: { page, pageSize, query: search },
        method: 'GET',
      });
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  /**
   * Creates a new RTI status.
   */
  async create(payload: Partial<RTIStatus>, httpClient?: any): Promise<RTIStatus> {
    if (!httpClient) throw new Error('Asgardeo HTTP client is required');

    console.log('[statusService] Creating status:', payload);
    try {
      const response = await httpClient.request({
        url: `${BASE_URL}/api/v1/rti_statuses`,
        method: 'POST',
        data: { name: payload.name },
      });
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  /**
   * Updates an existing RTI status.
   */
  async update(id: string, payload: Partial<RTIStatus>, httpClient?: any): Promise<RTIStatus> {
    if (!httpClient) throw new Error('Asgardeo HTTP client is required');

    console.log('[statusService] Updating status:', id, payload);
    try {
      const response = await httpClient.request({
        url: `${BASE_URL}/api/v1/rti_statuses/${id}`,
        method: 'PUT',
        data: { name: payload.name },
      });
      return response.data;
    } catch (e) {
      throw handleApiError(e);
    }
  },

  /**
   * Deletes an RTI status.
   */
  async remove(id: string, httpClient?: any): Promise<void> {
    if (!httpClient) throw new Error('Asgardeo HTTP client is required');

    console.log('[statusService] Deleting status:', id);
    try {
      await httpClient.request({
        url: `${BASE_URL}/api/v1/rti_statuses/${id}`,
        method: 'DELETE',
      });
    } catch (e) {
      throw handleApiError(e);
    }
  }
};



