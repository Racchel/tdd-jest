/* eslint-disable no-plusplus */
// eslint-disable-next-line max-classes-per-file
type GroupUser = {
   id: string;
   permission: string;
};

type Group = {
   users: [GroupUser];
};

interface ILoadGroupRepository {
   load: (input: { eventId: string }) => Promise<Group | undefined>;
}

class LoadGroupRepository implements ILoadGroupRepository {
   eventId?: string;
   async load(input: { eventId: string }): Promise<Group | undefined> {
      return undefined;
   }
}

class LoadGroupRepositoryMock implements ILoadGroupRepository {
   eventId?: string;
   callsCount = 0;
   output?: Group = {
      users: [{ id: 'any_user_id', permission: 'any' }],
   };

   async load({ eventId }: { eventId: string }): Promise<Group | undefined> {
      this.eventId = eventId;
      this.callsCount++;
      return this.output;
   }
}

class DeleteEvent {
   constructor(private readonly loadGroupRepository: LoadGroupRepository) {}

   async perform({
      id,
      userId,
   }: {
      id: string;
      userId: string;
   }): Promise<void> {
      const group = await this.loadGroupRepository.load({ eventId: id });
      if (group === undefined) throw new Error();
      if (group.users.find((user) => user.id === userId) === undefined)
         throw new Error();
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

   it('should throw if userId is invalid', async () => {
      const { sut, loadGroupRepository } = makeSut();
      loadGroupRepository.output = {
         users: [{ id: 'any_user_id', permission: 'any' }],
      };

      const promise = sut.perform({ id, userId: 'invalid_id' });

      await expect(promise).rejects.toThrowError();
   });
});
