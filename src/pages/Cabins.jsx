import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../../src/features/cabins/CabinTable";
import { useState } from "react";
// import { set } from "date-fns/fp";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showform, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
        <Button
          size="medium"
          variation="primary"
          onClick={() => setShowForm((show) => !show)}
        >
          Add new Cabin
        </Button>
        {showform && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
