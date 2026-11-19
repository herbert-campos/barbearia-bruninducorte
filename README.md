# Barbearia BruninDucorte

Site da **Barbearia BruninDucorte — Barbearia 01 de Diadema** (Bruno Teixeira).
Modelo dark, luz amarela forte, premium e cinematográfico, com vídeo no topo.

- **Endereço:** Rua Rossini 37, Casa Grande, Diadema – SP
- **Instagram:** [@brunin.ducorte](https://instagram.com/brunin.ducorte)
- **WhatsApp:** [+55 11 98640-7967](https://wa.me/5511986407967)
- **Horário:** segunda a sábado, 9h às 20h
- **Sem sinal** — o pagamento é só na barbearia. Não há Pix no site.

## Como abrir

Site estático, sem back-end e sem build: basta abrir `index.html` no navegador
ou publicar a pasta (ex.: GitHub Pages, na branch `main`).

## Estrutura

- `index.html` — página principal (topo com vídeo, time, sobre, serviços, galeria, agendamento e assistente)
- `styles.css` — visual dark com luz amarela forte
- `app.js` — serviços, agendamento em 5 passos, assistente BruninDucorte e mensagens de WhatsApp
- `admin/index.html` — painel administrativo (`/admin/`)
- `images/` — fotos dos cortes, do penteado e do Bruninho
- `video/` — vídeo cinematográfico do topo

## O que o site faz

- **Serviços (15, com preço e tempo):** Corte R$ 40 · 28 min, Pigmentação R$ 30 · 20 min,
  Selagem R$ 50 · 20 min, Penteado R$ 20 · 15 min, Barba R$ 30 · 15 min,
  Corte+Barba R$ 60 · 45 min, Sobrancelha R$ 10 · 1 min, Bigode R$ 5 · 1 min,
  Progressiva R$ 80 · 29 min, Luzes R$ 80 · 59 min, Platinado R$ 100 · 60 min,
  Alisamento R$ 30 · 15 min, Hidratação R$ 15 · 15 min, Pezinho R$ 15 · 10 min,
  Corte+Barba+Sobrancelha R$ 70 · 50 min.
- **Interações:** ao tocar num serviço ele é selecionado e abre o agendamento;
  bigode, sobrancelha e penteado têm animação própria (o bigode mexe, a sobrancelha
  levanta e o cabelo balança).
- **Agendamento em 5 passos:** serviço → profissional → data → horário → nome e WhatsApp.
  Ao confirmar, o site prepara a mensagem de confirmação para enviar no WhatsApp da
  barbearia e mostra os textos prontos dos lembretes de 2h antes e de 30min antes
  (sem envio automático real).
- **Assistente BruninDucorte:** ajuda o cliente a escolher o serviço (por texto ou por
  botões rápidos) e já abre o agendamento com o serviço indicado.
- **Profissionais:** BruninDucorte (dono), Karl (corte degradê) e TZ Barbeiro.
  As fotos do Karl e do TZ chegam depois — por enquanto, a inicial de cada um.

## Painel administrativo (`admin/`)

Mostra quantos serviços cada funcionário fez, quais serviços e valores, e o botão
**“Gerar valor”**: escolhe o funcionário (Karl, TZ ou BruninDucorte) e calcula
automático — total, **40% para o funcionário e 60% para o Bruninho**.
Ex.: total R$ 2.000 → funcionário R$ 800 · Bruninho R$ 1.200.

O painel tem um botão para carregar agendamentos de exemplo (marcados como “exemplo”)
para demonstrar o cálculo. Os dados ficam salvos no navegador (localStorage);
para produção, ligue o painel a um banco de dados e proteja a página com senha.

## Observação sobre o vídeo

O vídeo do topo está em `video/` com o nome original gerado
(`media-generation-brunin-cinematico-dark-amarelo-0-b17dfd3f-485f-425a-a0e7-73343dd641ba.mp4`).
Ele é referenciado por esse nome em `index.html`. Não renomeie arquivos grandes
pelo editor web do GitHub: arquivos acima de ~1 MB perdem o conteúdo na renomeação
por lá (foi o que aconteceu na primeira tentativa e o vídeo teve que ser enviado de novo).
## Novidades (18/11/2026)

- **Redesign profissional:** tipografia Oswald + Inter, herói com chips e 2 CTAs, cards de serviço com foto e selo de ícone animado, galeria com legendas, Sobre com lista de informações e painel admin com barra visual 40/60.
- **Interação a cada clique:** cada um dos 15 serviços tem foto e ícone SVG próprio que anima ao clicar/selecionar, com selo "✓ Escolhido" e brilho amarelo.
- **Seção Porsche:** foto do Bruninho na Porsche branca com interação (zoom, brilho amarelo e revelação da legenda ao clicar) e o clipe cinematográfico v1. Regras de reprodução: o vídeo do herói fica sempre em loop; o da Porsche roda só uma vez ao chegar na seção e ao tocar na tela (botão ▶, com som ao tocar). O vídeo v2 foi descartado — fica o v1.
- **Seção "Um dia na Barbearia":** vídeo real da barbearia, com som ao tocar na tela, sem autoplay e sem loop. Créditos mantidos: "Um dia na favela" — Liniker MC · Brunin Ducorte · Mczk. Atenção: o arquivo enviado toca ~16 s no navegador (a mensagem original dizia 1:06); se o vídeo completo for enviado, é só substituir o arquivo em `video/`.
- **Foto do Karl:** já está no site — no time (círculo de 92 px com borda amarela, mesmo tamanho dos avatares) e na escolha de profissional do agendamento (passo 2, círculo de 40 px com a foto; Brunin e TZ aparecem com a inicial). A foto do TZ continua pendente. O fundo claro da foto original fica dentro do círculo; para fundo realmente preto seria preciso editar a imagem.
- **Fotos do Sobre:** as duas fotos de perto do Bruninho (de óculos/corrente e na moto BMW F900) com interação de zoom e brilho amarelo. Como são prints de celular, a barra de status do topo é escondida por um recorte em CSS (`.sobre-fotos img` com `aspect-ratio: 1 / 2`).
- **Vídeos:** nunca renomeie arquivos grandes de vídeo pelo editor web do GitHub — o conteúdo se perde (ver "Observação sobre o vídeo"). O vídeo da Porsche e o vídeo real mantêm o nome original gerado.
