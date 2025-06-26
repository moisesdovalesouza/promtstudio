import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "lucide-react";

const presets = {
  "Foto para documento oficial": {
    plano: "primeiro plano",
    lente: "85mm",
    abertura: "f/2.8",
    iluminacao: "iluminação suave frontal",
    atmosfera: "fundo branco uniforme",
    expressao: "expressão neutra e direta",
    proporcao: "3:4 (vertical)",
    borda: "sem bordas"
  },
  "Foto profissional (LinkedIn)": {
    plano: "primeiro plano",
    lente: "85mm",
    abertura: "f/2.8",
    iluminacao: "iluminação suave lateral",
    atmosfera: "tons neutros e limpos, fundo claro desfocado",
    expressao: "expressão simpática e confiante",
    proporcao: "3:4 (vertical)",
    borda: "sem bordas"
  },
  "Perfil do Instagram": {
    plano: "primeiro plano",
    lente: "35mm",
    abertura: "f/1.8",
    iluminacao: "luz natural suave com sombra dourada",
    atmosfera: "tonalidade quente, granulação leve e desfoque orgânico",
    expressao: "sorriso leve e olhar espontâneo",
    proporcao: "4:5 (vertical)",
    borda: "sem bordas"
  },
  "Retrato vintage clássico": {
    plano: "plano médio",
    lente: "50mm",
    abertura: "f/2.8",
    iluminacao: "flash direto com sombra marcada",
    atmosfera: "textura de filme e tonalidade sépia",
    expressao: "olhar direto, pose clássica e séria",
    proporcao: "2:3 (vertical)",
    borda: "borda branca suave"
  },
  "Polaroid de aniversário": {
    plano: "plano médio",
    lente: "35mm",
    abertura: "f/2.8",
    iluminacao: "flash direto e luz ambiente",
    atmosfera: "tons desbotados com vinheta e fundo suave",
    expressao: "sorriso espontâneo e despreocupado",
    proporcao: "1:1 com espaço inferior ampliado",
    borda: "borda branca espessa inferior (estilo polaroid)"
  },
  "Foto de casal na praia": {
    plano: "plano americano",
    lente: "35mm",
    abertura: "f/2.8",
    iluminacao: "luz natural suave com sombra dourada",
    atmosfera: "tonalidade quente, granulação leve e desfoque orgânico",
    expressao: "expressão apaixonada e espontânea",
    proporcao: "3:4 (horizontal)",
    borda: "sem bordas"
  },
  "Capa estilo cinema": {
    plano: "plano americano",
    lente: "35mm",
    abertura: "f/2.8",
    iluminacao: "luz natural com sombras suaves",
    atmosfera: "alto contraste com fundo azulado ou esverdeado",
    expressao: "expressão dramática e contemplativa",
    proporcao: "2.39:1 (horizontal)",
    borda: "sem bordas"
  },
  "Foto artística com sombra": {
    plano: "primeiro plano",
    lente: "50mm",
    abertura: "f/1.8",
    iluminacao: "luz lateral forte com fundo colorido",
    atmosfera: "preto e branco com alto contraste",
    expressao: "expressão introspectiva",
    proporcao: "2:3 (vertical)",
    borda: "sem bordas"
  },
  "Foto estética tumblr": {
    plano: "primeiro plano",
    lente: "35mm",
    abertura: "f/1.8",
    iluminacao: "luz natural suave com flare",
    atmosfera: "cores lavadas, fundo desfocado, estilo tumblr",
    expressao: "olhar introspectivo com leve ironia",
    proporcao: "4:5 (vertical)",
    borda: "sem bordas"
  },
  "Capa de álbum indie": {
    plano: "plano médio",
    lente: "35mm",
    abertura: "f/2.8",
    iluminacao: "luz lateral forte com fundo colorido",
    atmosfera: "cores lavadas e granulação estilo VHS",
    expressao: "expressão distante e melancólica",
    proporcao: "1:1 (quadrado)",
    borda: "borda escura"
  },
  "Wallpaper iPhone": {
    plano: "plano americano",
    lente: "50mm",
    abertura: "f/2.8",
    iluminacao: "iluminação de fundo e efeito de flare",
    atmosfera: "alto contraste com fundo azulado ou esverdeado",
    expressao: "expressão introspectiva",
    proporcao: "19.5:9 (iPhone)",
    borda: "sem bordas"
  },
  "Wallpaper Samsung": {
    plano: "plano americano",
    lente: "50mm",
    abertura: "f/2.8",
    iluminacao: "iluminação de fundo e efeito de flare",
    atmosfera: "alto contraste com fundo azulado ou esverdeado",
    expressao: "expressão introspectiva",
    proporcao: "20:9 (Samsung Galaxy)",
    borda: "sem bordas"
  },
  "Foto estilo francês retrô": {
    plano: "primeiro plano",
    lente: "35mm",
    abertura: "f/2.8",
    iluminacao: "iluminação difusa com sombra esverdeada",
    atmosfera: "tons âmbar e fundo vintage",
    expressao: "expressão sonhadora e irônica",
    proporcao: "3:4 (vertical)",
    borda: "sem bordas"
  },
  "Estilo analógico dos anos 90": {
    plano: "plano médio",
    lente: "35mm",
    abertura: "f/4",
    iluminacao: "flash direto e luz ambiente",
    atmosfera: "cores vibrantes e estética de retrato de estúdio",
    expressao: "expressão cool e despreocupada",
    proporcao: "2:3 (vertical)",
    borda: "borda branca suave"
  },
  "Foto editorial de moda": {
    plano: "plano americano",
    lente: "85mm",
    abertura: "f/2.8",
    iluminacao: "luz frontal difusa com fundo liso",
    atmosfera: "tons levemente saturados com nitidez alta",
    expressao: "pose firme e olhar marcante",
    proporcao: "3:4 (vertical)",
    borda: "sem bordas"
  },
  "Estilo cinema noir": {
    plano: "plano médio",
    lente: "50mm",
    abertura: "f/1.4",
    iluminacao: "flash direto com sombra marcada",
    atmosfera: "preto e branco com sombra marcada",
    expressao: "expressão séria e misteriosa",
    proporcao: "2.39:1 (horizontal)",
    borda: "sem bordas"
  },
  "Foto de banda ao vivo": {
    plano: "plano americano",
    lente: "85mm",
    abertura: "f/2.0",
    iluminacao: "luz de palco colorida",
    atmosfera: "fumaça e contraste dinâmico",
    expressao: "movimento e expressão intensa",
    proporcao: "16:9 (horizontal)",
    borda: "sem bordas"
  },
  "Foto espontânea ao ar livre": {
    plano: "plano médio",
    lente: "35mm",
    abertura: "f/2.8",
    iluminacao: "luz natural com sombras suaves",
    atmosfera: "cores naturais com leve vinheta",
    expressao: "risada espontânea",
    proporcao: "3:4 (vertical)",
    borda: "sem bordas"
  },
  "Foto documental de rua": {
    plano: "plano americano",
    lente: "35mm",
    abertura: "f/4",
    iluminacao: "luz natural crua",
    atmosfera: "contraste urbano e tons realistas",
    expressao: "olhar direto para a lente",
    proporcao: "2:3 (horizontal)",
    borda: "sem bordas"
  },
  "Estilo capa de revista": {
    plano: "primeiro plano",
    lente: "85mm",
    abertura: "f/1.8",
    iluminacao: "luz frontal com recorte limpo",
    atmosfera: "tons levemente saturados com nitidez alta",
    expressao: "olhar marcante e sofisticado",
    proporcao: "8.5:11 (vertical)",
    borda: "sem bordas"
  }
};

