export class Piece {
  /*Referente a todas as peças*/
  public nomePeca: string;
  public codigoPeca: string;
  public cor: string;
  public enPassantMove: number[] = new Array();

  /*Referente ao peão*/
  public foiMovida: boolean = false;
  public enPassant: boolean = false;

  constructor(
    nomePeca?: string,
    codigoPeca?: string,
    cor?: string
  ) {
    this.nomePeca = nomePeca;
    this.codigoPeca = codigoPeca;
    this.cor = cor;
  }
}