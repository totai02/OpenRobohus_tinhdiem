import * as express from "express";
import * as http from "http";
import * as SocketIO from "socket.io";
import {AppModel} from "../model/AppModel";
import {AppCmd} from "../cmd/AppCmd";
import {SocketEvent} from "../event/Event";
import {App} from "../const/App";

export class AppService {
    static readonly Connect = "connection";

    public app: Express.Application;
    public server: http.Server;
    public io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = SocketIO(this.server);
        this.io.on(AppService.Connect, this.onConnect);
    }

    private onConnect = (socket: SocketIO.Socket) => {
        this.mapEvents(socket);
    };


    private mapEvents(socket: SocketIO.Socket) {
        socket.on(SocketEvent.StartRace, this.onStartRound);
        socket.on(SocketEvent.ResetRound, this.onResetRound);
        socket.on(SocketEvent.UpdateScore, this.onUpdateScore);
    }

    private onUpdateScore = (data: any) => {
        if (AppModel.isStart()) {
            if (data.team === 'B') {
                if (data.value === '2') AppModel.dataBlue.addTwoPoint();
                if (data.value === '3') AppModel.dataBlue.addThreePoint();
                if (data.value === '5') AppModel.dataBlue.addFivePoint();
                if (data.value === '10') AppModel.dataBlue.addTenPoint();
            }

            if (data.team === 'R') {
                if (data.value === '2') AppModel.dataRed.addTwoPoint();
                if (data.value === '3') AppModel.dataRed.addThreePoint();
                if (data.value === '5') AppModel.dataRed.addFivePoint();
                if (data.value === '10') AppModel.dataRed.addTenPoint();
            }
            let winner = AppModel.checkWin();
            if (winner !== '') {

                clearInterval(AppModel.currentTimerInterval);
                AppModel.stop();
            }
            this.dispatchCurrentRoundInfoToFrontend(winner);
        }
    };

    private onStartRound = () => {
        AppModel.timeLeftInMillis = App.MatchTime * 1000;

        if (AppModel.currentTimerInterval) clearInterval(AppModel.currentTimerInterval);

        this.io.emit(AppCmd.RemoteDispatch, {
            type: 'UPDATE_TIMER',
            data: AppModel.timeLeftInMillis
        });

        AppModel.dataBlue.reset();
        AppModel.dataRed.reset();

        AppModel.start();

        AppModel.currentTimerInterval = setInterval(() => {
            if (AppModel.timeLeftInMillis <= 0) {
                // Notify the hub that the race has been timed out
                // and stop listening from the hub
                clearInterval(AppModel.currentTimerInterval);

                // Set timer on client to 0
                this.io.emit(AppCmd.RemoteDispatch, {
                    type: 'UPDATE_TIMER',
                    data: 0
                });

                AppModel.stop();

                let winner = AppModel.dataBlue.getTotalScore() > AppModel.dataRed.getTotalScore() ? 'G' : 'R';

                this.dispatchCurrentRoundInfoToFrontend(winner);

            } else {
                AppModel.timeLeftInMillis -= 1000;
                this.io.emit(AppCmd.RemoteDispatch, {
                    type: 'UPDATE_TIMER',
                    data: AppModel.timeLeftInMillis
                });
            }
        }, 1000);
    };

    private onResetRound = () => {
        if (AppModel.currentTimerInterval) clearInterval(AppModel.currentTimerInterval);

        AppModel.dataBlue.reset();
        AppModel.dataRed.reset();

        AppModel.stop();

        // Reset timer on client to 0
        this.io.emit(AppCmd.RemoteDispatch, {
            type: 'UPDATE_TIMER',
            data: 0
        });

        this.dispatchCurrentRoundInfoToFrontend();
    };

    private dispatchCurrentRoundInfoToFrontend = (winner = '') => {
        this.io.emit(AppCmd.RemoteDispatch, {
            type: 'CHANGE_ROUND',
            data: {
                red: {
                    total: AppModel.dataRed.getTotalScore(),
                    auto: AppModel.dataRed.getAutoScore(),
                    manual: AppModel.dataRed.getManualScore()
                },
                blue: {
                    total: AppModel.dataBlue.getTotalScore(),
                    auto: AppModel.dataBlue.getAutoScore(),
                    manual: AppModel.dataBlue.getManualScore()
                },
                winner: winner
            },
        });
    };

}
