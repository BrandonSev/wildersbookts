import React, { useEffect, useState } from "react";
import axios from "axios";
import CardSkeleton from "../components/CardSkeleton/CardSkeleton";
import {
  deletingWilder,
  ModalType,
  SkillType,
  WilderType,
} from "../interfaces";
import Card from "../components/Card/Card";
import ModalWrapper from "../components/ModalWrapper/ModalWrapper";
import AddSkillsForm from "../components/AddSkills/AddSkillsForm";
import AddWilderForm from "../components/AddWilder/AddWilderForm";
import ModalConfirm from "../components/ModalConfirm/ModalConfirm";
import EditWilderForm from "../components/EditWilderForm/EditWilderForm";

const Home: React.FC = () => {
  const [data, setData] = useState<WilderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingWilder, setDeletingWilder] = useState<deletingWilder>({
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
        const { data } = await axios.get<WilderType[]>(
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
      const { data } = await axios.get<SkillType[]>(
        `${process.env.REACT_APP_API_URL}/skills`
      );
      setSkills(data);
    })();
  }, []);

  const handleModal = ({ type }: ModalType) => {
    setModal({ type, open: true });
  };

  const handleDeleteWilder = (
    wilder: WilderType,
    refCard: React.MutableRefObject<HTMLDivElement>,
    open: boolean
  ) => {
    setDeletingWilder({ wilder, open, refCard });
  };

  const handleCloseDeleteWilder = () => {
    setDeletingWilder({ open: false });
  };

  const handleEditWilder = (option: ModalType) => {
    setModal({
      open: option.open,
      type: option.type,
      refCard: option.refCard,
      wilder: option.wilder,
    });
  };

  const handleUpdateSkills = (skill: SkillType) => {
    setSkills((prev) => [...prev, skill]);
  };

  const handleAddWilder = (wilder: WilderType) => {
    setData((prev) => [...prev, { ...wilder, fadeIn: true }]);
  };

  const handleEditUpdateWilder = (wilder: WilderType) => {
    setData((prev) =>
      prev.map((w) => {
        return w.id === wilder.id ? wilder : w;
      })
    );
  };

  const handleDeleteUpdateWilder = (wilder: WilderType) => {
    setData((prev) => prev.filter((w) => w.id !== wilder.id));
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
            onClick={() => handleModal({ type: "addWilder", open: true })}
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
            onClick={() => handleModal({ type: "addSkill", open: true })}
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
                handleDeleteWilder={handleDeleteWilder}
                handleEditWilder={handleEditWilder}
              />
            );
          })
        ) : (
          <p>Aucun wilder</p>
        )}
      </div>
      {modal.open && modal.type === "addSkill" && (
        <ModalWrapper title="Ajouter un skill" handleModal={handleModal}>
          <AddSkillsForm
            handleUpdateSkills={handleUpdateSkills}
            handleModal={handleModal}
          />
        </ModalWrapper>
      )}
      {modal.open && modal.type === "addWilder" && (
        <ModalWrapper title="Ajouter un Wilder" handleModal={handleModal}>
          <AddWilderForm
            handleModal={handleModal}
            skills={skills}
            handleAddWilder={handleAddWilder}
          />
        </ModalWrapper>
      )}
      {modal.open && modal.type === "editWilder" && modal.wilder && (
        <ModalWrapper title="Modifier un Wilder" handleModal={handleModal}>
          <EditWilderForm
            handleModal={handleModal}
            skills={skills}
            wilder={modal.wilder}
            handleEditUpdateWilder={handleEditUpdateWilder}
          />
        </ModalWrapper>
      )}
      {deletingWilder && deletingWilder.refCard && deletingWilder.wilder && (
        <ModalConfirm
          handleCloseDeleteWilder={handleCloseDeleteWilder}
          handleDeleteUpdateWilder={handleDeleteUpdateWilder}
          refCard={deletingWilder.refCard}
          wilder={deletingWilder.wilder}
        />
      )}
    </div>
  );
};

export default Home;
