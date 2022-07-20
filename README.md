
# Store Manager

API REST com CRUD que desenvolvi durante o módulo de Back-end do curso da Trybe.
Feita com Node.js e Express, testada com Mocha e utilizando arquitetura MSC, nela é possível buscar, listar, cadastrar, editar e excluir produtos e vendas de um banco de dados MySQL

## Documentação da API

#### Retorna todos os produtos

```http
  GET /products
```


#### Retorna um produto

```http
  GET /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do produto que você quer |


#### Adiciona um produto

```http
  POST /products
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `body`      | `object` | **Obrigatório**. Body deve ser um JSON contendo uma proriedade **name** que deve ser uma string de pelo menos 5 caracteres|

#### Edita um produto

```http
  PUT /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                                                                                                 |
| :---------- | :--------- | :------------------------------------------------------------------------------------------------------------------------ |
| `body`      | `object`   | **Obrigatório**. Body deve ser um JSON contendo uma proriedade **name** que deve ser uma string de pelo menos 5 caracteres|
|             |            |                                                                                                                    | 
| `id`        | `number`   | **Obrigatório**. O ID do produto que você quer editar |

#### Deleta um produto

```http
  DELETE /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do produto que você quer excluir |


#### Busca um produto por termo

```http
  GET /products/search/${query}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `query`      | `string` | **Opcional**. Nome do produto desejado. Caso omitido, retorna todos os produtos |


#### Retorna todas as vendas

```http
  GET /sales
```


#### Retorna uma venda

```http
  GET /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID da venda que você quer |


#### Adiciona vendas

```http
  POST /sales
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `body`      | `array` | **Obrigatório**. Body deve ser um JSON contendo um array de objetos com as proriedades **productId** que deve ser um id de produto válido e **quantity** que deve ser um number referente à quantidade. É possível adicionar mais de uma venda por requisição|

#### Edita uma venda

```http
  PUT /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                                                                                                 |
| :---------- | :--------- | :------------------------------------------------------------------------------------------------------------------------ |
| `body`      | `object`   | **Obrigatório**. Body deve ser um JSON contendo um array de objetos com as proriedades **productId** que deve ser um id de produto válido e **quantity** que deve ser um number referente à quantidade.|
|             |            |                                                                                                                    | 
| `id`        | `number`   | **Obrigatório**. O ID da venda que você quer editar |

#### Deleta uma venda

```http
  DELETE /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID da venda que você quer excluir |



## Melhorias

Aumentar a cobertura de testes, atualmente cerca de 80% das camadas estão cobertas.


## Rodando o projeto

Clone o projeto

```bash
  git clone git@github.com:Thiago-Bodnar/Store-Manager.git
```

Entre no diretório do projeto

```bash
  cd Store-Manager
```

  
  ##  Com Docker

  **Seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

  >  Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
  - A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.
   Use o comando `docker exec -it store_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  >  Instale as dependências com `npm install`

  - **Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 


  ##  Sem Docker

  >  Instale as dependências com `npm install`

  - **Atenção:** Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `Node.js` instalado em seu computador.
  - **Atenção:** A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito a chave `engines` no arquivo `package.json`


    
## Aprendizados

Os meus principais aprendizados foram como organizar a aplicação separando em camadas de models, services e controllers (MSC) e fazer a comunicação da API com um banco de dados MySQL

## Stacks utilizadas

**Back-end:** Node, Express, MySQL, Mocha

