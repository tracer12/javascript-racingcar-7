import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
    MissionUtils.Console.readLineAsync = jest.fn();

    MissionUtils.Console.readLineAsync.mockImplementation(() => {
        const input = inputs.shift();
        return Promise.resolve(input);
    });
};

const mockRandoms = (numbers) => {
    MissionUtils.Random.pickNumberInRange = jest.fn();

    numbers.reduce((acc, number) => {
        return acc.mockReturnValueOnce(number);
    }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, "print");
    logSpy.mockClear();
    return logSpy;
};

describe("자동차 경주", () => {
    test("기능 테스트", async () => {
        const MOVING_FORWARD = 4;
        const STOP = 3;
        const inputs = ["pobi,woni,jun", "5"];
        const logs = [
            "pobi : -",
            "woni : ",
            "jun : -",
            "pobi : --",
            "woni : -",
            "jun : --",
            "pobi : ---",
            "woni : --",
            "jun : ---",
            "pobi : ----",
            "woni : ---",
            "jun : ----",
            "pobi : -----",
            "woni : ----",
            "jun : -----",
            "최종 우승자 : pobi, jun",
        ];
        const logSpy = getLogSpy();

        mockQuestions(inputs);
        mockRandoms([
            MOVING_FORWARD, STOP, MOVING_FORWARD,
            MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD,
            MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD,
            MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD,
            MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD,
        ]);

        const app = new App();
        await app.run();

        logs.forEach((log) => {
            expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
        });
    });
});