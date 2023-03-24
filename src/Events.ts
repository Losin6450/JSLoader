// @ts-ignore
const Listener = Java.extend(Java.type("org.bukkit.plugin.EventExecutor"), Java.type("org.bukkit.event.Listener"), {
    execute: (listener: any, event: any)=>{
        Events.handlers.forEach(handler => {
            if(event.getClass().isAssignableFrom(handler.cls)){
                handler.execute.apply(null, [event]);
            }
        });
    }
})
// @ts-ignore
const JSLoader = Java.type("org.bukkit.Bukkit").getPluginManager().getPlugin("JSLoader");


class EventHandler {
    public cls: any;
    public execute: (event: any) => void

    constructor(execute: (event: any) => void, cls: any){
        this.execute = execute;
        this.cls = cls;
    }

}

class Events {
    public static handlers: EventHandler[] = []
    public static cls: any[] = [];

    public static clear(){
        this.handlers = [];
        // @ts-ignore
        const m = Java.type("org.bukkit.plugin.SimplePluginManager").class.getDeclaredMethod("getEventListeners", Java.type("java.lang.Class"))
        m.setAccessible(true)
        this.cls.forEach(c => {
            // @ts-ignore
            const handlerlist = m.invoke(Java.type("org.bukkit.Bukkit").getPluginManager(), c);
            handlerlist.unregister(JSLoader);
        })
        this.cls = [];
    }

    public static add(handler: EventHandler){
        if(this.cls.indexOf(handler.cls) == -1) {
            this.cls.push(handler.cls);
            // @ts-ignore
            const listener = new Listener();
            // @ts-ignore
            Java.type("org.bukkit.Bukkit").getPluginManager()["registerEvent(java.lang.Class,org.bukkit.event.Listener,org.bukkit.event.EventPriority,org.bukkit.plugin.EventExecutor,org.bukkit.plugin.Plugin,boolean)"](handler.cls, listener, Java.type("org.bukkit.event.EventPriority").NORMAL, listener, JSLoader, false);
        }
        this.handlers.push(handler);
    }

    public static remove(handler: EventHandler){
        if(this.handlers.indexOf(handler) != -1){
            this.handlers.splice(this.handlers.indexOf(handler), 1);
        }
    }
}

export {Events, EventHandler}