import { ModalType } from "../../types";

const ModalWrapper = ({
  children,
  title,
  setModal,
}: {
  children: JSX.Element;
  title: string;
  setModal: (
    modal: React.SetStateAction<{ type: ModalType; open: boolean }>
  ) => void;
}): JSX.Element => {
  const handleCloseModal = () => {
    setModal({ type: "", open: false });
  };

  return (
    <div className="fixed inset-0 z-20 bg-black/20">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative text-indigo-900">
          <h3 className="bg-indigo-200 p-4 rounded-t text-bold uppercase">
            {title}
          </h3>
          <div className="p-4 rounded-b bg-indigo-400 ">{children}</div>
        </div>
        <div className="absolute -top-4 right-4" onClick={handleCloseModal}>
          <button className="h-5 w-5 bg-indigo-900 flex items-center justify-center rounded-full p-4 text-white">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
