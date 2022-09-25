import { setDeletingWilder } from "./../types/index";

export interface WilderType {
  id: number;
  fadeIn?: boolean;
  firstname: string;
  lastname: string;
  grades: Grades[];
  avatar: string;
  description: string;
}

export interface SkillTypeProps {
  grade: Grades;
}

export interface SkillType {
  id: number;
  name: string;
}

export interface Grades {
  id: number;
  vote: number;
  skill: SkillType;
}

export interface CardTypeProps {
  wilder: WilderType;
  handleDeleteWilder: (
    wilder: WilderType,
    refCard: React.MutableRefObject<HTMLDivElement>,
    open: boolean
  ) => void;
  handleEditWilder: (data: ModalType) => void;
}

export interface AddSkillsTypeProps {
  handleModal: (modal: ModalType) => void;
  handleUpdateSkills: (skill: SkillType) => void;
}

export interface AddWilderTypeProps {
  handleModal: (modal: ModalType) => void;
  skills: SkillType[];
  handleAddWilder: (wilder: WilderType) => void;
}

export interface ModalConfirmTypeProps {
  wilder: WilderType;
  handleCloseDeleteWilder: setDeletingWilder;
  handleDeleteUpdateWilder: (wilder: WilderType) => void;
  refCard: React.MutableRefObject<HTMLDivElement>;
}

export interface EditWilderTypeProps {
  wilder: WilderType;
  handleEditUpdateWilder: (wilder: WilderType) => void;
  skills: SkillType[];
  handleModal: (modal: ModalType) => void;
}

export interface ModalType {
  open: boolean;
  type: "addWilder" | "addSkill" | "editWilder" | "";
  wilder?: WilderType;
  refCard?: React.MutableRefObject<HTMLDivElement>;
}

export interface ModalWrapperTypeProps {
  children: JSX.Element;
  title: string;
  handleModal: (modal: ModalType) => void;
}

export interface CardSkeletonTypeProps {
  item: number;
}

export interface deletingWilder {
  wilder?: WilderType;
  open?: boolean;
  refCard?: React.MutableRefObject<HTMLDivElement>;
}
