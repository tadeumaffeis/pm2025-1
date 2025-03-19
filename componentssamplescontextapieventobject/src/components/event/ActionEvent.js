
export class ActionEvent {
    static CHANGE_BOARD = 'CHANGE_BOARD';
    static CHANGE_PLAYER = 'CHANGE_PLAYER';
    static CHANGE_WINNER = 'CHANGE_WINNER';
    static CHANGE_SCORE = 'CHANGE_SCORE';
    static CHANGE_COUNT_GAME = 'CHANGE_COUNT_GAME';

    constructor(type) {
        this.eventType = type;
    }

    register = (payload) => {
        this.payload = payload;
        this.event = { type: this.eventType, payload };
        return this;
    };
  
    getEvent = () => {
        return this.event;
    };

    getReducerState = () => {
        switch (this.eventType) {
            case this.CHANGE_BOARD:
                return { board : this.payload.board };
            case this.CHANGE_PLAYER:
                return { player : this.payload.player };
            case this.CHANGE_WINNER:
                return { winner : this.payload.winner };
            case this.CHANGE_SCORE:
                return { score : this.payload.score };
            case this.CHANGE_COUNT_GAME:
                return { countGame : this.payload.countGame };
            default:
                return {};
        }
    }
}