// @ts-ignore
const field = Java.type("org.bukkit.Bukkit").getPluginManager().getClass().getDeclaredField("commandMap")

field.setAccessible(true)

// @ts-ignore
const commandMap = field.get(Java.type("org.bukkit.Bukkit").getPluginManager());
// @ts-ignore
const kc = Java.type("org.bukkit.command.SimpleCommandMap").class.getDeclaredField("knownCommands");

kc.setAccessible(true)

const knownCommands = kc.get(commandMap);
// @ts-ignore
const Command = Java.type("org.bukkit.command.Command");

class CommandBuilder {

    public static commands: any[] = [];

    public name: String = "";
    public label: String = "";
    public aliases: String[] = [];
    public permission: String = "";
    public permissionMessage: String = "";
    public usageMessage: String = "";
    public description: String = "";
    public execute: (sender: any, label: String, args: String[]) => boolean;

    constructor(){

    }

    public register(){
        // @ts-ignore
        const CC = Java.extend(Command, {
            execute: this.execute
        })

        const command = new CC(this.name, this.description, this.usageMessage, this.aliases);
        command.setPermission(this.permission);
        command.setLabel(this.label);
        command.setPermissionMessage(this.permissionMessage);
        commandMap.register("jsloader", command);
        CommandBuilder.commands.push(command);
    }

    public static clear(){
        this.commands.forEach(command => {
            const entries: any[] = knownCommands.entrySet().toArray();
            entries.forEach(entry => {
                if(entry.getValue() == command){
                    knownCommands.remove(entry.getKey());
                }
            })
        })
        this.commands = [];
    }
}

export {CommandBuilder, commandMap, knownCommands}