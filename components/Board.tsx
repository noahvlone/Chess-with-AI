
import React from 'react';
import { Move } from 'chess.js';
import { BoardPiece, Square as SquareType } from '../types';
import Square from './Square';

interface BoardProps {
  board: (BoardPiece | null)[][];
  highlightedSquares: SquareType[];
  lastMove: Move | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, piece: BoardPiece) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, toSquare: SquareType) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  highlightedSquares,
  lastMove,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  return (
    <div className="w-full max-w-lg aspect-square shadow-2xl rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
        {board.flat().map((piece, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const square = `${files[col]}${ranks[row]}` as SquareType;
          const isLight = (row + col) % 2 !== 0;

          return (
            <Square
              key={square}
              piece={piece}
              square={square}
              isLight={isLight}
              isHighlighted={highlightedSquares.includes(square)}
              isLastMove={lastMove?.from === square || lastMove?.to === square}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
