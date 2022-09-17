const ModalWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <div className="fixed inset-0 z-20 bg-black/20">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
