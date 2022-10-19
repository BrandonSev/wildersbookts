import { gql, useMutation } from "@apollo/client";
import { ModalConfirmTypeProps } from "../../interfaces";

const DELETE_WILDER = gql`
  mutation DeleteWilders($id: Float!) {
    deleteWilder(id: $id)
  }
`;

function ModalConfirm({
  wilder,
  handleCloseDeleteWilder,
  handleDeleteUpdateWilder,
  refCard,
}: ModalConfirmTypeProps) {
  const handleCloseModal = () => {
    handleCloseDeleteWilder({ open: false });
  };

  const handleDeleteWilder = async () => {
    deleteWilder({
      variables: {
        id: wilder.id,
      },
    });
  };

  const [deleteWilder] = useMutation(DELETE_WILDER, {
    onCompleted: (data) => {
      if (data.deleteWilder) {
        handleCloseDeleteWilder({ open: false });
        refCard.current.classList.add("fadeOut");
        setTimeout(() => {
          handleDeleteUpdateWilder(wilder);
        }, 400);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/20">
      <div className="absolute z-10 top-1/2 left-1/2 bg-indigo-100 p-6 rounded-md -translate-x-1/2 -translate-y-1/2">
        <div className="message">
          Etes vous sur de vouloir supprimer le wilder{" "}
          <span className="font-bold">
            {wilder.firstname} {wilder.lastname}{" "}
          </span>{" "}
          ?
        </div>
        <div className="flex items-center gap-4 justify-end mt-4 text-white">
          <button
            className="px-4 py-2 bg-indigo-400 rounded-sm"
            onClick={handleCloseModal}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-indigo-500 rounded-sm"
            onClick={handleDeleteWilder}
          >
            Valider
          </button>
        </div>
        <div className="absolute -top-4 right-4" onClick={handleCloseModal}>
          <button className="h-5 w-5 bg-indigo-900 flex items-center justify-center rounded-full p-4 text-white">
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
