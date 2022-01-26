import { Group } from '../model';

export interface IDeleteEventRepository {
   delete: (input: { id: string }) => Promise<void>;
}
