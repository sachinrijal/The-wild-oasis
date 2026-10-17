import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"

const filtred_options = [
    {value : "all" , label : "All"},
    {value : "no-discount" , label : "No discount"},
    {value : "with-discount" , label : "With discount"}
]

const Sorting_options = [
    {value : "name-asc" , label:"Sort by name (A-Z)"},
    {value : "name-desc" , label:"Sort by name (Z-A)"},
    {value : "regularPrice-asc" , label:"Sort by Higher Price"},
    {value : "regularPrice-desc" , label:"Sort by Lower Price"},
    {value : "maxCapacity-asc" , label:"Sort by Higher Max Capacity"},
    {value : "maxCapacity-desc" , label:"Sort by Lower Max Capacity"},
]

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filtredValue = "discount" options={filtred_options} />
            <SortBy options={Sorting_options} />
        </TableOperations>
    )
}

export default CabinTableOperations
