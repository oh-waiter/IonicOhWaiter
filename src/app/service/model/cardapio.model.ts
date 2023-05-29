import {Categoria} from "./categoria.model";

export interface Cardapio {
  "id": number,
  "nome": string,
  "urlImage": string,
  "descricao": string,
  "categoria": Categoria,
  "preco": number,
  "quantidade": number
}
