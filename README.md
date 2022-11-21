# Como rodar a aplicação localmente

1) Certifique-se que o Docker esteja instalado; 
2) Clone esse repositório;
3) Execute $ docker-compose up -d --build
4) Execute $ docker exec -it ng_back sh
5) Execute $ npm install 
6) Execute $ npx prisma migrate dev ngCash
7) Execute $ npm run dev
8) Acesse _[localhost:3000](http://localhost:3000/)_ para interagir com a aplicação.

# Login

Existe três usuários previamente cadastrados: 

<table border="1">
    <tr>
      <td><b>Nome do usuário</></td>
      <td><b>Senha</b></td>
    </tr>
    <tr>
      <td>vinicius</td>
      <td>Ngcash123</td>
    </tr>
    <tr>
      <td>igor</td>
      <td>Ngcash123</td>
    </tr>
    <tr>
      <td>marianne</td>
      <td>Ngcash123</td>
    </tr>
</table>

# Cadastro

- É possível criar novos usuários e realizar transferências entre todos. 
