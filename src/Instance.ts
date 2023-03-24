import { contextBuilder, getEngine, sourceBuilder } from "./Context";

// @ts-ignore
const File = Java.type("java.io.File");
// @ts-ignore
const YamlConfiguration = Java.type("org.bukkit.configuration.file.YamlConfiguration");

class Instance {

    private config: any
    private folder: any
    private context: any
    private main: any
    private executing: boolean

    constructor(folder: any){
        this.executing = false;
        this.folder = folder;
        if(!this.folder.exists()) this.folder.mkdirs();
        const c = new File(this.folder, "config.yml");
        if(!c.exists()) c.createNewFile();
        this.config = YamlConfiguration.loadConfiguration(c);
        const m = this.config.getString("main", "index.js");
        this.main = new File(this.folder, m);
        if(!this.main.exists()) this.main.createNewFile();
        this.context = contextBuilder(["js"]).allowExperimentalOptions(true).allowAllAccess(true).engine(getEngine()).option("js.nashorn-compat", "true").option("js.commonjs-require", "true").option("js.ecmascript-version", "2022").option("js.commonjs-require-cwd", this.folder.getAbsolutePath()).build();
    }

    public execute(){
        if(!this.executing){
            this.executing = true;
            this.context.eval(sourceBuilder("js", this.main).mimeType("application/javascript+module").build());
        }
    }

    public getContext(){
        return this.context;
    }
}

export {Instance, File}