export class Dragger {
  _state = false;
  _drop: string = 'drop-zone';

  get state() {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
  }

  constructor(drop: string) {
    this._drop = drop;
  }

  onDragStart(event: DragEvent, data: any, callback?: (event?: DragEvent, data?: any) => any) {
    // console.log('drag start');
    event.dataTransfer && event.dataTransfer.setData('id', JSON.stringify(data));
    event.target && (event.target as HTMLElement).classList.add('dragging');
    callback && callback(event, data);
  }

  onDragEnd(event: DragEvent, data?: any, callback?: (event?: DragEvent, data?: any) => any) {
    // console.log('drag end');
    event.target && (event.target as HTMLElement).classList.remove('dragging');
    callback && callback(event, data);
  }

  onDragOver(event: DragEvent, callback?: (event?: DragEvent) => any) {
    event.preventDefault();
    callback && callback(event);
  }

  onDragEnter(event: DragEvent, callback?: (event?: DragEvent) => any): void {
    const dropZone = (event.target as HTMLElement).closest(`.${this._drop}`);
    if (!this.state && dropZone) {
      // console.log('enter 1: ', event.target);
      this.state = true;
      dropZone.classList.add('drag-over');
      Array.from(dropZone.children).forEach((child: Element) => {
        (child as HTMLElement).style.pointerEvents = 'none';
      });
      callback && callback(event);
    }
  }

  onDragLeave(event: DragEvent, callback?: (event?: DragEvent) => any, _drop = false) {
    const dropZone = event.target as HTMLElement;
    if (event && dropZone.classList.contains(this._drop)) {
      // console.log(drop ? 'drop 1 ' : 'leave 1: ', event.target);
      this.state = false;
      dropZone.classList.remove('drag-over');
      Array.from((event.target as HTMLElement).children).forEach((child: Element) => {
        (child as HTMLElement).style.pointerEvents = 'auto';
      });
      callback && callback(event);
    }
  }

  onDrop(event: DragEvent, callback?: (event?: DragEvent) => any) {
    this.onDragLeave(event, callback, true);
  }
}

/**
 * SCSS Sample:
 *
 * ```scss
 *  .drop-zone {
 *   box-sizing: border-box;
 *   padding: 5px;
 *   border: 1px dashed transparent;
 *   transition: all 0.2s;
 *
 *   &.drag-over {
 *     box-sizing: border-box;
 *     border-radius: 10px;
 *     border-radius: 14px;
 *     border-color: #ffffff;
 *     transform: scale(1.04);
 *   }
 * }
 * ```
 */
