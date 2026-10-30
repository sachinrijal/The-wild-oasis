import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { logout } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"


function useLogout() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: Logout, isPending: isLoginOut } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/login" , {replace : true})
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        }
    },
    )

    return { Logout, isLoginOut }

}



export default useLogout
