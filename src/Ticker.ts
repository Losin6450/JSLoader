// @ts-ignore
const UUID = Java.type("java.util.UUID");

class Ticker {

    public static tasks: Task[] = [];


    public static tick(){
        this.tasks.forEach(task => {
            task.tick();
        });
    }
}

class Task {

    private func: () => void
    private timer: number
    private interval: number
    public uuid: any


    constructor(code: () => void, delay: number){
        this.func = code;
        this.timer = 0;
        this.interval = delay;
        this.uuid = UUID.randomUUID();
    }

    public tick(){
        this.timer++;
        if(this.timer >= this.interval){
            this.timer = 0;
            this.func.apply(null);
        }
    }

    public remove(){
        if(Ticker.tasks.indexOf(this) != -1){
            Ticker.tasks.splice(Ticker.tasks.indexOf(this), 1);
        }
    }
}

export {Task, Ticker}