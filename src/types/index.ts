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
}

export type AddSkillsTypeProps = {
    setModal: (modal: {open: boolean, type: ModalType}) => void;
    setSkills: (prev: React.SetStateAction<SkillType[]>) => void;
}

export type AddWilderTypeProps = {
    setModal: (modal: {open: boolean, type: ModalType}) => void;
    skills: SkillType[];
    setData: setData<WilderType>;
}

export type ModalType = "addWilder" | "addSkill" | "editWilder" | "";

export type ModalConfirmTypeProps = {
    wilder: WilderType;
    setDeletingWilder: setDeletingWilder;
    setData: setData<WilderType>
    refCard: React.MutableRefObject<HTMLDivElement>;
}

export type setDeletingWilder = (modal: {open: boolean, wilder?: WilderType, refCard?: React.MutableRefObject<HTMLDivElement>}) => void;

export interface setData<T> {
    (prev: React.SetStateAction<T[]>): void;
}