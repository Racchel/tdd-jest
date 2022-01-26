/* eslint-disable no-plusplus */
import { IDeleteMatchRepository } from '../../../src/domain/repositories';

export class DeleteMatchRepositoryMock implements IDeleteMatchRepository {
   eventId?: string;
   callsCount = 0;

   async delete({ eventId }: { eventId: string }): Promise<void> {
      this.eventId = eventId;
      this.callsCount++;
   }
}
