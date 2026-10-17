import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open open="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;

// function AddCabin() {
//   const [showform, setShowForm] = useState(false);
//   return (
//     <div>
//       <Button
//         size="medium"
//         variation="primary"
//         onClick={() => setShowForm((show) => !show)}
//       >
//         Add new Cabin
//       </Button>
//       {showform && (
//         <Modal onClose={() => setShowForm((show) => !show)}>
//           <CreateCabinForm onClose={() => setShowForm((show) => !show)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
