import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

function useUpdateUser() {

    const queryClient = useQueryClient();

    const { mutate: updatingUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User successfully updated!");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {updatingUser , isUpdating }
}

export default useUpdateUser
