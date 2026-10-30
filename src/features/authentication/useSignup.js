import { useMutation } from "@tanstack/react-query"
import { SignUp } from "../../services/apiAuth"
import toast from "react-hot-toast"

function useSignup(reset) {
    const { mutate: signUp, isPending: isSigningUp } = useMutation({
        mutationFn: SignUp,
        onSuccess: () => {
            toast.success("Account created successfully. Please verify your email.");
            reset();
        },
    });


    return { signUp, isSigningUp }
}

export default useSignup
