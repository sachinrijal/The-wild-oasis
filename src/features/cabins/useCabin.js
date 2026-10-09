import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabin() {
    const {
        data: cabins,
        status,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { cabins, status, error }
}

export default useCabin
