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

   async perform(groupId: string): Promise<string> {
      await this.loadLastEventRepository.loadLastEvent(groupId);
      return 'done';
   }
}

type SutTypes = {
   sut: CheckLastEventStatus;
   loadLastEventRepository: LoadLastEventRepositorySpy;
};

const makeSut = (): SutTypes => {
   const loadLastEventRepository = new LoadLastEventRepositorySpy();
   const sut = new CheckLastEventStatus(loadLastEventRepository);
   return {
      sut,
      loadLastEventRepository,
   };
};

describe('CheckLastEventStatus', () => {
   it('should get last event data', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();

      // Act
      await sut.perform('any_group_id');

      // Assert
      expect(loadLastEventRepository.groupId).toBe('any_group_id');
      expect(loadLastEventRepository.callsCount).toBe(1);
   });

   it('should return status done when group has no event', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = undefined;

      // Act
      const status = await sut.perform('any_group_id');

      // Assert
      expect(status).toBe('done');
   });
});
