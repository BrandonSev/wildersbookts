import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton/CardSkeleton";
import { ModalType, SkillType, WilderType } from "../types";
import Card from "../components/Card/Card";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import AddSkillsForm from "../components/AddSkills/AddSkillsForm";
import AddWilderForm from "../components/AddWilder/AddWilderForm";
import ModalConfirm from "../components/ModalConfirm/ModalConfirm";
import EditWilderForm from "../components/EditWilderForm/EditWilderForm";

const Home: React.FC = () => {
  const [data, setData] = useState<WilderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingWilder, setDeletingWilder] = useState<{
    wilder?: WilderType;
    open: boolean;
    refCard?: React.MutableRefObject<HTMLDivElement>;
  }>({
    open: false,
  });
  const [modal, setModal] = useState<ModalType>({
    open: false,
    type: "",
  });
  const [skills, setSkills] = useState<SkillType[]>([]);

  /**
   * Fetch data from API
   */
  useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/wilders`
        );
        setData(data);
        setLoading(false);
      }, 2000);
    })();
  }, []);

  /**
   * Fetch skills from API
   */
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/skills`
      );
      setSkills(data);
    })();
  }, []);

  const handleOpenModal = (e: MouseEvent, type: ModalType["type"]) => {
    setModal({ type, open: true });
  };

  const handleCloseModal = () => {
    setModal({ type: "", open: false });
  };

  return (
    <div className="container px-4 mx-auto relative">
      <div className="flex items-stretch justify-between mb-6">
        <p className="py-2 px-4 inline-block text-md bg-indigo-300 rounded  text-black cursor-pointer">
          Liste des wilders
        </p>
        <div className="flex gap-2">
          <button
            className="text-black px-4 py-2 bg-indigo-300 text-sm rounded flex items-center gap-2"
            onClick={(e) => handleOpenModal(e, "addWilder")}
          >
            Ajouter un wilder
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
          <button
            className="text-black px-4 py-2 bg-indigo-300 text-sm rounded flex items-center gap-2"
            onClick={(e) => handleOpenModal(e, "addSkill")}
          >
            Ajouter des skills
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        {loading ? (
          <CardSkeleton item={2} />
        ) : data.length ? (
          data.map((wilder) => {
            return (
              <Card
                wilder={wilder}
                key={wilder.id}
                setDeletingWilder={setDeletingWilder}
                setModal={setModal}
              />
            );
          })
        ) : (
          <p>Aucun wilder</p>
        )}
      </div>
      {modal.open && modal.type === "addSkill" && (
        <ModalWrapper title="Ajouter un skill" setModal={setModal}>
          <AddSkillsForm setModal={setModal} setSkills={setSkills} />
        </ModalWrapper>
      )}
      {modal.open && modal.type === "addWilder" && (
        <ModalWrapper title="Ajouter un Wilder" setModal={setModal}>
          <AddWilderForm
            setModal={setModal}
            skills={skills}
            setData={setData}
          />
        </ModalWrapper>
      )}
      {modal.open && modal.type === "editWilder" && modal.wilder && (
        <ModalWrapper title="Modifier un Wilder" setModal={setModal}>
          <EditWilderForm
            setModal={setModal}
            skills={skills}
            setData={setData}
            wilder={modal.wilder}
          />
        </ModalWrapper>
      )}
      {deletingWilder && deletingWilder.refCard && deletingWilder.wilder && (
        <ModalConfirm
          setDeletingWilder={setDeletingWilder}
          setData={setData}
          refCard={deletingWilder.refCard}
          wilder={deletingWilder.wilder}
        />
      )}
    </div>
  );
};

export default Home;
