import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useAsgardeo } from '@asgardeo/react';
import { statusService } from '../services/statusService';
import { RTIStatus } from '../types/db';
import { ListResponse } from '../types/api';
import { QUERY_STALE_TIME } from '../utils/constants';

/**
 * Hook to manage RTI statuses including fetching, creating, updating, and deleting.
 */
export const useStatuses = (
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  onPageChange?: (page: number) => void
) => {
  const { http, isSignedIn } = useAsgardeo();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['rti-statuses', page, pageSize, search],
    queryFn: () => statusService.list(page, pageSize, search, http),
    enabled: !!isSignedIn,
    placeholderData: keepPreviousData,
    staleTime: QUERY_STALE_TIME,
  });

  const createStatusMutation = useMutation({
    mutationFn: (payload: Partial<RTIStatus>) => statusService.create(payload, http),
    onSuccess: (newStatus) => {
      queryClient.setQueriesData({ queryKey: ['rti-statuses'] }, (oldData: ListResponse<RTIStatus> | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newStatus, ...(oldData.data || [])],
          pagination: {
            ...oldData.pagination,
            totalItems: (oldData.pagination?.totalItems || 0) + 1,
            totalPages: Math.ceil(((oldData.pagination?.totalItems || 0) + 1) / (oldData.pagination?.pageSize || 10))
          }
        };
      });
      queryClient.invalidateQueries({ queryKey: ['rti-statuses'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Partial<RTIStatus> }) => statusService.update(id, payload, http),
    onSuccess: (updatedStatus) => {
      queryClient.setQueriesData({ queryKey: ['rti-statuses'] }, (oldData: ListResponse<RTIStatus> | undefined) => {
        if (!oldData || !oldData.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((s) => s.id === updatedStatus.id ? updatedStatus : s)
        };
      });
      queryClient.invalidateQueries({ queryKey: ['rti-statuses'] });
    },
  });

  const deleteStatusMutation = useMutation({
    mutationFn: (id: string) => statusService.remove(id, http),
    onSuccess: (_, deletedId) => {
      if (query.data?.data?.length === 1 && page > 1 && onPageChange) {
        onPageChange(page - 1);
      }
      queryClient.invalidateQueries({ queryKey: ['rti-statuses'] });
    },
  });

  return {
    ...query,
    createStatus: createStatusMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
    deleteStatus: deleteStatusMutation.mutateAsync,
    isCreating: createStatusMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteStatusMutation.isPending,
  };
};

