import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import CheckBox from "../../ui/Checkbox";
import useCheckin from "./useCheckin";
import useSetting from "../settings/useSetting";
// import { id } from "date-fns/locale";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading, error } = useBooking();
  const { checkIn, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSetting } = useSetting();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid ?? false);
    }
  }, [booking, setConfirmPaid]);

  if (error) console.error(error);
  if (isLoading || isLoadingSetting) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const additionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({bookingId , breakfast : {
        totalPrice : totalPrice + additionalBreakfastPrice,
        hasBreakfast : true , 
        extrasPrice : additionalBreakfastPrice,
      }});
    }
      checkIn({bookingId , breakfast : {}});
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(additionalBreakfastPrice)}{" "}
            ?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((val) => !val)}
          id="confirmed"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that guest {guests.fullName} has Paid the total Amount{" "}
          {!addBreakfast ?
            formatCurrency(totalPrice)
          : `${formatCurrency(totalPrice + additionalBreakfastPrice)} ( ${formatCurrency(totalPrice)} + ${formatCurrency(additionalBreakfastPrice)}) `
          }
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin || isCheckingIn} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
