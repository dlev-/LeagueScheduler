import * as React from "react";
import * as ReactDOM from "react-dom";
import MatchupCreator from "./MatchupCreator";
import TeamManager from "./teamManager";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleCreator from "./ScheduleCreator";
import RootModel from "./RootModel";
import TeamModel from "./teamModel";
import FieldModel from "./FieldModel";
import MatchupModel from "./MatchupModel";
import GameSlotModel from "./GameSlotModel";

import ScheduleValidator from "./ScheduleValidator";


var teamListHardCoded = [
	"Inner City Pandas", "Jazz Picnic", "Toolbox", "Swashington Undodgers", "Dry Spell", "Huckin Easy", "Sea Yahtsea", "Skadoosh", "Reptars", "Genghis Khan Wild", "Rainier Mountaineers", "Firebirds", "Huck Yeah", "Fish Is Meat", "Boom", "The Big Huge", "Space Invaders", "Barrel of Monkeys", "Badger", "Deadliest Catch", "More Cow Bell", "Cascadia Subduction Zone", "Cowabunga", "Hip Hop Anonymous", "The Brunch Club", "Pan- Galactic Groove Squad", "Slow Dance", "Whiskey Phone", "The Mighty Hucks", "Ornithugs", "ALLCAPS", "Rubber Huckies", "The Discount Rate is WACC", "(p)Terodactyl Dance Party", "Athletes", "Huckminster Fuller and the Dymaxion Projection", "Xante", "Lord Geoduck Son of Bezerker", "JustDisc League", "The Ultimate", "Huck Buddies", "Tight Like Unto a Disc", "Chaos Theory"
];

var root = new RootModel(61, "Fake league season", [0, 6], 2016);
for (var ii = 0; ii < teamListHardCoded.length; ++ii) {
	var newTeam = new TeamModel(teamListHardCoded[ii], ii);
	root.addTeam(newTeam);
}

let baseDate = new Date(2016, 8, 10);
for (let ii = 0; ii < 10; ++ii) {
	let gameDate = new Date(baseDate.toISOString());
	gameDate.setDate(baseDate.getDate() + ii * 7);
	root.schedule.addGameSlot(new GameSlotModel(gameDate, 10, 92));
	root.schedule.addGameSlot(new GameSlotModel(gameDate, 12, 92));
	root.schedule.addGameSlot(new GameSlotModel(gameDate, 10, 93));
	root.schedule.addGameSlot(new GameSlotModel(gameDate, 12, 93));
}

root.schedule.addGameSlot(new GameSlotModel(baseDate, 12, 20));

root.addField(new FieldModel("Mag 6a", 92));
root.addField(new FieldModel("Mag 6b", 93));
root.addField(new FieldModel("Mag 7a", 20));

// add matchups
root.schedule.gameSlots[0].matchup = new MatchupModel(root.teams[0], root.teams[1]);

var serializedModel = JSON.stringify(root.serialize());
var newRoot = RootModel.deserialize(JSON.parse(serializedModel));

var serializationRoundTripWorked = JSON.stringify(root) == JSON.stringify(newRoot);

if (serializationRoundTripWorked) {
	console.log("serialization round trip is good");
} else {
	console.log("BAD BAD BAD - serialization round trip didn't work");
	console.log(JSON.stringify(root));
	console.log(JSON.stringify(newRoot));
}

ScheduleValidator.validateByes(root);


//var teamManager = new TeamManager(root.teams, root.year, root.daysOfWeek);
//teamManager.render();

//console.log(JSON.stringify(root));
//var matchupCreator = new MatchupCreator(teamListHardCoded);


// interface AppProps {
// 	root: RootModel;
// }

// class App extends React.Component<AppProps, {}> {

// 	render() {

// 		return (
// 			<div> 
// 				<div> 
// 					<ScheduleGrid gameSlots={root.schedule.gameSlots} fields={root.fields} />
// 				</div>
// 			</div>
// 		)
// 	}
// }

root.schedule.sortGameSlots();
// var rootElement = React.createElement(App, {'root': root})
// ReactDOM.render(rootElement, document.getElementById('root'))

var scheduleCreator = new ScheduleCreator(root.fields, root.schedule.gameSlots);


