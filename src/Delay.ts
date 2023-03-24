import { Task, Ticker } from "./Ticker";

function setTimeout(code: () => void, delay: number) : any {
    const t: Task = new Task(()=>{
        t.remove();
        code.apply(null);
    }, delay);
    Ticker.tasks.push(t);
    return t.uuid;
}

function setInterval(code: () => void, delay: number): any {
    const t: Task = new Task(()=>{
        code.apply(null);
    }, delay);
    Ticker.tasks.push(t);
    return t.uuid;
}

function clearTimeout(uuid: any) {
    Ticker.tasks.forEach(task => {
        if(task.uuid == uuid){
            task.remove();
        }
    });
}

export {setInterval, setTimeout, clearTimeout}