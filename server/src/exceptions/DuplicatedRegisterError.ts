
class DuplicatedRegisterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DuplicatedRegisterError";

        // Resolução de bug com herança da classe Error --> https://stackoverflow.com/questions/36332665/how-to-use-instanceof-in-a-switch-statement
        Object.setPrototypeOf(this, DuplicatedRegisterError.prototype);
      }
}

export { DuplicatedRegisterError }