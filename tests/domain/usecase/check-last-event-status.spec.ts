/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<void>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositoryMock implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;

   async loadLastEvent(groupId: string): Promise<void> {
      this.groupId = groupId;
      this.callsCount++;
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
      const loadLastEventRepository = new LoadLastEventRepositoryMock();
      const sut = new CheckLastEventStatus(loadLastEventRepository);

      // Act
      await sut.perform('any_group_id');

      // Assert
      expect(loadLastEventRepository.groupId).toBe('any_group_id');
      expect(loadLastEventRepository.callsCount).toBe(1);
   });
});
