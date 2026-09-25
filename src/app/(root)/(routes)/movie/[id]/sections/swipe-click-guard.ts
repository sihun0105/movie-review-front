const SWIPE_THRESHOLD_PX = 8

export class SwipeClickGuard {
  private origin = { x: 0, y: 0 }
  private moved = false

  start(x: number, y: number) {
    this.origin = { x, y }
    this.moved = false
  }

  move(x: number, y: number) {
    const distance = Math.hypot(x - this.origin.x, y - this.origin.y)
    if (distance >= SWIPE_THRESHOLD_PX) this.moved = true
  }

  cancel() {
    this.moved = true
  }

  shouldCancelClick() {
    const shouldCancel = this.moved
    this.moved = false
    return shouldCancel
  }
}
