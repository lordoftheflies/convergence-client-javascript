export class Validation {
  public static nonEmptyString(value: string): boolean {
    return typeof value === "string" && value.length > 0;
  }

  public static isString(value: string, name?: string): void {
    if (name === undefined) {
      name = "value";
    }

    if (typeof value !== "string") {
      throw new Error(name + " must be a string: " + typeof value);
    }
  }
}
