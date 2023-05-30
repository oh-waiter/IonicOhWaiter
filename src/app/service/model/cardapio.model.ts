import {Categoria} from "./categoria.model";

export interface Cardapio {
  "id": number,
  "nome": string,
  "urlImage": string,
  "descricao": string,
  "categoria": Categoria,
  "tempoDePreparo": number,
  "preco": number,
  "quantidade": number
}
