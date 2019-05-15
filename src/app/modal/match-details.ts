import { Match } from './match';
import { UserDashboard } from './user-dashboard';

export class MatchDetails {
    userMatches: UserDashboard[];
    overallMatches: Match[];
    ongoingMatches: Match[];
}
