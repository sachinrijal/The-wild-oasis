import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../services/apiAuth"



function useUser() {
    const {isPending , data : user} = useQuery({
        queryKey : ["user"],
        queryFn : getUser,
    })

    return { isPending , user , isAuthenticated : user?.role === "authenticated" }
}

export default useUser
