import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

function useUpdateSetting() {

    const queryClient = useQueryClient();

    const { mutate: updatingMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("settings successfully updated!");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {updatingMutate , isUpdating }
}

export default useUpdateSetting
