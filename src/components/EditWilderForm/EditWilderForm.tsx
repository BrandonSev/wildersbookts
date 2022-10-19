import { useFormik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import { AddWilderSchema } from "../../schema/AddWilderSchema";
import { EditWilderTypeProps, WilderType } from "../../interfaces";
import { gql, useMutation } from "@apollo/client";

const UPDATE_WILDER = gql`
  mutation UpdateWilder($wilder: UpdateWilderInput!, $updateWilderId: Float!) {
    updateWilder(wilder: $wilder, id: $updateWilderId) {
      id
      firstname
      lastname
      description
      avatar
      grades {
        id
        vote
        skill {
          id
          name
        }
      }
    }
  }
`;

function EditWilderForm({
  handleModal,
  handleEditUpdateWilder,
  wilder,
  skills,
}: EditWilderTypeProps) {
  const [updateWilder] = useMutation(UPDATE_WILDER, {
    onCompleted({ updateWilder }: { updateWilder: WilderType }) {
      handleModal({ type: "", open: false });
      handleEditUpdateWilder(updateWilder);
    },
  });
  const formik = useFormik({
    initialValues: {
      firstname: wilder.firstname,
      lastname: wilder.lastname,
      description: wilder.description,
      avatar: wilder.avatar,
      skills: wilder.grades.map((grade) => grade.skill),
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateWilder({
        variables: {
          wilder: {
            firstname: values.firstname,
            lastname: values.lastname,
            description: values.description,
            avatar: values.avatar,
            skills: values.skills,
          },
          updateWilderId: wilder.id,
        },
      });
    },
    validationSchema: AddWilderSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col py-4">
          <label htmlFor="lastname" className="mb-1">
            Nom:
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            className="p-2 rounded bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
          />
          {formik.errors.lastname && (
            <div className="text-red-500 mt-1">{formik.errors.lastname}</div>
          )}
        </div>
        <div className="flex flex-1 flex-col py-4">
          <label htmlFor="firstname" className="mb-1">
            Prénom:
          </label>
          <input
            type="text"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            id="firstname"
            className="p-2 rounded bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
          />
          {formik.errors.firstname && (
            <div className="text-red-500 mt-1">{formik.errors.firstname}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col py-4">
        <label htmlFor="description" className="mb-1">
          Description:
        </label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          id="description"
          className="p-2 rounded bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
          rows={4}
        />
        {formik.errors.description && (
          <div className="text-red-500 mt-1">{formik.errors.description}</div>
        )}
      </div>
      <div className="flex flex-col py-4">
        <label htmlFor="avatar" className="mb-1">
          Avatar:
        </label>
        <input
          type="text"
          name="avatar"
          id="avatar"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          placeholder="https://monimage.fr/image.jpg"
          className="p-2 rounded bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
        />
        {formik.errors.avatar && (
          <div className="text-red-500 mt-1">{formik.errors.avatar}</div>
        )}
      </div>
      <div className="flex flex-col py-4">
        <label htmlFor="avatar" className="mb-1">
          Skills:
        </label>
        <Multiselect
          options={skills}
          displayValue="name"
          onSelect={(selectedList) => {
            formik.setFieldValue("skills", selectedList);
          }}
          onRemove={(selectedList) => {
            formik.setFieldValue("skills", selectedList);
          }}
          className=" bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
          placeholder="Séléctionner des skills"
          style={{
            chips: {
              background: "rgb(165 180 252)",
              color: "black",
            },
          }}
          avoidHighlightFirstOption={true}
          selectedValues={formik.values.skills}
        />
      </div>
      <button
        type="submit"
        className="block ml-auto bg-indigo-100 px-4 py-2 rounded mt-2"
      >
        Valider
      </button>
    </form>
  );
}

export default EditWilderForm;
