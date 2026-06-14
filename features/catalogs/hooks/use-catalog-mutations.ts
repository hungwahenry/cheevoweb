import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { createCatalog } from "../api/create-catalog";
import { deleteCatalog } from "../api/delete-catalog";
import { updateCatalog } from "../api/update-catalog";

type Payload = Record<string, unknown>;

export function useCatalogMutations(resource: string, label: string) {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["catalog", resource] });

  const create = useMutation({
    mutationFn: (payload: Payload) => createCatalog(resource, payload),
    onSuccess: () => {
      toast.success(`${label} created.`);
      void invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: Payload }) =>
      updateCatalog(resource, id, payload),
    onSuccess: () => {
      toast.success(`${label} updated.`);
      void invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const remove = useMutation({
    mutationFn: (id: string | number) => deleteCatalog(resource, id),
    onSuccess: () => {
      toast.success(`${label} deleted.`);
      void invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return { create, update, remove };
}
