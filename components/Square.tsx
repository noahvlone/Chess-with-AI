
import React from 'react';
import { Square as SquareType, BoardPiece } from '../types';
import Piece from './Piece';

interface SquareProps {
  piece: BoardPiece | null;
  square: SquareType;
  isLight: boolean;
  isHighlighted: boolean;
  isLastMove: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, piece: BoardPiece) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, toSquare: SquareType) => void;
}

const Square: React.FC<SquareProps> = ({
  piece,
  square,
  isLight,
  isHighlighted,
  isLastMove,
  onDragOver,
  onDrop,
  onDragStart
}) => {
  const bgColor = isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
  const lastMoveColor = isLight ? 'bg-yellow-200' : 'bg-yellow-400';
  const highlightClass = isHighlighted ? 'relative' : '';
  
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, square)}
      className={`w-full h-full flex justify-center items-center ${isLastMove ? lastMoveColor : bgColor} ${highlightClass}`}
      aria-label={`Square ${square}`}
    >
      {piece && <Piece piece={piece} onDragStart={onDragStart} />}
      {isHighlighted && (
        <div
          className="absolute w-1/3 h-1/3 rounded-full bg-black bg-opacity-30"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Square;
