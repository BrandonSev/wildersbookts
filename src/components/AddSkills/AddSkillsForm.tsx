import { AddSkillsTypeProps } from "../../interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const ADD_SKILLS = gql`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      name
    }
  }
`;

const AddSkillsForm = ({
  handleModal,
  handleUpdateSkills,
}: AddSkillsTypeProps) => {
  const [addSkills] = useMutation(ADD_SKILLS, {
    onCompleted(data) {
      handleModal({ type: "", open: false });
      handleUpdateSkills(data.createSkill);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
    }),
    onSubmit: async (values) => {
      try {
        addSkills({
          variables: {
            skill: {
              name: values.name,
            },
          },
        });
      } catch (err) {
        alert("Une erreur est survenue lors de l'ajout du skills");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col py-4">
        <label htmlFor="name" className="mb-1">
          Nom:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="p-2 rounded bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
          autoComplete="off"
        />
        {formik.errors.name && (
          <div className="text-red-500 mt-1">{formik.errors.name}</div>
        )}
      </div>
      <button
        type="submit"
        className="block ml-auto bg-indigo-100 px-4 py-2 rounded mt-2"
      >
        Valider
      </button>
    </form>
  );
};

export default AddSkillsForm;
