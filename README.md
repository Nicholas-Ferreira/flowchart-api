# FlowDeploy: Automated AWS Workflow Deployment

⚠️⚠️ Projeto apenas de estudo. ⚠️⚠️

## 📖 Sobre o Projeto
Este projeto é uma aplicação backend construída com NestJS que permite aos usuários criar, gerenciar e implementar fluxos de trabalho (Flowcharts) utilizando AWS Step Functions e AWS Lambda. A implementação é feita de forma automatizada via AWS SDK.

### 🌟 Principais Funcionalidades

- **Deploy Automático:** Implante seus fluxos de trabalho na AWS com um único comando usando CloudFormation.
- **Execução de Flowcharts:** Execute os fluxos de trabalho e receba o resultado diretamente pela API.
- **Desenvolvimento Local com LocalStack:** Teste e desenvolva localmente simulando os serviços da AWS.

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/):** Framework para a construção de aplicações Node.js escaláveis e eficientes.
- **[TypeORM](https://typeorm.io/):** ORM para TypeScript e JavaScript (ES7), altamente focado em simplicidade e fácil utilização.
- **[AWS SDK](https://aws.amazon.com/sdk-for-javascript/):** Biblioteca que facilita a interação com os serviços da AWS.
- **[LocalStack](https://localstack.cloud/):** Ambiente local que simula a AWS para desenvolvimento e testes.

## ⚙️ Instalação e Configuração

### Pré-requisitos

- **Node.js** e **NPM** instalados
- **Docker** e **Docker Compose** instalados
- **LocalStack** configurado
