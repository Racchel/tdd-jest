import { Group } from '../model';

export interface ILoadGroupRepository {
   load: (input: { eventId: string }) => Promise<Group | undefined>;
}
