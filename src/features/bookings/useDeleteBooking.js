import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast";


function useDeleteBooking() {

    const queryClient = useQueryClient();
    // const navigate = useNavigate();

    const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
        mutationFn: (bookingId) => deleteBookingApi(bookingId),
        
        
        onSuccess: () => {
            toast.success(`Booking successfully deleted `);
            queryClient.invalidateQueries({
                queryKey: ["Booking"],
            });
            
        },

        onError: (error) => toast.error(error.message)
    })

    return { deleteBooking, isDeleting }
}

export default useDeleteBooking
