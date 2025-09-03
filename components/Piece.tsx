
import React from 'react';
import { BoardPiece } from '../types';
import { Pawn, Knight, Bishop, Rook, Queen, King } from './icons';

interface PieceProps {
  piece: BoardPiece;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, piece: BoardPiece) => void;
}

const pieceMap = {
  p: Pawn,
  n: Knight,
  b: Bishop,
  r: Rook,
  q: Queen,
  k: King,
};

const Piece: React.FC<PieceProps> = ({ piece, onDragStart }) => {
  const PieceComponent = pieceMap[piece.type];
  if (!PieceComponent) return null;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, piece)}
      className="cursor-grab active:cursor-grabbing p-1 w-full h-full"
      aria-label={`${piece.color === 'w' ? 'White' : 'Black'} ${piece.type}`}
    >
      <PieceComponent color={piece.color} />
    </div>
  );
};

export default Piece;
