import TeamModel from "./teamModel";

class ExternalDataImporter {

	public static importTeamsCsv(csvData: string) : TeamModel[]{
		let teams: TeamModel[] = [];
		let csvLines = csvData.split("\n");
		// skip the first line, as that's a header
		for (let ii = 1; ii < csvLines.length; ++ii) {
			let line = csvLines[ii];
			let lineParts = line.split(",");
			if (lineParts.length < 2) {
				// probably at end of file.
				break;
			}
			var newTeam = new TeamModel(lineParts[0], parseInt(lineParts[1]));
			teams.push(newTeam);
		}
		return teams;
	}
}	


export default ExternalDataImporter;