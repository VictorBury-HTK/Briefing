import React, { useEffect, useState } from 'react';
import { 
  Printer, Save, Check, Circle, ChefHat, 
  Palette, Armchair, Trash2, Zap, Image as ImageIcon, 
  ChevronDown, ChevronUp, Coffee, Sun, Layout 
} from 'lucide-react';

import imgDark from '../img/Dark-Moody.jpeg';
import imgIndustrial from '../img/Industrial.jpeg';
import imgContemporanea from '../img/Contemporanea.JPG';
import imgClassica from '../img/Classica.jpeg';
import imgPedraExoticaCor from '../img/Pedra-exotica-e-cor.jpeg';
import imgSomenteCor from '../img/Cor.jpeg';
import imgPedraExoticaMinimalista from '../img/Pedra-exotica-minimalista.jpeg';
import imgPedraExoticaContemporanea from '../img/Pedra-exotica-contemporanea.jpeg';

const styles = [
  { id: 'dark_moody', title: 'Dark moody', desc: 'Armários pretos ou grafite, madeira escura, iluminação dramática.', img: imgDark },
  { id: 'industrial', title: 'Industrial', desc: 'Cimento queimado, serralheria preta, estantes abertas, tubulação aparente.', img: imgIndustrial },
  { id: 'contemporanea', title: 'Contemporânea', desc: 'Muita madeira, plantas, tons de pedra natural, aconchegante, luz quente.', img: imgContemporanea },
  { id: 'classica', title: 'Clássica', desc: 'Portas com molduras (shaker), puxadores concha, mármore, elegância atemporal.', img: imgClassica },
  { id: 'pedra_exotica_e_cor', title: 'Pedra exótica e cor', desc: 'Veios marcantes e cores especiais.', img: imgPedraExoticaCor },
  { id: 'somente_cor', title: 'Somente cor', desc: 'Paleta de cor sem padrão de madeira ou pedra.', img: imgSomenteCor },
  { id: 'pedra_exotica_minimalista', title: 'Pedra exótica minimalista', desc: 'Pedra exótica com layout minimalista.', img: imgPedraExoticaMinimalista },
  { id: 'pedra_exotica_contemporanea', title: 'Pedra exótica contemporânea', desc: 'Pedra exótica em contexto contemporâneo.', img: imgPedraExoticaContemporanea }
];

