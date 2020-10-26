import { Component, OnInit, Pipe } from '@angular/core';
import { Moviment } from './moviment.service';
import { Piece } from './Piece';
import { Tabuleiro } from './Tabuleiro';

//declare var ChessBoard:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // terminar de fazer a tabela 
  tabuleiro: Tabuleiro;

  ngOnInit() {
    this.tabuleiro = new Tabuleiro();
  }

  tryMovePiece(i, j) {
    if (this.tabuleiro.iToMove == null || this.tabuleiro.jToMove == null) {
      this.pieceSelected(i, j);
    }
    else {
      if ((this.tabuleiro.iToMove != i || this.tabuleiro.jToMove != j) && this.tabuleiro.lastMoveColor != this.tabuleiro.tabuleiro[this.tabuleiro.iToMove][this.tabuleiro.jToMove].cor
        && this.tabuleiro.tabuleiro[this.tabuleiro.iToMove][this.tabuleiro.jToMove].cor) {
        if (this.tabuleiro.tabuleiro[i][j].cor == this.tabuleiro.tabuleiro[this.tabuleiro.iToMove][this.tabuleiro.jToMove].cor) {
          this.unselected(this.tabuleiro.iToMove, this.tabuleiro.jToMove);
          this.pieceSelected(i, j);
          return;
        }
        else {
          if (Moviment.movimentValidWithExceptions(i, j, this.tabuleiro)) {
            this.move(i, j);
          }
        }
      }
      this.unselected(this.tabuleiro.iToMove, this.tabuleiro.jToMove);
      this.tabuleiro.iToMove = null;
      this.tabuleiro.jToMove = null;
    }
  }

  /*--- PRIVATE ---*/
  private move(i, j) {
    this.unselected(this.tabuleiro.iToMove, this.tabuleiro.jToMove);
    this.tabuleiro.lastMoveColor = this.tabuleiro.tabuleiro[this.tabuleiro.iToMove][this.tabuleiro.jToMove].cor;

    this.tabuleiro.tabuleiro[i][j] = this.tabuleiro.tabuleiro[this.tabuleiro.iToMove][this.tabuleiro.jToMove];
    this.tabuleiro.tabuleiro[this.tabuleiro.iToMove][this.tabuleiro.jToMove] = new Piece();
    this.tabuleiro.tabuleiro[i][j].foiMovida = true;

    this.afterMoveReset();
  }

  private afterMoveReset() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tabuleiro.tabuleiro[i][j].cor == this.tabuleiro.lastMoveColor) {
          this.tabuleiro.tabuleiro[i][j].enPassantMove = new Array();
          this.tabuleiro.tabuleiro[i][j].enPassant = false;
        }
      }
    }
  }

  private pieceSelected(i, j) {
    this.tabuleiro.iToMove = i;
    this.tabuleiro.jToMove = j;
    document.getElementById(i + ',' + j).className += " selected";
  }

  private unselected(i, j) {
    document.getElementById(i + ',' + j).className = document.getElementById(i + ',' + j).className.replace(" selected", "");
  }
}
