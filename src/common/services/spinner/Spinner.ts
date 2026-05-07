/**
 * Spinner
 * Static service class that manages a global loading spinner.
 * Uses a call-stack counter — multiple callers can show/hide
 * independently without stepping on each other.
 *
 * Usage:
 *   Spinner.show()
 *   Spinner.hide()
 *   await Spinner.on(somePromise)
 */

type SpinnerEffect = (visible: boolean) => void;

const Spinner = {
  _count: 0,
  _effect: null as SpinnerEffect | null,

  /**
   * Called by SpinnerContainer on mount to register the effect.
   * This is how the static service talks to the React component.
   */
  register(effect: SpinnerEffect): void {
    Spinner._effect = effect;
  },

  show(): void {
    Spinner._count++;
    if (Spinner._count === 1) {
      Spinner._effect?.(true);
    }
  },

  hide(): void {
    if (Spinner._count > 0) {
      Spinner._count--;
    }
    if (Spinner._count === 0) {
      Spinner._effect?.(false);
    }
  },

  /**
   * Wraps a promise — shows spinner before, hides after.
   * Always hides even if the promise rejects.
   *
   * Example:
   *   const data = await Spinner.on(fetchPortfolios())
   */
  async on<T>(promise: Promise<T>): Promise<T> {
    Spinner.show();
    try {
      return await promise;
    } finally {
      Spinner.hide();
    }
  },

  reset(): void {
    Spinner._count = 0;
    Spinner._effect?.(false);
  },
};

export default Spinner;
