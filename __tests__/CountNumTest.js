import { Console } from "@woowacourse/mission-utils";
import InputHandler from "../src/handler/InputHandler";

jest.mock("@woowacourse/mission-utils", () => ({
    Console: {
        readLineAsync: jest.fn()
    }
}));

describe("InputHandler", () => {
    test("입력한 실행 횟수 그대로 출력", () => {
        const inputHandler = new InputHandler();
        const input = 1;
        const result = inputHandler.processCountNumInput(input);
        expect(result).toBe(1)
    });

    test.each([
        ["a"],
        ["@"],
    ])("입력한 실행 횟수가 숫자가 아닌 경우", (input) => {
        const inputHandler = new InputHandler();
        expect(() => inputHandler.processCountNumInput(input)).toThrow("[ERROR] 실행 횟수는 1 이상의 양수여야 합니다.");
    });

    test("입력한 실행 횟수가 공백인 경우", () => {
        const inputHandler = new InputHandler();
        const input = "";
        expect(() => inputHandler.processCountNumInput(input)).toThrow("[ERROR] 실행 횟수는 1 이상의 양수여야 합니다.");
    });

    test.each([
        [-1],
        [0]
    ])("입력한 실행 횟수가 0 이하인 경우", (input) => {
        const inputHandler = new InputHandler();
        expect(() => inputHandler.processCountNumInput(input)).toThrow("[ERROR] 실행 횟수는 1 이상의 양수여야 합니다.");
    });
});