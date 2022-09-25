import { deletingWilder } from "../interfaces";

export type setDeletingWilder = (param: deletingWilder) => void;

export type setData<T> = (prev: React.SetStateAction<T[]>) => void;
