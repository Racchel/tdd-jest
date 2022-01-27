/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import { set, reset } from 'mockdate';

interface ILoadLastEventRepository {
   loadLastEvent: (input: {
      groupId: string;
   }) => Promise<{ endDate: Date } | undefined>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositorySpy implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;
   output?: { endDate: Date };

   async loadLastEvent({
      groupId,
   }: {
      groupId: string;
   }): Promise<{ endDate: Date } | undefined> {
      this.groupId = groupId;
      this.callsCount++;
      return this.output;
   }
}

type EventStatus = { status: string };

class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform({ groupId }: { groupId: string }): Promise<EventStatus> {
      const event = await this.loadLastEventRepository.loadLastEvent({
         groupId,
      });
      if (event === undefined) return { status: 'done' };
      const now = new Date();
      return event.endDate >= now
         ? { status: 'active' }
         : { status: 'inReview' };
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
   const groupId = 'any_group_id';

   beforeAll(() => {
      set(new Date());
   });

   afterAll(() => {
      reset;
   });

   it('should get last event data', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();

      // Act
      await sut.perform({ groupId: 'any_group_id' });

      // Assert
      expect(loadLastEventRepository.groupId).toBe(groupId);
      expect(loadLastEventRepository.callsCount).toBe(1);
   });

   it('should return status done when group has no event', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = undefined;

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('done');
   });

   it('should return status active when now is before event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = {
         endDate: new Date(new Date().getTime() + 1),
      };

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('active');
   });

   it('should return status active when now is equal to event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = {
         endDate: new Date(),
      };

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('active');
   });

   it('should return status inReview when now is after event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = {
         endDate: new Date(new Date().getTime() - 1),
      };

      // Act
      const eventStatus = await sut.perform({ groupId });

      // Assert
      expect(eventStatus.status).toBe('inReview');
   });
});
