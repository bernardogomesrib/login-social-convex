import { Id } from "../convex/_generated/dataModel";
export type User = {
  _id: Id<"users">;
  _creationTime: number;
  name?: string | undefined | undefined;
  email?: string | undefined | undefined;
  phone?: string | undefined | undefined;
  image?: string | undefined | undefined;
  emailVerificationTime?: number | undefined | undefined;
  phoneVerificationTime?: number | undefined | undefined;
  isAnonymous?: boolean | undefined | undefined;
};
export type Usuario = {
  userId: Id<"users">;
  name: string;
  ultimaAtividade: number;
  digitando: boolean;
  imagem?: string | undefined;
};
export type Mensagem = {
  text: string;
  userId: Id<"users">;
  timestamp: number;
};
export const euToUsuario = (user:User|null)=>{
    if(null === user){
        return null;
    }
    return {
        userId: user._id,
        name: user.name || "",
        ultimaAtividade: Date.now(),
        digitando: false,
    };
}