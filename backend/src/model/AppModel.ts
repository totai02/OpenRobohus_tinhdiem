import * as fs from 'fs'
import {EventEmitter} from "typed-event-emitter";
import {TeamData} from "./TeamData";
import * as _ from "lodash";

class AppModelType extends EventEmitter{

    currentTimerInterval = null;

    timeLeftInMillis = 0;

    dataRed: TeamData;

    dataBlue: TeamData;

    starting = false;

    constructor() {
        super();
        this.initData();
    }

    public start() {
        this.starting = true;
    }

    public stop() {
        this.starting = false;
    }

    public isStart() {
        return this.starting;
    }

    public checkWin() {
        if (this.dataRed.isWin()) return 'R';
        if (this.dataBlue.isWin()) return 'B';
        return '';
    }

    private initData = () => {
        this.dataRed = new TeamData();
        this.dataBlue = new TeamData();
    };

}

export var AppModel = new AppModelType();
