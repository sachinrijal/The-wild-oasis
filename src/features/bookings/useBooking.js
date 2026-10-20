import { noop } from '@tanstack/react-query'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


function useBooking() {

    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient()

    // filterValue 
    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" }

    //sorting
    const SortValue = searchParams.get("SortBy") || "startDate-asc";
    const [field, direction] = SortValue.split("-");
    const sortBy = { field, direction }

    // pagination 
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));


    const {
        data: { data: bookings, count } = {},
        status,
        error, } = useQuery({
            queryKey: ["Booking", filter, sortBy, page],
            queryFn: () => getBookings({ filter, sortBy, page })
        })

    // pre-fetching the data 

    queryClient
        .query({
            queryKey: ["Booking", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        })
        .catch(noop)

    queryClient
        .query({
            queryKey: ["Booking", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        })
        .catch(noop)


    return { status, bookings, error, count }
}

export default useBooking