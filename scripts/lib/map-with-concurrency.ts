export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  workerCount: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let nextIndex = 0

  async function run(): Promise<void> {
    while (true) {
      const index = nextIndex
      nextIndex += 1

      if (index >= items.length) return

      results[index] = await worker(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(workerCount, items.length) }, () => run()))
  return results
}
