import { Country } from './country';
import { Time } from '@angular/common';


export class Match {
    matchid: string;
    startTime: string;
    fromTeam: Country;
    toTeam: Country;
}
