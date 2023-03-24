
import { CommandBuilder, commandMap, knownCommands} from "./Command";
import { clearTimeout, setInterval, setTimeout } from "./Delay";
import { EventHandler, Events } from "./Events";
import { File, Instance } from "./Instance";
import { Ticker } from "./Ticker";
// @ts-ignore
const Bukkit = Java.type("org.bukkit.Bukkit");
const JSLoader = Bukkit.getPluginManager().getPlugin("JSLoader");
// @ts-ignore
const Runnable = Java.extend(Java.type("java.lang.Runnable"));



const task: any = Bukkit.getScheduler().runTaskTimer(JSLoader, new Runnable({
    run: ()=>{
        Ticker.tick();
    }
}), 0, 1);

JSLoader.addCloseHandler(()=>{
    task.cancel();
    CommandBuilder.clear();
    Events.clear();
    knownCommands.remove(command.getLabel() + ":" + command.getName());
});

const API = {
    setInterval: setInterval,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    plugin: JSLoader,
    Ticker: Ticker,
    CommandBuilder: CommandBuilder,
    EventHandler: EventHandler,
    Events: Events,
}


const Script = {
    reload: ()=>{
        Ticker.tasks = [];
        CommandBuilder.clear();
        Events.clear();
        if(Script["instance"] != undefined) Script["instance"].getContext().close();
        Script["instance"] = new Instance(new File(JSLoader.getDataFolder(), "script/"));
        Script["instance"].getContext().getBindings("js")["API"] = API;
        Script["instance"].execute();
    }
}

Script.reload();

// @ts-ignore
const Command = Java.type("org.bukkit.command.Command");
// @ts-ignore
const CC = Java.extend(Command, {
    execute: (sender, label, args) => {
        if(sender.isOp()){
            Script.reload();
        } else {
            sender.sendMessage("You don't have permission to use this command!")
        }
        return true;
    }
})

const command = new CC("reload", "reload command for jsloader", "/reload", []);
command.setPermission("jsloader.reload");
command.setLabel("jsloader");
command.setPermissionMessage("You don't have permission to use this command!");
commandMap.register("jsloader", command);