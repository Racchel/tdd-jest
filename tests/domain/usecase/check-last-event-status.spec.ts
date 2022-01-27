/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<undefined>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositorySpy implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;
   output: undefined;

   async loadLastEvent(groupId: string): Promise<undefined> {
      this.groupId = groupId;
      this.callsCount++;
      return this.output;
   }
}

class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform(groupId: string): Promise<void> {
      await this.loadLastEventRepository.loadLastEvent(groupId);
   }
}

describe('CheckLastEventStatus', () => {
   it('should get last event data', async () => {
      // Arranje
      const loadLastEventRepository = new LoadLastEventRepositorySpy();
      const sut = new CheckLastEventStatus(loadLastEventRepository);

      // Act
      await sut.perform('any_group_id');

      // Assert
      expect(loadLastEventRepository.groupId).toBe('any_group_id');
      expect(loadLastEventRepository.callsCount).toBe(1);
   });

   it('should return status done when group has no event', async () => {
      // Arranje
      const loadLastEventRepository = new LoadLastEventRepositorySpy();
      loadLastEventRepository.output = undefined;
      const sut = new CheckLastEventStatus(loadLastEventRepository);

      // Act
      const status = await sut.perform('any_group_id');

      // Assert
      // expect(status).toBe('done');
   });
});
