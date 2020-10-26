import { Piece } from './Piece';
import { Tabuleiro } from './Tabuleiro';

export class Moviment {
    private static atk = {
        validAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            let pecaEscolhida: Piece = tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove];

            switch (pecaEscolhida.nomePeca) {
                case "P":
                    return this.peaoAtk(i, j, tabuleiro);
                case "C":
                    return this.cavaloAtk(i, j, tabuleiro);
                case "B":
                    if (Math.abs(i - tabuleiro.iToMove) == Math.abs(j - tabuleiro.jToMove)) {
                        return this.bispoAtk(i, j, tabuleiro);
                    }
                    else {
                        return false;
                    }
                case "T":
                    if ((tabuleiro.iToMove == i && j != tabuleiro.jToMove) || (j == tabuleiro.jToMove && i != tabuleiro.iToMove)) {
                        return this.torreAtk(i, j, tabuleiro);
                    }
                    else {
                        return false;
                    }
                case "D":
                    return this.damaAtk(i, j, tabuleiro);
                case "R":
                    return this.reiAtk(i, j, tabuleiro);
                default:
                    return false;
            }
        },
        peaoAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            switch (Math.abs(i - tabuleiro.iToMove)) {
                case 1:
                    if (j == tabuleiro.jToMove) {
                        //Quer mover reto
                        return false;
                    }
                    else if (Math.abs(j - tabuleiro.jToMove) == 1) {
                        //Quer mover na diagonal
                        return true;
                    } else {
                        return false;
                    }
                default:
                    return false;
            }
        },
        cavaloAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            return ((Math.abs(Math.abs(i) - Math.abs(tabuleiro.iToMove)) == 2 && Math.abs(Math.abs(j) - Math.abs(tabuleiro.jToMove)) == 1) || (Math.abs(Math.abs(i) - Math.abs(tabuleiro.iToMove)) == 1 && Math.abs(Math.abs(j) - Math.abs(tabuleiro.jToMove)) == 2))
        },
        bispoAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            let singI = (i - tabuleiro.iToMove) / Math.abs(i - tabuleiro.iToMove);
            let singJ = (j - tabuleiro.jToMove) / Math.abs(j - tabuleiro.jToMove);
            for (let count = 1; count <= Math.abs(i - tabuleiro.iToMove) - 1; count++) {
                if (tabuleiro.tabuleiro[tabuleiro.iToMove + (count * singI)][tabuleiro.jToMove + (count * singJ)].codigoPeca != null) {
                    return false;
                }
            }
            return true;
        },
        torreAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            if (tabuleiro.iToMove == i) {
                let singJ = (j - tabuleiro.jToMove) / Math.abs(j - tabuleiro.jToMove);
                for (let count = 1; count <= Math.abs(j - tabuleiro.jToMove) - 1; count++) {
                    if (tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove + (count * singJ)].codigoPeca != null) {
                        return false;
                    }
                }
                return true;
            }
            else {
                let singI = (i - tabuleiro.iToMove) / Math.abs(i - tabuleiro.iToMove);
                for (let count = 1; count <= Math.abs(i - tabuleiro.iToMove) - 1; count++) {
                    if (tabuleiro.tabuleiro[tabuleiro.iToMove + (count * singI)][tabuleiro.jToMove].codigoPeca != null) {
                        return false;
                    }
                }
                return true;
            }
        },
        damaAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            if (Math.abs(i - tabuleiro.iToMove) == Math.abs(j - tabuleiro.jToMove)) {
                return this.bispoMove(i, j, tabuleiro);
            }
            else {
                if ((tabuleiro.iToMove == i && j != tabuleiro.jToMove) || (j == tabuleiro.jToMove && i != tabuleiro.iToMove)) {
                    return this.torreMove(i, j, tabuleiro);
                }
                else {
                    return false;
                }
            }
        },
        reiAtk(i: number, j: number, tabuleiro: Tabuleiro): boolean {
            if ((Math.abs(i - tabuleiro.iToMove) == 1 || Math.abs(j - tabuleiro.jToMove)) && this.damaMove(i, j, tabuleiro)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    static movimentValidWithExceptions(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        //let movValids:Array<[number,string]> = new Array();

        //    i = Destino Linha
        //    j = Destino Coluna
        //    iToMove = Origem Linha
        //    jToMove = Origem Coluna

        let pecaEscolhida: Piece = tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove];

        switch (pecaEscolhida.nomePeca) {
            case "P":
                return this.peaoMove(i, j, tabuleiro);
            case "C":
                return this.cavaloMove(i, j, tabuleiro);
            case "B":
                if (Math.abs(i - tabuleiro.iToMove) == Math.abs(j - tabuleiro.jToMove)) {
                    return this.bispoMove(i, j, tabuleiro);
                }
                else {
                    return false;
                }
            case "T":
                if ((tabuleiro.iToMove == i && j != tabuleiro.jToMove) || (j == tabuleiro.jToMove && i != tabuleiro.iToMove)) {
                    return this.torreMove(i, j, tabuleiro);
                }
                else {
                    return false;
                }
            case "D":
                return this.damaMove(i, j, tabuleiro);
            case "R":
                return this.reiMove(i, j, tabuleiro);
            default:
                return false;
        }
    }

    //Privados
    private static cavaloMove(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        return ((Math.abs(Math.abs(i) - Math.abs(tabuleiro.iToMove)) == 2 && Math.abs(Math.abs(j) - Math.abs(tabuleiro.jToMove)) == 1) || (Math.abs(Math.abs(i) - Math.abs(tabuleiro.iToMove)) == 1 && Math.abs(Math.abs(j) - Math.abs(tabuleiro.jToMove)) == 2))
    }

    private static peaoMove(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        let pecaEscolhida: Piece = tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove];
        switch (Math.abs(i - tabuleiro.iToMove)) {
            case 1:
                if (j == tabuleiro.jToMove) {
                    //Quer mover reto
                    if (tabuleiro.tabuleiro[i][j].codigoPeca == tabuleiro.tabuleiro[i][j].nomePeca) {
                        //Não tem peça na frente e foi movida 1 casa
                        if (pecaEscolhida.cor == "B" && i - tabuleiro.iToMove == -1) {
                            //Quer voltar uma casa
                            return false;
                        }
                        if (pecaEscolhida.cor == "N" && i - tabuleiro.iToMove == +1) {
                            //Quer voltar uma casa
                            return false;
                        }
                        return true;
                    }
                }
                else if (Math.abs(j - tabuleiro.jToMove) == 1) {
                    //Quer mover na diagonal
                    if (pecaEscolhida.enPassant && pecaEscolhida.enPassantMove[0] == i && pecaEscolhida.enPassantMove[1] == j) {
                        //En Passant
                        if (pecaEscolhida.cor == "B") {
                            tabuleiro.tabuleiro[i - 1][j] = new Piece();
                        }
                        if (pecaEscolhida.cor == "N") {
                            tabuleiro.tabuleiro[i + 1][j] = new Piece();
                        }
                        return true;
                    }
                    if (pecaEscolhida.cor != tabuleiro.tabuleiro[i][j].cor && tabuleiro.tabuleiro[i][j].cor != null) {
                        //Quer realizar uma captura
                        if (pecaEscolhida.cor == "B" && i - tabuleiro.iToMove == -1) {
                            //Quer voltar uma casa
                            return false;
                        }
                        if (pecaEscolhida.cor == "N" && i - tabuleiro.iToMove == +1) {
                            //Quer voltar uma casa
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
                return false;
            case 2:
                if (j == tabuleiro.jToMove && !pecaEscolhida.foiMovida) {
                    if (tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].cor == "B" && tabuleiro.tabuleiro[tabuleiro.iToMove + 1][j].nomePeca == null && tabuleiro.tabuleiro[tabuleiro.iToMove + 2][j].nomePeca == null) {
                        this.preencheEnPassant(i, j, tabuleiro);
                        return true;
                    } else if (tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].cor == "N" && tabuleiro.tabuleiro[tabuleiro.iToMove - 1][j].nomePeca == null && tabuleiro.tabuleiro[tabuleiro.iToMove - 2][j].nomePeca == null) {
                        this.preencheEnPassant(i, j, tabuleiro);
                        return true;
                    }
                }
                return false;
            default:
                return false;
        }
    }

    private static preencheEnPassant(i: number, j: number, tabuleiro: Tabuleiro) {

        if (!this.saiuTabuleiro(i, j + 1) && tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].cor != tabuleiro.tabuleiro[i][j + 1].cor) {
            tabuleiro.tabuleiro[i][j + 1].enPassant = true;
            if (tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].cor == "B") {
                //Quem pode realizar o enPassant é as negas
                tabuleiro.tabuleiro[i][j + 1].enPassantMove.push(i - 1, j);
            }
            else {
                //Quem pode realizar o enPassant é as brancas
                tabuleiro.tabuleiro[i][j + 1].enPassantMove.push(i + 1, j);
            }
        }
        if (!this.saiuTabuleiro(i, j - 1) && tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].cor != tabuleiro.tabuleiro[i][j - 1].cor) {
            tabuleiro.tabuleiro[i][j - 1].enPassant = true;
            if (tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].cor == "B") {
                //Quem pode realizar o enPassant é as negas
                tabuleiro.tabuleiro[i][j - 1].enPassantMove.push(i - 1, j);
            }
            else {
                //Quem pode realizar o enPassant é as brancas
                tabuleiro.tabuleiro[i][j - 1].enPassantMove.push(i + 1, j);
            }
        }
    }

    private static bispoMove(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        let singI = (i - tabuleiro.iToMove) / Math.abs(i - tabuleiro.iToMove);
        let singJ = (j - tabuleiro.jToMove) / Math.abs(j - tabuleiro.jToMove);
        for (let count = 1; count <= Math.abs(i - tabuleiro.iToMove) - 1; count++) {
            if (tabuleiro.tabuleiro[tabuleiro.iToMove + (count * singI)][tabuleiro.jToMove + (count * singJ)].codigoPeca != null) {
                return false;
            }
        }
        return true;
    }

    private static torreMove(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        if (tabuleiro.iToMove == i) {
            let singJ = (j - tabuleiro.jToMove) / Math.abs(j - tabuleiro.jToMove);
            for (let count = 1; count <= Math.abs(j - tabuleiro.jToMove) - 1; count++) {
                if (tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove + (count * singJ)].codigoPeca != null) {
                    return false;
                }
            }
            return true;
        }
        else {
            //console.log((i - tabuleiro.iToMove) / Math.abs(i - tabuleiro.iToMove))
            let singI = (i - tabuleiro.iToMove) / Math.abs(i - tabuleiro.iToMove);
            for (let count = 1; count <= Math.abs(i - tabuleiro.iToMove) - 1; count++) {
                if (tabuleiro.tabuleiro[tabuleiro.iToMove + (count * singI)][tabuleiro.jToMove].codigoPeca != null) {
                    return false;
                }
            }
            return true;
        }
    }

    private static damaMove(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        if (Math.abs(i - tabuleiro.iToMove) == Math.abs(j - tabuleiro.jToMove)) {
            return this.bispoMove(i, j, tabuleiro);
        }
        else {
            if ((tabuleiro.iToMove == i && j != tabuleiro.jToMove) || (j == tabuleiro.jToMove && i != tabuleiro.iToMove)) {
                return this.torreMove(i, j, tabuleiro);
            }
            else {
                return false;
            }
        }
    }

    private static reiMove(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        if (this.damaMove(i, j, tabuleiro)) {
            switch (Math.abs(j - tabuleiro.jToMove)) {
                case 0:
                    if (!Math.abs(i - tabuleiro.iToMove) || Math.abs(i - tabuleiro.iToMove) > 1) {
                        return false
                    }
                case 1:
                    if (this.casaEstaAtacada(i, j, tabuleiro)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                case 2:
                    if (!tabuleiro.tabuleiro[tabuleiro.iToMove][tabuleiro.jToMove].foiMovida && (i == 0 || i == 7)) {
                        if (j - tabuleiro.jToMove > 0 && !tabuleiro[tabuleiro.iToMove][7].foiMovida) {
                            //Roque a direita
                            tabuleiro.tabuleiro[tabuleiro.iToMove][5] = tabuleiro.tabuleiro[tabuleiro.iToMove][7];
                            tabuleiro.tabuleiro[tabuleiro.iToMove][5].foiMovida = true;
                            tabuleiro.tabuleiro[tabuleiro.iToMove][7] = new Piece();
                            return true;
                        }
                        else {
                            if (j - tabuleiro.jToMove < 0 && !tabuleiro.tabuleiro[tabuleiro.iToMove][0].foiMovida) {
                                //Roque a esquerda
                                tabuleiro.tabuleiro[tabuleiro.iToMove][3] = tabuleiro.tabuleiro[tabuleiro.iToMove][0];
                                tabuleiro.tabuleiro[tabuleiro.iToMove][3].foiMovida = true;
                                tabuleiro.tabuleiro[tabuleiro.iToMove][0] = new Piece();
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

    private static casaEstaAtacada(i: number, j: number, tabuleiro: Tabuleiro): boolean {
        for (let iToMove = 0; iToMove < 8; iToMove++) {
            for (let jToMove = 0; jToMove < 8; jToMove++) {
                if (this.atk['validAtk'](i, j, tabuleiro)) {
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
