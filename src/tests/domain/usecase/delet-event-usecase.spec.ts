/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
interface ILoadGroupRepository {
   load: (input: { eventId: string }) => Promise<any>;
}

class LoadGroupRepository implements ILoadGroupRepository {
   eventId?: string;
   async load(input: { eventId: string }): Promise<any> {
      return undefined;
   }
}

class LoadGroupRepositoryMock implements ILoadGroupRepository {
   eventId?: string;
   callsCount = 0;
   output: any = 'any_value';

   async load({ eventId }: { eventId: string }): Promise<any> {
      this.eventId = eventId;
      this.callsCount++;
      return this.output;
   }
}

class DeleteEvent {
   constructor(private readonly loadGroupRepository: LoadGroupRepository) {}

   async perform({ id }: { id: string; userId: string }): Promise<void> {
      const group = await this.loadGroupRepository.load({ eventId: id });
      if (group === undefined) throw new Error();
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

   it('should throw if eventId is invalid', async () => {
      const { sut, loadGroupRepository } = makeSut();
      loadGroupRepository.output = undefined;

      const promise = sut.perform({ id, userId });

      await expect(promise).rejects.toThrowError();
   });
});
