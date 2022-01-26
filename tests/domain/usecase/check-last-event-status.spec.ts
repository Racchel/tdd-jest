/* eslint-disable max-classes-per-file */
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<void>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositoryMock implements ILoadLastEventRepository {
   groupId?: string;

   async loadLastEvent(groupId: string): Promise<void> {
      this.groupId = groupId;
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
      const checkLastEventStatus = new CheckLastEventStatus(
         loadLastEventRepository
      );

      // Act
      await checkLastEventStatus.perform('any_group_id');

      // Assert
      expect(loadLastEventRepository.groupId).toBe('any_group_id');
   });
});
