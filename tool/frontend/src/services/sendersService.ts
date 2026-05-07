const BASE_URL = import.meta.env.VITE_RTI_TRACKER_SERVER_URL || 'http://localhost:8000';

export const sendersService = {
  async listSenders(page: number, pageSize: number, search?: string, httpClient?: any) {
    const response = await httpClient.request({
      url: `${BASE_URL}/api/v1/senders`,
      params: { page, pageSize, query: search },
      method: 'GET',
    });
    return response.data;
  }
};

