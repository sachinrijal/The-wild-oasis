import { useForm } from "react-hook-form";

import useUpdateCabin from "./useUpdateCabin";
import useCreateCabin from "./useCreateCabin";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";



function CreateCabinForm({ editCabin = {} }) {
  const { id: editId, ...editValues } = editCabin;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : "",
  });
  const { errors } = formState;

  // this is for creating the cabin
  const { creatingMutate, isCreating } = useCreateCabin();

  // this is for the updating of the cabin
  const { updatingMutate, isUpdating } = useUpdateCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      updatingMutate(
        {
          newCabin: { ...data, image: image },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    } else {
      creatingMutate(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    }
  }

  const isLoading = isCreating || isUpdating;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: "This is required field ",
          })}
        />
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This is required field ",
            min: {
              value: 1,
              message: "Capacity should be atleast one ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This is required field ",
            min: {
              value: 1,
              message: "regularPrice should be greater than one  ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={""}
          {...register("discount", {
            required: "This field is required ! ",
            validate: (value) =>
              value < getValues().regularPrice ||
              "discount should be less than regular price ! ",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Input
          type="text"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isLoading}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This is required field ",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="small" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Update Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
