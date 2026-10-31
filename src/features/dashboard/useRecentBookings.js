import { useQuery } from "@tanstack/react-query"
import { getBookingsAfterDate } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns";


function useRecentBookings() {

    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

    const queryDays = subDays(new Date() , numDays).toISOString();

    const { isPending, data: bookings } = useQuery({
        queryKey: ["Bookings", `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDays)
    })

    return { isPending, bookings }
}

export default useRecentBookings


