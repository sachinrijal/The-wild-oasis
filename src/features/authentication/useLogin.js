import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

function useLogin() {

    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginApi({email, password}),

        onSuccess: (user) =>{ 
            queryClient.setQueryData(["user"] , user.user)
            toast.success(`Login Successfully ..!`)
            navigate("/" , {replace : true} )
        },

        onError : (error) => toast.error(error.message)
    });

    return { login , isPending }
}

export default useLogin
