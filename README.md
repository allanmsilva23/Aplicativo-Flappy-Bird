# 🚀 Atividade Prática 9 - CyberFlap (Clone Flappy Bird em React Native)

Este repositório contém a entrega da **Atividade Prática 9** desenvolvida para a disciplina de **Programação para Dispositivos Móveis II** do professor Jeferson de Souza Dias do curso de **Desenvolvimento de Software Multiplataforma** na **Fatec Itaquera**.

## 📌 Sobre o Projeto

O aplicativo é um clone completo e funcional do clássico jogo Flappy Bird, reimaginado com uma identidade visual "Cyberpunk Neon". O projeto conta com um motor de física customizado, detecção de colisões e recursos extras, oferecendo uma experiência nativa fluida em dispositivos móveis.

## 🎯 Requisitos da Atividade e Como Foram Aplicados

| Requisito Solicitado | Como foi implementado |
| :--- | :--- |
| **Usar React Navigation** | A navegação foi implementada utilizando `@react-navigation/native-stack`, distribuindo o fluxo em 4 telas distintas (Boas-vindas, Instruções, Jogo e Créditos). |
| **No mínimo três arquivos** | A arquitetura seguiu rigorosamente a regra: o gerenciamento de rotas fica no `App.js`, e as telas estão separadas na pasta `src/` como `tela1.js`, `tela2.js`, `tela3.js` e `tela4.js`. |
| **Aviso e Créditos Acadêmicos** | A frase obrigatória foi fixada no rodapé (footer) de todas as telas. A `tela4.js` exibe os créditos contendo meu nome (Allan), instituição (FATEC Itaquera) e curso (DSM). |
| **Mudar Identidade Visual** | O visual padrão foi substituído por um tema moderno e escuro (Dark Mode) com elementos e naves em Neon (Ciano e Roxo), utilizando `StyleSheet`. |
| **Implementações Extras (Bônus)** | Foram adicionados os 3 bônus sugeridos na atividade: **1)** Modo 2 Jogadores na mesma tela; **2)** Efeitos sonoros utilizando `expo-av`; **3)** HUD em tempo real com Pontuação, Recorde e Cronômetro. |
| **Cuidado no Layout** | Utilização da biblioteca `react-native-safe-area-context` para evitar sobreposição de elementos na barra de status do celular (notch/câmera) e botões virtuais. |

---

## 🚀 Como Executar o Projeto

Você pode testar este projeto de duas maneiras: diretamente no navegador via Snack Expo (forma mais rápida) ou localmente na sua máquina.

### Opção 1: Pelo Snack Expo (Direto no Navegador)
1. Acesse o [Snack Expo](https://snack.expo.dev/).
2. No painel esquerdo de arquivos, crie a seguinte estrutura (apagando o conteúdo padrão):
   - `App.js`
   - `package.json` (adicione as dependências do React Navigation e Expo AV)
   - `src/tela1.js`
   - `src/tela2.js`
   - `src/tela3.js`
   - `src/tela4.js`
3. Copie e cole os respectivos códigos deste repositório em cada arquivo.
4. Selecione a aba **Web**, **iOS** ou **Android** no painel direito para visualizar e interagir com o jogo em tempo real.

### Opção 2: Localmente na sua Máquina
**Pré-requisitos:** Node.js instalado e o aplicativo *Expo Go* no seu dispositivo móvel (opcional).

1. Clone este repositório para a sua máquina:
   ```bash
   git clone https://github.com/allanmsilva23/Aplicativo-Flappy-Bird.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd Aplicativo-Flappy-Bird
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
5. Escaneie o QR Code que aparecerá no terminal usando a câmera do seu celular (iOS) ou o app do Expo Go (Android).

---

## 🛠️ Tecnologias Utilizadas
*   **React Native**
*   **Expo (v54.0.0)**
*   **React Navigation** (Native Stack)
*   **Expo AV** (Áudio)
*   **JavaScript (ES6+)**