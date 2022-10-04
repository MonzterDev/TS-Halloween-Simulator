import { Cmdr } from "@rbxts/cmdr";

const parent = <Folder>script.Parent

Cmdr.RegisterDefaultCommands()
Cmdr.RegisterCommandsIn( <Folder>parent.FindFirstChild( "commands" ) )
Cmdr.RegisterTypesIn( <Folder>parent.FindFirstChild( "types" ) )
Cmdr.RegisterHook( "BeforeRun", ( context ) => {
    if ( context.Executor.UserId !== 811308495 ) return "You don't have perm"
})