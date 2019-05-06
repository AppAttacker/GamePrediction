import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../modal/match';

@Pipe({
  name: 'filterFixtureByTeam'
})
export class FilterFixtureByTeamPipe implements PipeTransform {

  transform(matchSchedule: Match[], teamName: string): Match[] {
    console.log(matchSchedule);
    console.log(teamName);
    return (teamName == '' || teamName == null) ? matchSchedule : matchSchedule.filter(match => match.fromTeam.name.toLowerCase().indexOf(teamName.toLowerCase()) !== -1 || match.toTeam.name.toLowerCase().indexOf(teamName.toLowerCase()) !== -1);

  }

}