const Section = ({ icon: Icon, title, subtitle, isOpen, toggle, children }) => (
  <div className="section-separator">
    <div onClick={toggle} className="section-header" style={{background: isOpen ? '#f8fafc' : '#fff'}}>
      <div style={{display:'flex', alignItems:'center', gap:16}}>
        <div style={{padding:10, borderRadius:12, background: isOpen ? '#0f172a' : '#f1f5f9', color: isOpen ? '#fff' : '#94a3b8'}}>
          <Icon size={22} />
        </div>
        <div>
          <h2 className="text-slate-900" style={{fontSize:18, fontWeight:700}}>{title}</h2>
          {subtitle && <p className="text-slate-400" style={{fontSize:13}}>{subtitle}</p>}
        </div>
      </div>
      {isOpen ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
    </div>
    {isOpen && <div className="section-body">{children}</div>}
  </div>
);

const RadioGroup = ({ label, options, selected, onChange, layout = 'col' }) => (
  <div style={{marginBottom:24}}>
    <h3 style={{fontSize:13, fontWeight:700, marginBottom:12, textTransform:'uppercase', letterSpacing:1.2}} className="text-slate-900">{label}</h3>
    <div className={`options-grid ${layout === 'grid' ? 'grid-layout' : ''}`}>
      {options.map((opt) => (
        <label key={opt.value} className={`radio-item ${selected === opt.value ? 'selected' : ''}`}>
          <input type="radio" name={label} value={opt.value} checked={selected === opt.value} onChange={() => onChange(opt.value)} />
          <div style={{flex:1}}>
            <span style={{display:'block', fontSize:14, fontWeight:600}} className="text-slate-900">{opt.label}</span>
            {opt.desc && <span className="text-slate-400" style={{display:'block', fontSize:12, marginTop:4}}>{opt.desc}</span>}
          </div>
          {opt.color && <div style={{width:24, height:24, borderRadius:999, border:'1px solid #e6eef6', boxShadow:'0 1px 3px rgba(2,6,23,0.05)', background:opt.color}} />}
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, options, selected, onChange, maxSelection }) => (
  <div style={{marginBottom:24}}>
    <h3 style={{fontSize:13, fontWeight:700, marginBottom:12, textTransform:'uppercase', letterSpacing:1.2}} className="text-slate-900">{label}</h3>
    <div className="options-grid grid-layout">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <div key={opt.value} className={`checkbox-item ${isSelected ? 'selected' : ''}`} onClick={() => {
            if (isSelected) {
              onChange(selected.filter(i => i !== opt.value));
            } else {
              if (maxSelection && selected.length >= maxSelection) {
                window.alert(`Você pode selecionar no máximo ${maxSelection} opções.`);
                return;
              }
              onChange([...selected, opt.value]);
            }
          }}>
            <div style={{width:20, height:20, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', border: isSelected ? '1px solid #059669' : '1px solid #cbd5e1', background: isSelected ? '#059669' : '#fff', color:'#fff'}}>
              {isSelected && <Check size={14} color="#fff" />}
            </div>
            <div>
              <span style={{display:'block', fontSize:14, fontWeight:600}} className="text-slate-900">{opt.label}</span>
              {opt.desc && <span style={{display:'block', fontSize:12}} className="text-slate-400">{opt.desc}</span>}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function DeepDiveBriefing() {
  const [sections, setSections] = useState({ estilo: true, rotina: true, materiais: true, copa: true, funcional: true, tech: true });
  const [formData, setFormData] = useState({
    nome: '', cafeDaManha: '', quemCozinha: '', rotinaFuncionaria: '', integra: '', tomPedra: '', tomMarcenaria: [], tipoVidro: '', tomEletros: '', assentosCopa: '', tvCopa: '', tipoAssento: '', lixeira: '', escorredor: '', janelas: '', iluminacao: [], automacao: '', estiloVisual: ''
  });

  const toggleSection = (key) => setSections(prev => ({ ...prev, [key]: !prev[key] }));
  const handlePrint = () => window.print();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('deepDiveBriefing');
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('deepDiveBriefing', JSON.stringify(formData)); } catch (e) {}
  }, [formData]);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(formData.nome || 'briefing').replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isFormValid = () => {
    if (!formData.nome.trim()) return false;
    if (!formData.estiloVisual) return false;
    return true;
  };

  return (
    <div className="app-wrapper">
      <div className="content-container">
        <header className="header-content">
          <div className="header-top">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Layout size={20} />
                <span className="text-xs font-bold tracking-widest uppercase">sambaqui arquitetura</span>
              </div>
              <h1 className="header-title">BRIEFING <strong>DEEP DIVE</strong></h1>
              <p className="header-sub">Detalhamento Técnico & Estético para Cozinha</p>
            </div>
          </div>
          <div style={{marginTop:16}}>
            <input className="client-input" type="text" placeholder="Nome do Cliente / Família" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
          </div>
        </header>

        <Section icon={ImageIcon} title="Identidade Visual (Arquétipos)" subtitle="Qual destas cozinhas faz seu coração bater mais forte?" isOpen={sections.estilo} toggle={() => toggleSection('estilo')}>
          <div className="visual-grid">
            {styles.map((style) => (
              <div key={style.id} className={`visual-card ${formData.estiloVisual === style.id ? 'selected' : ''}`} onClick={() => setFormData({...formData, estiloVisual: style.id})}>
                <div className="visual-img-container">
                  <img className="visual-img" src={style.img} alt={style.title} />
                  {formData.estiloVisual === style.id && <div style={{position:'absolute', top:12, right:12, background:'#2563eb', color:'#fff', padding:6, borderRadius:999}}><Check size={18} color="#fff" /></div>}
                </div>
                <div style={{padding:12}}>
                  <h3 style={{fontWeight:700, marginBottom:6}} className="text-slate-900">{style.title}</h3>
                  <p className="text-slate-400" style={{fontSize:13, lineHeight:1.2}}>{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={ChefHat} title="Rotina & Fluxo" subtitle="Como a casa funciona no dia a dia?" isOpen={sections.rotina} toggle={() => toggleSection('rotina')}>
          <RadioGroup label="1. Rotina de Café da Manhã" selected={formData.cafeDaManha} onChange={(val) => setFormData({...formData, cafeDaManha: val})} options={[{ value: 'mesa', label: 'Todos sentados à mesa juntos' },{ value: 'fluxo', label: 'Horários diferentes (fluxo rápido)' },{ value: 'balcao', label: 'Rápido/Em pé no balcão' },{ value: 'nao_toma', label: 'Não tomamos café em casa' }]} />
          <RadioGroup label="2. Quem cozinha?" selected={formData.quemCozinha} onChange={(val) => setFormData({...formData, quemCozinha: val})} options={[{ value: 'gourmet', label: 'Eu/Cônjuge (Pratos elaborados/Hobby)' },{ value: 'basico', label: 'Eu/Cônjuge (Apenas o básico/rápido)' },{ value: 'funcionaria', label: 'Funcionária/Cozinheira (Diariamente)' },{ value: 'misto', label: 'Misto (Funcionária + Família no fds)' }]} />

          <div style={{marginBottom:24}}>
            <h3 style={{fontSize:13, fontWeight:700, marginBottom:12, textTransform:'uppercase', letterSpacing:1.2}} className="text-slate-900">Rotina da Funcionária (Se houver)</h3>
            <textarea rows={3} placeholder="Descreva necessidades específicas: Ela almoça na cozinha? Precisa de TV? Precisa de bancada de apoio separada?" value={formData.rotinaFuncionaria} onChange={(e) => setFormData({...formData, rotinaFuncionaria: e.target.value})} className="textarea" />
          </div>

          <RadioGroup label="Nível de Integração com Sala" selected={formData.integra} onChange={(val) => setFormData({...formData, integra: val})} options={[{ value: 'total', label: '100% Aberta (Conceito Americano)', desc: 'Cheiros/Barulhos não incomodam' },{ value: 'flexivel', label: 'Integrável (Portas de correr)', desc: 'Posso fechar quando necessário' },{ value: 'fechada', label: 'Fechada (Privacidade total)', desc: 'Isolamento de odores é prioridade' }]} />
        </Section>

        <Section icon={Palette} title="Materiais & Acabamentos" subtitle="Tonalidades, pedras, vidros e metais" isOpen={sections.materiais} toggle={() => toggleSection('materiais')}>
          <RadioGroup label="5. Tonalidade das Bancadas (Pedras)" selected={formData.tomPedra} onChange={(val) => setFormData({...formData, tomPedra: val})} layout="grid" options={[{ value: 'branca', label: 'Branca / Claríssima', desc: 'Quartzo Branco, Mármore Paraná', color: '#f8f9fa' },{ value: 'cinza', label: 'Cinza / Concreto', desc: 'Gris, Cimento Queimado', color: '#adb5bd' },{ value: 'preta', label: 'Escura / Preta', desc: 'São Gabriel, Via Láctea, Dekton', color: '#212529' },{ value: 'exotica', label: 'Veios Marcantes / Exótica', desc: 'Calacatta, Mármores desenhados', color: '#e9ecef' }]} />

          <CheckboxGroup label="6. Cores da Marcenaria (Selecione até 2 favoritos)" selected={formData.tomMarcenaria} onChange={(val) => setFormData({...formData, tomMarcenaria: val})} maxSelection={2} options={[{ value: 'branco', label: 'Branco Clássico', desc: 'Amplitude e limpeza' },{ value: 'madeira', label: 'Madeira Natural', desc: 'Freijó, Carvalho, Nogueira' },{ value: 'cinza', label: 'Tons de Cinza', desc: 'Fendi, Grafite, Cinza Claro' },{ value: 'areia', label: 'Areia / Off-white', desc: 'Aconchego neutro' },{ value: 'verde', label: 'Verde', desc: 'Menta, Musgo, Petróleo' },{ value: 'azul', label: 'Azul', desc: 'Marinho, Petróleo, Acinzentado' },{ value: 'preto', label: 'Preto Total', desc: 'Drama e sofisticação' },{ value: 'terracota', label: 'Terracota', desc: 'Tons terrosos' }]} />

          <RadioGroup label="7. Vidros e Transparências" selected={formData.tipoVidro} onChange={(val) => setFormData({...formData, tipoVidro: val})} layout="grid" options={[{ value: 'reflecta_bronze', label: 'Reflecta Bronze', desc: 'Espelhado suave dourado/marrom' },{ value: 'reflecta_fume', label: 'Reflecta Fumê', desc: 'Espelhado suave cinza/preto' },{ value: 'incolor', label: 'Incolor / Cristal', desc: 'Total transparência (Cristaleira)' },{ value: 'canelado', label: 'Canelado', desc: 'Listrado vertical (Vintage/Moderno)' },{ value: 'martelado', label: 'Martelado', desc: 'Textura batida irregular' },{ value: 'fusion', label: 'Fusion / Wire', desc: 'Com trama metálica interna (Industrial)' },{ value: 'sem_vidro', label: 'Sem vidros', desc: 'Prefiro portas cegas (MDF)' }]} />

          <RadioGroup label="8. Tonalidade dos Eletros" selected={formData.tomEletros} onChange={(val) => setFormData({...formData, tomEletros: val})} layout="grid" options={[{ value: 'inox', label: 'Aço Inox', desc: 'Tradicional prateado' },{ value: 'black', label: 'Black Inox / Preto', desc: 'Preto fosco ou brilhante' },{ value: 'branco', label: 'Branco', desc: 'Linha White ou Retro' },{ value: 'oculto', label: 'Ocultos (Painéis)', desc: 'Marcenaria esconde tudo' }]} />
        </Section>

        <Section icon={Coffee} title="A Copa" subtitle="Refeições rápidas e convivência" isOpen={sections.copa} toggle={() => toggleSection('copa')}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            <RadioGroup label="9. Quantos Assentos?" selected={formData.assentosCopa} onChange={(val) => setFormData({...formData, assentosCopa: val})} options={[{ value: '2', label: '2 Lugares' },{ value: '3', label: '3 Lugares' },{ value: '4', label: '4 Lugares' },{ value: '5+', label: '5 ou mais' }]} />
             <RadioGroup label="10. Tipo de Assento" selected={formData.tipoAssento} onChange={(val) => setFormData({...formData, tipoAssento: val})} options={[{ value: 'cadeira', label: 'Cadeiras (Padrão)', desc: 'Conforto máximo' },{ value: 'banqueta', label: 'Banquetas Altas', desc: 'Estilo bar' },{ value: 'canto_alemao', label: 'Canto Alemão', desc: 'Banco fixo na parede + cadeiras' }]} />
          </div>
          <RadioGroup label="11. TV na Cozinha/Copa?" selected={formData.tvCopa} onChange={(val) => setFormData({...formData, tvCopa: val})} layout="grid" options={[{ value: 'nao', label: 'Não queremos TV' },{ value: 'pequena', label: 'Pequena (Notícias)', desc: 'Até 32"' },{ value: 'media', label: 'Média (Novelas/Séries)', desc: '40" a 43"' },{ value: 'grande', label: 'Grande (Sala de TV)', desc: '50"+ (A copa é a sala de TV)' }]} />
        </Section>

        <Section icon={Trash2} title="Técnica & Organização" subtitle="Lixo, louça e itens operacionais" isOpen={sections.funcional} toggle={() => toggleSection('funcional')}>
          <RadioGroup label="12. Lixeiras" selected={formData.lixeira} onChange={(val) => setFormData({...formData, lixeira: val})} options={[{ value: 'embutir', label: 'De embutir na bancada', desc: 'Tampa inox rente à pedra' },{ value: 'oculta', label: 'Oculta no armário', desc: 'Gavetão com baldes internos' },{ value: 'piso', label: 'Lixeira de Piso', desc: 'Modelo bonito de pedal externo' }]} />

          <RadioGroup label="13. Escorredor de Louças" selected={formData.escorredor} onChange={(val) => setFormData({...formData, escorredor: val})} options={[{ value: 'calha', label: 'Calha Úmida', desc: 'Canal equipado esculpido na pedra/inox' },{ value: 'oculto', label: 'Aéreo Oculto', desc: 'Dentro do armário acima da pia' },{ value: 'bancada', label: 'Tradicional de Bancada', desc: 'Móvel solto' }]} />
        </Section>

        <Section icon={Zap} title="Conforto & Automação" subtitle="Conforto, luz e automação" isOpen={sections.tech} toggle={() => toggleSection('tech')}>
           <RadioGroup label="14. Tratamento das Janelas" selected={formData.janelas} onChange={(val) => setFormData({...formData, janelas: val})} layout="grid" options={[{ value: 'sem', label: 'Sem cortinas', desc: 'Vista livre / Vidro limpo' },{ value: 'solar', label: 'Persiana Tela Solar', desc: 'Bloqueia calor, mantém visão externa' },{ value: 'horizontal', label: 'Persiana Horizontal', desc: 'Lâminas (Alumínio ou Madeira)' },{ value: 'tecido', label: 'Cortina de Tecido', desc: 'Estilo clássico (Cuidado c/ gordura)' }]} />

          <CheckboxGroup label="15. Cenários de Iluminação (Selecione todos desejados)" selected={formData.iluminacao} onChange={(val) => setFormData({...formData, iluminacao: val})} options={[{ value: 'geral', label: 'Luz Geral Intensa', desc: 'Painéis LED, foco em limpeza/trabalho' },{ value: 'indireta', label: 'Luz Indireta / Cênica', desc: 'Fitas LED em sancas/armários (Aconchego)' },{ value: 'trabalho', label: 'Luz de Trabalho', desc: 'Spots sobre a bancada de corte' },{ value: 'pendente', label: 'Pendentes Decorativos', desc: 'Sobre mesa/balcão' }]} />

          <RadioGroup label="16. Automação (Smart Home)" selected={formData.automacao} onChange={(val) => setFormData({...formData, automacao: val})} options={[{ value: 'nenhuma', label: 'Nenhuma (Interruptores comuns)' },{ value: 'basica', label: 'Básica (Alexa / Google Home)', desc: 'Controlar luz e TV por voz' },{ value: 'completa', label: 'Completa', desc: 'Sensores de gás, água, persianas elétricas' }]} />
        </Section>

        <Section icon={ImageIcon} title="Referências Visuais" subtitle="O que faz seus olhos brilharem?" isOpen={sections.estilo} toggle={() => toggleSection('estilo')}>
          <div className="visual-grid">
            {styles.map((style) => (
              <div key={style.id} className={`visual-card ${formData.estiloVisual === style.id ? 'selected' : ''}`} onClick={() => setFormData({...formData, estiloVisual: style.id})}>
                <div className="visual-img-container">
                  <img className="visual-img" src={style.img} alt={style.title} />
                  {formData.estiloVisual === style.id && <div style={{position:'absolute', top:12, right:12, background:'#2563eb', color:'#fff', padding:6, borderRadius:999}}><Check size={18} color="#fff" /></div>}
                </div>
                <div style={{padding:12}}>
                  <h3 style={{fontWeight:700, marginBottom:6}} className="text-slate-900">{style.title}</h3>
                  <p className="text-slate-400" style={{fontSize:13, lineHeight:1.2}}>{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div className="footer-actions">
          <button onClick={downloadJSON} disabled={!isFormValid()} className="primary-btn" style={{background:isFormValid() ? '#059669' : '#9ca3af'}}>
            <Save size={18} /> Finalizar e Gerar PDF
          </button>
          <p style={{marginTop:12, fontSize:12}} className="text-slate-400">Preencha todos os campos antes de gerar o PDF.</p>
        </div>

      </div>
    </div>
  );
}
