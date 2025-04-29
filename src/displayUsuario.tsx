import { useEffect, useState } from "react";
import { Usuario } from "./types"

const DisplayUsuario = ({usuario}:{usuario:Usuario}) => {
    const [isOnline,setIsOnline] = useState<boolean>(false);
    function defineStatus() {
        const agora = Date.now();
        const ultimaAtividade = new Date(usuario.ultimaAtividade).getTime();
        const status = ultimaAtividade > agora - 60 * 1000;
        console.log(`usuario digitando: ${usuario.digitando} está online? ${isOnline}`);
        setIsOnline(status);
    }
    useEffect(() => {
        defineStatus();
        const interval = setInterval(defineStatus, 1000);
        return () => clearInterval(interval);
    }, [usuario]);

    return(<div className="usuario" key={usuario.userId}>
        <div className="usuario-info">
            {usuario.imagem && <img className="usuario-imagem" src={usuario.imagem} alt="imagem do usuario" />}
            <span className="usuario-nome">{usuario.name}</span>
            <span className={`status-ativo ${isOnline ? 'online' : 'offline'}`}></span>
        </div>
        
        {(usuario.digitando && isOnline) && (
            <div className="digitando">
                <span>Digitando</span>
                <div className="digitando-animacao">
                    <span className="digitando-ponto"></span>
                    <span className="digitando-ponto"></span>
                    <span className="digitando-ponto"></span>
                </div>
            </div>
        )}
        {(!isOnline && !usuario.digitando) ? (
            <div className="ultima-atividade">
                Visto por último: {new Date(usuario.ultimaAtividade).toLocaleTimeString()}
            </div>
        ):(<br/>)}
        
    </div>)
}
export default DisplayUsuario;