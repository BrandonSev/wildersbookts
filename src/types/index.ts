export type WilderType = { 
    id: number, 
    fadeIn?: boolean, 
    firstname: string, 
    lastname: string, 
    skills: SkillType[], 
    avatar: string, 
    description: string 
};

export type SkillTypeProps = {
  skill: SkillType;
};

export type SkillType = {
    id: number;
    name: string
}

export type CardTypeProps = {
    wilder: WilderType;
    setDeletingWilder: setDeletingWilder;
    setModal: (modal: ModalType) => void;
}

export type AddSkillsTypeProps = {
    setModal: (modal: ModalType) => void;
    setSkills: (prev: React.SetStateAction<SkillType[]>) => void;
}

export type AddWilderTypeProps = {
    setModal: (modal: ModalType) => void;
    skills: SkillType[];
    setData: setData<WilderType>;
}

export type ModalConfirmTypeProps = {
    wilder: WilderType;
    setDeletingWilder: setDeletingWilder;
    setData: setData<WilderType>
    refCard: React.MutableRefObject<HTMLDivElement>;
}

export type setDeletingWilder = (modal: ModalType) => void;

export interface setData<T> {
    (prev: React.SetStateAction<T[]>): void;
}

export type EditWilderTypeProps = {
    wilder: WilderType;
    setData: setData<WilderType>;
    skills: SkillType[];
    setModal: (modal: ModalType) => void;
}

export type ModalType = {
    open: boolean;
    type: "addWilder" | "addSkill" | "editWilder" | "";
    wilder?: WilderType;
    refCard?: React.MutableRefObject<HTMLDivElement>;
}

export type ModalWrapperTypeProps = {
    children: JSX.Element;
    title: string;
    setModal: (modal: React.SetStateAction<ModalType>) => void;
}