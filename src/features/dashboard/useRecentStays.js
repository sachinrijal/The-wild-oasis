import { useQuery } from "@tanstack/react-query"
import { getStaysAfterDate } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns";

function useRecentStays() {

    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

    const queryDays = subDays(new Date() , numDays).toISOString();

    const { isPending, data: stays } = useQuery({
        queryKey: ["stays", `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDays)
    })

    const confirmedStays = stays?.filter((obj) => obj.status === "checked-in" || obj.status === "checked-out")

    return { isPending, stays , confirmedStays }
}

export default useRecentStays


