export class PlayerCooldown {
	private playerTimes = new Map<Player, number>();

	constructor(private timeInterval: number) {}

	public cooldownIsFinished(player: Player) {
		const retrievedTime = this.playerTimes.get(player);
		if (retrievedTime === undefined) return true;

		return os.clock() > retrievedTime + this.timeInterval;
	}

	public giveCooldown(player: Player) {
		this.playerTimes.set(player, os.clock());
	}
}