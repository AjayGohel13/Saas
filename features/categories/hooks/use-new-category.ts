import { boolean } from 'drizzle-orm/mysql-core'
import {create} from 'zustand'

type NewCAtegoryState = {
    isOpen : boolean;
    onOpen:()=>void;
    onClose: ()=>void;
};

export const useNewCategory = create<NewCAtegoryState>((set)=> ({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))