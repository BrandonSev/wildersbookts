import { useRef } from "react";
import { ModalWrapperTypeProps } from "../../interfaces";

const ModalWrapper = ({
  children,
  title,
  handleModal,
  isOpen,
}: ModalWrapperTypeProps): JSX.Element => {
  const handleCloseModal = () => {
    modalRef.current.classList.replace("enter", "leave");

    modalRef.current.onanimationend = (e) => {
      if (e.animationName === "leave") {
        modalWrapperRef.current.classList.replace("fadeIn", "fadeOut");
        setTimeout(() => {
          handleModal({ open: false, type: "" });
        }, 200);
      }
    };
  };

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const modalWrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <div
      className={`fixed grid place-items-center inset-0 z-20 bg-black/20 overflow-auto ${
        isOpen ? "fadeIn" : "hidden"
      }`}
      ref={modalWrapperRef}
    >
      <div className={` mt-4 ${isOpen ? "enter" : ""}`} ref={modalRef}>
        <div className="relative text-indigo-900 my-4">
          <h3 className="bg-indigo-200 p-4 rounded-t text-bold uppercase">
            {title}
          </h3>
          <div className="p-4 rounded-b bg-indigo-400 ">{children}</div>
        </div>
        <div className="absolute top-0 right-4" onClick={handleCloseModal}>
          <button className="h-5 w-5 bg-indigo-900 flex items-center justify-center rounded-full p-4 text-white">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
