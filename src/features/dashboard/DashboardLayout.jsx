import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
  const {bookings , isPending : isPending1} = useRecentBookings();
  const {stays , isPending : isPending2 , confirmedStays } = useRecentStays();

  console.log(confirmedStays)

  if (isPending1 || isPending2 ) <Spinner />


  return (
    <StyledDashboardLayout>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
