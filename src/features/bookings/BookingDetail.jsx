import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading || isCheckingOut) return <Spinner />;
  if (!booking) return <Empty resource="Booking" />;
  if (error) return console.error(error);

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
            <span>Check-in #{` ${bookingId}`}</span>
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check-out #{` ${bookingId}`}
          </Button>
        )}

        <Modal>
          <Modal.Open open="booking-delete">
            <Button
              variation="danger"
              disabled={isDeleting}
            >
              Delete #{` ${bookingId}`}
            </Button>
          </Modal.Open>
          <Modal.Window name="booking-delete">
            <ConfirmDelete resource="Booking" disabled={isDeleting} onConfirm={() => deleteBooking(bookingId , {
              onSettled:navigate(-1)
            })} />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
