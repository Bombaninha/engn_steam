
class BlankFieldError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BlankFieldError";

        // Resolução de bug com herança da classe Error --> https://stackoverflow.com/questions/36332665/how-to-use-instanceof-in-a-switch-statement
        Object.setPrototypeOf(this, BlankFieldError.prototype);
      }
}

export { BlankFieldError }