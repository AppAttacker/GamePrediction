import { User } from './user';
import { Match } from './match';
import { Players } from './players';
import { MatchQuestions } from './match-questions';

export class UserPrediction {
    user: User;
    match: Match;
    players: Players[];
    matchQuestions: MatchQuestions[];
}