const proporcoes = [
  "1:1 (quadrado)",
  "1:1 com espaço inferior ampliado",
  "2:3 (vertical)", "2:3 (horizontal)",
  "3:4 (vertical)", "3:4 (horizontal)",
  "4:5 (vertical)", "4:5 (horizontal)",
  "16:9 (vertical)", "16:9 (horizontal)",
  "9:16 (vertical)", "9:16 (horizontal)",
  "2.39:1 (vertical)", "2.39:1 (horizontal)",
  "19.5:9 (iPhone)",
  "20:9 (Samsung Galaxy)"
];

window.GeradorPromptImagem = GeradorPromptImagem;() {
  const [prompt, setPrompt] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [settings, setSettings] = useState(presets["Foto profissional (LinkedIn)"]);
  const [efeitos, setEfeitos] = useState({
    data: false,
    vazamento: false,
    pelos: false,
    granulado: false,
    poeira: false,
    vinheta: false,
    gotas: false,
    neve: false,
    sol: false,
    vapor: false,
    brilho: false,
    respingos: false
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const aplicarPreset = (preset) => {
    setSettings({ ...presets[preset] });
  };

  const handleCheckbox = (key) => {
    setEfeitos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const gerarPrompt = () => {
    let extras = [];
    if (efeitos.data) extras.push("data impressa na imagem");
    if (efeitos.vazamento) extras.push("vazamento de luz nostálgico");
    if (efeitos.pelos) extras.push("pequenos pelos ou sujeiras típicas de filme");
    if (efeitos.granulado) extras.push("granulação analógica visível");
    if (efeitos.poeira) extras.push("poeira solar dispersa");
    if (efeitos.vinheta) extras.push("vinheta escura nas bordas");
    if (efeitos.gotas) extras.push("gotas de água escorrendo no rosto");
    if (efeitos.neve) extras.push("flocos de neve dispersos");
    if (efeitos.sol) extras.push("raios de sol incidindo pela lateral");
    if (efeitos.vapor) extras.push("vapor suave envolvendo a imagem");
    if (efeitos.brilho) extras.push("pontos de brilho suave no fundo");
    if (efeitos.respingos) extras.push("respingos d'água ou partículas suspensas");

    const texto = `Gere o retrato em ${settings.plano} com lente de ${settings.lente}, proporção ${settings.proporcao}, fundo desfocado com profundidade de campo curta (${settings.abertura}), ${settings.iluminacao}, atmosfera poética em ${settings.atmosfera}, ${settings.expressao}, com ${settings.borda}${extras.length > 0 ? ", incluindo elementos como " + extras.join(", ") : ""}.`;
    setPrompt(texto);
    setCopiado(false);
  };

  const copiarPrompt = async () => {
    if (!prompt.trim()) {
      alert("Antes de copiar, gere o prompt.");
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(prompt);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
        return;
      } catch (err) {
        console.warn("Clipboard API falhou, tentando método alternativo...");
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = prompt;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      alert("Não foi possível copiar. Copie manualmente.");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const campos = [
    { key: 'plano', label: 'Plano (enquadramento da imagem)' },
    { key: 'lente', label: 'Lente (distância focal usada)' },
    { key: 'abertura', label: 'Abertura do diafragma (profundidade de campo)' },
    { key: 'iluminacao', label: 'Iluminação (tipo de luz utilizada)' },
    { key: 'atmosfera', label: 'Atmosfera/estilo visual (cores, textura, tom)' },
    { key: 'expressao', label: 'Expressão (emoção transmitida pela imagem)' },
    { key: 'proporcao', label: 'Proporção da foto (relação largura-altura)' },
    { key: 'borda', label: 'Tipo de borda (acabamento da imagem)' }
  ];

return (
  <div className="max-w-3xl mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">PromptStudio</h1>
      <Card className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-700 text-sm font-medium">Estilo predefinido</Label>
            <Select onValueChange={aplicarPreset}>
              <SelectTrigger className="rounded-xl border-gray-300">
                <SelectValue placeholder="Escolha um modelo de imagem" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(presets).map(preset => (
                  <SelectItem key={preset} value={preset}>{preset}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        {campos.map(({ key, label }) => (
          <div key={key}>
            <Label>{label}</Label>
            <Select value={settings[key]} onValueChange={v => handleChange(key, v)}>
              <SelectTrigger><SelectValue placeholder={label} /></SelectTrigger>
              <SelectContent>
                {key === 'plano' && ["primeiro plano", "plano médio", "plano americano"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'lente' && ["35mm", "85mm", "50mm", "24mm"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'abertura' && ["f/1.8", "f/2.8", "f/8"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'iluminacao' && [
                  "iluminação suave frontal",
                  "luz natural com sombras suaves",
                  "flash direto com sombra marcada",
                  "luz lateral forte com fundo colorido",
                  "iluminação de fundo e efeito de flare",
                  "luz natural suave com sombra dourada",
                  "flash direto e luz ambiente",
                  "luz lateral natural com flare leve",
                  "iluminação difusa com sombra esverdeada",
                  "luz natural crua",
                  "luz frontal difusa com fundo liso",
                  "luz frontal com recorte limpo",
                  "iluminação suave lateral",
                  "luz natural suave com flare",
                  "luz de palco colorida"
                ].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'atmosfera' && [
                  "tons neutros e limpos, fundo claro desfocado",
                  "tons levemente saturados com nitidez alta",
                  "cores lavadas e granulação estilo VHS",
                  "cores vibrantes e estética de retrato de estúdio",
                  "alto contraste com fundo azulado ou esverdeado",
                  "tonalidade quente, granulação leve e desfoque orgânico",
                  "tons desbotados com vinheta e fundo suave",
                  "cores lavadas, fundo desfocado, estilo tumblr",
                  "textura de filme e tonalidade sépia",
                  "fundo branco uniforme",
                  "tons âmbar e fundo vintage",
                  "preto e branco com alto contraste",
                  "preto e branco com sombra marcada",
                  "contraste urbano e tons realistas",
                  "fumaça e contraste dinâmico",
                  "cores naturais com leve vinheta"
                ].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'expressao' && [
                  "expressão simpática e confiante",
                  "expressão espontânea e introspectiva",
                  "expressão descontraída e nostálgica",
                  "olhar direto, pose clássica e séria",
                  "expressão cool e despreocupada",
                  "expressão leve e nostálgica",
                  "sorriso espontâneo e despreocupado",
                  "olhar introspectivo com leve ironia",
                  "expressão neutra e direta",
                  "sorriso leve e olhar espontâneo",
                  "expressão dramática e contemplativa",
                  "expressão introspectiva",
                  "expressão apaixonada e espontânea",
                  "expressão distante e melancólica",
                  "expressão séria e misteriosa",
                  "risada espontânea",
                  "olhar direto para a lente",
                  "olhar marcante e sofisticado",
                  "pose firme e olhar marcante",
                  "expressão sonhadora e irônica",
                  "movimento e expressão intensa"
                ].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'proporcao' && proporcoes.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                {key === 'borda' && ["sem bordas", "borda branca suave", "borda escura", "borda branca espessa inferior (estilo polaroid)"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        ))}

          <div>
            <Label className="text-gray-700 text-sm font-medium">Elementos adicionais</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(efeitos).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox id={key} checked={value} onCheckedChange={() => handleCheckbox(key)} />
                  <Label htmlFor={key} className="text-sm text-gray-600">{key}</Label>
                </div>
              ))}
            </div>
          </div>

          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="rounded-xl border-gray-300" />

<div className="flex flex-col items-center space-y-4">
  <div className="flex flex-col sm:flex-row gap-4">
    <Button onClick={gerarPrompt} className="bg-violet-600 text-white rounded-xl hover:bg-violet-700">
      Gerar Prompt
    </Button>
    <Button onClick={copiarPrompt} className="bg-violet-600 text-white rounded-xl hover:bg-violet-700">
      Copiar Prompt
    </Button>
  </div>
  {copiado && <CheckIcon className="text-green-500 animate-pulse mt-2" />}
</div>
        </CardContent>
      </Card>
    <p className="text-xs text-center text-gray-400 mt-6">
  Criado por <span className="font-semibold">@moisesdovalesouza</span> · 2025
</p>
    </div>
  );
}
