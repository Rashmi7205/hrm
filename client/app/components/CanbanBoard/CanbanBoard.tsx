"use client";
import { Button } from "@/components/ui/button";
import { Column, Id } from "@/types";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const CanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const generateId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };
  const deleteColumn = (id: Id) => {
    const filterdColumn = columns.filter((col) => col.id !== id);
    setColumns(filterdColumn);
  };
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type == "Coliumn") {
      setActiveColumn(event.active.data.current as Column);
      return;
    }
  };

  return (
    <div className="w-full m-auto flex overflow-x-auto items-center overflow-y-hidden min-h-screen px-[40px]">
      <DndContext onDragStart={onDragStart}>
        <div className="w-full mx-auto flex gap-4 flex-wrap">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            onClick={() => {
              createNewColumn();
            }}
            className="h-[60px] w-[350px] min-w-[350px] coursor-pointer rounded-lg bg-slate-700 border-slate-500 p-4 ring-rose-500 hover:ring-2 flex"
          >
            <Plus /> Add Column
          </Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>
        ,document.body)}
      </DndContext>
    </div>
  );
};

export default CanbanBoard;
