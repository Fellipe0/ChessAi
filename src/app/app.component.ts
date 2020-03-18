import { Component, OnInit, Pipe } from '@angular/core';
import { Piece } from './Piece';

//declare var ChessBoard:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // terminar de fazer a tabela 

  lastMoveColor: string = "N";
  tabuleiro: Piece[][] = [];
  iToMov: number;
  jToMov: number;

  ngOnInit() {
    this.criarTabuleiro()
      .then(() => {
        Piece.posInicialPiece(this.tabuleiro).then(tabuleiroFim => {
          this.tabuleiro = tabuleiroFim;
        })
      });
  }

  tryMovePiece(i, j) {
    if (this.iToMov == null || this.jToMov == null) {
      this.pieceSelected(i, j);
    }
    else {
      if ((this.iToMov != i || this.jToMov != j) && this.lastMoveColor != this.tabuleiro[this.iToMov][this.jToMov].cor
        && this.tabuleiro[this.iToMov][this.jToMov].cor) {
        if (this.tabuleiro[i][j].cor == this.tabuleiro[this.iToMov][this.jToMov].cor) {
          this.unselected(this.iToMov, this.jToMov);
          this.pieceSelected(i, j);
          return;
        }
        else {
          if(Piece.movimentValidWithExceptions(i,j,this.iToMov,this.jToMov,this.tabuleiro)){
            this.move(i,j);
          }
        }
      }
      this.unselected(this.iToMov, this.jToMov);
      this.iToMov = null;
      this.jToMov = null;
    }
  }

  /*--- PRIVATE ---*/
  private move(i,j){
    this.unselected(this.iToMov, this.jToMov);
    this.lastMoveColor = this.tabuleiro[this.iToMov][this.jToMov].cor;

    this.tabuleiro[i][j] = this.tabuleiro[this.iToMov][this.jToMov];
    this.tabuleiro[this.iToMov][this.jToMov] = new Piece();

    this.afterMoveReset();
  }

  private afterMoveReset(){
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        if(this.tabuleiro[i][j].cor == this.lastMoveColor){
          this.tabuleiro[i][j].enPassantMove = new Array();
          this.tabuleiro[i][j].enPassant = false;
        }
      }
    }
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

  private pieceSelected(i, j) {
    this.iToMov = i;
    this.jToMov = j;
    document.getElementById(i + ',' + j).className += " selected";
  }

  private unselected(i, j) {
    document.getElementById(i + ',' + j).className = document.getElementById(i + ',' + j).className.replace(" selected", "");
  }
}
