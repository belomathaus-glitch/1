import React, { useRef, useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';

interface Premio {
  texto: string;
  valor: number;
  chance: number;
}

interface BlacRoletaProps {
  onResult?: (premio: Premio) => void;
}

const BlacRoleta: React.FC<BlacRoletaProps> = ({ onResult }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { balance, withdraw, deposit } = useWallet();
  const [anguloAtual, setAnguloAtual] = useState(0);
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState('');

  // Configuração de prêmios (70% lucro estimado)
  const premios: Premio[] = [
    { texto: "R$50", valor: 50, chance: 0.001 },
    { texto: "R$5", valor: 5, chance: 0.01 },
    { texto: "R$2", valor: 2, chance: 0.03 },
    { texto: "R$1", valor: 1, chance: 0.10 },
    { texto: "Giro Extra", valor: 1, chance: 0.05 },
    { texto: "Quase", valor: 0, chance: 0.40 },
    { texto: "Nada", valor: 0, chance: 0.409 }
  ];

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const desenharRoleta = (angulo: number = anguloAtual) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numSetores = premios.length;
    const anguloSetor = 2 * Math.PI / numSetores;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar setores
    for (let i = 0; i < numSetores; i++) {
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, 200, angulo * Math.PI/180 + i * anguloSetor, angulo * Math.PI/180 + (i+1) * anguloSetor);
      
      // Cores alternadas com tema imperial purple
      ctx.fillStyle = i % 2 === 0 ? "#663399" : "#8a4fbf";
      ctx.fill();
      
      // Borda dourada
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texto do prêmio
      ctx.save();
      ctx.translate(200, 200);
      ctx.rotate(angulo * Math.PI/180 + (i + 0.5) * anguloSetor);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 3;
      ctx.fillText(premios[i].texto, 180, 5);
      ctx.restore();
    }

    // Ponteiro
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(190, 20);
    ctx.lineTo(210, 20);
    ctx.fillStyle = "#ff3131";
    ctx.fill();
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Centro da roleta
    ctx.beginPath();
    ctx.arc(200, 200, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#0b0b0b";
    ctx.fill();
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const verificarPremio = (): Premio => {
    let rand = Math.random();
    let acumulado = 0;
    let premio = premios[premios.length - 1]; // fallback

    for (const p of premios) {
      acumulado += p.chance;
      if (rand <= acumulado) {
        premio = p;
        break;
      }
    }

    return premio;
  };

  const girarRoleta = () => {
    if (girando) return;
    if (balance.brl < 1) {
      setResultado("💰 Saldo insuficiente! Adicione fundos para jogar.");
      return;
    }

    // Deduzir custo do giro
    withdraw(1, 'brl');
    setGirando(true);
    setResultado('');
    
    const giro = Math.random() * 360 + 720; // 2 voltas + aleatório
    const duracao = 3000;
    let inicio: number | null = null;

    const animar = (timestamp: number) => {
      if (!inicio) inicio = timestamp;
      const progresso = timestamp - inicio;
      const t = progresso / duracao;
      const novoAngulo = (giro * easeOutCubic(t)) % 360;
      
      setAnguloAtual(novoAngulo);
      desenharRoleta(novoAngulo);

      if (progresso < duracao) {
        requestAnimationFrame(animar);
      } else {
        setGirando(false);
        const premio = verificarPremio();
        
        if (premio.valor > 0) {
          if (premio.texto === "Giro Extra") {
            deposit(1, 'brl'); // Devolver o custo do giro
            setResultado("🎁 Você ganhou um giro extra!");
          } else {
            deposit(premio.valor, 'brl');
            setResultado(`🎉 Parabéns! Você ganhou ${premio.texto}!`);
          }
        } else {
          setResultado("😢 Que pena! Tente novamente!");
        }

        if (onResult) {
          onResult(premio);
        }
      }
    };

    requestAnimationFrame(animar);
  };

  useEffect(() => {
    desenharRoleta();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-gradient-to-br from-imperial-purple-900/60 to-imperial-purple-800/60 backdrop-blur-sm rounded-xl border border-imperial-purple-700/50 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          🎡 Roleta BLAC Premium
        </h2>
        
        <div className="text-center mb-4">
          <p className="text-lg text-gray-300">
            Saldo: <span className="text-green-400 font-bold">R$ {balance.brl.toFixed(2)}</span>
          </p>
        </div>

        <div className="flex justify-center space-x-3 mb-6">
          <button
            onClick={() => deposit(5, 'brl')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Adicionar R$5
          </button>
          <button
            onClick={() => deposit(10, 'brl')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Adicionar R$10
          </button>
        </div>

        <div className="relative flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width="400"
            height="400"
            className="rounded-full shadow-2xl border-4 border-gold"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.5), 0 0 20px rgba(57, 255, 20, 0.3) inset'
            }}
          />
        </div>

        <div className="text-center">
          <button
            onClick={girarRoleta}
            disabled={girando || balance.brl < 1}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
              girando || balance.brl < 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gold to-gold-deep text-black hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
            style={{
              boxShadow: girando || balance.brl < 1 ? 'none' : '0 0 20px rgba(255, 215, 0, 0.5)'
            }}
          >
            {girando ? 'Girando...' : 'Girar (R$1)'}
          </button>
        </div>

        {resultado && (
          <div className="mt-4 p-4 bg-imperial-purple-800/50 rounded-lg border border-imperial-purple-600/50">
            <p className="text-center text-white font-medium">{resultado}</p>
          </div>
        )}
      </div>

      {/* Tabela de Prêmios */}
      <div className="bg-gradient-to-br from-imperial-purple-900/60 to-imperial-purple-800/60 backdrop-blur-sm rounded-xl border border-imperial-purple-700/50 p-6 shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold text-white mb-4 text-center">🏆 Tabela de Prêmios</h3>
        <div className="space-y-2">
          {premios.map((premio, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 bg-imperial-purple-800/30 rounded-lg">
              <span className="text-white font-medium">{premio.texto}</span>
              <span className="text-gray-400 text-sm">
                {(premio.chance * 100).toFixed(premio.chance < 0.01 ? 3 : 1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlacRoleta;