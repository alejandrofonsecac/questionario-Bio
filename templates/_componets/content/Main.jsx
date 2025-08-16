import React from 'react';
import styles from '../../../static/style.css'

function Main() {
    return (
        <div className="corpo">
            <div className="container">
                <h1>Quiz Evolução Humana</h1>
                
                {/* Formulário do jogador */}            
                <div id="form-jogador" onClick={() => {}}>
                    <input type="text" id="nome-jogador" placeholder="Seu nome" required />
                    <button id="iniciar-quiz">Iniciar Quiz</button>
                </div>

                {/* Quiz (inicialmente oculto) */}            
                <div id="quiz" style={{ display: 'none' }}>
                    {/* FÁCEIS */}                
                    <div className="pergunta">
                        <h3>1. Em que era geológica está o Período Quaternário?</h3>
                        <button className="opcao">Mesozoica</button>
                        <button className="opcao" data-correta="true">Cenozoica</button>
                        <button className="opcao">Paleozoica</button>
                        <button className="opcao">Arqueana</button>
                    </div>

                    {/* ... restante do quiz ... */}

                    <button id="enviar-respostas">Enviar Respostas</button>
                </div>

                {/* Ranking (inicialmente oculto) */}
                <div id="ranking" style={{ display: 'none' }}>
                    <h2>Ranking</h2>
                    <table id="tabela-ranking">
                        <thead>
                            <tr>
                                <th>Posição</th>
                                <th>Nome</th>
                                <th>Pontuação</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Main;