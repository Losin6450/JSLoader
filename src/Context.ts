// @ts-ignore
const Context = Java.type("java.lang.Class").forName("org.graalvm.polyglot.Context")
// @ts-ignore
const Source = Java.type("org.graalvm.polyglot.Source");


function contextBuilder(languages: String[]): any {
    // @ts-ignore
    return Context.getDeclaredMethod("newBuilder", Java.type("java.lang.String[]")).invoke(null, [Java.to(languages, Java.type("java.lang.String[]"))]);
}

function getCurrent(){
    return Context.getDeclaredMethod("getCurrent").invoke(null);
}

function getEngine(){
    // @ts-ignore
    return Java.type("org.bukkit.Bukkit").getPluginManager().getPlugin("JSLoader").class.getDeclaredField("engine").get(null);
}

function sourceBuilder(language: String, file: any): any {
    return Source.newBuilder(language, file);
}

export {contextBuilder, getCurrent, getEngine, sourceBuilder}