/* eslint-disable no-plusplus */
import { IDeleteEventRepository } from '../../../src/domain/repositories';

export class DeleteEventRepositoryMock implements IDeleteEventRepository {
   id?: string;
   callsCount = 0;

   async delete({ id }: { id: string }): Promise<void> {
      this.id = id;
      this.callsCount++;
   }
}
