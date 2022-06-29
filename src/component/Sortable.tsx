import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  SortableContextProps,
} from '@dnd-kit/sortable';
import { SortableItem, RenderItem } from './SortableItem';

export interface SortableProps<T extends { id: string }>
  extends Omit<SortableContextProps, 'children'> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  renderItem: RenderItem<T>;
}

export function Sortable<T extends { id: string }>({
  items,
  setItems,
  renderItem,
  strategy,
}: SortableProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((v) => v.id === active.id);
        const newIndex = prevItems.findIndex((v) => v.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={strategy}>
        {items.map((item) => (
          <SortableItem key={item.id} item={item} renderItem={renderItem}></SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
