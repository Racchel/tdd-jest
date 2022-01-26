/* eslint-disable no-plusplus */
import { Group } from '../../../src/domain/model';
import { ILoadGroupRepository } from '../../../src/domain/repositories';

export class LoadGroupRepositorySpy implements ILoadGroupRepository {
   eventId?: string;
   callsCount = 0;
   output?: Group = new Group({
      users: [
         {
            id: 'any_user_id',
            permission: 'admin',
         },
      ],
   });

   async load({ eventId }: { eventId: string }): Promise<Group | undefined> {
      this.eventId = eventId;
      this.callsCount++;
      return this.output;
   }
}
