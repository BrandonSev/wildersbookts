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
}

export type AddSkillsTypeProps = {
    setModal: (modal: {open: boolean, type: ModalType}) => void;
    setSkills: (prev: React.SetStateAction<SkillType[]>) => void;
}

export type AddWilderTypeProps = {
    setModal: (modal: {open: boolean, type: ModalType}) => void;
    skills: SkillType[];
    setData: (prev: React.SetStateAction<WilderType[]>) => void;

}

export type ModalType = "addWilder" | "addSkill" | "";