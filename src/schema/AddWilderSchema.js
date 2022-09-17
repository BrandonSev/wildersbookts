import * as Yup from "yup";

export const AddWilderSchema = Yup.object({
  firstname: Yup.string().required("Le prénom est obligatoire"),
  lastname: Yup.string().required("Le nom est obligatoire"),
  description: Yup.string().required("La description est obligatoire"),
  avatar: Yup.string().required("L'avatar est obligatoire"),
});
