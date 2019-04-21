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
        return this.dataRed.isWin() || this.dataBlue.isWin();
    }

    private initData = () => {
        this.dataRed = new TeamData();
        this.dataBlue = new TeamData();
    };

}

export var AppModel = new AppModelType();
