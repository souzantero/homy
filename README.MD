Olá, eu sou o Homylife (Alpha), um projeto que tem objetivo de ser um Sistema Home Welness.

# Como implantar o sistema?

> Primeiro devemos criar a infraestrutura da aplicação utilizando o terraform:

```
  cd terraform/dev
  terraform apply
```

> Depois precisamos criar o banco de dados, podemos fazer isso utilizando o `prisma` configurado no servidor ou conectar no banco manualmente, vamos fazer utilizando o `prisma`.

> No diretório do terraform, execute o comandando abaixo para obter o endereço do banco de dados:

```
terraform output -raw rds_hostname
```

> Agora vamos entrar no diretório do servidor:

```
cd ../../server
```

No diretório do servidor, vamos exportar a variavel de ambiente que o `prisma` irá utilizar para fazer a conexão com o banco de dados:

```
export POSTGRES_URL=postgresql://homylife:<password>@<hostname>:5432/homylife_db
```

Substitua os valores entre `<>`.

> Agora podemos executar o seguinte comando:

```
npm run prisma:generate:dev
```

> Com banco de dados criado podemos fazer a implantação do servidor. Configure o ambiente de desenvolvimento no seu github com as seguintes `secrets`:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
POSTGRES_URL
JWT_SECRET
BCRYPT_SALT
```

> Certifique-se de que existe uma `branch` com o nome `develop` e faça o push da aplicação.

> Para fazer a implantação do cliente, vamos entrar no diretório do cliente:

```
cd ../client
```

> Faça o `export` da variavel de ambiente `REACT_APP_SERVER_HOST_ADDRESS` com o valor da URL criada no Api Gateway da AWS para a Lambda do nosso servidor, então execute o comando de implantação:

```
npm run build
npm run sls:deploy
```
