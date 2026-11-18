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
