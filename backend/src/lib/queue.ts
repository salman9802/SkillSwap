export class BatchQueue<T> {
  private buffer: T[] = [];
  private interval: NodeJS.Timeout;

  constructor(
    private flushFn: (items: T[]) => Promise<void>,
    private maxSize = 100,
    private flushInterval = 5000 // 5s
  ) {
    this.interval = setInterval(() => this.flush(), this.flushInterval);
  }

  push(item: T) {
    this.buffer.push(item);
    if (this.buffer.length >= this.maxSize) this.flush();
  }

  private async flush() {
    if (this.buffer.length === 0) return;
    const items = this.buffer;
    this.buffer = [];
    try {
      await this.flushFn(items);
    } catch (error) {
      console.error(`Batch flush failed: ${error}`);
      this.buffer.push(...items); // requeue on failure
    }
  }
}
