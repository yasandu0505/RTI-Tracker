import { useQuery } from '@tanstack/react-query';
import { useAsgardeo } from '@asgardeo/react';
import { statusService } from '../services/statusService';

import { QUERY_STALE_TIME } from '../utils/constants';

/**
 * Hook to fetch all RTI statuses from the backend.
 */
export function useStatuses(page: number = 1, pageSize: number = 100, search?: string) {
  const { http } = useAsgardeo();

  return useQuery({
    queryKey: ['rti-statuses', page, pageSize, search],
    queryFn: () => statusService.list(page, pageSize, search, http),
    enabled: !!http,
    staleTime: QUERY_STALE_TIME,
  });
}
