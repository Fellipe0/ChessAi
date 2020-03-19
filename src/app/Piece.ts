import { defaultKeyValueDiffers } from '@angular/core/src/change_detection/change_detection';

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


  public static posInicialPiece(tabuleiro: Piece[][]): Promise<Piece[][]> {
    return new Promise((resolve) => {
      /*-Peças Brancas-*/
      tabuleiro[0][0].codigoPeca = "&#9814;";
      tabuleiro[0][0].nomePeca = "T";
      tabuleiro[0][0].cor = "B";
      tabuleiro[0][1].codigoPeca = "&#9816;";
      tabuleiro[0][1].nomePeca = "C";
      tabuleiro[0][1].cor = "B";
      tabuleiro[0][2].codigoPeca = "&#9815;";
      tabuleiro[0][2].nomePeca = "B";
      tabuleiro[0][2].cor = "B";
      tabuleiro[0][3].codigoPeca = "&#9813;";
      tabuleiro[0][3].nomePeca = "D";
      tabuleiro[0][3].cor = "B";
      tabuleiro[0][4].codigoPeca = "&#9812;";
      tabuleiro[0][4].nomePeca = "R";
      tabuleiro[0][4].cor = "B";
      tabuleiro[0][5].codigoPeca = "&#9815;";
      tabuleiro[0][5].nomePeca = "B";
      tabuleiro[0][5].cor = "B";
      tabuleiro[0][6].codigoPeca = "&#9816;";
      tabuleiro[0][6].nomePeca = "C";
      tabuleiro[0][6].cor = "B";
      tabuleiro[0][7].codigoPeca = "&#9814;";
      tabuleiro[0][7].nomePeca = "T";
      tabuleiro[0][7].cor = "B";

      /*-Peças Negras-*/
      tabuleiro[7][0].codigoPeca = "&#9820;";
      tabuleiro[7][0].nomePeca = "T";
      tabuleiro[7][0].cor = "N";
      tabuleiro[7][1].codigoPeca = "&#9822;";
      tabuleiro[7][1].nomePeca = "C";
      tabuleiro[7][1].cor = "N";
      tabuleiro[7][2].codigoPeca = "&#9821;";
      tabuleiro[7][2].nomePeca = "B";
      tabuleiro[7][2].cor = "N";
      tabuleiro[7][3].codigoPeca = "&#9819;";
      tabuleiro[7][3].nomePeca = "D";
      tabuleiro[7][3].cor = "N";
      tabuleiro[7][4].codigoPeca = "&#9818;";
      tabuleiro[7][4].nomePeca = "R";
      tabuleiro[7][4].cor = "N";
      tabuleiro[7][5].codigoPeca = "&#9821;";
      tabuleiro[7][5].nomePeca = "B";
      tabuleiro[7][5].cor = "N";
      tabuleiro[7][6].codigoPeca = "&#9822;";
      tabuleiro[7][6].nomePeca = "C";
      tabuleiro[7][6].cor = "N";
      tabuleiro[7][7].codigoPeca = "&#9820;";
      tabuleiro[7][7].nomePeca = "T";
      tabuleiro[7][7].cor = "N";

      for (let i = 0; i < 8; i++) {
        tabuleiro[1][i].codigoPeca = "&#9817;";
        tabuleiro[1][i].nomePeca = "P";
        tabuleiro[1][i].cor = "B";
        tabuleiro[6][i].codigoPeca = "&#9823;";
        tabuleiro[6][i].nomePeca = "P";
        tabuleiro[6][i].cor = "N";
      }

      resolve(tabuleiro);
    })
  }

  static movimentValidWithExceptions(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
    //let movValids:Array<[number,string]> = new Array();

    let pecaEscolhida: Piece = tabuleiro[iToMove][jToMove];

    switch (pecaEscolhida.nomePeca) {
      case "P":
        switch (Math.abs(i - iToMove)) {
          case 1:
            if (j == jToMove) {
              //Quer mover reto
              if (tabuleiro[i][j].codigoPeca == tabuleiro[i][j].nomePeca) {
                //Não tem peça na frente e foi movida 1 casa
                if (pecaEscolhida.cor == "B" && i - iToMove == -1) {
                  //Quer voltar uma casa
                  return false;
                }
                if (pecaEscolhida.cor == "N" && i - iToMove == +1) {
                  //Quer voltar uma casa
                  return false;
                }
                return true;
              }
            }
            else if (Math.abs(j - jToMove) == 1) {
              //Quer mover na diagonal
              if (pecaEscolhida.enPassant && pecaEscolhida.enPassantMove[0] == i && pecaEscolhida.enPassantMove[1] == j) {
                //En Passant
                if (pecaEscolhida.cor == "B") {
                  tabuleiro[i - 1][j] = new Piece();
                }
                if (pecaEscolhida.cor == "N") {
                  tabuleiro[i + 1][j] = new Piece();
                }
                return true;
              }
              if (pecaEscolhida.cor != tabuleiro[i][j].cor && tabuleiro[i][j].cor != null) {
                //Quer realizar uma captura
                if (pecaEscolhida.cor == "B" && i - iToMove == -1) {
                  //Quer voltar uma casa
                  return false;
                }
                if (pecaEscolhida.cor == "N" && i - iToMove == +1) {
                  //Quer voltar uma casa
                  return false;
                }
                return true;
              }
              return false;
            }
            return false;
          case 2:
            if (j == jToMove && !pecaEscolhida.foiMovida) {
              this.preencheEnPassant(i, j, iToMove, jToMove, tabuleiro);
              return true;
            }
            return false;
          default:
            return false;
        }
      case "C":
        return ((Math.abs(Math.abs(i) - Math.abs(iToMove)) == 2 && Math.abs(Math.abs(j) - Math.abs(jToMove)) == 1) || (Math.abs(Math.abs(i) - Math.abs(iToMove)) == 1 && Math.abs(Math.abs(j) - Math.abs(jToMove)) == 2))
      case "B":
        if (Math.abs(i - iToMove) == Math.abs(j - jToMove)) {
          this.bispoMove(i, j, iToMove, jToMove, tabuleiro).then(value => {
            console.log("OI")
            return value;
          }).catch(value => {
            console.log("OI2")
            return value;
          })
        }
        else {
          return false;
        }
      case "T":
        break;
      case "D":
        break;
      case "R":
        break;

      default:
        break;
    }
    return false;
  }

  private static promiseBispoMove(i: number, iToMove: number, jToMove: number, tabuleiro: Piece[][], singI: any, singJ: any): Promise<null> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  private static bispoMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let singI = (i - iToMove) / Math.abs(i - iToMove);
      let singJ = (j - jToMove) / Math.abs(j - jToMove);
      for (let count = 1; count <= Math.abs(i - iToMove); count++) {
        console.log(iToMove + (count * singI), jToMove + (count * singJ))
        if (tabuleiro[iToMove + (count * singI)][jToMove + (count * singJ)].codigoPeca != null) {
          reject(false);
        }
      }
      resolve(true);
    })
  }

  static preencheEnPassant(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]) {
    if (!this.validaSaiuTabuleiro(i, j + 1) && tabuleiro[iToMove][jToMove].cor != tabuleiro[i][j + 1].cor) {
      tabuleiro[i][j + 1].enPassant = true;
      if (tabuleiro[iToMove][jToMove].cor == "B") {
        //Quem pode realizar o enPassant é as negas
        tabuleiro[i][j + 1].enPassantMove.push(i - 1, j);
      }
      else {
        //Quem pode realizar o enPassant é as brancas
        tabuleiro[i][j + 1].enPassantMove.push(i + 1, j);
      }
    }
    if (!this.validaSaiuTabuleiro(i, j - 1) && tabuleiro[iToMove][jToMove].cor != tabuleiro[i][j - 1].cor) {
      tabuleiro[i][j - 1].enPassant = true;
      if (tabuleiro[iToMove][jToMove].cor == "B") {
        //Quem pode realizar o enPassant é as negas
        tabuleiro[i][j - 1].enPassantMove.push(i - 1, j);
      }
      else {
        //Quem pode realizar o enPassant é as brancas
        tabuleiro[i][j - 1].enPassantMove.push(i + 1, j);
      }
    }
  }

  private static validaSaiuTabuleiro(i: number, j: number): boolean {
    /* i-> Linha // j-> Coluna */
    if (i > 7 || i < 0) {
      return true;
    }
    if (j > 7 || j < 0) {
      return true;
    }
    return false;
  }
}