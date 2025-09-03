
import type { Piece as ChessJsPiece, Square as ChessJsSquare } from 'chess.js';

export type Piece = ChessJsPiece;
export type Square = ChessJsSquare;

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface BoardPiece {
  square: Square;
  type: PieceType;
  color: PieceColor;
}
