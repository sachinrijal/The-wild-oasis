import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menu from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, status, error } = useCabin();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  
  if (status === "pending") return <Spinner />;
  if (error) throw new Error;
  
  let filteredCabins;
  
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "all") {
    filteredCabins = cabins;
  }
  
  // sorting of the value
  const [sortBy, direction] = (
    searchParams.get("SortBy") || "name-asc"
  ).split("-");
  
  
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * modifier;
    }
    
    return (valueA - valueB) * modifier;
  });
  
  return (
    <Menu>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menu>
  );
}

export default CabinTable;
