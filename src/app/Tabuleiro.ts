import { Piece } from './Piece';

export class Tabuleiro {
    /*Referente a todas as peças*/
    tabuleiro: Piece[][] = [];
    iToMove: number;
    jToMove: number;
    lastMoveColor: string = "N";

    constructor(
    ) {
        this.criarTabuleiro()
            .then(() => {
                this.posInicialPiece(this.tabuleiro).then(tabuleiroFim => {
                    this.tabuleiro = tabuleiroFim;
                })
            });
    }

    private criarTabuleiro(): Promise<null> {
        return new Promise((resolve) => {
            for (let i = 0; i < 8; i++) {
                let arrayAux = new Array();
                for (let j = 0; j < 8; j++) {
                    arrayAux.push(new Piece());
                }
                this.tabuleiro.push(arrayAux);
            }
            resolve();
        })
    }


    private posInicialPiece(tabuleiro: Piece[][]): Promise<Piece[][]> {
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
}