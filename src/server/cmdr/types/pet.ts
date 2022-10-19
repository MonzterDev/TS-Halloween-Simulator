import { TypeDefinition, Registry } from "@rbxts/cmdr";

export = function ( registry: Registry ) {
    registry.RegisterType( "pet", registry.Cmdr.Util.MakeEnumType( "pet", ["Alien", "Ant", "Baby Bee", "Baby Slime", "Beast", "Blue Slime", "Crab", "Demon", "Devil", "Dino", "Dragoon", "Duck", "Elephant", "Fire Demon", "Fly", "Fox", "Ghost", "Ghost Dog", "Ghost Dragon", "Ghost Slime", "Kitty", "Monkey", "Mouse", "Penguin", "Piggy", "Purple Slime", "Red Slime", "Rhino", "Scorch", "Slime King", "Spider", "Void Angel", "Void Vampire", "Wolf", "Yellow Slime", "Zelot"] ) )
}