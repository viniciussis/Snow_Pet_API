
---

# Snow Pet Shop API

## Descrição

A **Snow Pet Shop API** é uma API desenvolvida em NestJS para gerenciar as operações de um pet shop, incluindo serviços de banho e tosa e a venda de produtos para pets. A API utiliza Prisma como ORM e o banco de dados MongoDB hospedado no MongoDB Atlas.

## Tecnologias Utilizadas

- **NestJS**: Framework para construir aplicações server-side eficientes e escaláveis.
- **Prisma**: ORM para conectar ao banco de dados MongoDB.
- **MongoDB Atlas**: Serviço de banco de dados em cloud.
- **TypeScript**: Linguagem de programação utilizada no desenvolvimento do projeto.

## Funcionalidades

- Gerenciamento de pets.
- Gerenciamento de clientes.
- Controle de estoque de produtos.
- Registro de vendas e serviços de banho e tosa.
- Métricas, relatórios e controle de caixa.

## Documentação da API

A documentação completa da API está disponível na rota: [http://localhost:3000/api](http://localhost:3000/api)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/snow-pet-shop-api.git
   cd snow-pet-shop-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
   ```env
   DATABASE_URL="mongodb+srv://<usuário>:<senha>@cluster0.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority"
   ```

4. **Rode as migrações do Prisma:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   # ou
   yarn start:dev
   ```

## Uso

Após iniciar o servidor, você pode acessar a documentação da API em [http://localhost:3000/api](http://localhost:3000/api) para explorar os endpoints disponíveis e testar as funcionalidades.

## Contribuição

Se você deseja contribuir com o projeto, siga os passos abaixo:

1. **Fork o repositório**
2. **Crie uma branch para a sua feature:** (`git checkout -b minha-feature`)
3. **Commit suas mudanças:** (`git commit -m 'Adicionei minha feature'`)
4. **Push para a branch:** (`git push origin minha-feature`)
5. **Abra um Pull Request**

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Espero que isso atenda às suas necessidades! Se precisar de alguma informação adicional ou ajustes, sinta-se à vontade para pedir.