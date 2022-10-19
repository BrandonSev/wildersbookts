import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
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

const GET_WILDERS = gql`
  query wilders {
    getAllWilders {
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

const GET_SKILLS = gql`
  query skills {
    getAll {
      id
      name
    }
  }
`;

const Home: React.FC = () => {
  const [wilders, setData] = useState<WilderType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [deletingWilder, setDeletingWilder] = useState<deletingWilder>({
    open: false,
  });
  const [modal, setModal] = useState<ModalType>({
    open: false,
    type: "",
  });

  useQuery(GET_SKILLS, {
    onCompleted(data) {
      setSkills(data.getAll);
    },
  });

  const { loading: wildersLoading } = useQuery(GET_WILDERS, {
    onCompleted(data) {
      setData(data.getAllWilders);
    },
  });

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
      <div className="flex items-stretch justify-between mb-6 flex-wrap gap-2">
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
        {wildersLoading ? (
          <CardSkeleton item={2} />
        ) : wilders.length ? (
          wilders.map((wilder: WilderType) => {
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
      <ModalWrapper
        title="Ajouter un skill"
        handleModal={handleModal}
        isOpen={modal.open && modal.type === "addSkill"}
      >
        <AddSkillsForm
          handleUpdateSkills={handleUpdateSkills}
          handleModal={handleModal}
        />
      </ModalWrapper>
      <ModalWrapper
        title="Ajouter un Wilder"
        handleModal={handleModal}
        isOpen={modal.open && modal.type === "addWilder"}
      >
        <AddWilderForm
          handleModal={handleModal}
          skills={skills}
          handleAddWilder={handleAddWilder}
        />
      </ModalWrapper>
      <ModalWrapper
        title="Modifier un Wilder"
        handleModal={handleModal}
        isOpen={modal.open && modal.type === "editWilder"}
      >
        <>
          {modal.wilder && (
            <EditWilderForm
              handleModal={handleModal}
              skills={skills}
              wilder={modal.wilder}
              handleEditUpdateWilder={handleEditUpdateWilder}
            />
          )}
        </>
      </ModalWrapper>
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
