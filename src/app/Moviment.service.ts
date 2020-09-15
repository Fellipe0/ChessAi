import { Piece } from './Piece';

export class Moviment {
    private static atk = {
        validAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            let pecaEscolhida: Piece = tabuleiro[iToMove][jToMove];

            switch (pecaEscolhida.nomePeca) {
                case "P":
                    return this.peaoAtk(i, j, iToMove, jToMove, tabuleiro);
                case "C":
                    return this.cavaloAtk(i, j, iToMove, jToMove, tabuleiro);
                case "B":
                    if (Math.abs(i - iToMove) == Math.abs(j - jToMove)) {
                        return this.bispoAtk(i, j, iToMove, jToMove, tabuleiro);
                    }
                    else {
                        return false;
                    }
                case "T":
                    if ((iToMove == i && j != jToMove) || (j == jToMove && i != iToMove)) {
                        return this.torreAtk(i, j, iToMove, jToMove, tabuleiro);
                    }
                    else {
                        return false;
                    }
                case "D":
                    return this.damaAtk(i, j, iToMove, jToMove, tabuleiro);
                case "R":
                    return this.reiAtk(i, j, iToMove, jToMove, tabuleiro);
                default:
                    return false;
            }
        },
        peaoAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            switch (Math.abs(i - iToMove)) {
                case 1:
                    if (j == jToMove) {
                        //Quer mover reto
                        return false;
                    }
                    else if (Math.abs(j - jToMove) == 1) {
                        //Quer mover na diagonal
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return false;
            }
        },
        cavaloAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            return ((Math.abs(Math.abs(i) - Math.abs(iToMove)) == 2 && Math.abs(Math.abs(j) - Math.abs(jToMove)) == 1) || (Math.abs(Math.abs(i) - Math.abs(iToMove)) == 1 && Math.abs(Math.abs(j) - Math.abs(jToMove)) == 2))
        },
        bispoAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            let singI = (i - iToMove) / Math.abs(i - iToMove);
            let singJ = (j - jToMove) / Math.abs(j - jToMove);
            for (let count = 1; count <= Math.abs(i - iToMove) - 1; count++) {
                if (tabuleiro[iToMove + (count * singI)][jToMove + (count * singJ)].codigoPeca != null) {
                    return false;
                }
            }
            return true;
        },
        torreAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            if (iToMove == i) {
                let singJ = (j - jToMove) / Math.abs(j - jToMove);
                for (let count = 1; count <= Math.abs(j - jToMove) - 1; count++) {
                    if (tabuleiro[iToMove][jToMove + (count * singJ)].codigoPeca != null) {
                        return false;
                    }
                }
                return true;
            }
            else {
                let singI = (i - iToMove) / Math.abs(i - iToMove);
                for (let count = 1; count <= Math.abs(i - iToMove) - 1; count++) {
                    if (tabuleiro[iToMove + (count * singI)][jToMove].codigoPeca != null) {
                        return false;
                    }
                }
                return true;
            }
        },
        damaAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            if (Math.abs(i - iToMove) == Math.abs(j - jToMove)) {
                return this.bispoMove(i, j, iToMove, jToMove, tabuleiro);
            }
            else {
                if ((iToMove == i && j != jToMove) || (j == jToMove && i != iToMove)) {
                    return this.torreMove(i, j, iToMove, jToMove, tabuleiro);
                }
                else {
                    return false;
                }
            }
        },
        reiAtk(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
            if ((Math.abs(i - iToMove) == 1 || Math.abs(j - jToMove)) && this.damaMove(i, j, iToMove, jToMove, tabuleiro)) {
                return true;
            }
            else {
                return false;
            }
        }
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

        //    i = Destino Linha
        //    j = Destino Coluna
        //    iToMove = Destino Linha
        //    jToMove = Destino Coluna

        let pecaEscolhida: Piece = tabuleiro[iToMove][jToMove];

        switch (pecaEscolhida.nomePeca) {
            case "P":
                return this.peaoMove(i, j, iToMove, jToMove, tabuleiro);
            case "C":
                return this.cavaloMove(i, j, iToMove, jToMove, tabuleiro);
            case "B":
                if (Math.abs(i - iToMove) == Math.abs(j - jToMove)) {
                    return this.bispoMove(i, j, iToMove, jToMove, tabuleiro);
                }
                else {
                    return false;
                }
            case "T":
                if ((iToMove == i && j != jToMove) || (j == jToMove && i != iToMove)) {
                    return this.torreMove(i, j, iToMove, jToMove, tabuleiro);
                }
                else {
                    return false;
                }
            case "D":
                return this.damaMove(i, j, iToMove, jToMove, tabuleiro);
            case "R":
                return this.reiMove(i, j, iToMove, jToMove, tabuleiro);
            default:
                return false;
        }
    }

    //Privados
    private static cavaloMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
        return ((Math.abs(Math.abs(i) - Math.abs(iToMove)) == 2 && Math.abs(Math.abs(j) - Math.abs(jToMove)) == 1) || (Math.abs(Math.abs(i) - Math.abs(iToMove)) == 1 && Math.abs(Math.abs(j) - Math.abs(jToMove)) == 2))
    }

    private static peaoMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
        let pecaEscolhida: Piece = tabuleiro[iToMove][jToMove];
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
                    if (tabuleiro[iToMove][jToMove].cor == "B" && tabuleiro[iToMove + 1][j].nomePeca == null && tabuleiro[iToMove + 2][j].nomePeca == null) {
                        this.preencheEnPassant(i, j, iToMove, jToMove, tabuleiro);
                        return true;
                    } else if (tabuleiro[iToMove][jToMove].cor == "N" && tabuleiro[iToMove - 1][j].nomePeca == null && tabuleiro[iToMove - 2][j].nomePeca == null) {
                        this.preencheEnPassant(i, j, iToMove, jToMove, tabuleiro);
                        return true;
                    }
                }
                return false;
            default:
                return false;
        }
    }

    private static preencheEnPassant(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]) {

        if (!this.saiuTabuleiro(i, j + 1) && tabuleiro[iToMove][jToMove].cor != tabuleiro[i][j + 1].cor) {
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
        if (!this.saiuTabuleiro(i, j - 1) && tabuleiro[iToMove][jToMove].cor != tabuleiro[i][j - 1].cor) {
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

    private static bispoMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
        let singI = (i - iToMove) / Math.abs(i - iToMove);
        let singJ = (j - jToMove) / Math.abs(j - jToMove);
        for (let count = 1; count <= Math.abs(i - iToMove) - 1; count++) {
            if (tabuleiro[iToMove + (count * singI)][jToMove + (count * singJ)].codigoPeca != null) {
                return false;
            }
        }
        return true;
    }

    private static torreMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
        if (iToMove == i) {
            let singJ = (j - jToMove) / Math.abs(j - jToMove);
            for (let count = 1; count <= Math.abs(j - jToMove) - 1; count++) {
                if (tabuleiro[iToMove][jToMove + (count * singJ)].codigoPeca != null) {
                    return false;
                }
            }
            return true;
        }
        else {
            let singI = (i - iToMove) / Math.abs(i - iToMove);
            for (let count = 1; count <= Math.abs(i - iToMove) - 1; count++) {
                if (tabuleiro[iToMove + (count * singI)][jToMove].codigoPeca != null) {
                    return false;
                }
            }
            return true;
        }
    }

    private static damaMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
        if (Math.abs(i - iToMove) == Math.abs(j - jToMove)) {
            return this.bispoMove(i, j, iToMove, jToMove, tabuleiro);
        }
        else {
            if ((iToMove == i && j != jToMove) || (j == jToMove && i != iToMove)) {
                return this.torreMove(i, j, iToMove, jToMove, tabuleiro);
            }
            else {
                return false;
            }
        }
    }

    private static reiMove(i: number, j: number, iToMove: number, jToMove: number, tabuleiro: Piece[][]): boolean {
        if (this.damaMove(i, j, iToMove, jToMove, tabuleiro)) {
            switch (Math.abs(j - jToMove)) {
                case 1:
                    if (this.casaEstaAtacada(i, j, tabuleiro)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                case 2:
                    if (!tabuleiro[iToMove][jToMove].foiMovida && (i == 0 || i == 7)) {
                        if (j - jToMove > 0 && !tabuleiro[iToMove][7].foiMovida) {
                            //Roque a direita
                            tabuleiro[iToMove][5] = tabuleiro[iToMove][7];
                            tabuleiro[iToMove][5].foiMovida = true;
                            tabuleiro[iToMove][7] = new Piece();
                            return true;
                        }
                        else {
                            if (j - jToMove < 0 && !tabuleiro[iToMove][0].foiMovida) {
                                //Roque a esquerda
                                tabuleiro[iToMove][3] = tabuleiro[iToMove][0];
                                tabuleiro[iToMove][3].foiMovida = true;
                                tabuleiro[iToMove][0] = new Piece();
                                return true;
                            }
                        }
                    } else {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
        else {
            return false;
        }
    }

    private static casaEstaAtacada(i: number, j: number, tabuleiro: Piece[][]): boolean {
        for (let iToMove = 0; iToMove < 8; iToMove++) {
            for (let jToMove = 0; jToMove < 8; jToMove++) {
                console.log(this.atk['validAtk'](i, j, iToMove, jToMove, tabuleiro));
                if (this.atk['validAtk'](i, j, iToMove, jToMove, tabuleiro)) {
                    return true;
                }
            }
        }
        return false;
    }

    private static saiuTabuleiro(i: number, j: number): boolean {
        if (i < 0 || i > 7) {
            return true;
        } else {
            if (j < 0 || j > 7) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}
