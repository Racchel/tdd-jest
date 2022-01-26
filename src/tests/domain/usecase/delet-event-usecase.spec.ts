/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
interface ILoadGroupRepository {
   load: (input: { eventId: string }) => Promise<void>;
}

class LoadGroupRepository implements ILoadGroupRepository {
   eventId?: string;
   async load(input: { eventId: string }): Promise<void> {}
}

class LoadGroupRepositoryMock implements ILoadGroupRepository {
   eventId?: string;
   callsCount = 0;

   async load({ eventId }: { eventId: string }): Promise<void> {
      this.eventId = eventId;
      this.callsCount++;
   }
}

class DeleteEvent {
   constructor(private readonly loadGroupRepository: LoadGroupRepository) {}
   async perform({ id }: { id: string; userId: string }): Promise<void> {
      await this.loadGroupRepository.load({ eventId: id });
   }
}
type SutTypes = {
   sut: DeleteEvent;
   loadGroupRepository: LoadGroupRepositoryMock;
};

const makeSut = (): SutTypes => {
   const loadGroupRepository = new LoadGroupRepositoryMock();
   const sut = new DeleteEvent(loadGroupRepository);
   return { sut, loadGroupRepository };
};

describe('DeleteEvent', () => {
   const id = 'any_event_id';
   const userId = 'any_user_id';

   it('should get group data', async () => {
      const { sut, loadGroupRepository } = makeSut();

      await sut.perform({ id, userId });

      expect(loadGroupRepository.eventId).toBe(id);
      expect(loadGroupRepository.callsCount).toBe(1);
   });
});
