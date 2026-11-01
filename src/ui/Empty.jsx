import Heading from "../ui/Heading"

function Empty({ resource }) {
  return <Heading as="h1">No {resource} could be found.</Heading>;
}

export default Empty;
