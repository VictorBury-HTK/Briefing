import React, { useEffect, useState } from 'react';
import { 
  Printer, Save, Check, Circle, ChefHat, 
  Palette, Armchair, Trash2, Zap, Image as ImageIcon, 
  ChevronDown, ChevronUp, Coffee, Sun 
} from 'lucide-react';

const styles = [
  { id: 'dark-moody', title: 'Dark moody', desc: 'Armários pretos ou grafite, madeira escura, iluminação dramática.', img: '/img/Dark-Moody.jpeg' },
  { id: 'industrial', title: 'Industrial', desc: 'Cimento queimado, serralheria preta, estantes abertas, tubulação aparente.', img: '/img/Industrial.jpeg' },
  { id: 'contemporanea', title: 'Contemporânea', desc: 'Muita madeira, plantas, tons de pedra natural, aconchegante, luz quente.', img: '/img/Contemporanea.JPG' },
  { id: 'classica', title: 'Clássica', desc: 'Portas com molduras (shaker), puxadores concha, mármore, elegância atemporal.', img: '/img/Classica.jpeg' },
  { id: 'pedra-exotica-e-cor', title: 'Pedra exótica e cor', desc: 'Veios marcantes e mistura de cor.', img: '/img/Pedra-exotica-e-cor.jpeg' },
  { id: 'somente-cor', title: 'Somente cor', desc: 'Somente cor (paleta sólida).', img: '/img/Cor.jpeg' },
  { id: 'pedra-exotica-minimalista', title: 'Pedra exótica minimalista', desc: 'Exótica com estética minimalista.', img: '/img/Pedra-exotica-minimalista.jpeg' },
  { id: 'pedra-exotica-contemporanea', title: 'Pedra exótica contemporânea', desc: 'Exótica com toque contemporâneo.', img: '/img/Pedra-exotica-contemporanea.jpeg' }
];

const Section = ({ icon: Icon, title, subtitle, isOpen, toggle, children }) => (
  <div style={{borderBottom: '1px solid #e2e8f0', breakInside: 'avoid'}}>
    <div onClick={toggle} style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'1.5rem', cursor:'pointer', background: isOpen ? '#f8fafc' : '#fff'}}>
      <div style={{display:'flex', alignItems:'center', gap:16}}>
        <div style={{padding:10, borderRadius:12, background: isOpen ? '#0f172a' : '#f1f5f9', color: isOpen ? '#fff' : '#94a3b8'}}>
          <Icon size={22} />
        </div>
        <div>
          <h2 style={{fontSize:18, fontWeight:700, color:'#0f172a'}}>{title}</h2>
          {subtitle && <p style={{fontSize:13, color:'#94a3b8'}}>{subtitle}</p>}
        </div>
      </div>
      {isOpen ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
    </div>
    {isOpen && <div style={{padding:'1.5rem', background:'#fff', animation:'fadeIn .2s'}}>{children}</div>}
  </div>
);

