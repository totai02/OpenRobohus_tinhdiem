export class TeamData {
    private twoPoint;
    private threePoint;
    private fivePoint;
    private tenPoint;

    constructor() {
        this.reset();
    }

    public reset() {
        this.twoPoint = 0;
        this.threePoint = 0;
        this.fivePoint = 0;
        this.tenPoint = 0;
    }

    public isWin() {
        return this.twoPoint >= 3 && this.threePoint >= 2 && this.fivePoint >= 4 && this.tenPoint >= 1;
    }

    public addTwoPoint() {
        this.twoPoint++;
    }

    public addThreePoint() {
        this.threePoint++;
    }

    public addFivePoint() {
        this.fivePoint++;
    }

    public addTenPoint() {
        this.tenPoint++;
    }

    public getAutoScore() {
        return this.fivePoint * 5 + this.tenPoint * 10;
    }

    public getManualScore() {
        return this.twoPoint * 2 + this.threePoint * 3;
    }

    public getTotalScore() {
        return this.twoPoint * 2 + this.threePoint * 3 + this.fivePoint * 5 + this.tenPoint * 10;
    }
}
