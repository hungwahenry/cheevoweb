import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { createPage } from "../api/pages/create-page";
import { deletePage } from "../api/pages/delete-page";
import { setPagePublished } from "../api/pages/set-published";
import { updatePage } from "../api/pages/update-page";

export function usePageMutations() {
  const qc = useQueryClient();
  const onError = (e: unknown) => toast.error(getErrorMessage(e));
  const refresh = () => void qc.invalidateQueries({ queryKey: ["pages"] });

  const create = useMutation({
    mutationFn: (payload: Record<string, unknown>) => createPage(payload),
    onSuccess: () => {
      toast.success("Page created.");
      refresh();
    },
    onError,
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      updatePage(id, payload),
    onSuccess: () => {
      toast.success("Page updated.");
      refresh();
    },
    onError,
  });
  const remove = useMutation({
    mutationFn: (id: string) => deletePage(id),
    onSuccess: () => {
      toast.success("Page deleted.");
      refresh();
    },
    onError,
  });
  const setPublished = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      setPagePublished(id, published),
    onSuccess: () => {
      toast.success("Page visibility updated.");
      refresh();
    },
    onError,
  });

  return { create, update, remove, setPublished };
}