const RadioGroup = ({ label, options, selected, onChange, layout = 'col' }) => (
  <div style={{marginBottom:24}}>
    <h3 style={{fontSize:13, fontWeight:700, color:'#0f172a', marginBottom:12, textTransform:'uppercase', letterSpacing:1.2}}>{label}</h3>
    <div style={{display:'grid', gap:12, gridTemplateColumns: layout === 'grid' ? '1fr 1fr' : '1fr'}}>
      {options.map((opt) => (
        <label key={opt.value} style={{display:'flex', alignItems:'center', gap:12, padding:12, borderRadius:12, border: selected === opt.value ? '2px solid #2563eb' : '1px solid #e6eef6', background: selected === opt.value ? '#eff6ff' : '#fff', cursor:'pointer'}}>
          <input type="radio" name={label} value={opt.value} checked={selected === opt.value} onChange={() => onChange(opt.value)} />
          <div style={{flex:1}}>
            <span style={{display:'block', fontSize:14, fontWeight:600, color:'#0f172a'}}>{opt.label}</span>
            {opt.desc && <span style={{display:'block', fontSize:12, color:'#94a3b8', marginTop:4}}>{opt.desc}</span>}
          </div>
          {opt.color && <div style={{width:24, height:24, borderRadius:999, border:'1px solid #e6eef6', boxShadow:'0 1px 3px rgba(2,6,23,0.05)', background:opt.color}} />}
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, options, selected, onChange, maxSelection }) => (
  <div style={{marginBottom:24}}>
    <h3 style={{fontSize:13, fontWeight:700, color:'#0f172a', marginBottom:12, textTransform:'uppercase', letterSpacing:1.2}}>{label}</h3>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <div key={opt.value} onClick={() => {
            if (isSelected) {
              onChange(selected.filter(i => i !== opt.value));
            } else {
              if (maxSelection && selected.length >= maxSelection) {
                window.alert(`Você pode selecionar no máximo ${maxSelection} opções.`);
                return;
              }
              onChange([...selected, opt.value]);
            }
          }} style={{display:'flex', alignItems:'center', gap:12, padding:12, borderRadius:12, border: isSelected ? '2px solid #059669' : '1px solid #e6eef6', background: isSelected ? '#ecfdf5' : '#fff', cursor:'pointer'}}>
            <div style={{width:20, height:20, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', border: isSelected ? '1px solid #059669' : '1px solid #cbd5e1', background: isSelected ? '#059669' : '#fff', color:'#fff'}}>
              {isSelected && <Check size={14} color="#fff" />}
            </div>
            <div>
              <span style={{display:'block', fontSize:14, fontWeight:600, color:'#0f172a'}}>{opt.label}</span>
              {opt.desc && <span style={{display:'block', fontSize:12, color:'#94a3b8'}}>{opt.desc}</span>}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function DeepDiveBriefing() {
  const [sections, setSections] = useState({ rotina: true, materiais: true, copa: true, funcional: true, tech: true, estilo: true });
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
    <div style={{minHeight:'100vh', background:'#f1f5f9', padding:'2rem', fontFamily: 'Inter, system-ui, sans-serif', color:'#0f172a'}}>
      <div style={{maxWidth:1024, margin:'0 auto', background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 20px 50px rgba(2,6,23,0.08)'}}>
        <header style={{background:'#0f172a', color:'#fff', padding:'2rem'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div>
              <h1 style={{fontSize:22, fontWeight:300, letterSpacing:2, marginBottom:8}}>BRIEFING <strong style={{fontWeight:700, color:'#60a5fa'}}>DEEP DIVE</strong></h1>
              <p style={{color:'#94a3b8', fontSize:13}}>Detalhamento Técnico & Estético para Cozinha</p>
            </div>
            <button onClick={handlePrint} style={{background:'#2563eb', borderRadius:10, padding:'8px 14px', color:'#fff', display:'flex', alignItems:'center', gap:8, border:'none'}}>
              <Printer size={16} /> Imprimir / PDF
            </button>
          </div>
          <div style={{marginTop:16}}>
            <input type="text" placeholder="Nome do Cliente / Família" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} style={{width:'100%', maxWidth:480, background:'#0f172a', border:'1px solid #111827', color:'#fff', padding:12, borderRadius:8}} />
          </div>
        </header>

        <Section icon={ChefHat} title="Dinâmica da Casa" subtitle="Fluxo de pessoas e uso real do espaço" isOpen={sections.rotina} toggle={() => toggleSection('rotina')}>
          <RadioGroup label="1. Rotina de Café da Manhã" selected={formData.cafeDaManha} onChange={(val) => setFormData({...formData, cafeDaManha: val})} options={[{ value: 'mesa', label: 'Todos sentados à mesa juntos' },{ value: 'fluxo', label: 'Horários diferentes (fluxo rápido)' },{ value: 'balcao', label: 'Rápido/Em pé no balcão' },{ value: 'nao_toma', label: 'Não tomamos café em casa' }]} />
          <RadioGroup label="2. Quem cozinha?" selected={formData.quemCozinha} onChange={(val) => setFormData({...formData, quemCozinha: val})} options={[{ value: 'gourmet', label: 'Eu/Cônjuge (Pratos elaborados/Hobby)' },{ value: 'basico', label: 'Eu/Cônjuge (Apenas o básico/rápido)' },{ value: 'funcionaria', label: 'Funcionária/Cozinheira (Diariamente)' },{ value: 'misto', label: 'Misto (Funcionária + Família no fds)' }]} />

          <div style={{marginBottom:24}}>
            <h3 style={{fontSize:13, fontWeight:700, color:'#0f172a', marginBottom:12, textTransform:'uppercase', letterSpacing:1.2}}>3. Rotina da Funcionária (Se houver)</h3>
            <textarea rows={3} placeholder="Descreva necessidades específicas: Ela almoça na cozinha? Precisa de TV? Precisa de bancada de apoio separada?" value={formData.rotinaFuncionaria} onChange={(e) => setFormData({...formData, rotinaFuncionaria: e.target.value})} style={{width:'100%', padding:12, border:'1px solid #e6eef6', borderRadius:8, fontSize:13}} />
          </div>

          <RadioGroup label="4. Nível de Integração com Sala" selected={formData.integra} onChange={(val) => setFormData({...formData, integra: val})} options={[{ value: 'total', label: '100% Aberta (Conceito Americano)', desc: 'Cheiros/Barulhos não incomodam' },{ value: 'flexivel', label: 'Integrável (Portas de correr)', desc: 'Posso fechar quando necessário' },{ value: 'fechada', label: 'Fechada (Privacidade total)', desc: 'Isolamento de odores é prioridade' }]} />
        </Section>

        <Section icon={Palette} title="Materiais & Acabamentos" subtitle="Tonalidades, pedras e texturas" isOpen={sections.materiais} toggle={() => toggleSection('materiais')}>
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

        <Section icon={Trash2} title="Funcionalidade Técnica" subtitle="Lixo, louça e organização" isOpen={sections.funcional} toggle={() => toggleSection('funcional')}>
          <RadioGroup label="12. Lixeiras" selected={formData.lixeira} onChange={(val) => setFormData({...formData, lixeira: val})} options={[{ value: 'embutir', label: 'De embutir na bancada', desc: 'Tampa inox rente à pedra' },{ value: 'oculta', label: 'Oculta no armário', desc: 'Gavetão com baldes internos' },{ value: 'piso', label: 'Lixeira de Piso', desc: 'Modelo bonito de pedal externo' }]} />

          <RadioGroup label="13. Escorredor de Louças" selected={formData.escorredor} onChange={(val) => setFormData({...formData, escorredor: val})} options={[{ value: 'calha', label: 'Calha Úmida', desc: 'Canal equipado esculpido na pedra/inox' },{ value: 'oculto', label: 'Aéreo Oculto', desc: 'Dentro do armário acima da pia' },{ value: 'bancada', label: 'Tradicional de Bancada', desc: 'Móvel solto' }]} />
        </Section>

        <Section icon={Zap} title="Tecnologia & Conforto" subtitle="Automação, Luz e Janelas" isOpen={sections.tech} toggle={() => toggleSection('tech')}>
           <RadioGroup label="14. Tratamento das Janelas" selected={formData.janelas} onChange={(val) => setFormData({...formData, janelas: val})} layout="grid" options={[{ value: 'sem', label: 'Sem cortinas', desc: 'Vista livre / Vidro limpo' },{ value: 'solar', label: 'Persiana Tela Solar', desc: 'Bloqueia calor, mantém visão externa' },{ value: 'horizontal', label: 'Persiana Horizontal', desc: 'Lâminas (Alumínio ou Madeira)' },{ value: 'tecido', label: 'Cortina de Tecido', desc: 'Estilo clássico (Cuidado c/ gordura)' }]} />

          <CheckboxGroup label="15. Cenários de Iluminação (Selecione todos desejados)" selected={formData.iluminacao} onChange={(val) => setFormData({...formData, iluminacao: val})} options={[{ value: 'geral', label: 'Luz Geral Intensa', desc: 'Painéis LED, foco em limpeza/trabalho' },{ value: 'indireta', label: 'Luz Indireta / Cênica', desc: 'Fitas LED em sancas/armários (Aconchego)' },{ value: 'trabalho', label: 'Luz de Trabalho', desc: 'Spots sobre a bancada de corte' },{ value: 'pendente', label: 'Pendentes Decorativos', desc: 'Sobre mesa/balcão' }]} />

          <RadioGroup label="16. Automação (Smart Home)" selected={formData.automacao} onChange={(val) => setFormData({...formData, automacao: val})} options={[{ value: 'nenhuma', label: 'Nenhuma (Interruptores comuns)' },{ value: 'basica', label: 'Básica (Alexa / Google Home)', desc: 'Controlar luz e TV por voz' },{ value: 'completa', label: 'Completa', desc: 'Sensores de gás, água, persianas elétricas' }]} />
        </Section>

        <Section icon={ImageIcon} title="Referências Visuais" subtitle="O que faz seus olhos brilharem?" isOpen={sections.estilo} toggle={() => toggleSection('estilo')}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, padding:8}}>
            {styles.map((style) => (
              <div key={style.id} onClick={() => setFormData({...formData, estiloVisual: style.id})} style={{cursor:'pointer', borderRadius:12, overflow:'hidden', border: formData.estiloVisual === style.id ? '2px solid #2563eb' : '1px solid #f1f5f9', boxShadow: formData.estiloVisual === style.id ? '0 10px 30px rgba(37,99,235,0.12)' : '0 6px 16px rgba(2,6,23,0.04)'}}>
                <div style={{position:'relative', paddingTop:'75%'}}>
                  <img src={style.img} alt={style.title} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}} />
                  <div style={{position:'absolute', inset:0, background: formData.estiloVisual === style.id ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'}} />
                  {formData.estiloVisual === style.id && <div style={{position:'absolute', top:12, right:12, background:'#2563eb', color:'#fff', padding:6, borderRadius:999}}><Check size={18} color="#fff" /></div>}
                </div>
                <div style={{padding:12}}>
                  <h3 style={{fontWeight:700, color:'#0f172a', marginBottom:6}}>{style.title}</h3>
                  <p style={{color:'#94a3b8', fontSize:13, lineHeight:1.2}}>{style.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div style={{background:'#f8fafc', padding:'2rem', borderTop:'1px solid #e2e8f0', textAlign:'center'}}>
          <button onClick={downloadJSON} disabled={!isFormValid()} style={{background:isFormValid() ? '#059669' : '#9ca3af', borderRadius:14, padding:'12px 24px', color:'#fff', fontWeight:700, border:'none', display:'inline-flex', alignItems:'center', gap:10}}>
            <Save size={18} /> Finalizar e Gerar PDF
          </button>
          <p style={{marginTop:12, fontSize:12, color:'#94a3b8'}}>Preencha todos os campos antes de gerar o PDF.</p>
        </div>

      </div>
    </div>
  );
}
