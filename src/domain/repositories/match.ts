import { Group } from '../model';

export interface IDeleteMatchRepository {
   delete: (input: { eventId: string }) => Promise<void>;
}
