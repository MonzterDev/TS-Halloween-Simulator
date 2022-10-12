export function timeToString ( seconds: number ) {
    let mins = (seconds - seconds % 60 ) / 60
    seconds = seconds - ( mins * 60 )

	const hours = (mins - mins % 60 ) / 60
    mins = mins - ( hours * 60 )

    let timeString
    const hoursString = string.format("%02i", hours)
    const minsString = string.format("%02i", mins)
    const secsString = string.format("%02i", seconds)

    if ( hours > 0 ) timeString = `${hoursString}:${minsString}:${secsString}`
    else timeString = `${minsString}:${secsString}`

	return timeString
}