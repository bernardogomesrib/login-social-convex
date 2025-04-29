import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import MessageBox from './messageBox';
import UsuariosBox from './UsuariosBox';
import CaixaDigitacao from './CaixaDigitacao';
import { Usuario } from './types';



function Chat({ eu, isSidebarOpen }: { eu: Usuario | null, isSidebarOpen: boolean }) {
    const usuarios = useQuery(api.usuarios.getUsuarios);
    const mensagens = useQuery(api.chat.getMessages);

    return eu && (
        <div className="main">
            <UsuariosBox usuarios={usuarios} isSidebarOpen={isSidebarOpen} />
            <MessageBox mensagens={mensagens} eu={eu} usuarios={usuarios || []} />
            <CaixaDigitacao />

        </div>
    )
}


export default Chat