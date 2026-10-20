import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({options}) {

    const [searchParams , setSearchParams] = useSearchParams()

    const value = searchParams.get('SortBy') || ""

    function handleChange(evt){
        console.log("inside")
        searchParams.set('SortBy' , evt.target.value)
        setSearchParams(searchParams)
    }

    return (
            <Select options={options} type={"white"} onChange={handleChange} value={value}></Select>
    )
}

export default SortBy
