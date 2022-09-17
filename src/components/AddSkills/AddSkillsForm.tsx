import { AddSkillsTypeProps } from "../../types";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const AddSkillsForm = ({ setModal, setSkills }: AddSkillsTypeProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/skills`,
          values,
          { validateStatus: (status) => status === 200 }
        );
        setModal({ type: "", open: false });
        setSkills((prev) => [...prev, response.data]);
      } catch (err) {
        alert("Une erreur est survenue lors de l'ajout du skills");
      }
    },
  });

  return (
    <div className="relative text-indigo-900">
      <h3 className="bg-indigo-200 p-4 rounded-t text-bold uppercase">
        Ajouter des skills
      </h3>
      <div className="p-4 rounded-b bg-indigo-400 ">
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
      </div>
    </div>
  );
};

export default AddSkillsForm;
